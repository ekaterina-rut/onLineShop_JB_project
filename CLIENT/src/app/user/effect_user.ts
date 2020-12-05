import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import {
    showServerErrorAction,
    confirmRegistrationAction,
    startRegistrationAction,
    startLoginAction,
    proceedRegistrationAction,
    endRegistration,
    endLogin, showUserErrorAction, creact_admin_action, creatAdminConfirm
} from './actions_user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';



@Injectable()

export class UserEffect {
    constructor(
        private action$: Actions,
        private userService: UserService,
        private router: Router
    ) { }

    creatAdmin$ = createEffect(() => this.action$.pipe(
        ofType(creact_admin_action),
        mergeMap(
            action => this.userService.creactAdminService()
                .pipe(
                    map(
                        (response: any) => {
                            return creatAdminConfirm({ response })
                        }
                    )
                )
        )
    ))



    startRegistration$ = createEffect(() => this.action$.pipe(
        ofType(startRegistrationAction),
        mergeMap(
            action => this.userService.startRegistrationService(action.id, action.email, action.password)
                .pipe(
                    map(
                        (response: any) => {
                            this.router.navigateByUrl('/registration-proceed');
                            return confirmRegistrationAction({ response })
                        }
                    ),
                    catchError(() => of(showServerErrorAction))
                )
        )
    ))

    proceedRegistration$ = createEffect(() => this.action$.pipe(
        ofType(proceedRegistrationAction),
        mergeMap(
            action => this.userService.proceedRegistrationService(action._id, action.first_name, action.last_name, action.city, action.street)
                .pipe(
                    map(
                        (response: any) => {
                            const token = response.token;
                            const user = {
                                admin: response.user.admin,
                                user: response.user,
                                isLogedIn: true,
                                msg: response.msg,
                                last_order: response.last_order,
                                shopping_bag: response.shopping_bag,
                                authorisation: response.authorisation,
                            }

                            const bag = response.bag
                            localStorage.setItem('token', token);
                            localStorage.setItem("user", JSON.stringify(user as any))
                            const admin = response.user.admin
                            if (admin) {
                                this.router.navigateByUrl('/admin-page');
                            }
                            if (!admin) {
                                this.router.navigateByUrl('/user-page');
                            }
                            return endRegistration({ response })
                        }
                    ),
                    catchError(() => of(showServerErrorAction))
                )
        )
    ))

    login$ = createEffect(() => this.action$.pipe(
        ofType(startLoginAction),
        mergeMap(
            action => this.userService.startLoginService(action.email, action.password)
                .pipe(
                    map(
                        (response: any) => {
                            const token = response.token;
                            if (!response.response) {
                                const msg = response.msg
                                return showUserErrorAction({ msg })
                            }

                            const user = {
                                admin: response.user.admin,
                                user: response.user,
                                isLogedIn: true,
                                msg: response.msg,
                                last_order: response.last_order,
                                shopping_bag: response.shopping_bag,
                                authorisation: response.authorisation,
                            }
                            const admin = response.user.admin
                            const bag = response.bag
                            if (admin) {
                                this.router.navigateByUrl('/admin-page');
                                localStorage.setItem('token', token);
                                localStorage.setItem("user", JSON.stringify(user as any))

                                return endLogin({ response })

                            }

                            if (!user.shopping_bag && !user.last_order && !admin) {
                                localStorage.setItem('token', token);
                                localStorage.setItem("user", JSON.stringify(user as any));
                                this.router.navigateByUrl('/user-page');
                                return endLogin({ response })
                            }
                            if (!bag) {
                                localStorage.setItem('token', token);
                                localStorage.setItem("user", JSON.stringify(user as any));
                                this.router.navigateByUrl('/last-order');
                                return endLogin({ response })
                            }
                            localStorage.setItem('token', token);
                            localStorage.setItem("user", JSON.stringify(user as any))
                            localStorage.setItem("bag", JSON.stringify(bag as any))


                            if (!admin) {
                                this.router.navigateByUrl('/user-page');
                            }
                            return endLogin({ response })
                        }
                    )
                )
        )
    ))
}