const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    author: { type: {
        name: { type: String, require: true },
        email: { type: String, require: true },
        avatar: { type: String, require: true },
    }},
    message: { type: String, require: true },
    time: { type: String, require: true },
});

module.exports = mongoose.model('messages', messageSchema);