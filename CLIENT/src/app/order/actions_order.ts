import { createAction, props } from '@ngrx/store';

export const showOrderAction = createAction('SHOW_ORDER')

export const showOrderConfirmAction = createAction('SHOW_ORDER_CONFIRM', props<{
    response: any
}>())

export const placeOrderConfirmAction = createAction('PLACE_ORDER_CONFIRM', props<{
    response: any
}>())

export const placeOrderAction = createAction('PLACE_ORDER', props<{
    orderDetails: {
        city: string,
        street: string,
        delivery_date: Date,
        credit_card: number
    }
}>())

export const downloadAction = createAction('DOWNLOAD', props<{
    url: string
}>());
export const downloadConfirm = createAction('DOWNLOAD_CONFIRM', props<{
    response: any
}>());


export const showErrorAction = createAction('SHOW_ERROR', props<{
    msg: string
}>())