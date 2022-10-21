const mongoose = require("mongoose")
const storageSchema = new mongoose.Schema({
    storageid: {
        type:String,
        required:true
    },
    storagename: {
        type:String,
        required:true
    },
    storageurl: {
        type:String,
        required:true
    },
    status: {
        type:String
    },
    adduser: {
        type:String,
    },
    updateuser: {
        type:String,
    },
},{timestamps:true})

// we will create a new collection
const Storage = new mongoose.model('Storage',storageSchema,'storage');

module.exports =  Storage;