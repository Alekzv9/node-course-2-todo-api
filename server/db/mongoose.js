var mongoose = require('mongoose');

//Configure mongoose
mongoose.Promise = global.Promise;
//Mongoose manage the connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };