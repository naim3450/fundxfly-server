const mongoose = require('mongoose');

const monetagSchema = new mongoose.Schema({
    zoonId: { type: String, required: true },
    type: { type: String, required: true },
});

module.exports = mongoose.model('zoonId', monetagSchema);