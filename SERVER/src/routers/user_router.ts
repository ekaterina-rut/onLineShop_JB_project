import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../collections/user';
import {  Bag } from '../collections/bag';
import { Order } from '../collections/order';
import moment from 'moment';

const bcrypt = require('bcrypt');

const { JWT_SECRET = 'my_shop' } = process.env;


const usersRouter = Router();

// REGISTRATION===============================================

usersRouter.post('/create_admin', async (req, res) => {
    const password = "suklife78"
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
        id: 123654789,
        email: "admin@gmail.com",
        password: hashedPassword,
        first_name: "admin",
        last_name: "adminovich",
        city: 'tel-aviv',
        street: 'mahal',
        admin: true,
        open_bag: false
    });
    await user.save();
    res.send({ response: true, msg: "admin created" })
})

usersRouter.post('/register', async (req, res) => {
    const { id, email, password } = req.body;
    const user = await User.find({ id: id }).exec();
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    if (!user.length) {
        try {
            const user = new User({
                id: id,
                email: email,
                password: hashedPassword,
                first_name: " ",
                last_name: ' ',
                city: ' ',
                street: ' ',
                open_bag: false,
                admin: false
            })
            await user.save();

            const new_user = {
                _id: user._id,
                id: id,
                password: password,
                first_name: user.first_name,
                last_name: user.last_name,
                city: user.city,
                steet: user.street,
                email: user.email,
                admin: false,
                open_bag: false,
            }
            res.send({ response: true, new_user: new_user, msg: 'proceed registration' })
        } catch (err) {
            res.status(403).send(err.message)
        }

    }
    if (user.length > 0
    ) {
        res.send({ response: false, msg: `id: ${id} is allready exist` })
    }
})

usersRouter.post('/register-proceed', async (req, res) => {
    const { _id, first_name, last_name, city, street } = req.body;
    try {
        await User.updateOne({ _id: _id }, {
            $set: {
                first_name: first_name,
                last_name: last_name,
                city: city,
                street: street,
            }
        })
        const user = await User.find({ _id: _id }).exec();
        const user_id = user[0]._id


        const token = jwt.sign({ user_id }, JWT_SECRET);
        res.send({ response: true, user: user[0], token: token, msg: 'thank you for join us' })
    } catch (err) {
        res.status(403).send(err.message)
    }
})

// LOGIN================================

usersRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // const hashedPassword = await bcrypt.hash(req.body.password, 10)


    const user = await User.find({ email: email }).exec();
    if (!user.length) {
        res.send({ response: false, msg: `there is no such account, join us` })
        return
    }

    const logedin_user = user[0];
    const hashedPassword = logedin_user.password;
    const isValid_password = await bcrypt.compare(password, hashedPassword)
    if (!isValid_password) {
        res.send({ response: false, msg: 'user and password don\'t match' })
        return
    }
    const user_id = user[0]._id

    const token = jwt.sign({ user_id }, JWT_SECRET);
    const bag = await Bag.find({ id_customer: user_id }).exec();


    if (!bag.length || !bag[0].products.length) {
        const sortedOrdersByDate = await Order.find({ id_customer: user_id }).sort({ order_date: -1 });
        const last_order = sortedOrdersByDate[0];
        let msg;
        if (!last_order) {
            msg = 'welcome to your first shopping'
        }
        if (last_order) {
            msg = 'your shopping bag is empty'

        }
        res.send({
            response: true,
            user: logedin_user,
            bag: null,
            last_order: last_order,
            msg: msg,
            token: token,
            authorisation: 'user',
            shopping_bag: false

        })
        return
    }
    const bag_date = bag[0].date
    const date = moment(bag_date).format('DD-MM-yyyy');

    res.send({
        response: true,
        user: logedin_user,
        bag: bag[0],
        last_order: null,
        msg: `there is an open shopping bag from  ${date} total ${bag[0].total_price}`,
        token: token,
        bag_amount: bag[0].total_price,
        authorisation: 'user',
        shopping_bag: true

    })
})


export { usersRouter };

