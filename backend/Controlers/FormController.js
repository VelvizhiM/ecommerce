const Form = require('../Models/Form')

const ErrorHandler = require('../Utils/ErrorHandler')
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors')
const APIFeatures = require('../Utils/ApiFeatures')

// Create new product => /api/v1/admin/product
exports.newForm = CatchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const form = await Form.create(req.body);
    res.status(201).json({
        success: true,
        form
    })
})

// Get single form details => /api/form/:id
exports.getForm = CatchAsyncErrors(async (req, res, next) => {
    const forms = await Form.find();

    if (!forms) {
        return next(new ErrorHandler('Form not found', 404));
    }
    res.status(200).json({
        success: true,
        forms
    })
})

// Get single form details => /api/form/:id
exports.getSingleForm = CatchAsyncErrors(async (req, res, next) => {
    const form = await Form.find({formurl:req.params.url});

    if (!form) {
        return next(new ErrorHandler('Form not found', 404));
    }
    res.status(200).json({
        success: true,
        form
    })
})


// Update Product => /api/admin/product/:id
exports.updateForm = CatchAsyncErrors(async (req, res, next) => {
    let form = await Form.findById(req.params.id);

    if (!form) {
        return next(new ErrorHandler('Storage not found', 404));
    }
    form = await Form.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        form
    })

})

// Delete Form => /api/v1/admin/Form/:id
exports.deleteForm = CatchAsyncErrors(async (req, res, next) => {

    const form = await Form.findById(req.params.id);

    if (!form) {
        return next(new ErrorHandler('Form not found', 404));
    }
    await form.remove();
    res.status(200).json({
        success: true,
        message: 'Form is deleted'
    })

})
