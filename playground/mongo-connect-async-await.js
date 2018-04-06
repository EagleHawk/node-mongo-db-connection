// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb') ;
const expect = require('expect');

const url = 'mongodb://localhost:27017';
// Not Required if the mentioned database exists it not. MongoDB Automatically creates one on-the-fly.
const dbName = 'myprojectA';

(async function () {
    let client;

    try {
        client = await MongoClient.connect(url);
        console.log("Connected correctly to server");

        const db = client.db(dbName);

        // Insert a single document
        let r = await db.collection('inserts').insertOne({ a: 1 });
        // assert.equal(1, r.insertedCount);
        console.log(r.insertedCount);
        expect(r.insertedCount).toBe(1) ;

        // Insert multiple documents
        r = await db.collection('inserts').insertMany([{ a: 2 }, { a: 3 }]);
        console.log(r.insertedCount);
        
        // assert.equal(2, r.insertedCount);
    } catch (err) {
        console.log(err.stack);
    }

    // Close connection
    client.close();
})();