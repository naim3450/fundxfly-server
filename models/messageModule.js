const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    type: { type: String, required: true },
    title: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    message: { type: String, required: true },
});

module.exports = mongoose.model('message', messageSchema);