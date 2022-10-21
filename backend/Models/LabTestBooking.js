const mongoose = require('mongoose');

const labbookSchema = new mongoose.Schema({
    packagename: {
        type: String,
    },
    noofpersons: {
        type: String,
    },
    name1: {
        type: String,
    },
    age1: {
        type: String,
    },
    gender1: {
        type: String,
    },
    name2: {
        type: String,
    },
    age2: {
        type: String,
    },
    gender2: {
        type: String,
    },
    name3: {
        type: String,
    },
    age3: {
        type: String,
    },
    gender3: {
        type: String,
    },
    name4: {
        type: String,
    },
    age4: {
        type: String,
    },
    gender4: {
        type: String,
    },
    name5: {
        type: String,
    },
    age5: {
        type: String,
    },
    gender5: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validator: ['Please enter valid email address']
    },
    phone: {
        type: String,
        required: [true, 'Please enter your Phone'],
        unique: true,
        minlength: [10, 'Please enter valid phone address']
    },
    address: {
        type: String,
    },
    appoitmentdate: {
        type: String,
    },
    timing: {
        type: String,
    },
    crp: {
        type: String,
    },
    covidantibody: {
        type: String,
    },
    electrolytes: {
        type: String,
    },
    t3t4: {
        type: String,
    },
    hard_copy: {
        type: String,
    },
},{timestamps:true})

// we will create a new collection
const LabBooking = new mongoose.model('Labbooking',labbookSchema,'labbooking');

module.exports =  LabBooking;