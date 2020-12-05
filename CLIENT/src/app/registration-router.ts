import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IState } from './app.module';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from './user/reducer_user';

@Injectable({
    providedIn: 'root',
})
export class RegistrationRouter implements CanActivate {

    user$: Observable<IUser>;
    constructor(
        private router: Router,
        private store: Store<IState>
    ) {
        this.user$ = this.store.select(state => state.user.user);
    }

    canActivate(): Observable<boolean> {
        return this.user$.pipe(map(user => {
            if (user) {
                return true;
            }
            this.router.navigateByUrl('/registration');
            return false;
        }));
    }
}
