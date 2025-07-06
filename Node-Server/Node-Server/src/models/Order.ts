/*import mongoose, {Schema} from "mongoose";

export type OrderItem = {
    itemId: mongoose.Types.ObjectId
    itemName: string
    price: number
    quantity: number
    subtotal: number
}


export type Order = {
    customerId: mongoose.Types.ObjectId
    customerName: string
    items: OrderItem[]
    total: number
    date: string
    status: "pending" | "completed" | "cancelled"
}


const orderItemSchema = new Schema<OrderItem>(
    {
        itemId: {type: Schema.Types.ObjectId, ref: "Item", required:true},
        itemName: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        subtotal: {type: Number, required: true}
    }
)

const orderSchema = new Schema<Order>(
    {
        customerId: {type: Schema.Types.ObjectId, ref: "Customer", required:true},
        customerName: {type:String, required:true},
        items: {type:[orderItemSchema], required:true},
        total: {type: Number, required:true},
        date: {type: String, required:true},
        status: {type:String, enum: ["pending","completed","cancelled"], required:true}
    }
)*/


import mongoose, { Schema } from "mongoose";


export type OrderItem = {
    itemId: mongoose.Types.ObjectId;
    itemName: string;
    price: number;
    quantity: number;
    subtotal: number;
}


export type Order = {
    customerId: mongoose.Types.ObjectId;
    customerName: string;
    items: OrderItem[];
    total: number;
    date: Date;
    status: "pending" | "completed" | "cancelled";
}


const orderItemSchema = new Schema<OrderItem>(
    {
        itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
        itemName: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        quantity: { type: Number, required: true, min: 1 },
        subtotal: { type: Number, required: true, min: 0 }
    },
    { _id: false }
);

// Mongoose Schema for Order
const orderSchema = new Schema<Order>(
    {
        customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
        customerName: { type: String, required: true, trim: true },
        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: (v: OrderItem[]) => Array.isArray(v) && v.length > 0,
                message: "An order must contain at least one item."
            }
        },
        total: { type: Number, required: true, min: 0 },
        date: { type: Date, required: true, default: Date.now },
        status: { type: String, enum: ["pending", "completed", "cancelled"], required: true, default: "pending" }
    },
    {

        timestamps: true,
        id: false,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.id;
            }
        }
    }
);


export const OrderModel = mongoose.model("Order", orderSchema);




