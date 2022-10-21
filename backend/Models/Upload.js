const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // name: {
    //     type: String,
    // },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})


module.exports = mongoose.model('Upload', userSchema)