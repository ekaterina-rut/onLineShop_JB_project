import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import {
    startShopingAction,
    receivedNewBagAction,
    addProductToBagAction,
    productInBagConfirmAction,
    removeBagProductAction,
    removeBagProductConfirmAction,
    emptyBagAction,
    emptyBagConfirmAction
} from '../shopping_bag/shopping_bag_actions';
import { ShoppingBagService } from '../shopping-bag.service';
import { LoadProductsFailAction, uploadProductFail } from '../products/actions_products';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';



@Injectable()

export class BagEffect {
    constructor(
        private action$: Actions,
        private bagService: ShoppingBagService,
        private state: Store<IState>

    ) { }




    addProductToBag$ = createEffect(() => this.action$.pipe(
        ofType(addProductToBagAction),
        mergeMap(
            action => this.bagService.addProductToBagService(action.qty, action.product_id, action.user_id)
                .pipe(
                    map(
                        (response: any) => {
                            const product = response.product
                            return productInBagConfirmAction({ response })
                        }),
                    catchError(() => of(uploadProductFail))
                )
        )
    ))

    removeBagProduct$ = createEffect(() => this.action$.pipe(
        ofType(removeBagProductAction),
        mergeMap(
            action => this.bagService.removeBagProductService(action.product_id)
                .pipe(
                    map((response: any) => {
                        const updated_bag = response.updated_bag;
                        localStorage.setItem("bag", JSON.stringify(updated_bag as any));
                        return removeBagProductConfirmAction({ response })
                    }),
                    catchError(() => of(uploadProductFail))

                )
        )
    ))

    startShoping$ = createEffect(() => this.action$.pipe(
        ofType(startShopingAction),
        mergeMap(
            () => this.bagService.getNewBagService()
                .pipe(
                    map((response: any) => {
                        const shopping_bag = response.bag
                        localStorage.setItem("bag", JSON.stringify(shopping_bag as any))
                        return receivedNewBagAction({ response })
                    }),
                    catchError(() => of(LoadProductsFailAction))
                )
        )
    ))

    emptyBag$ = createEffect(() => this.action$.pipe(
        ofType(emptyBagAction),
        mergeMap(
            () => this.bagService.emptyBagSrvice()
                .pipe(
                    map((response: any) => {
                        const update_bag = response.updated_bag

                        localStorage.setItem("bag", JSON.stringify(update_bag as any))

                        return emptyBagConfirmAction({ response })
                    }),
                    catchError(() => of(uploadProductFail))
                )
        )
    ))

}

export function updateLS(product) {
    const bag = JSON.parse(localStorage.getItem('bag'));
    const products = bag.products;
    products.push(product);
    const updated_total = bag.total_price + product.total_price
    const update_bag = {
        ...bag,
        products: products,
        total_price: updated_total

    }


    localStorage.setItem("bag", JSON.stringify(update_bag as any))

}

