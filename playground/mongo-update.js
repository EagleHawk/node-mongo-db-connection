
const {MongoClient, ObjectID} = require('mongodb') ;
const _USERDB = 'ToDoApplication' ;
// const _USERDB = '' ;
const _URI = 'mongodb://localhost:27017/' +_USERDB ;

MongoClient.connect(_URI, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB', err);
    }

    console.log('Connection to MongoDB successfull');
    let db = client.db('') ;

    db.collection('UserInformation').find({}).toArray().then((res) => {
            console.log('User Information -> ' + JSON.stringify(res, undefined, 2) );            
        }, (erro) => {
            console.log('Error while fetching data ; cause -> ', erro );
        } 
    );
    try {
        db.collection('UserInformation').findOneAndUpdate({ _id: ObjectID('5acb47f9de147602f53ed750'), username: 'Hector'},
        {
            $set: { role: 'User Leve 1', activated : new Date('01/04/2018') }
            ,$inc:{exp : 1}
        }, {returnOriginal: false}).then((result) => {
            console.log(result);            
        }) 
         ;
        
    } catch (error) {
        console.error('Error occured on update => error -> ', error);
    }
    
    client.close();
} ) ;