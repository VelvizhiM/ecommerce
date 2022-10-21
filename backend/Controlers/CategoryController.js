const Category = require('../Models/Category')

const ErrorHandler = require('../Utils/ErrorHandler')
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors')
const APIFeatures = require('../Utils/ApiFeatures')
const AWS = require('aws-sdk')
const fs = require('fs')

const s3 = new AWS.S3({
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.SECRET_KEY,
});
const params = {
    Bucket: process.env.AWS_BUCKET_NAME
}


s3.createBucket(params, (err, data) => {
    if(err){
        console.log(err)
    }
    else {
        console.log("Bucket Created Successfully", data.Location);
    }
})



// Create new product => /api/v1/admin/product
exports.newCategory = CatchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const category = await Category.create(req.body);
    res.status(201).json({
        success: true,
        category
    })
})

exports.addCategory = CatchAsyncErrors(async (req, res, next) => {

    // req.body.user = req.user.id;
    const addcategory = await Category.create(req.body);
    res.status(201).json({
        success: true,
        addcategory,
    })
})

// Get single Category details => /api/v1/category/:id
exports.getCategory = CatchAsyncErrors(async (req, res, next) => {
    const categoryCount = await Category.countDocuments();
    const category = await Category.find({$nor: [{cat_type: "non-prescriptions"}]});

    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }
    res.status(200).json({
        success: true,
        categoryCount,
        category

    })
})

// Get single Category details => /api/v1/category/:id
exports.getSingleCategory = CatchAsyncErrors(async (req, res, next) => {
    const category = await Category.find(req.params.id);

    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }
    res.status(200).json({
        success: true,
        category
    })
})


// Update Category => /api/admin/category/:id
exports.updateCategory = CatchAsyncErrors(async (req, res, next) => {
    let category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler('Storage not found', 404));
    }
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        category
    })

})

// Delete Storage => /api/v1/admin/Storage/:id
exports.deleteCategory = CatchAsyncErrors(async (req, res, next) => {

    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler('Category not found', 404));
    }
    await category.remove();
    res.status(200).json({
        success: true,
        message: 'Category is deleted'
    })

})
