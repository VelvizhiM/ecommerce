const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    // cat_id: {
    //     type:String,
    //     required:true
    // },
    cat_type: {
        type:String,
        required:true
    },
    category_name: {
        type:String,
        required:true
    },
    url: {
        type:String,
        required:true
    },
    cat_img:{
        type:String,
    },
    // stockcheck:{
    //     type:String,
    // },
    imagealt:{
        type:String,
    },
    // vedio:{
    //     type:String,
    // },
    // vedioalt:{
    //     type:String,
    // },
    metatitle:{
        type:String,
    },
    metakeyword:{
        type:String,
    },
    metadesc:{
        type:String,
    },
    status:{
        type:String,
        default:"Active"
    },
    timestamp: {
        type: Date, default: Date.now
    },
},{timestamps:true})

// we will create a new collection
const Category = new mongoose.model('Category',categorySchema,'category');

module.exports =  Category;