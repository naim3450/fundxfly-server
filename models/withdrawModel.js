const mongoose = require('mongoose');

const withdrawSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userEmail: { type: String, required: true },
    number: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('withdraw-request', withdrawSchema);