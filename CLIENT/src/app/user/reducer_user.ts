import { createReducer, on } from '@ngrx/store';
import {
  
    showMsgAction,
    confirmRegistrationAction,
    startRegistrationAction,
    endRegistration,
    endLogin,
    logout, showUserErrorAction
}
    from './actions_user';
import { state } from '@angular/animations';
import { receivedNewBagAction, productInBagConfirmAction, emptyBagConfirmAction, removeBagProductConfirmAction } from '../shopping_bag/shopping_bag_actions';
import { placeOrderConfirmAction, showErrorAction } from '../order/actions_order';
import { IOrderProduct } from '../order/reducer_order';

export interface UserStateInterface {
    admin: boolean,
    user: IUser | null,
    err_msg: string,
    inform_msg: string,
    last_order: IOrder | null,
    user_id: string,
    isLogedIn: boolean,
    shopping_bag: boolean,
    authorisation: string,
    isLoggedOut: boolean
}

export interface IMsg {
    err_msg: string,
    inform_msg: string

}

export interface LoginDetailsInterface {
    id: number,
    email: string,
    password: string,
}



export interface IUser {
    _id: string,
    id: number,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    city: string,
    street: string,
    admin: boolean,
    open_bag: boolean,
}

// ====================STATE====================
const initialState: UserStateInterface = {
    admin: false,
    isLogedIn: false,
    inform_msg: "",
    last_order: null,
    shopping_bag: false,
    authorisation: '',
    user_id: null,
    err_msg: "",
    user: null,
    isLoggedOut: true
}

// ====================STATE====================


export interface IOrder {
    id: string,
    id_customer: string,
    id_bag: string,
    total_price: number,
    city: string,
    street: string,
    order_date: Date,
    bag_date: Date,
    payment: string,
    deliveryDate: Date,
    order_products: IOrderProduct[]
}



export const userReducer = createReducer(initialState,
    on(startRegistrationAction, (state, { id, email, password }) => {
        const user = {
            _id: '',
            id: id,
            email: email,
            password: password,
            first_name: '',
            last_name: '',
            city: '',
            street: '',
            admin: false,
            open_bag: false
        }
        return ({
            ...state,
            user: user,


        })
    }),
    on(confirmRegistrationAction, (state, { response }) => {
        const user = response.new_user;
        const msg = response.msg
        return ({
            ...state,
            user: user,
            inform_msg: msg,
            err_msg: null
        })
    }),
    on(endRegistration, (state, { response }) => {
        const msg = response.msg;
        const user = response.user

        return ({
            ...state,
            inform_msg: msg,
            user: user,
            isLogedIn: true,
            isLoggedOut: false
        })
    }),

    on(endLogin, (state, { response }) => {
        const admin = response.user.admin
        if (admin) {
            return ({
                ...state,
                admin: response.user.admin,
                isLogedIn: true,
                inform_msg: response.msg,
                last_order: response.last_order,
                isLoggedOut: false
            })
        }
        if (response.shopping_bag || response.last_order) {
            const msg = `welcome back, ${response.user.first_name}`;
            return ({
                ...state,
                admin: response.user.admin,
                user: response.user,
                isLogedIn: true,
                isLoggedOut: false,
                inform_msg: msg,
                last_order: response.last_order,
                shopping_bag: response.shopping_bag,

            })

        }
        if (!response.shopping_bag && !response.last_order) {
            const msg = `welcome to your first shopping, ${response.user.first_name}`
            return ({
                ...state,
                admin: response.user.admin,
                user: response.user,
                isLogedIn: true,
                isLoggedOut: false,
                inform_msg: msg,
                last_order: response.last_order,
                shopping_bag: response.shopping_bag,

            })
        }


    }),
    on(showUserErrorAction, (state, { msg }) => {
        return ({
            ...state,
            err_msg: msg,
        })
    }),
    on(showMsgAction, (state, { msg }) => ({
        ...state,
        inform_msg: msg,
    })),
    on(receivedNewBagAction, (state) => ({
        ...state,
        shopping_bag: true,
    })),

    on(placeOrderConfirmAction, (state, { response }) => {
        return ({
            ...state,
            last_order: response.order,
            shopping_bag: false,
            inform_msg: 'welcome,' + state.user.first_name 
            
        })
    }),

    
    on(logout, () => initialState),

)








