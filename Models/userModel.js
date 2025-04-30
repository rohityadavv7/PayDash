const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    role_Type:{
        type:String,
        enum:["admin","user"],
        default:"user",
        required:true
    },
    subscription:{
        type:ObjectId,
        ref:"Subscription",
        default:null
    },
},{timestamps:true})

const User = mongoose.model("User", userSchema); 
module.exports ={
    User:User
}