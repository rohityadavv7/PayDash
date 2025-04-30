const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjcectId = mongoose.ObjectId

const clientSchema = new Schema({
    userId:{
        type:ObjcectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    company_Name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone_Number:{
        type:Number
    }
},{timestamps:true})

const Client = mongoose.model("Client",clientSchema)
module.exports = {
    Client:Client
}