const Prescription = require('../Models/Upload')

const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors');
const cloudinary = require('cloudinary');


// Register a user   => /api/upload
exports.newPrescription = CatchAsyncErrors(async (req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'prescription',
        width: 150,
        crop: "scale"
    })

    const prescription = await Prescription.create({
        user:req.user.id,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })
    res.status(201).json({
        success: true,
        prescription
    })

})

// Get single Prescription details => /api/v1/Prescription/:id
exports.getPrescription = CatchAsyncErrors(async (req, res, next) => {
    const prescriptionCount = await Prescription.countDocuments();
    const prescriptions = await Prescription.find();

    if (!prescriptions) {
        return next(new ErrorHandler('Prescription not found', 404));
    }
    res.status(200).json({
        success: true,
        prescriptionCount,
        prescriptions

    })
})

// Get single Prescription details => /api/v1/Prescription/:id
exports.getSinglePrescription = CatchAsyncErrors(async (req, res, next) => {
    const prescription = await Prescription.find(req.params.id);

    if (!prescription) {
        return next(new ErrorHandler('Prescription not found', 404));
    }
    res.status(200).json({
        success: true,
        prescription
    })
})


// Update Prescription => /api/admin/Prescription/:id
exports.updatePrescription = CatchAsyncErrors(async (req, res, next) => {
    let prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
        return next(new ErrorHandler('Prescription not found', 404));
    }
    prescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        prescription
    })

})

// Delete Prescription => /api/v1/admin/Prescription/:id
exports.deletePrescription = CatchAsyncErrors(async (req, res, next) => {

    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
        return next(new ErrorHandler('Prescription not found', 404));
    }
    await prescription.remove();
    res.status(200).json({
        success: true,
        message: 'Prescription is deleted'
    })

})
