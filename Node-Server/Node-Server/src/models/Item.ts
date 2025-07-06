import * as mongoose from "mongoose";


type Item = {
    //id : number
    name : string
    price : number
}

const itemSchema = new mongoose.Schema<Item>({
    name: {
        type: String,
        required: [true, "Item name is required"],
        minlength: [2, "Item name should be at least 2 characters"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Item price is required"],
        min: [0, "Item price cannot be negative"]
    }
})

export const ItemModel = mongoose.model("Item", itemSchema)