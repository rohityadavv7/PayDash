const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const invoiceSchema = new Schema({
    userId:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    clientId:{
        type:ObjectId,
        ref:"Client",
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    due_Date:{
        type:Date,
        required:true
    },
    items:[{
        description:String,
        quanity:Number,
        rate:Number,
        amount:Number
    }],
    tax:{
        type:Number,
        required:true
    },
    discount:{
        type:Number
    },
    total:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    notes:{
        type:String,
    },
    status:{
        type:String,
        enum:["draft","sent","paid","overdue"],
        default:""
    },
    pdfUrl:{
        type:String
    }
},{timestamps:true})

const Invoice = mongoose.model("Invoice", invoiceSchema)
module.exports = {
    Invoice
}