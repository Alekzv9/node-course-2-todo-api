const { ObjectId } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');


// Todo.remove({}).then(result => {
//     console.log(result);
// });

Todo.findOneAndRemove({_id: '5ac4c250fe6cdb36388a7e51'}).then(todo => {
    console.log(todo);
});

// Todo.findByIdAndRemove('5ac4c24efe6cdb36388a7e50').then(todo => {
//     console.log(todo);
// });