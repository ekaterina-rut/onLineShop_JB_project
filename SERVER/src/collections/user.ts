import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
    // _id: string,
    id: number,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    city: string,
    street: string,
    admin: boolean,
    open_bag: boolean
}







// SCHEMA=======================================



const User_schema = new Schema<IUser>({
    // _id: {type: String},
    id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    open_bag: { type: Boolean, required: true },
    admin: Boolean,
})

User_schema.path('id').validate(async (id: string) => {
    const isIdExist = await User.findOne({ id }).exec();
    return !isIdExist
}, 'the id is allready exist')




User_schema.path('email').validate((email: string) => {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);

}, 'email is not valid')



export const User = model<IUser>('User', User_schema);


