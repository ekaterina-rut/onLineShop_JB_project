import { model, Schema, Document, Types } from "mongoose";

export interface Ibag extends Document {
    id_customer: string,
    date: Date,
    products: ISelected_Product[];
    total_price: number,
    remove_product_from_bag(product_id: string): Promise<void>
}

export interface ISelected_Product extends Document {
    id_product: string,
    product_name: string,
    product_price:number,
    qty: number,
    total_price: number,
    img: string

}

export const SelectedProductSchema = new Schema<ISelected_Product>({
    id_product: String,
    product_name: String,
    product_price: Number,
    qty: Number,
    total_price: Number,
    img: String
})

export const BagSchema = new Schema<Ibag>({
    id_customer: String,
    date: Date,
    products: [SelectedProductSchema],
    total_price: Number

})

BagSchema.methods.remove_product_from_bag = async function (product_id: string): Promise<void> {
    const index = this.products.findIndex(t => Types.ObjectId(product_id).equals(t._id));
    const total_price = this.products[index].total_price;
    const undated_total_bag_price = this.total_price - total_price;
    this.total_price = undated_total_bag_price;

    if (index === -1) {
        throw new Error("product doesn't exist");
    }
    this.products.splice(index, 1);
    await this.save({ validateModifiedOnly: true });
}


export const SelectedProduct = model<ISelected_Product>('SelectedProduct', SelectedProductSchema)

export const Bag = model<Ibag>('Bag', BagSchema)







