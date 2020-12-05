import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AddProductComponent } from './add-product/add-product.component'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IProductsState, productsReducer } from './products/reducer_products';
import { ProductsEffect } from './products/effect_products';
import { ProductsListComponent } from './products-list/products-list.component';
import { userReducer, UserStateInterface } from './user/reducer_user';
import { RegistrationComponent } from './registration/registration.component';
import { MsgComponent } from './msg/msg.component';
import { ErrorMsgComponent } from './error-msg/error-msg.component';
import {LoginComponent} from './login/login.component';
import { ProductComponent } from './product/product.component';
import { CategoryBarComponent } from './category-bar/category-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule  } from './material/material.module';
import { QtyPopapComponent } from './qty-popap/qty-popap.component';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';
import { BagProductComponent } from './bag-product/bag-product.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserEffect } from './user/effect_user';
import { UserPageComponent } from './user-page/user-page.component';
import { RegistrationProceedComponent } from './registration-proceed/registration-proceed.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import {Sidebar, SidebarModule} from 'ng-sidebar';
import { IBag, bagReducer } from './shopping_bag/reducer_shopping_bag';
import { BagEffect } from './shopping_bag/shopping_bag_effect';
import { OrderComponent } from './order/order.component';
import { orderReducer, OrderStateInterface } from './order/reducer_order';
import { OrderEffect } from './order/effects_order';
import { OrderProductComponent } from './order-product/order-product.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { InfoComponent } from './info/info.component';
import { AboutComponent } from './about/about.component';
import { ProductToEditComponent } from './product-to-edit/product-to-edit.component';
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserOrderComponent } from './user-order/user-order.component'
import { PrivateRoute } from './private-router';
import { SearchComponent } from './search/search.component';
import { LastOrderComponent } from './last-order/last-order.component';
import {LoginPageComponent} from './login-page/login-page.component';
import { RegistrationRouter } from './registration-router';

export interface IState {
  user: UserStateInterface,
  products: IProductsState,
  bag: IBag,
  order: OrderStateInterface
}

const appRoutes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'home', component: WelcomePageComponent },
  { path: 'registration', component: RegistrationComponent },  
  { path: 'registration-proceed', component: RegistrationProceedComponent, canActivate: [RegistrationRouter] },
  { path: 'login', component: LoginPageComponent },
  {path: 'user-page', component: UserPageComponent, canActivate: [PrivateRoute]},
  {path: 'order', component: OrderComponent, canActivate: [PrivateRoute]},
  {path: 'order-confirm', component: OrderConfirmComponent, canActivate: [PrivateRoute]},
  {path: 'admin-page', component: AdminPageComponent, canActivate: [PrivateRoute]},
  {path: 'last-order', component: UserOrderComponent, canActivate: [PrivateRoute]},
  {
    path: '**', redirectTo: 'login'

  }
  
]
@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    AddProductComponent,
    RegistrationComponent,
    MsgComponent,
    ErrorMsgComponent,
    LoginPageComponent,
    LoginComponent,
    ProductComponent,
    CategoryBarComponent,
    QtyPopapComponent,
    ShoppingBagComponent,
    BagProductComponent,
    AdminPageComponent,
    UserPageComponent,
    RegistrationProceedComponent,
    NavigationBarComponent,
    OrderComponent,
    OrderProductComponent,
    OrderConfirmComponent,
    InfoComponent,
    AboutComponent,
    ProductToEditComponent,
    WelcomePageComponent,
    UserOrderComponent,
    SearchComponent,
    LastOrderComponent,
  ],
  entryComponents: [QtyPopapComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ user: userReducer, products: productsReducer, bag: bagReducer , order: orderReducer}),
    StoreDevtoolsModule.instrument({}),
    EffectsModule.forRoot([ProductsEffect,UserEffect, BagEffect, OrderEffect ]),
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MaterialModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule ,
    MatCardModule,
    SidebarModule.forRoot()

    // HttpClientInMemoryWebApiModule.forRoot(
    //   FakeServerService, { dataEncapsulation: false}
    // )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
