import * as mongoose from "mongoose";
import {type} from "node:os";

type Customer = {
    //id : number
    name : string
    email :string
    phone : string
    address : string
}

//this way tells mongodb how to set customer json like table in mysql
const customerSchema = new mongoose.Schema<Customer>({
    name : {
        type: String,
        minlength: [2, "Name at least 2 characters"],
        required: [true, "Name is required"],
        trim:true
    },
    email :{
        type:String,
        unique:[true,"User already registered"],
        required:[true,"email is required"],
        index:true,
        trim:true,
        lowercase:true,
        match:[/^\S+@\S+\.\S+$/,"please fill a valid email format"]
    },
    phone : {
        type:String,
        minlength: [10, "Phone number at least 10 characters"],
        required:[true, "Phone no required"],
        trim:true
    },
    address : {
        type:String,
        minlength: [5, "Address number at least 5 characters"],
        required:[true, "Address required"],
        trim:true
    }
})


export const CustomerModel = mongoose.model("Customer", customerSchema);