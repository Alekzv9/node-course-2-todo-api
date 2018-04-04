const { ObjectId } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');
// const id = '5ac439560c9e5145b4796c700';

// if (!ObjectId.isValid(id)) {
//     console.log('Not valid Id');
// }

// Todo.find({ _id: id })
//     .then(docs => {
//         console.log('Find:', docs);
//     });

// //Find the first that match
// Todo.findOne({ _id: id })
//     .then(doc => {
//         console.log('One:', doc);
//     });

// Todo.findById(id)
//     .then(doc => {
//         if (!doc) {
//             return console.log('Id not found');
//         }
//         console.log('ById:', doc);
//     }).catch(e => console.log(e));

User.findById('5ac424032cf2502d701c58a6')
    .then(doc => {
        if (!doc) {
            return console.log('Id not found');
        }
        console.log('User by Id', doc);
    }).catch(e => console.log(e));