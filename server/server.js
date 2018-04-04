const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();
//Configure middleware
app.use(bodyParser.json());

app.post('/todos', (req, res, err) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then(doc => {
        res.send(doc);
    }).catch(e => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res, err) => {
    Todo.find()
        .then(todos => {
            res.send({ todos });
        }).catch(e => {
            res.status(400).send(e);
        });
});

app.get('/todos/:id', (req, res, err) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(404).send('Invalid Id');
    }
    Todo.findById(id)
        .then(todo => {
            if (!todo) {
                return res.status(400).send();
            }
            res.send({ todo });
        }).catch(e => {
            res.status(400).send(e);
        });
});

app.listen(3000, () => {
    console.log('Started on PORT 3000');
});

module.exports = { app };