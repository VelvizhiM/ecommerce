const Order = require('../Models/Order');
const Product = require('../Models/Product');

const ErrorHandler = require('../Utils/ErrorHandler');
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors');

// Create a new order  => /api/v1/order/new 
exports.newOrder = CatchAsyncErrors( async(req, res, next)=> {
    const {
        orderItems,
        shippingInfo,
        prescriptionInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        prescriptionInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

// Get single oreder  => /api/v1/order/:id
exports.getSingleOrder = CatchAsyncErrors( async(req, res, next)=> {
    const order = await Order.findById(req.params.id).populate('user','name email');

    if(!order){
        return next(new ErrorHandler('No Order found with this ID', 404))
    }
    res.status(200).json({
        success: true,
        order
    })
})

// Get logged in user orders  => /api/v1/order/me
exports.myOrders = CatchAsyncErrors( async(req, res, next)=> {
    const orders = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        orders
    })
})

// Get all orders  => /api/v1/admin/orders
exports.allOrders = CatchAsyncErrors( async(req, res, next)=> {
    const orders = await Order.find()

    let totalAmount =0;
    orders.forEach(order =>{
        totalAmount += order.totalPrice
    })
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//update  / process order - ADMIN  => /api/v1/admin/order/:id
exports.updateOrder = CatchAsyncErrors( async(req, res, next)=> {
    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered'){
        return next(new ErrorHandler('You have already delivered this order', 400))
    }
    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save()
    
    res.status(200).json({
        success: true,
    })
})

// async funcation updateStock(id, quantity) {
//     const product = await Product.findById(id);
//     product.stock = product.stock - quantity;

//     await product.save()
// }


const updateStock = async (id, quantity) => {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;

    await product.save()
    //await product.save({validateBeforeSave: false})
}

// Delete order  => /api/v1/admin/order/:id
exports.DeleteOrder = CatchAsyncErrors( async(req, res, next)=> {
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler('No Order found with this ID', 404))
    }
    await order.remove()
    res.status(200).json({
        success: true,
    })
})












