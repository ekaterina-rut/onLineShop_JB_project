import express from 'express';
import cors from 'cors';
import expressJwt from 'express-jwt';
import { connectDb } from './mongodb';
import { Product } from './collections/product'
import { ProductSchema } from './collections/product';
import { usersRouter } from './routers/user_router';
import { bagRouter } from './routers/bag_router'
import { productRouter } from './routers/product_router';
import { orderRouter } from './routers/order_router';
import { Order } from './collections/order';
import { User } from './collections';
var easyinvoice = require('easyinvoice');
const fs = require('fs')
import moment from 'moment';


const PORT = 4000;

const { JWT_SECRET = 'my_shop' } = process.env;

const app = express();

app.use(express.json());
app.use(cors());
// comment out this line if you want to bypass JWT check during development
// app.use(expressJwt({ secret: JWT_SECRET }).unless({ path: "/" }));

// app.use(expressJwt({ secret: JWT_SECRET }).unless({ path: ['/get-all-products', /^\/user\//] }));
app.use(expressJwt({ secret: JWT_SECRET }).unless({ path: ['/items', /^\/user\//, /^\/download\//] }));
app.use(express.urlencoded({ extended: false }))
// app.use(expressJwt({ secret: JWT_SECRET }).unless({ path: ['/items', /^\/download\//] }));



app.use('/user', usersRouter);
app.use('/product', productRouter);
app.use('/bag', bagRouter);
app.use('/order', orderRouter);


// --------------------------------------------------------------------

app.get('/items', async (req, res) => {
    
    try {

        const orders = await Order.find()
        const products = await Product.find().exec();
        res.send({ response: true, products: products, total_orders: orders.length })
    }
    catch (err) {
    }
});

app.get('/download/:id_order', async (req, res) => {


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




startServer();

async function startServer() {
    await connectDb();
    app.listen(PORT, () => console.log(`Server is up at ${PORT}`));
}


