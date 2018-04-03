// const MongoClient = require('mongodb').MongoClient;
//Destructuring: create variables of objects
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server', err);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5ac382c22f4e57b1e61d3ab3')
    // }, {
    //     $set: {
    //         completed: true            
    //     }
    // },{
    //     returnOriginal: false
    // })
    // .then(result => {
    //     console.log(result)
    // })
    // ;

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5ac383562f4e57b1e61d3aea')
    }, {
        $set: {
            name: 'Alekz'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then(result => {
        console.log(result);
    });

    //client.close();
});