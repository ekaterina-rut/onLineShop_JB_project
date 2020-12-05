import { createReducer, on } from '@ngrx/store';
import {
    LoadProductsActoin,
    receiveProductsAction,
    uploadProductAction,
    receiveProductAction,
    getProductsConfirmAction,
    editProductAction,
    clearProductToEditAction,
    updateProductAction,
    updateProductActionConfirm, searchAction, clearSearchAction, showErrorProductAction
} from './actions_products';
import { endLogin, logout, showUserErrorAction } from '../user/actions_user';

export interface IProductsState {
    products: IProduct[] | null,
    isLoading: boolean,
    category: string,
    inform_msg: string,
    categories: string[],
    sum: number,
    product_to_edit: IProduct | null,
    isOpen: boolean,
    total_orders: number,
    clear_search: boolean,
    start_search: boolean,
    err_msg: string
}

export interface IProduct {
    _id: string;
    name: string;
    category: string;
    price: number;
    img: string
}

// =====================STATE=========================
export const initialState: IProductsState = {
    products: null,
    isLoading: false,
    category: '',
    inform_msg: "",
    categories: ['apparel', 'bath', 'bedtime', 'toys'],
    sum: 0,
    product_to_edit: null,
    isOpen: false,
    total_orders: 0,
    clear_search: true,
    start_search: false,
    err_msg: ''
}

// =====================STATE=========================


export const productsReducer = createReducer(initialState,
    on(getProductsConfirmAction, (state, { response }) => {
        return ({
            ...state,
            isLoading: false,
            products: response.products,
            total_orders: response.total_orders
        })
    }),


    on(LoadProductsActoin, (state, { category }) => {
        return ({
            ...state,
            isLoading: true,
            category: category
        })
    }),

    on(receiveProductsAction, (state, { response }) => {
        return ({
            ...state,
            isLoading: false,
            inform_msg: response.msg,
            products: response.products,
        })
    }),
    on(editProductAction, (state, { product }) => {
        const isOpen = state.isOpen
        if (isOpen) {
            return ({
                ...state,
                product_to_edit: product,
                isOpen: false
            })
        }
        if (!isOpen) {
            return ({
                ...state,
                product_to_edit: product,
                isOpen: true
            })
        }
    }),

    on(updateProductActionConfirm, (state, { response }) => {
        const product_id = response.product._id
        const updated_products = state.products.slice();
        const index = updated_products.findIndex(product => product._id === product_id)
        updated_products[index] = response.product
        return ({
            ...state,
            products: updated_products,
            inform_msg: response.msg,
            product_to_edit: null,
            isOpen: false

        })
    }),

    on(showErrorProductAction, (state, { msg }) => {
        return ({
            ...state,
            err_msg: msg

        })
    }),


    on(clearProductToEditAction, (state) => {
        return ({
            ...state,
            product_to_edit: null,
            isOpen: false


        })
    }),

    on(showUserErrorAction, (state, { msg }) => {
        return ({
            ...state,
            err_msg: msg
        })
    }),

    on(searchAction, (state) => {
        return ({
            ...state,
            clear_search: false,
            start_search: true
        })
    }),
    on(clearSearchAction, (state) => {
        return ({
            ...state,
            clear_search: true,
            start_search: false
        })
    }),
    on(logout, (state) => {
        return ({
            ...state,
         err_msg:'',
         inform_msg: 'you logged out'
        })
    }),















    on(uploadProductAction, (state, { new_product }) => ({
        ...state,
        isLoading: true,
    })),

    on(receiveProductAction, (state, { response }) => {
        const product_category_from_state = state.products[0].category;

        const product_categoty = response.product.category

        if (product_category_from_state === product_categoty) {
            return ({
                ...state,
                isLoading: false,
                products: state.products.concat(response.product)
            })
        }
        return ({
            ...state,
            isLoading: false,
        })


    }),

    // on(receiveProductAction, (state, { product }) =>
    //     ({
    //         ...state,
    //         isLoading: false,
    //         products: state.products.concat(product)
    //     })),



    on(endLogin, (state, { response }) => {
        if (!response.bag) {
            return ({
                ...state,
                inform_msg: response.msg,
            })
        }
        if (response.bag) {
            return ({
                ...state,
                inform_msg: response.msg,
            })
        }
    }),





)



