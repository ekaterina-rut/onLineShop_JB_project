import { createReducer, on } from '@ngrx/store';
import { emptyBagAction } from '../shopping_bag/shopping_bag_actions';
import { logout } from '../user/actions_user';
import { showOrderConfirmAction, downloadConfirm, placeOrderConfirmAction, showErrorAction, placeOrderAction } from './actions_order';


export interface OrderStateInterface {
    _id: string,
    id_customer: string,
    total_price: number,
    city: string,
    street: string,
    order_date: Date,
    bag_date: Date,
    payment: string,
    deliveryDate: Date,
    products: IOrderProduct[] | null,
    msg: string | null,
    show_order: boolean,
    url: string | null,
    err_msg: string | null
}

export interface IOrderProduct {
    id_product: string,
    product_name: string,
    qty: number,
    total_price: number,
    img: string

}
// 




// ====================STATE====================
const initialState: OrderStateInterface = {
    _id: null,
    id_customer: null,
    total_price: 0,
    city: null,
    street: null,
    order_date: null,
    bag_date: null,
    payment: null,
    deliveryDate: null,
    products: null,
    msg: "there is no placed order",
    show_order: false,
    url: null,
    err_msg: ''
}
// ====================STATE====================

export const orderReducer = createReducer(initialState,


    on(showOrderConfirmAction, (state, { response }) => {
        return ({
            ...state,
            id_customer: response.bag.id_customer,
            total_price: response.bag.total_price,
            products: response.bag.products,
            show_order: true,
            msg: ''




        })
    }),

    on(placeOrderConfirmAction, (state, { response }) => {
        const url = `http://localhost:4000/download/${response.order._id}`
        return ({
            ...state,
            _id: response.order._id,
            url: url,
            products: [],
            total_price: 0,
            show_order: false,
            msg: 'your shopping bag is empty'
        })
    }),

    on(placeOrderAction, (state,) => {
        return ({
            ...state,
            err_msg: ''
        })
    }),

    on(showErrorAction, (state, { msg }) => {
        return ({
            ...state,
            err_msg: msg
        })
    }),
    on(emptyBagAction, () => initialState),


    on(downloadConfirm, (state, { response }) => {
        return ({
            ...state,
        })
    }),

    on(logout, () => initialState),



)








