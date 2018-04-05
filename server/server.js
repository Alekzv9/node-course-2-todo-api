require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectId } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT; //|| 3000;
//Configure middleware
app.use(bodyParser.json());

//Create
app.post('/todos', authenticate, (req, res, err) => {
    let todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });

    todo.save().then(doc => {
        res.send(doc);
    }).catch(e => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res, err) => {
    Todo.find({
        _creator: req.user._id
    }).then(todos => {
        res.send({ todos });
    }).catch(e => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', authenticate, (req, res, err) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(404).send('Invalid Id');
    }
    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then(todo => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch(e => {
        res.status(400).send(e);
    });
});

app.delete('/todos/:id', authenticate, (req, res, err) => {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then(todo => {
        if (!todo) {
            return res.status(404).send()
        }

        res.send({ todo });
    }).catch(e => res.status(400).send(e));
});

app.patch('/todos/:id', authenticate, (req, res, err) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();//Timestamp, number of seconds since first day of the year
    } else {
        body.completed = false;
        body.completedAt = null
    }

    //new return the updated field
    Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true })
        .then(todo => {
            if (!todo) {
                res.status(404).send();
            }
            res.send({ todo });
        })
        .catch(e => res.status(400).send(e));
});

app.post('/users', (req, res, err) => {
    var user = new User(_.pick(req.body, ['email', 'password']));

    user.save().then(() => {
        return user.generateAuthToken();
        // res.send({ user });
    }).then(token => {
        //x- | create custom header        
        res.header('x-auth', token).send(user);
    }).catch(e => res.status(400).send(e));
});

app.get('/users/me', authenticate, (req, res, err) => {
    res.send(req.user);
});

app.post('/users/login', (req, res, err) => {
    const body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        //return for keep chained and use the same catch
        return user.generateAuthToken().then(token => {
            res.header('x-auth', token).send(user)
        });
    }).catch(e => res.status(400).send(e));
});

app.delete('/users/me/token', authenticate, (req, res, err) => {
    req.user.removeToken(req.token).then(() => {
        res.send();
    }).catch(e => res.status(400).send(e));
});

app.listen(port, () => {
    console.log('Started on PORT 3000');
});

module.exports = { app };