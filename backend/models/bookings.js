const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    showTime: {type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true},
    seats: [String],
    totalPrice: {type: Number, required: true},
    bookedAt: {type: Date, default: Date.now},
    paymentStatus: {type: String, default: 'pending'},
})

module.exports = mongoose.model('Booking', bookingSchema);

