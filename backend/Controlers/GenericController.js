const Generic = require('../Models/Generic')

const ErrorHandler = require('../Utils/ErrorHandler')
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors')
const APIFeatures = require('../Utils/ApiFeatures')

// Create new product => /api/v1/admin/product
exports.newGeneric = CatchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const generic = await Generic.create(req.body);
    res.status(201).json({
        success: true,
        generic
    })
})

// Get single Category details => /api/v1/category/:id
exports.getGeneric = CatchAsyncErrors(async (req, res, next) => {
    const genericCount = await Generic.countDocuments();
    const generic = await Generic.find();

    if (!generic) {
        return next(new ErrorHandler('Category not found', 404));
    }
    res.status(200).json({
        success: true,
        genericCount,
        generic

    })
})

// Get single Generic details => /api/v1/generic/:id
exports.getSingleGeneric = CatchAsyncErrors(async (req, res, next) => {
    const genericCount = await Generic.countDocuments();
    const generic = await Generic.find({subname: req.params.url});

    if (!generic) {
        return next(new ErrorHandler('Generic not found', 404));
    }
    res.status(200).json({
        success: true,
        genericCount,
        generic
    })
})


// Update Generic => /api/admin/Generic/:id
exports.updateGeneric = CatchAsyncErrors(async (req, res, next) => {
    let generic = await Generic.findById(req.params.id);

    if (!generic) {
        return next(new ErrorHandler('Storage not found', 404));
    }
    generic = await Generic.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        generic
    })

})

// Delete Storage => /api/v1/admin/Storage/:id
exports.deleteGeneric = CatchAsyncErrors(async (req, res, next) => {

    const generic = await Generic.findById(req.params.id);

    if (!generic) {
        return next(new ErrorHandler('Generic not found', 404));
    }
    await generic.remove();
    res.status(200).json({
        success: true,
        message: 'Generic is deleted'
    })

})
