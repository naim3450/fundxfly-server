const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userEmail: { type: String, required: true },
    number: { type: Number, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('withdraw-request', withdrawSchema);