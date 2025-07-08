const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true},
    theatre: {type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true},
    startTime: {type: Date, required: true},
    seats: [
        {
            seatNumber: String,
            isBooked: {type: Boolean, default: false}
        }
    ]
});

module.exports = mongoose.model('Showtime', showtimeSchema);