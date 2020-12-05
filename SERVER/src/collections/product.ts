import { model, Schema, Document } from "mongoose";

 interface IProduct extends Document {
    name: string;
    category: string;
    price: number;
    img: string
}

 export const ProductSchema = new Schema<IProduct>({
    name: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required:true},
    img: {type: String, required: true}

})



export const Product = model<IProduct>('Product', ProductSchema)






