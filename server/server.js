const mongoose = require('mongoose') ;
const _USERDB = 'ToDaApplicationA1';
// const _USERDB = '' ;
const _URI = 'mongodb://localhost:27017/' + _USERDB;

mongoose.Promise = global.Promise ;
mongoose.connect(_URI) ;

let objToDo = mongoose.model('ToDoCollection', {
    text: {
        type: String
    }
    , completed: {
        type: Boolean
    }
    , completedAt: {
        type: Date
    }
});

let newToDo = new objToDo({
    text: "Upload to GitHub the created Mongoose Object",
    completed: false,
    completedAt: 0
});

newToDo.save().then((res) => {
    console.log(`ToDo created : ${res}`);
}, (err) => {
    console.log(`Error in ToDo Creation -> `, err);
    
});

