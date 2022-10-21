const mongoose = require("mongoose")
const addressSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    type: {
        type:String,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    address: {
        type:String,
        required:true
    },
    address1:{
        type:String,
    },
    pincode:{
        type:String,
    },
    landmark:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    country:{
        type:String,
    },
},{timestamps:true})

// we will create a new collection
const Address = new mongoose.model('ShippingAddress',addressSchema,'shippingaddress');

module.exports =  Address;