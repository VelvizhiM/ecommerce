const mongoose = require("mongoose")
const formSchema = new mongoose.Schema({
    packageid: {
        type:String,
        required:true
    },
    packagename: {
        type:String,
        required:true
    },
    packageurl: {
        type:String,
        required:true
    },
    status: {
        type:String
    },
    adddate: {
        type: Date, default: Date.now
    },
    timestamp:{
        type: Date, default: Date.now
    },
    updatedate:{
        type: Date,
    },
    uptimestamp:{
        type: Date, default: Date.now
    },
    adduser: {
        type:String,
    },
    updateuser: {
        type:String,
    },
    updated_at: {
        type: Date, default: Date.now
    },
},{timestamps:true})

// we will create a new collection
const Form = new mongoose.model('Package',formSchema,'package');

module.exports =  Form;