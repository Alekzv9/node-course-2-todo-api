// const MongoClient = require('mongodb').MongoClient;
//Destructuring: create variables of objects
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server', err);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({
    //     text: 'Eat lunch'
    // }).then(result => {
    //     console.log(result.result);
    // }).catch(err => console.log(err));

    // db.collection('Todos').deleteOne({
    //     text: 'Eat lunch'
    // }).then(result => {
    //     console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({        
    //     completed: false
    // }).then(result => {
    //     console.log(result);
    // });

    db.collection('Users').deleteMany({
        name: 'Vakartzas'
    }).then(result => {
        console.log(result.result);
    });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5ac2bc391b39c3397c599198')
    }).then(result => {
        console.log(result);
    });

    //client.close();
});