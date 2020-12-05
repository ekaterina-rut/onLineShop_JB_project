import { createAction, props } from '@ngrx/store';
import { IProduct } from '../products/reducer_products';
// import { IProduct, IAddedProduct, IBagProduct } from './reducer_products';

interface receivedProductsResponce {
    products: IProduct[],
    msg: string
}



export const startShopingAction = createAction('START_NEW_BAG')
export const receivedNewBagAction = createAction('RECEIVED_BAG', props<{
    response: any
}>())



export const addProductToBagAction = createAction('GET_TOTAL_PRICE', props<{
    qty: number,
    product_id: string,
    user_id: string
}>())

export const productInBagConfirmAction = createAction('PRODUCT_IN_BAG_CONFIRM', props<{
    response: any
}>())

export const removeBagProductAction = createAction('REMOVE_BAG_PRODUCT', props<{
    product_id: string
}>())
export const removeBagProductConfirmAction = createAction('REMOVE_BAG_PRODUCT_CONFIRM', props<{
    response: any
}>())

export const emptyBagAction = createAction('EMPTY_BAG');
export const emptyBagConfirmAction = createAction('EMPTY_BAG_CONFRM', props<{
    response: any
}>())

export const endLoginBagAction = createAction('GET_BAG', props<{
    response: any
}>())





