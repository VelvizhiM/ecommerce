const mongoose = require("mongoose")
const formSchema = new mongoose.Schema({
    formname: {
        type:String,
        required:true
    },
    formurl: {
        type:String,
        required:true
    },
    picture: {
        type:String,
    },
    alt: {
        type:String,
        required:true
    },
    metatitle:{
        type:String,
        required:true
    },
    metakeyword:{
        type:String,
        required:true
    },
    metadesc:{
        type:String,
        required:true
    },
    status:{
        type:String,
    },
    adddate: {
        type: Date, default: Date.now
    },
    timestamp: {
        type: Date, default: Date.now
    },
    updatedate: {
        type: Date, default: Date.now
    },
    uptimestamp: {
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
const Form = new mongoose.model('Form',formSchema,'Form');

module.exports =  Form;