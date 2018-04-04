const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();
//Configure middleware
app.use(bodyParser.json());

app.post('/todos', (req, res, err) => {
    let todo = new Todo({
        text: ''
    });

    todo.save().then(doc => {
        res.send(doc);
    }).catch(e => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on PORT 3000');
});