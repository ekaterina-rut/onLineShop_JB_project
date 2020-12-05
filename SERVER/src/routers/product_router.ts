import { Router } from 'express';
import { Product } from '../collections/product';


const productRouter = Router();




productRouter.post('/search', async (req, res) => {
    const { search }: any = req.body;
    const product = await Product.find({ name: { $regex:  "^" + search  } })
    // /chocolate/i
    // const product = await Product.find({ name: { $regex: "^" + search } }).exec();
    if (!product.length) {
        res.send({ response: false, product: [], msg: 'there is no product with this name' })
        return
    }
    res.send({ response: true, products: product, msg: 'search result' })
})


productRouter.get('/:category', async (req, res) => {
    const { category }: any = req.params;
    const products = await Product.find({ category: category });
    if (!products.length) {
        res.send({ response: false, products: [], msg: 'this category is empty' });
        return
    }
    res.send({ response: true, products: products, msg: `pls check all products in ${category}` })

})


productRouter.post('/addProduct', async (req, res) => {
    const { new_product } = req.body;
    const name = new_product.name
    const category = new_product.category
    const price = new_product.price
    const img = new_product.img
    try {
        const product = new Product({
            name: name,
            category: category,
            price: price,
            img: img
        })

        const new_product = await product.save();
        res.send({ response: true, product: new_product, msg: `${name} is added` })
    } catch (err) {
        res.status(403).send(err.message)
    }
})


productRouter.post('/editProduct', async (req, res) => {
    const { product } = req.body;
    const name = product.name;
    const category = product.category;
    const price = product.price;
    const img = product.img;
    const product_id = product._id
    // const { name, category, price, img, product_id } = req.body;
    const product_to_update = await Product.findById((product_id));
    try {
        await Product.updateOne({ _id: product_id }, {
            $set: {
                name: name,
                category: category,
                img: img,
                price: price
            }
        })

        const updated_product = await Product.find({ _id: product_id }).exec();
        res.send({ response: true, product: updated_product[0], msg: `${name} is updated` })
    }
    catch (err) {
        res.send({ response: false, msg: err.message })
    }
})

productRouter.get('/getAllProducts', async (req, res) => {
    const products_number = await Product.find().count().exec();
    if (!products_number) {
        res.send({ response: false, products_number: 0, msg: 'inventory is empty' })
    }
    res.send({ response: true, products_number: products_number, msg: `total products: ${products_number}` })

})


export { productRouter };

