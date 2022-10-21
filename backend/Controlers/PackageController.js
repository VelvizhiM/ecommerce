const Package = require('../Models/Package')

const ErrorHandler = require('../Utils/ErrorHandler')
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors')
const APIFeatures = require('../Utils/ApiFeatures')

// Create new product => /api/v1/admin/product
exports.newPackage = CatchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const package = await Package.create(req.body);
    res.status(201).json({
        success: true,
        package
    })
})

// Get single Package details => /api/Package/:id
exports.getPackage = CatchAsyncErrors(async (req, res, next) => {
    const packages = await Package.find();

    if (!packages) {
        return next(new ErrorHandler('Package not found', 404));
    }
    res.status(200).json({
        success: true,
        packages
    })
})

// Get single Package details => /api/Package/:id
exports.getSinglePackage = CatchAsyncErrors(async (req, res, next) => {
    const packages = await Package.find({packageid:req.params.id});

    if (!packages) {
        return next(new ErrorHandler('Package not found', 404));
    }
    res.status(200).json({
        success: true,
        packages
    })
})


// Update Product => /api/admin/product/:id
exports.updatePackage = CatchAsyncErrors(async (req, res, next) => {
    let package = await Package.findById(req.params.id);

    if (!package) {
        return next(new ErrorHandler('Storage not found', 404));
    }
    package = await Package.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        package
    })

})

// Delete Package => /api/v1/admin/Package/:id
exports.deletePackage = CatchAsyncErrors(async (req, res, next) => {

    const package = await Package.findById(req.params.id);

    if (!package) {
        return next(new ErrorHandler('Package not found', 404));
    }
    await Package.remove();
    res.status(200).json({
        success: true,
        message: 'Package is deleted'
    })

})
