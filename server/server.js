var mongoose = require('mongoose');

//Configure mongoose
mongoose.Promise = global.Promise;
//Mongoose manage the connection
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number //Timestamp
    }
});

// var newTodo = new Todo({
//     text: 'Cook Dinner'
// }).save().then(doc => {
//     console.log('Saved todo', doc);
// }).catch(err => console.log('Unable to save Todo', err));

var newTodo2 = new Todo({
    text: 'Finish node course',
    completed: false,
    completedAt: 0
}).save().then(doc => {
    console.log(doc);
}).catch(err => console.log(err));