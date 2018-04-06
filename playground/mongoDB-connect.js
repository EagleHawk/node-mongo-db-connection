// const mongoClient = require('mongodb').MongoClient ;
const {MongoClient, ObjectID, Cursor} = require('mongodb') ;
const _USER_DATABASE = 'ToDoApplication'
const _URI = ''

// Connection Using Callbacks
MongoClient.connect('mongodb://localhost:27017/ToDoApplication', (err, client) => {
    if (err) {
        return console.log("Ubable to connect to MongoDB");        
    } 
    
    console.log("Connection to MongoDB Successful.");        
    const db = client.db('ToDoApplication') ;
    // Creating a Cursor
    const cursor =  db.collection('ToDos').find({});
    // Code according to the mongoDB node library v3
    // db.collection('ToDos').insertOne({
    //     task:"Start Mongo DB A",
    //     status: "Done"
    // }, (err, result) => {
    //     if (err) {
    //         console.log(`Ubable to insrt into TODO -> ${err} `);
    //     }         
    //     console.log(`Record Created -> ${JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2)} `);
    // });
    
    db.collection('ToDos').find({status:{$ne: "Done"}}).toArray().then((res) => {
    // cursor.count().then( (count) => {
        console.log(`Records from Cursor : ${count} `);
    }, (err) => {

    });

    db.collection('ToDos').find().toArray().then((res) => {
        console.log(`Search Result : ${res.length} records ->  `);
        console.log(JSON.stringify(res, undefined, 2));

    }, (errHandle) => {
        console.log('No Documents found', errHandle);
        
    }) ;


    client.close();
})