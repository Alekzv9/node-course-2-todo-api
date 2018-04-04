const mongoose = require('mongoose');
var User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlegth: 1
    }
});

module.exports = { User };