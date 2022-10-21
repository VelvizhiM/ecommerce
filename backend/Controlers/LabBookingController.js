const LabBooking = require('../Models/LabTestBooking')

const ErrorHandler = require('../Utils/ErrorHandler')
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors')
const APIFeatures = require('../Utils/ApiFeatures')

// Create new labbooking => /api/admin/labbooking
exports.newLabBooking = CatchAsyncErrors(async (req, res, next) => {

    // req.body.user = req.user.id;

    const labbooking = await LabBooking.create(req.body);
    res.status(201).json({
        success: true,
        labbooking
    })
})

// Get single LabBooking details => /api/labbooking/:id
exports.getLabBooking = CatchAsyncErrors(async (req, res, next) => {
    const labbookingCount = await LabBooking.countDocuments();
    const labbooking = await LabBooking.find();

    if (!labbooking) {
        return next(new ErrorHandler('Lab Booking not found', 404));
    }
    res.status(200).json({
        success: true,
        labbookingCount,
        labbooking

    })
})

// Get single Lab Booking details => /api/labbooking/:id
exports.getSingleLabBooking = CatchAsyncErrors(async (req, res, next) => {
    const labbooking = await LabBooking.find(req.params.id);

    if (!labbooking) {
        return next(new ErrorHandler('Lab Booking not found', 404));
    }
    res.status(200).json({
        success: true,
        labbooking
    })
})


// Update Lab Booking => /api/admin/labbooking/:id
exports.updateLabBooking = CatchAsyncErrors(async (req, res, next) => {
    let labbooking = await LabBooking.findById(req.params.id);

    if (!labbooking) {
        return next(new ErrorHandler('Storage not found', 404));
    }
    labbooking = await LabBooking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        labbooking
    })

})

// Delete Lab Booking => /api/admin/labbooking/:id
exports.deleteLabBooking = CatchAsyncErrors(async (req, res, next) => {

    const labbooking = await LabBooking.findById(req.params.id);

    if (!labbooking) {
        return next(new ErrorHandler('Lab Booking not found', 404));
    }
    await labbooking.remove();
    res.status(200).json({
        success: true,
        message: 'Lab Booking is deleted'
    })

})
