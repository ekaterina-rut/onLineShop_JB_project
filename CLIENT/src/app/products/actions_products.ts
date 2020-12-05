import { createAction, props } from '@ngrx/store';
import { IProduct } from './reducer_products';

interface receivedProductsResponce {
    products: IProduct[],
    msg: string,

}
export const getAllProductsAction = createAction('GET_ALL_PRODUCTS')
export const getProductsConfirmAction = createAction('GET_ALL_PRODUCTS_CONFIRM', props<{
    response: any
}>())

export const LoadProductsActoin = createAction('LOADING', props<{ category: string }>());
export const receiveProductsAction = createAction('GET_PRODUCTS_SUCCESS', props<{
    response: receivedProductsResponce
}>());
export const LoadProductsFailAction = createAction('GET_PRODUCTS_FAIL');


export const uploadProductAction = createAction('ADD_PRODUCT', props<{ new_product: Omit<IProduct, 'id'> }>())
export const receiveProductAction = createAction('ADDED_PRODUCT', props<{ response: any }>())
export const uploadProductFail = createAction('ADD_PRODUCT_FAIL');


export const updateProductAction = createAction('UPDATE_PRODUCT', props<{
    updated_product: IProduct
}>())
export const updateProductActionConfirm = createAction('EDIT_PRODUCT_CONFIRM', props<{
    response: any
}>())

export const showErrorProductAction = createAction('SHOW_ERROR_PRODUCT', props<{msg: string}>())

export const editProductAction = createAction('EDIT_PRODUCT', props<{
    product: IProduct
}>())

export const clearProductToEditAction = createAction('CLEAR_RPDUCT_TO_EDIT')

export const searchAction = createAction('SEARCH', props<{
    product_search: string
}>())
export const clearSearchAction = createAction('CLEAR_SEARCH')




