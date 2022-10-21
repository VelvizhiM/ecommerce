const mongoose = require("mongoose")
const labpackageSchema = new mongoose.Schema({
    package: {
        type:String,
        required:true
    },
    url: {
        type:String,
        required:true
    },
    image: {
        type:String,
    },
    alt: {
        type:String,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    status:{
        type:String,
    },
    timestamp: {
        type: Date, default: Date.now
    },
},{timestamps:true})

// we will create a new collection
const LabPackage = new mongoose.model('Labpackage',labpackageSchema,'labpackage');

module.exports =  LabPackage;