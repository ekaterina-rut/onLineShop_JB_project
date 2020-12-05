import { Router } from 'express';
import { Order } from '../collections/order';
import { Bag } from '../collections/bag';
import { User } from '../collections';
const temp = require('temp');
import moment from 'moment';


const fs = require('fs')



const orderRouter = Router();

orderRouter.get('/', async (req, res) => {
    const { user_id } = (req as any).user;
    try {
        const bag = await Bag.find({ id_customer: user_id }).exec();
        res.send({ response: true, msg: `check you order list`, bag: bag[0] })
    }
    catch (err) {
        res.send({ response: false, msg: `some thing wrong with mongo` })
    }
})

orderRouter.get('/download/:id_order', async (req, res) => {


    const { id_order } = req.params;

    try {

        const [order] = await Order.find({ _id: id_order }).exec();
        const user_id = order.id_customer
        const [user] = await User.find({ _id: user_id });

        const date = order.order_date;
        const order_date = moment(date).format('DD-MM-yyyy');

        const writeStream = fs.createWriteStream("src/invoice/invoice.txt");
        await writeStream.write(`ORDER# ${id_order}\n`);
        writeStream.write('\n');
        writeStream.write(`DATE:\n ${order_date}\n `);
        writeStream.write(`NAME:\n ${user.first_name + " " + user.last_name}\n `);
        writeStream.write('\n');
        writeStream.write(`ADRESS:\n ${order.city}\n ${order.street} street \n`);
        writeStream.write('\n')
        writeStream.write('PRODUCTS\n')
        order.order_products.map(product => {
            writeStream.write(`${product.qty} ${product.product_name}....... ${product.total_price}\n`)
        })
        writeStream.write('\n')

        writeStream.write(`total: ${order.total_price} \n`);
        writeStream.write('\n')


        writeStream.write('thank you for shopping!');

        await writeStream.end();
        await writeStream.on("finish", function () {
            res.download('src/invoice/invoice.txt', 'invoice.txt');

        });

    }
    catch (err) {
        res.send({ response: false, msg: `some thing wrong with mongo` })
    }
})

orderRouter.post('/placeOrder', async (req, res) => {

    const { orderDetails }: any = req.body;
    const credit_card = orderDetails.credit_card;
    const isCreditCardValid = checkCreditCard(credit_card)
    if (!isCreditCardValid) {
        res.send({ response: false, msg: `the credit card is invalid` })
        return
    }
    const delivery_date = orderDetails.delivery_date

    const isDateAvailble = await checkDate(delivery_date)
    if (!isDateAvailble) {
        res.send({ response: false, msg: `pls pick another date` })
        return
    }

    const date = await Order.find({ deliveryDate: delivery_date });


    const { user_id } = (req as any).user;

    try {
        const [bag] = await Bag.find({ id_customer: user_id }).exec();
        try {
            
            const order = new Order({
                id_customer: user_id,
                id_bag: bag._id,
                total_price: bag.total_price,
                city: orderDetails.city,
                street: orderDetails.street,
                order_date: new Date(),
                bag_date: bag.date,
                payment: orderDetails.credit_card,
                deliveryDate: orderDetails.delivery_date,
                order_products: bag.products
            })
            const result = await order.save();
            await Bag.deleteOne({ id_customer: user_id })


            res.send({ response: true, order: order, msg: `thank you for shopping` })
        }
        catch (err) {
        }

    } catch (err) {
        res.send({ response: false, msg: `pls try latter` })

    }
})




orderRouter.get('/getAllOrders', async (req, res) => {
    const orders = await Order.find().count().exec();
    if (!orders) {
        res.send({ response: false, orders: 0, msg: 'there is no orders' })
    }
    res.send({ response: true, orders: orders, msg: `total orders: ${orders}` })
})

orderRouter.get('/getOpenOrders', async (req, res) => {
    const open_orders = await Bag.find().exec();
    if (!open_orders.length) {
        res.send({ response: false, open_orders: [], msg: 'all orders are placed' })
    }
    res.send({ response: true, open_orders: open_orders, msg: 'pls see all open orders' })
})





function checkCreditCard(credit_card: string) {
    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexpRegEx = /^(?:3[47][0-9]{13})$/;
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

    if (visaRegEx.test(credit_card)) {
        const isValid = true;
        return isValid
    } else if (mastercardRegEx.test(credit_card)) {
        const isValid = true;
        return isValid
    } else if (amexpRegEx.test(credit_card)) {
        const isValid = true;
        return isValid
    } else if (discovRegEx.test(credit_card)) {
        const isValid = true;
        return isValid
    }

    return false

}

async function checkDate(delivery_date: Date) {
    const date = await Order.find({ deliveryDate: delivery_date });
    if (date.length > 3) {
        return false
    }
    return true

}





export { orderRouter };

