const Booking = require('../models/bookings');
const Showtime = require('../models/showtimes');

exports.createBooking = async (req, res) => {
    try {
    const { showTimeId, seats, totalPrice } = req.body;
    const userId = req.user._id; //from auth middleware

    const showtime = await Showtime.findById(showTImeId);
    if(!showtime) return res.status(404).json({ message: 'Showtime not found'});

    const unavailable = seats.filter(seat => showtime.seats.find(s => s.seatNumber === seat && s.isBooked));
    if(unavailable.length > 0){
        return res.status(400).json({message : `Seats already booked: ${unavailable}`});
    }//you must double-check in the backend right before confirming the booking — otherwise two people could buy the same seat.

    showtime.seats = showtime.seats.map(s => {
        if(seats.includes(s.seatNumber)) {
            s.isBooked = true;
        }
        return s;
    });
    await showtime.save();

    const booking = new Booking({
        user: userId,
        showTime: showTimeId,
        seats,
        totalPrice,
        paymentStatus: 'paid'
    });
    await booking.save();

    res.status(201).json( {
        message: 'Booking successful!',
        booking
    });
}
catch(err){
    console.error(err);
    res.status(500).json({message : 'Server error'});
}

};


exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;

        const bookings = await Booking.find({ user: userId}).populate({
            path : 'showTime',
            populate: [
               { path: 'movie'},
                {path : 'theatre'}
            ]
        });

        res.json(bookings);
    }
    catch(err) {
        res.status(500).json({message : 'Server error'});
    }
};


exports.getBookingsById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate({
            path : 'showTime',
            populate: [
                {path: 'movie'},
                {path : 'theatre'}
            ]
        });

        if(!booking) return res.status(404).json({message : 'Booking not found'});

        if(booking.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message : 'Forbidden'});
        }

        res.json(booking);

    }
    catch(err) {
        res.status(500).json({message : 'Server error'});
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if(!booking) return res.status(404).json({message: 'Booking not found'});

        if(booking.user.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Forbidden'});
        }

        const showtime = await Showtime.findById(booking.showTime);
        showtime.seats = showtime.seats.map(s => {
            if(booking.seats.includes(s.seatNumber)){
                s.isBooked = false;
            }
            return s;
        });
        await showtime.save();

        await booking.deleteOne();

        res.json({message : 'Booking cancelled and seats released'});
    }
    catch(err){
        res.status(500).json({message: 'Server error'});
    }
};

