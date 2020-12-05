import { model, Schema, Document } from "mongoose";
import {ProductSchema} from './product';
import {OrderSchema} from './order'

interface IData extends Document {
    inventory: {};
    customers: {};
    orders: []
}

const DataSchema = new Schema<IData>({
    inventory: {ProductSchema},
    orders : {OrderSchema}

})

export const Data = model<IData>('Data', DataSchema)
