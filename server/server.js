var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose-connect');
var { Todo } = require('./models/todo');
var { oUser } = require('./models/userInfo');
const _PORT = process.env.PORT || 8080 ;

var app = express();

app.set('port', _PORT);
app.use(bodyParser.json());

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
})

app.listen(_PORT, () => {
	console.log(`Started on port ${_PORT}`);
});

module.exports = { app };
