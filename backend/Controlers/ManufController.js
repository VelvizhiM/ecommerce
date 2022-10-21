const Manufactuer = require('../Models/Manufactuer')

const ErrorHandler = require('../Utils/ErrorHandler')
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors')
const APIFeatures = require('../Utils/ApiFeatures')

// Create new Manufactuer => /api/admin/Manufactuer
exports.newManufactuer = CatchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const manufactuer = await Manufactuer.create(req.body);
    res.status(201).json({
        success: true,
        manufactuer
    })
})

// Get all Manufactuer details => /api/Manufactuer/:id
exports.getManufactuer = CatchAsyncErrors(async (req, res, next) => {
    const manufactuers = await Manufactuer.find();

    if (!manufactuers) {
        return next(new ErrorHandler('Manufactuer not found', 404));
    }
    res.status(200).json({
        success: true,
        manufactuers
    })
})

// Get single Manufactuer details => /api/v1/Manufactuer/:id
exports.getSingleManufactuer = CatchAsyncErrors(async (req, res, next) => {
    const manufactuer = await Manufactuer.find({manufactuerurl:req.params.url});

    if (!manufactuer) {
        return next(new ErrorHandler('Manufactuer not found', 404));
    }
    res.status(200).json({
        success: true,
        manufactuer
    })
})


// Update Manufactuer => /api/admin/Manufactuer/:id
exports.updateManufactuer = CatchAsyncErrors(async (req, res, next) => {
    let manufactuer = await Manufactuer.findById(req.params.id);

    if (!manufactuer) {
        return next(new ErrorHandler('Manufactuer not found', 404));
    }
    manufactuer = await Manufactuer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        manufactuer
    })

})

// Delete Manufactuer => /api/v1/admin/Manufactuer/:id
exports.deleteManufactuer = CatchAsyncErrors(async (req, res, next) => {

    const manufactuer = await Manufactuer.findById(req.params.id);

    if (!manufactuer) {
        return next(new ErrorHandler('Manufactuer not found', 404));
    }
    await manufactuer.remove();
    res.status(200).json({
        success: true,
        message: 'Storage is deleted'
    })

})
