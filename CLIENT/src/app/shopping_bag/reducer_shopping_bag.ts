import { createReducer, on } from '@ngrx/store';
import { endLogin, logout } from '../user/actions_user';
import {
    productInBagConfirmAction,
    receivedNewBagAction,
    removeBagProductConfirmAction,
    emptyBagConfirmAction, endLoginBagAction
} from './shopping_bag_actions';
import { placeOrderConfirmAction } from '../order/actions_order';

export interface IBag {
    _id: string,
    id_customer: string,
    date: Date,
    products: IBagProduct[],
    total: number,
    inform_msg: string,
    start_shopping: boolean
}

export interface IBagProduct {
    _id: string,
    id_product: string,
    product_name: string,
    qty: number
    total_price: number,
    product_price: number,
}

export interface IAddedProduct {
    name: string;
    price: number;
    total_price: number;
    qty: number;

}

// =====================STATE=========================
export const initialState: IBag = {
    _id: '',
    id_customer: '',
    date: null,
    products: [],
    total: 0,
    inform_msg: '',
    start_shopping: false
}
// =====================STATE=========================


export const bagReducer = createReducer(initialState,

    on(receivedNewBagAction, (state, { response }) => ({
        ...state,
        _id: response.bag._id,
        id_customer: response.bag.id_customer,
        date: response.bag.date,
        products: response.bag.products,
        total: response.bag.total_price,
        inform_msg: response.msg,
        start_shopping: true
    })),

    on(productInBagConfirmAction, (state, { response }) => {
        const picked_product = response.product;
        const msg = response.msg;
        const updated_products = state.products.slice();
        const is_product_in_bag = updated_products.find(product => product.id_product === picked_product.id_product)
        if (is_product_in_bag) {
            const index = updated_products.findIndex(product=> product.id_product ===picked_product.id_product)
            updated_products[index] = picked_product
            updatedBagInLocalStorage(updated_products, response.bag_price)

            return ({
                ...state,
                products: updated_products,
                inform_msg: msg,
                total: response.bag_price
            })
        }
        updated_products.push(picked_product)
        updatedBagInLocalStorage(updated_products, response.bag_price)        
        return ({
            ...state,
            products: updated_products,
            inform_msg: msg,
            total: response.bag_price
        })
    }),

    on(removeBagProductConfirmAction, (state, { response }) => {
        const updated_shopping_bag = response.updated_bag;
        const msg = response.msg;
        return ({
            ...state,
            products: updated_shopping_bag.products,
            inform_msg: msg,
            total: response.bag_price
        })
    }),

    on(emptyBagConfirmAction, (state, { response }) => {

        return ({
            ...state,
            products: [],
            inform_msg: response.msg,
            total: 0
        })
    }),

    on(endLogin, (state, { response }) => {
        if (!response.bag) {
            return ({
                ...state,
                products: [],
                inform_msg: response.msg,
            })
        }
        if (response.bag) {
            return ({
                ...state,
                _id: response.bag._id,
                id_customer: response.bag.id_customer,
                date: response.bag.date,
                products: response.bag.products,
                total: response.bag.total_price,
                inform_msg: response.msg,
                start_shopping: true

            })
        }
    }),

    on(placeOrderConfirmAction, ()=> initialState),

    on(logout, () => initialState),


    
)

function updatedBagInLocalStorage(updated_products,updated_total_price) {
    const bag = JSON.parse(localStorage.getItem('bag'));
    bag.products = updated_products;
    bag.total_price = updated_total_price;
    localStorage.setItem("bag", JSON.stringify(bag as any))   

}



