const express  = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

const errorMiddleware = require('./Middlewares/Errors')

// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
// dotenv.config({ path: 'backend/config/config.env' })

app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser())
app.use(fileUpload());

// Import all routes
const products = require('./Routes/Product');
const auth = require('./Routes/Auth');
const order = require('./Routes/Order');
const storage = require('./Routes/Storage');
const category = require('./Routes/Category');
const subcategory = require('./Routes/Subcategory');
const generic = require('./Routes/Generic');
// const prescription = require('./Routes/Prescription');
const upload = require('./Routes/Upload');
const shippingaddress = require('./Routes/ShippingAddress');
const manufactuer = require('./Routes/Manufactuer');
const form = require('./Routes/Form');
const package = require('./Routes/Package');
const labpackage = require('./Routes/Labpackage');
const labtest = require('./Routes/Labtest');
const labbooking = require('./Routes/LabBooking');

app.use('/api',products)
app.use('/api',auth)
app.use('/api',order)
app.use('/api',storage)
app.use('/api',category)
app.use('/api',subcategory)
app.use('/api',generic)
app.use('/api',upload)
app.use('/api',shippingaddress)
app.use('/api',manufactuer)
app.use('/api',form)
app.use('/api',package)
//Lab Package
app.use('/api',labpackage)
app.use('/api',labtest)
app.use('/api',labbooking)

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

// Middleware to handle error
app.use(errorMiddleware);

module.exports = app