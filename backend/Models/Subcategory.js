const mongoose = require("mongoose")
const subcategorySchema = new mongoose.Schema({
    sub_cat_id: {
        type:String,
    },
    cat_name: {
        type:String,
        // trim: true
    },
    subcat_name: {
        type: String
    },
    url: {
        type: String,
        required:true,
    },
    cat_img: {
        type: String  
    },
    imagealt: {
        type: String
    },
    vedio: {
        type: String
    },
    vedioalt: {
        type: String
    },
    banner: {
        type: String
    },
    metatitle:{
        type:String,
    },
    metakeyword:{
        type:String,
    },
    metadesc:{
        type:String,
    },
    status: {
        type: String
    },
    timestamp: {
        type: Date, default: Date.now
    },
},{timestamps:true})

// we will create a new collection
const Subcategory = new mongoose.model('Subcategory',subcategorySchema,'subcategory');

module.exports =  Subcategory;