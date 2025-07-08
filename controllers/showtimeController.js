const Showtime = require('../models/showtimes');

exports.getAllShowtimes = async (req, res) => {
    try {
        const showtimes = await Showtime.find().populate('movie theater');
        res.status(200).json(showtimes);
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
    }
};


exports.getShowtimeById = async (req, res) => {
    try {
        const showtime = await Showtime.findById(req.params.id).populate('movie theatre');
        if(!showtime) return res.status(404).json({message : 'Showtime not found'});

        res.status(200).json(showtime);
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
    }
};


exports.getShowtimesForMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const showtimes = await Showtime.find({ movie : movieId}).populate('theatre');
        res.status(200).json(showtimes);
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
    }
};

