import { Router } from 'express';
import { User } from '../collections/user';
import { Bag, SelectedProduct } from '../collections/bag';
import { Product } from '../collections/product';



const bagRouter = Router();


// SHOPING========================================

bagRouter.get('/start_shopping', async (req, res) => {

    const { user_id } = (req as any).user;

    const bag = await Bag.find({ id_customer: user_id }).exec();

    if (!bag.length) {
        try {
         
            const bag = await new Bag({
                id_customer: user_id,
                date: new Date(),
                produdts: [],
                total_price: 0,

            })
            await bag.save();
            const result = await User.updateOne({ id: user_id }, { $set: { open_bag: true } });
            res.send({ response: true, msg: `enjoy your shopping`, bag: bag });
        } catch (err) {
            res.send({ response: false, msg: `sorry, pls come back later` });
        }
    }
    if (bag.length > 0) {
        res.send({ response: true, msg: `enjoy your shopping`, bag: bag[0] });

    }

});


bagRouter.post('/pick/:product_id', async (req, res) => {
    const { product_id } = req.params;
    const { qty } = req.body;
    const { user_id } = (req as any).user;
    const is_product_in_bag = await checkProductInBag(product_id, user_id, qty);


    if (is_product_in_bag) {
        const bag = await Bag.find({ id_customer: user_id }).exec();
        const bag_total_price = bag[0].total_price;
        const bag_products = bag[0].products
        const product = await Product.findById((product_id));
        const product_name = product?.name
        const picked_product = bag_products.find(bag_product => bag_product.id_product === product_id)

        res.send({ response: true, msg: `${product_name} in shopping bag `, product: picked_product, bag_price: bag_total_price });
        return
    }
    try {
        await Bag.findOne({ id_customer: user_id }).exec();
        const product = await Product.findById((product_id));
        if (product) {
            const picked_product = new SelectedProduct({
                id_product: product_id,
                product_name: product.name,
                product_price: product.price,
                qty: qty,
                total_price: product.price * qty,
                img: product.img
            })
            const bag = await Bag.find({ id_customer: user_id }).exec();
            const bag_total_price = bag[0].total_price + picked_product.total_price;


            const result = await Bag.updateOne({ id_customer: user_id }, { $push: { products: picked_product }, $set: { total_price: bag_total_price } });
            res.send({ response: true, msg: `product added ${product.name}`, product: picked_product, bag_price: bag_total_price });
            return
        }
        res.send({ response: false, msg: ` is out off stock`, product_id: product_id })

    }
    catch (err) {
        res.send({ response: false, msg: `user is undifined` })
    }
})


bagRouter.delete('/delete_product_from_bag/:product_id', async (req, res) => {
    const { user_id } = (req as any).user;
    const { product_id } = req.params;

    const bag = await Bag.findOne({ id_customer: user_id });
    await bag?.remove_product_from_bag(product_id);

    const updated_bag = await Bag.find({ id_customer: user_id }).exec();
    if (!updated_bag.length) {
        res.send({ response: false, msg: 'something wrong' })
    }

    if (!updated_bag[0].products.length) {
        res.send({
            response: true,
            updated_bag: updated_bag[0],
            msg: `the bag is empty`,
            bag_price: 0
        });
        return
    }
    res.send({
        response: true,
        updated_bag: updated_bag[0],
        msg: `shopping bag total is updated ${updated_bag[0].total_price}`,
        bag_price: updated_bag[0].total_price

    });

})

bagRouter.delete('/empty_shoping_bag', async (req, res) => {
    const { user_id } = (req as any).user;

    await Bag.update(
        { id_customer: user_id },
        { $set: { products: [], total_price: 0 } },
    )
    const updated_bag = await Bag.find({ id_customer: user_id }).exec();
    if (!updated_bag.length) {
        res.send({ response: false, msg: 'something wrong' })
    }
    res.send({
        response: true,
        updated_bag: updated_bag,
        msg: 'your bag is empty'
    });
})

async function checkProductInBag(id_product: string, user_id: string, qty: number) {
    const bag = await Bag.findOne({ id_customer: user_id }).exec();
    const bag_products = bag?.products
    const bag_product = bag_products?.find(product => product.id_product === id_product);
    if (!bag_product) {
        return false
    }
    if (bag_product) {
        const product = await Product.findById((id_product));
        bag_products?.map(bag_product => {
            if (bag_product.id_product === id_product) {
                bag_product.qty = bag_product.qty + qty;
                bag_product.total_price = bag_product.total_price + (bag_product.total_price * qty)
            }
        })
        const result = await Bag.updateOne({ id_customer: user_id }, { $set: { products: bag_products, total_price: bag!.total_price + product!.price * qty } });

        return true
    }

}

export { bagRouter };

