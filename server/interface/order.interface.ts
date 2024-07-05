import { Document } from "mongoose";

export interface IOrder extends Document{
    poemId: string;
    userId: string;
    payment_info: object;
}