const mongoose = require('mongoose');

const incomePlanSchema = new mongoose.Schema({
    status: { type: String, required: true },
    adds: { type: Number, required: true },
    income: { type: Number, required: true },
    refferIncome: { type: Number, required: true },
    refferIncome2: { type: Number, required: true },
    refferIncome3: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    investAmount: { type: Number, default: 0 },
    validity: { type: Number, default: 0 },
});

module.exports = mongoose.model('IncomePlan', incomePlanSchema);

