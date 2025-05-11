const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    planName: { type: String, required: true },
    planPrice: { type: Number, required: true },
    paymentNumber: { type: Number, required: true },
    paymentType: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userEmail: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, },
});

module.exports = mongoose.model('planRequest', requestSchema);
