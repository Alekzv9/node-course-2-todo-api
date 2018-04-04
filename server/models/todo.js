const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlegth: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: true
    },
    completedAt: {
        type: Number, //Timestamp
        default: null
    }
});

module.exports = { Todo };