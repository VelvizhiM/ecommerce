const Subcategory = require('../Models/Subcategory')

const ErrorHandler = require('../Utils/ErrorHandler')
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors')
const APIFeatures = require('../Utils/ApiFeatures')

// Create new Subcategory => /api/v1/admin/product
exports.newSubcategory = CatchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const subcategory = await Subcategory.create(req.body);
    res.status(201).json({
        success: true,
        subcategory
    })
})

// Get single Subcategory details => /api/v1/category/:id
exports.getSubcategory = CatchAsyncErrors(async (req, res, next) => {
    const subcategoryCount = await Subcategory.countDocuments();
    const subcategory = await Subcategory.find();

    if (!subcategory) {
        return next(new ErrorHandler('Subcategory not found', 404));
    }
    res.status(200).json({
        success: true,
        subcategoryCount,
        subcategory

    })
})

// Get single Category details => /api/v1/category/:id
exports.getSingleSubcategory = CatchAsyncErrors(async (req, res, next) => {
    const subcategoryCount = await Subcategory.countDocuments();
    const subcategory = await Subcategory.find({cat_name: req.params.url});

    if (!subcategory) {
        return next(new ErrorHandler('Subcategory not found', 404));
    }
    res.status(200).json({
        success: true,
        subcategoryCount,
        subcategory
    })
})


// Update Subcategory => /api/admin/Subcategory/:id
exports.updateSubcategory = CatchAsyncErrors(async (req, res, next) => {
    let subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        return next(new ErrorHandler('Subcategory not found', 404));
    }
    subcategory = await Subcategory.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        subcategory
    })

})

// Delete Storage => /api/v1/admin/Storage/:id
exports.deleteSubcategory = CatchAsyncErrors(async (req, res, next) => {

    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        return next(new ErrorHandler('Subcategory not found', 404));
    }
    await subcategory.remove();
    res.status(200).json({
        success: true,
        message: 'Subcategory is deleted'
    })

})
