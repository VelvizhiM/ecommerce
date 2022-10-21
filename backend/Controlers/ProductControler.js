const Product = require('../Models/Product')

const ErrorHandler = require('../Utils/ErrorHandler')
const CatchAsyncErrors = require('../Middlewares/CatchAsyncErrors')
const APIFeatures = require('../Utils/ApiFeatures')

// Create new product => /api/v1/admin/product
// Create new product   =>   /api/v1/admin/product/new
exports.newProduct = CatchAsyncErrors(async (req, res, next) => {

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})


// Get all products => /api/v1/products
exports.getProducts = CatchAsyncErrors(async (req, res, next) => {
    const productsCount = await Product.countDocuments();
    const products = await Product.find();

    if (!products) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        productsCount,
        products

    })
})
// exports.getProducts = CatchAsyncErrors(async (req, res, next) => {

//     const resPerPage = 8;
//     const productsCount = await Product.countDocuments();

//     const apiFeatures = new APIFeatures(Product.find(), req.query)
//         .search()
//         .filter()
//         .pagination(resPerPage)

//     const products = await apiFeatures.query;

//     setTimeout(() => {
//         res.status(200).json({
//             success: true,
//             //count: products.length,
//             productsCount,
//             resPerPage,
//             products
//             // message: 'This route will show all products in database.'
//         })
//     }, 2000);

// })

// Get single product details => /api/v1/product/:id
exports.getSingleProduct = CatchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
        // return res.status(404).json({
        //     success: false,
        //     message: 'Product not found'
        // })
    }
    res.status(200).json({
        success: true,
        product
    })
})

// Search Product details => /api/search/:id
exports.getSearchProduct = CatchAsyncErrors(async (req, res, next) => {

    const product = await Product.find({$or:[
        {cat_name:{$regex: new RegExp(req.params.i,'i')}},
        {product_name:{$regex: new RegExp(req.params.i,'i')}}
    ]}).select('cat_name product_name product_img saleprice price percentage url');


    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        productsCount: product.length,
        product,
        
    })
})

// Get single product details => /api/v1/productview/:url
exports.getSingleProductview = CatchAsyncErrors(async (req, res, next) => {
    const product = await Product.findOne({url: req.params.url});

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    res.status(200).json({
        success: true,
        product
    })
})

// Get single product details for generic => /api/v1/generic/:url
exports.getAllGenericProduct = CatchAsyncErrors(async (req, res, next) => {
    const products = await Product.find({generices: req.params.url});

    if (!products) {
        return next(new ErrorHandler('Generic Related Product not found', 404));
    }
    res.status(200).json({
        success: true,
        products
    })
})

// Get single product details for generic => /api/v1/generic/:url
exports.getGenericProduct = CatchAsyncErrors(async (req, res, next) => {
    const genericproducts = await Product.find({$and:[{generices: req.params.url},{$nor: [{url: req.params.producturl}]}]}).limit(5);
    if (!genericproducts) {
        return next(new ErrorHandler('Generic Related Product not found', 404));
    }
    res.status(200).json({
        success: true,
        genericproducts
    })
})

// Get single product details for generic => /api/alternative/:url
exports.getAlternativeProduct = CatchAsyncErrors(async (req, res, next) => {
    const alterproductsCount = await Product.countDocuments();
    // const alterproducts = await Product.find({strength:req.params.url} ).limit(5);
    // const alterproducts = await Product.find({strength:req.params.url}, {$not: {url:req.params.prourl}} ).limit(5);
    const alterproducts = await Product.find({$and:[{strength:req.params.url},{$nor: [{url: req.params.prourl}]}]} ).limit(5);
    console.log(req.params.prourl,"PPPP")
    // const alterproducts = await Product.find({
    //     product_name: {
    //         $not: {url: req.params.prourl}
    //     }
    // })
    // {"personal.age": {$not: {$eq: 24}}}
    if (!alterproducts) {
        return next(new ErrorHandler('Alternative Product Related Product not found', 404));
    }
    res.status(200).json({
        success: true,
        alterproductsCount,
        alterproducts
    })
})

// Update Product => /api/vi/admin/product/:id
exports.updateProduct = CatchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })

})

// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = CatchAsyncErrors(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })

})

// Create new review   => /api/v1/review 
exports.createProductReview = CatchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating
            }
        })

    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true
    })
})

// Get Product Reviews  => /api/v1/reviews
exports.getProductReviews = CatchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Get Product Reviews  => /api/v1/reviews
exports.deleteReview = CatchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    const numOfReviews = reviews.length;
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        // reviews: product.reviews
    })
})

// Category List

// Get all ayush products  => /api/v1/ayush
exports.getAyush = CatchAsyncErrors(async (req, res, next) => {

    const resPerPage = 12;
    const ayushCount = await Product.find({cat_name:req.params.url}).countDocuments();

    const apiFeatures = new APIFeatures(Product.find({cat_name:req.params.url}), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const ayush = await apiFeatures.query;

    setTimeout(() => {
        res.status(200).json({
            success: true,
            ayushCount,
            resPerPage,
            ayush
        })
    }, 2000);
})


// Get all category products  => /api/v1/ayurvedic
exports.getAyurvedic = CatchAsyncErrors(async (req, res, next) => {

    const resPerPage = 12;
    const ayurvedicCount = await Product.find({subcat_name:req.params.url}).countDocuments();

    const apiFeatures = new APIFeatures(Product.find({subcat_name:req.params.url}), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const ayurvedic = await apiFeatures.query;

    setTimeout(() => {
        res.status(200).json({
            success: true,
            ayurvedicCount,
            resPerPage,
            ayurvedic
        })
    }, 2000);
})


// HealthStore

// Get all HealthStore products  => /api/v1/healthstore/personal-care
exports.getHealthStore = CatchAsyncErrors(async (req, res, next) => {

    const resPerPage = 12;
    const healthstoreCount = await Product.find({cat_name:req.params.url}).countDocuments();

    const apiFeatures = new APIFeatures(Product.find({cat_name:req.params.url}), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const healthstore = await apiFeatures.query;

    setTimeout(() => {
        res.status(200).json({
            success: true,
            healthstoreCount,
            resPerPage,
            healthstore
        })
    }, 2000);
})



// HealthCare Product

// Get all HealthCare products  => /api/v1/healthcare/personal-care
exports.getHealthCare = CatchAsyncErrors(async (req, res, next) => {

    const resPerPage = 12;
    const healthcareCount = await Product.find({cat_name:req.params.url}).countDocuments();

    const apiFeatures = new APIFeatures(Product.find({cat_name:req.params.url}), req.query)
        .search()
        .filter()
        .pagination(resPerPage)

    const healthcare = await apiFeatures.query;

    setTimeout(() => {
        res.status(200).json({
            success: true,
            healthcareCount,
            resPerPage,
            healthcare
        })
    }, 2000);
})

// Get all products (Admin)  =>   /api/admin/products
exports.getAdminProducts = CatchAsyncErrors(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })

})
// exports.getAdminProducts = CatchAsyncErrors(async (req, res, next) => {

   
//     const resPerPage = 8;
//     const productsCount = await Product.countDocuments();

//     const apiFeatures = new APIFeatures(Product.find(), req.query)
//         .search()
//         .filter()
//         .pagination(resPerPage)

//     const products = await apiFeatures.query;

//     setTimeout(() => {
//         res.status(200).json({
//             success: true,
//             products
//         })
//     }, 2000);
    

// })