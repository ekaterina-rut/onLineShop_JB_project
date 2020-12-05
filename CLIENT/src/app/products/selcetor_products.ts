
import { createSelector } from '@ngrx/store';
import { IState } from '../app.module';


export const selectProductsFromState = createSelector(
    (state: IState) => state.products,
    products => products.products
)

export const selectMsgFromState = createSelector(
    (state: IState) => state.user,
    user => user.inform_msg,
    
)

