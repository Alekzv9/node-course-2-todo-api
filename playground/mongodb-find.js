// const MongoClient = require('mongodb').MongoClient;
//Destructuring: create variables of objects
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        console.log('Unable to connect to MongoDB server', err);
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //return a mongodb cursor,toArray() return a promise
    // db.collection('Todos').find({ completed: false }).toArray()
    // db.collection('Todos').find({
    //     _id: new ObjectID('5ac2bb754daaa818185d02c9')
    // }).toArray().then(docs => {
    //     console.log('Todos', JSON.stringify(docs, undefined, 2));
    // }).catch(err => console.log('Unable to fetch todos', err));

    // db.collection('Todos').find().count().then(count => {
    //     console.log('Todos count: ' + count);
    // }).catch(err => console.log('Unable to fetch todos', err));

    db.collection('Users').find({
        name: 'Alekz'
    }).toArray().then(docs => {
        console.log(JSON.stringify(docs, undefined, 2));
    }).catch(err => console.log(err));

    client.close();
});