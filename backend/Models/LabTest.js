const mongoose = require("mongoose")
const labtestSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    package: {
        type:String,
    },
    packageurl: {
        type:String,
    },
    testname: {
        type:String,
        required:true
    },
    url: {
        type:String,
        required:true
    },
    nooftest: {
        type:String,
    },
    logo: {
        type:String,
    },
    image: {
        type:String,
    },
    price: {
        type:String,
    },
    saleprice: {
        type:String,
    },
    discount: {
        type:String,
    },
    type: {
        type:String,
    },
    required: {
        type:String,
    },
    offervalid: {
        type:String,
    },
    labdescription: {
        type:String,
    },
    description: {
        type:String,
    },
    certificates:{
        type:String,
    },
    testincludes:{
        type:String,
    },
    deliverytiming:{
        type:String,
    },
    procedure: {
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
const LabTest = new mongoose.model('Labtest',labtestSchema,'labtest');

module.exports =  LabTest;