const LabPackage = require('../Models/LabPackage')

const ErrorHandler = require('../Utils/ErrorHandler')
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors')
const APIFeatures = require('../Utils/ApiFeatures')

// Create new labpackage => /api/admin/labpackage
exports.newLabPackage = CatchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const labpackage = await LabPackage.create(req.body);
    res.status(201).json({
        success: true,
        labpackage
    })
})

// Get single LabPackage details => /api/labpackage/:id
exports.getLabPackage = CatchAsyncErrors(async (req, res, next) => {
    const labpackageCount = await LabPackage.countDocuments();
    const labpackage = await LabPackage.find();

    if (!labpackage) {
        return next(new ErrorHandler('Lab Package not found', 404));
    }
    res.status(200).json({
        success: true,
        labpackageCount,
        labpackage

    })
})

// Get single Lab Package details => /api/labpackage/:id
exports.getSingleLabPackage = CatchAsyncErrors(async (req, res, next) => {
    const labpackage = await LabPackage.find(req.params.id);

    if (!labpackage) {
        return next(new ErrorHandler('Lab Package not found', 404));
    }
    res.status(200).json({
        success: true,
        labpackage
    })
})


// Update Lab Package => /api/admin/labpackage/:id
exports.updateLabPackage = CatchAsyncErrors(async (req, res, next) => {
    let labpackage = await LabPackage.findById(req.params.id);

    if (!labpackage) {
        return next(new ErrorHandler('Storage not found', 404));
    }
    labpackage = await LabPackage.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        labpackage
    })

})

// Delete Lab Package => /api/admin/labpackage/:id
exports.deleteLabPackage = CatchAsyncErrors(async (req, res, next) => {

    const labpackage = await LabPackage.findById(req.params.id);

    if (!labpackage) {
        return next(new ErrorHandler('Lab Package not found', 404));
    }
    await labpackage.remove();
    res.status(200).json({
        success: true,
        message: 'Lab Package is deleted'
    })

})
