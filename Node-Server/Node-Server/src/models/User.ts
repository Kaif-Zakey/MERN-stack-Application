import mongoose from "mongoose";

type User = {
    name : string
    email : string
    password : string
}

const userSchema = new mongoose.Schema<User>({
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
    password : {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    }
})

export const UserModel = mongoose.model("User", userSchema)