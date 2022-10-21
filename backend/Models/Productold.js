const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
    product_id: {
        type:String,
    },
    cat_name: {
        type:String,
        // required:[true,'Please enter Category name'],
        // trim:true,
        // maxLength:[100,'Category name cannot exceed 100 characters']
    },
    subcat_name: {
        type:String,
        // required:[true,'Please enter product name'],
        // trim:true,
        // maxLength:[100,'Product name cannot exceed 100 characters']
    },
    generices: {
        type:String,
        // required:[true,'Please enter Generic name'],
        // trim:true,
        // maxLength:[100,'Generices name cannot exceed 100 characters']
    },
    product_code:{
        type:String,
    },
    product_name:{
        type:String,
        // required:[true,'Please enter product name'],
        // trim:true,
        // maxLength:[100,'Product name cannot exceed 100 characters']
    },
    url:{
        type:String,
    },
    genericname:{
        type:String,
    },
    brand:{
        type:String,
    },
    manufactuer:{
        type:String,
    },
    manufactueraddress:{
        type:String,
    },
    tabscount:{
        type:String,
    },
    strength:{
        type:String,
    },
    package:{
        type:String,
    },
    price:{
        type: Number,
        // required:[true,'Please enter product price'],
        // maxLength:[5, 'Product name cannot exceed 5 characters'],
        default:0.0
    },
    product_img:{
        type:String,
    },
    description:{
        type:String,
        // required:[true, 'Please enter product description'],
    },
    disclaimer:{
        type:String,
    },
    stock:{
        type:String,
    },
    saleprice:{
        type:String,
    },
    percentage:{
        type:String,
    },
    rexrequired:{
        type:String,
    },
    orgin:{
        type:String,
    },
    storage:{
        type:String,
    },
    status:{
        type:String,
    },
    writebyid:{
        type:String,
    },
    reviewbyid:{
        type:String,
    },
    faqs:{
        type:String,
    },
    reference:{
        type:String,
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
    varient:{
        type:String,
    },
    imagealt:{
        type:String,
    },
    vedio:{
        type:String,
    },
    vedioalt:{
        type:String,
    },
    userupdate:{
        type:String,
    },
    updatetimestamp:{
        type:String,
    },
    userid:{
        type:String,
    },
    date:{
        type:String,
    },
    referwebsite:{
        type:String,
    },
    keybenefits:{
        type:String,
    },
    keyingredients:{
        type:String,
    },
    expires:{
        type:String,
    },
    usesofmeds:{
        type:String,
    },
    useofbenefits:{
        type:String,
    },
    indicat:{
        type:String,
    },
    machanism:{
        type:String,
    },
    medicinework:{
        type:String,
    },
    contraindications:{
        type:String,
    },
    sideeffects:{
        type:String,
    },
    faqs:{
        type:String,
    },
    pregnancy:{
        type:String,
    },
    breastfeeding:{
        type:String,
    },
    kidneyproblem:{
        type:String,
    },
    liverdisease:{
        type:String,
    },
    heartdisease:{
        type:String,
    },
    asthma:{
        type:String,
    },
    takemedicine:{
        type:String,
    },
    adult:{
        type:String,
    },
    childrenmed:{
        type:String,
    },
    elderlymed:{
        type:String,
    },
    alcohol:{
        type:String,
    },
    driving:{
        type:String,
    },
    warnings:{
        type:String,
    },
    talkdoctor:{
        type:String,
    },
    instructions:{
        type:String,
    },
    druginteraction:{
        type:String,
    },
    drugfood:{
        type:String,
    },
    drugdiease:{
        type:String,
    },
    fooditems:{
        type:String,
    },
    overdose:{
        type:String,
    },
    misseddose:{
        type:String,
    },
    disposal:{
        type:String,
    },
    fasttag:{
        type:String,
    },
    refer:{
        type:String,
    },
    ingredients:{
        type:String,
    },
    direction:{
        type:String,
    },
    dosages:{
        type:String,
    },
    precaution:{
        type:String,
    },
    prostatus:{
        type:String,
    },
    paymenttype:{
        type:String,
    },
    retunpolicy:{
        type:String,
    },
    gst:{
        type:String,
    },
    hsn:{
        type:String,
    },
    timestamp: {
        type: Date, default: Date.now
    },
},{timestamps:true})

// we will create a new collection
const Product = new mongoose.model('Product',productSchema);

module.exports =  Product;