//Environment variables
var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    const config = require('./config.json');
    const envConfig = config[env];
    // process.env.PORT = config[env].PORT;
    // process.env.MONGODB_URI = config[env].MONGODB_URI;

    //Use forEach to do it dinamically
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}

// if (env === 'development') {
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//     //if npm test, package.json changes the env to test
//     process.env.PORT = 3000;
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
//else is 'production' filled by herok