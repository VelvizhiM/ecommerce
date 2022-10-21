const Storage = require('../Models/Storage')

const ErrorHandler = require('../Utils/ErrorHandler')
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors')
const APIFeatures = require('../Utils/ApiFeatures')

// Create new product => /api/v1/admin/product
exports.newStorage = CatchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const storage = await Storage.create(req.body);
    res.status(201).json({
        success: true,
        storage
    })
})

// Get single product details => /api/v1/product/:id
exports.getStorage = CatchAsyncErrors(async (req, res, next) => {
    const storages = await Storage.find();

    if (!storages) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        storages
    })
})

// Get single product details => /api/v1/product/:id
exports.getSingleStorage = CatchAsyncErrors(async (req, res, next) => {
    const storage = await Storage.find({storageid:req.params.id});

    if (!storage) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        storage
    })
})


// Update Product => /api/admin/product/:id
exports.updateStorage = CatchAsyncErrors(async (req, res, next) => {
    let storage = await Storage.findById(req.params.id);

    if (!storage) {
        return next(new ErrorHandler('Storage not found', 404));
    }
    storage = await Storage.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        storage
    })

})

// Delete Storage => /api/v1/admin/Storage/:id
exports.deleteStorage = CatchAsyncErrors(async (req, res, next) => {

    const storage = await Storage.findById(req.params.id);

    if (!storage) {
        return next(new ErrorHandler('Storage not found', 404));
    }
    await storage.remove();
    res.status(200).json({
        success: true,
        message: 'Storage is deleted'
    })

})
