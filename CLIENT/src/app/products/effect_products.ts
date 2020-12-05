import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    receiveProductsAction,
    uploadProductFail,
    receiveProductAction,
    LoadProductsFailAction,
    LoadProductsActoin,
    uploadProductAction,
    getAllProductsAction,
    getProductsConfirmAction,
    updateProductAction,
    updateProductActionConfirm, searchAction
} from './actions_products';
import { mergeMap, catchError, map, exhaustMap } from 'rxjs/operators';
import { ProductsService } from '../products.service';
import { of } from 'rxjs';


@Injectable()

export class ProductsEffect {
    constructor(
        private action$: Actions,
        private productService: ProductsService
    ) { }
    getProducts$ = createEffect(() => this.action$.pipe(
        ofType(getAllProductsAction),
        mergeMap(
            () => this.productService.getProductsService()
                .pipe(
                    map(response => getProductsConfirmAction({ response })),
                    catchError(() => of(uploadProductFail))
                )
        )
    ));

    getProductsByCategory$ = createEffect(() => {
        return this.action$.pipe(
            ofType(LoadProductsActoin),
            mergeMap(action => this.productService.getAllProductsService(action.category)
                .pipe(
                    map((response: any) => receiveProductsAction({ response })),
                    catchError(() => of(LoadProductsFailAction)
                    ))
            )
        )
    });
    addProduct$ = createEffect(() => {
        return this.action$.pipe(
            ofType(uploadProductAction),
            mergeMap(
                action => this.productService.addProduct(action.new_product)
                    .pipe(
                        map((response: any) => {
                            return receiveProductAction({ response })
                        }),
                        catchError(() => of(LoadProductsFailAction)
                        ))
            )
        )
    });


    search$ = createEffect(() => this.action$.pipe(
        ofType(searchAction),
        mergeMap(
            action => this.productService.searchService(action.product_search)
                .pipe(
                    map((response: any) => {
                        return getProductsConfirmAction({ response })
                    }),
                    catchError(() => of(uploadProductFail))
                )
        )
    ));

    saveUpdatedProduct$ = createEffect(() => this.action$.pipe(
        ofType(updateProductAction),
        mergeMap(
            action => this.productService.saveUpdatedProductService(action.updated_product)
                .pipe(
                    map(response => updateProductActionConfirm({ response })),
                    catchError(() => of(uploadProductFail))
                )
        )
    ))

}
