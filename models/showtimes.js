const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
    theater: {type: mongoose.Schema.Types.ObjectId, ref: 'Theater', required: true},
    startTime: {type: Date, required: true},
    seats: [
        {
            seatNumber: String,
            isBooked: {type: Boolean, default: false}
        }
    ]
});

module.exports = mongoose.model('Showtime', showtimeSchema);