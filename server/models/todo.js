var mongoose = require('mongoose') ;

var Todo = mongoose.model('todocollections', {
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

module.exports = { Todo } ;