const express = require('express') ;
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose-connect.js') ;
const {objToDo} = require('./models/todo.js');
const {objUser} = require('./models/userInfo');

let app = express() ;

app.use(bodyParser.json()) ;

app.post('/todos', (req, res) => {
    console.log(req.body);
    
    var todo = new objToDo({
        text: req.body.text 
    }) ;

    // Saving the todo
    todo.save().then((resp) => {
        // Sending the response of the created todo.
        res.send(resp) ;
    }, (eo) => {
        res.status(400).send(eo);
    });
}) ;

app.listen('7000', () => {
    console.log('Server started at port 7000');
}) ;