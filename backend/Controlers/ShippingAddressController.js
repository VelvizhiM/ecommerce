const Shipping = require('../Models/ShippingAddress');

const ErrorHandler = require('../Utils/ErrorHandler');
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors');

// Create a new Shipping  => /api/v1/Shipping/new 
exports.newShipping = CatchAsyncErrors( async(req, res, next)=> {
    const {
        type,
        name,
        phone,
        address,
        address1,
        pincode,
        landmark,
        city,
        state,
        country
    } = req.body;

    const shipping = await Shipping.create({
        type,
        name,
        phone,
        address,
        address1,
        pincode,
        landmark,
        city,
        state,
        country,
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        shipping
    })
})

// Get single oreder  => /api/v1/order/:id
exports.getSingleShipping = CatchAsyncErrors( async(req, res, next)=> {
    const shipping = await Shipping.findById(req.params.id).populate('user','name email');

    if(!shipping){
        return next(new ErrorHandler('No Shipping found with this ID', 404))
    }
    res.status(200).json({
        success: true,
        shipping
    })
})

// Get logged in user Shippings  => /api/v1/Shippings/me
exports.myShippings = CatchAsyncErrors( async(req, res, next)=> {
    const shippings = await Shipping.find({user: req.user.id})

    res.status(200).json({
        success: true,
        shippings
    })
})

// Get all orders  => /api/v1/admin/orders
exports.allShippings = CatchAsyncErrors( async(req, res, next)=> {
    const shippings = await Shipping.find()

    res.status(200).json({
        success: true,
        shippings
    })
})

//update  / process order - ADMIN  => /api/v1/admin/order/:id
exports.updateShipping = CatchAsyncErrors( async(req, res, next)=> {
    const shipping = await Shipping.findById(req.params.id)

    await shipping.save()
    
    res.status(200).json({
        success: true,
    })
})

// Delete Shipping  => /api/v1/admin/Shipping/:id
exports.DeleteShipping = CatchAsyncErrors( async(req, res, next)=> {
    const shipping = await Shipping.findById(req.params.id);

    if(!shipping){
        return next(new ErrorHandler('No Shipping found with this ID', 404))
    }
    await shipping.remove()
    res.status(200).json({
        success: true,
    })
})












