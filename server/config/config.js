//Environment variables
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    //if npm test, package.json changes the env to test
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
//else is 'production' filled by heroku
