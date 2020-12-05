import { Component, OnInit } from '@angular/core';
import { IState } from '../app/app.module'
import { Store } from '@ngrx/store';
import {   endLogin } from './user/actions_user';
import { endLoginBagAction } from './shopping_bag/shopping_bag_actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(
        private state: Store<IState>,

    ) {
        const userLS = localStorage.getItem('user');
        if (userLS) {
            const userLS_object = JSON.parse(userLS);
            const user = userLS_object.user
            const bag = JSON.parse(localStorage.getItem('bag'))
            if (!bag) {
                const response = JSON.parse(userLS);
                this.state.dispatch(endLogin({ response }));
            }

            if (bag) {
                let msg;
                if (!bag.total_price) {
                    msg = 'your shopping bag still emty'
                }
                if (bag.total_price) {
                    msg = `there is an open bag total ${bag.total_price}`
                }

                const response = {
                    user: user,
                    bag: bag,
                    msg: msg,
                    shopping_bag: true
                }

                this.state.dispatch(endLogin({ response }))

                this.state.dispatch(endLoginBagAction({ response }));
            }
        }
    }


}

