const LabTest = require('../Models/LabTest')

const ErrorHandler = require('../Utils/ErrorHandler')
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors')
const APIFeatures = require('../Utils/ApiFeatures')

// Create new labtest => /api/admin/labtest
exports.newLabTest = CatchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const labtest = await LabTest.create(req.body);
    res.status(201).json({
        success: true,
        labtest
    })
})

// Get single LabTest details => /api/labtest/:id
exports.getLabTest = CatchAsyncErrors(async (req, res, next) => {
    const labtestCount = await LabTest.countDocuments();
    const labtest = await LabTest.find();

    if (!labtest) {
        return next(new ErrorHandler('Lab Test not found', 404));
    }
    res.status(200).json({
        success: true,
        labtestCount,
        labtest

    })
})

// Get single labtest details for generic => /api/labtest/:url
exports.getAllTestPackage = CatchAsyncErrors(async (req, res, next) => {
    const labtest = await LabTest.find({packageurl : req.params.url});

    if (!labtest) {
        return next(new ErrorHandler('Lab Test Package not found', 404));
    }
    res.status(200).json({
        success: true,
        labtest
    })
})

// Get single labtestdetail details for generic => /api/labtestdetail/:url
exports.getLabTestDetails = CatchAsyncErrors(async (req, res, next) => {
    const labtestdetail = await LabTest.find({url : req.params.url});

    if (!labtestdetail) {
        return next(new ErrorHandler('Lab Test Package not found', 404));
    }
    res.status(200).json({
        success: true,
        labtestdetail
    })
})
// Get single Lab Test details => /api/labtest/:id
exports.getSingleLabTest = CatchAsyncErrors(async (req, res, next) => {
    const labtest = await LabTest.find(req.params.id);

    if (!labtest) {
        return next(new ErrorHandler('Lab Test not found', 404));
    }
    res.status(200).json({
        success: true,
        labtest
    })
})


// Update Lab Test => /api/admin/labtest/:id
exports.updateLabTest = CatchAsyncErrors(async (req, res, next) => {
    let labtest = await LabTest.findById(req.params.id);

    if (!labtest) {
        return next(new ErrorHandler('Lab Test not found', 404));
    }
    labtest = await LabTest.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        labtest
    })

})

// Delete Lab Test => /api/admin/labtest/:id
exports.deleteLabTest = CatchAsyncErrors(async (req, res, next) => {

    const labtest = await LabTest.findById(req.params.id);

    if (!labtest) {
        return next(new ErrorHandler('Lab Test not found', 404));
    }
    await labtest.remove();
    res.status(200).json({
        success: true,
        message: 'Lab Test is deleted'
    })

})
