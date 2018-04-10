const mongoose = require('mongoose') ;

let objUser = mongoose.model('UserInformation', {
    username: {
        type: String,
        required: true
    }
    , role: {
        type: String,
        required: true
    }
    , location: {
        type: String,
        required: true
    }
    , email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {objUser} ;