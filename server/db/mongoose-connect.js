const mongoose = require('mongoose');
const _USERDB = 'ToDaApplicationA1';
// const _USERDB = '' ;
const _URI = 'mongodb://localhost:27017/' + _USERDB;

mongoose.Promise = global.Promise;
mongoose.connect(_URI);
