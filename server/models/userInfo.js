const mongoose = require('mongoose') ;
const validator = require('validator');

let oUser = mongoose.model('UserInformation', {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
    , password: {
        type: String,
        minlength: 6,
        required: true
    }
    , role: {
        type: String,
        required: true
    }
    , location: {
        type: String,
        required: false
    }
    , email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email address.'
        }
    }
    , tokens: []
});

module.exports = {oUser} ;