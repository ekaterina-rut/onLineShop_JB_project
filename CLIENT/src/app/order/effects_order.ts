import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { showServerErrorAction } from '../user/actions_user';
import { showOrderAction, placeOrderConfirmAction, showOrderConfirmAction, placeOrderAction, downloadAction, downloadConfirm, showErrorAction } from './actions_order';



@Injectable()

export class OrderEffect {
    constructor(
        private action$: Actions,
        private orderService: OrderService,
        private router: Router
    ) { }



    showOrder$ = createEffect(() => this.action$.pipe(
        ofType(showOrderAction),
        mergeMap(
            action => this.orderService.showOrderService()
                .pipe(
                    map(
                        (response: any) => {
                            this.router.navigateByUrl('/order');
                            return showOrderConfirmAction({ response })
                        }
                    ),
                    catchError(() => of(showServerErrorAction))
                )
        )
    ))


    placeOrder$ = createEffect(() => this.action$.pipe(
        ofType(placeOrderAction),
        mergeMap(
            action => this.orderService.placeOrderService(action.orderDetails).
                pipe(
                    map(
                        (response: any) => {
                            localStorage.removeItem('bag');
                            if (!response.response) {
                                const msg = response.msg
                                return showErrorAction({ msg })
                            }
                            this.router.navigateByUrl('/order-confirm');
                            return placeOrderConfirmAction({ response })
                        }
                    ),
                    catchError(() => of(showServerErrorAction))
                ))
    ))

    download$ = createEffect(() => this.action$.pipe(
        ofType(downloadAction),
        mergeMap(

            action => this.orderService.dowloadService(action.url).
                pipe(
                    map(
                        (response: any) => {
                            // this.router.navigateByUrl('/order-confirm');
                            // const blob = new Blob([response], { type: 'text/plain' });
                            // let url = window.URL.createObjectURL(blob);
                            // window.open(url);

                            return downloadConfirm({ response })
                            // return downloadConfirm({ response })
                        }
                    ),
                    catchError(() => of(showServerErrorAction))
                )
        )
    ))




}