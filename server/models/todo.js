var mongoose = require('mongoose') ;

var objToDo = mongoose.model('todocollections', {
    text: {
        type: String,
        required: true,
        minlength: 0,
        trim: true
    }
    , completed: {
        type: Boolean,
        default: false
    }
    , completedAt: {
        type: Date,
        default: 0
    }
});

module.exports = {objToDo} ;