const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');


const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const users = [
    {
        _id: userOneId,
        email: 'email@email.com',
        password: 'user11',
        tokens: [{
            access: 'auth',
            token: jwt.sign({
                _id: userOneId, access: 'auth'
            }, 'abc123').toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'email2@email.com',
        password: 'user22'
    }
]

const todos = [
    { _id: new ObjectId(), text: 'First test todo' },
    { _id: new ObjectId(), text: 'Second test todo', completed: true, completedAt: 333 }
];

const populateTodos = (done) => {
    //Clean DB
    Todo.remove({}).then(() => {
        //inserting data
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        //take array of promises, and wait until all promises finishes
        return Promise.all([userOne, userTwo]);
    }).then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };