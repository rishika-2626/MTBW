const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: String,
    totalSeats: Number,
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Theatre', theatreSchema);