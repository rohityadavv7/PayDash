const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const subscriptionSchema = new Schema({
    userId:{
        type:ObjectId,
        ref:"User",
        required:true
    },
    billing_Reference_Id:{
        type:String,
        required:true
    },
    provider:{
        type:String,
        required:true
    },
    plan:{
        trype:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    currentPeriodEnd:{
        type:Date,
        required:true
    }
})

const Subscription = mongoose.model("Subscription", subscriptionSchema)
module.exports={
    Subscription
}