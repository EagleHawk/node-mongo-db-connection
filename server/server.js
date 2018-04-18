var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose-connect');
var { Todo } = require('./models/todo');
var { oUser } = require('./models/userInfo');
const _PORT = process.env.PORT || 7000 ;

var app = express();

app.set('port', _PORT);
app.use(bodyParser.json());

// REST Create Operation
app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

// REST READ Operation
app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({ todos });
	}, (e) => {
		res.status(400).send(e);
	});
});

app.post('/oUser', (req, res) => {
	let iUser = new oUser({
		username: req.body.username,
		password: req.body.password,
		role: req.body.role,
		email: req.body.email
	});

	iUser.save().then((sresp) => {
		res.status(200).send(`User Created : ${sresp} `);
	}, (erro) => {
		res.status(400).send(`Error Occured -> ${erro} `);
		}).catch(erro => {
			res.status(400).send(erro) ;	
		})
}) ;

// REST READ operation using a resource conditions
app.get('/todos/:id', (req, res) => {
	// GET Route for fetching an individial resource by using a request.
	let oID = req.params.id;

	if (!ObjectID.isValid(oID)) {
		res.status(404).send() ;
	} 

	Todo.findById({ _id: oID}).then((resTo) => {
		if (!resTo) {
			res.status(404).send();
		}
		res.send( {resTo} ) ;
	}).catch(erro => {
		res.status(400).send('Could not find the document. Error -> ', erro)
	})
}) ;

// REST DELETE operation using the resource condition.
app.delete('/todos', (req, res) => {
	// DELETE Route for deleting a individial or multiple documents using a request.
	let oID = req.params.id ;

	console.log(`Request params : ${JSON.stringify(req.params, undefined, 2)} `);
	
	if (!ObjectID.isValid(oID)) {
		return res.status(404).send() ;
	}

	Todo.findByIdAndRemove({_id: oID}).then( result => {
		if (!result) {
			return res.status(404).send();
		}
		res.status(200).send(`Data sucessfully Deleted : ${result} `)
	} ).catch(error => {
		res.status(400).send('Could not find the document. Error -> ', error) ;
	})
}) ;



app.listen(_PORT, () => {
	console.log(`Started on port ${_PORT}`);
});

module.exports = { app };
