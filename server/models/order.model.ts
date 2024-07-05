import mongoose, {Model, Schema } from "mongoose";
import { IOrder } from "../interface/order.interface";

 
const orderSchema = new Schema<IOrder>({
    poemId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    payment_info: {
        type: Object,
        // required: true,
    }
}, {
    timestamps: true
});


const OrderModel: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);

export default OrderModel;