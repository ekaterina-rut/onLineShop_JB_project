import { createAction, props } from '@ngrx/store';
import { IUser, IOrder, LoginDetailsInterface } from './reducer_user';


export const creact_admin_action = createAction('CREAT_ADMIN')
export const creatAdminConfirm = createAction('CREAT_ADMIN_CONFIRM',props<{
    response: any
}>())

export const startRegistrationAction = createAction('START_REGISTRATION', props<{
    id: number,
    email: string,
    password: string
}>())
export const confirmRegistrationAction = createAction('CONFIRM_REGISTRATION_ACTION', props<{
    response
}>())

export const showServerErrorAction = createAction('SHOW_ERROR_MSG')

export const proceedRegistrationAction = createAction('PROCEED_REGISTRATION', props<{
    _id: string,
    first_name: string,
    last_name: string,
    city: string,
    street: string
}>())

export const endRegistration = createAction('END_REGISTRATION', props<{
    response
}>())

export const logout = createAction('LOGOUT')

export const startLoginAction = createAction('SEND_LOGIN', props<{
    email: string,
    password: string
}>())

export const endLogin = createAction('END_LOGIN', props<{
    response: any
}>())

export const register_proceed = createAction('PROCEED_REGISTRATION', props<{
    msg: string,
    user: IUser
}>());

export const login = createAction('login', props<{
    msg: string,
    user: IUser,
    admin: boolean,
    shopping_bag: boolean,
    last_order?: IOrder
}>())


export const showUserErrorAction = createAction('SHOW_ERROR_MSG', props<{ msg: string }>())
export const showMsgAction = createAction('SHOW_MSG', props<{ msg: string }>())