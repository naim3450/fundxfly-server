const mongoose = require('mongoose');

const setAddress = mongoose.Schema({
    address: { type: String, require: true },
    type: { type: String, require: true }
})

module.exports = mongoose.model('binanceInfo', setAddress);