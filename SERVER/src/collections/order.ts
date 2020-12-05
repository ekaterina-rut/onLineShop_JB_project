import { model, Schema, Document } from "mongoose";
import { ISelected_Product, SelectedProductSchema } from "./bag";

export interface IOrder extends Document {
    id_customer: string,
    id_bag: string,
    total_price: number,
    city: string,
    street: string,
    order_date: Date,
    bag_date: Date,
    payment: string,
    deliveryDate: Date,
    order_products:ISelected_Product[] 
}

export const OrderSchema = new Schema<IOrder>({
    id_customer: { type: String, required: true },
    id_bag: { type: String, required: true },
    total_price: { type: Number, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    order_date: { type: Date, required: true },
    bag_date: { type: Date, required: true },
    payment: { type: String, required: true },
    deliveryDate: { type: Date, required: true },
    order_products: [SelectedProductSchema]
})

export const Order = model<IOrder>('Order', OrderSchema)