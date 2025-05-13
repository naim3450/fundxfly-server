const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['free', 'starter', 'pro', 'vip'],
        default: 'free',
    },
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    totalEarnings: {
        type: Number,
        default: 0,
    },
    refferIncome: {
        type: Number,
        default: 0,
    },
    activeProject: {
        type: Number,
        default: 0,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    refferCode: {
        type: String,
        required: true,
        unique: true,
    },
    refferby: {
        type: String,
        default: null,
    },
    refferUse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }],
    count: {
        type: Number,
        default: 0,
    },
    countDate: {
        type: Date,
        default: null,
    },
    addsIndex: {
        type: Array,
        default: []
    },
    expiry: {
        type: Date,
        default: null,
    },
});

module.exports = mongoose.model('user', userSchema);

