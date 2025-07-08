const Theatre = require('../../models/theatres');
const Showtime = require('../../models/showtimes');

exports.getAllTheatres = async (req, res) => {
    try {
        const theatres = await Theatre.find(); // no parameter --> gets all documents
        res.status(200).json(theatres);
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
    }
};

exports.getTheatreById = async (req, res) => {
    try {
        const theatre = await Theatre.findById(req.params.id);
        if(!theatre) return res.status(404).json({message: 'Theatre not found'});

        res.status(200).json(theatre);
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
    }
};

exports.getShowtimesForTheatre = async (req, res) => {
    try {
        const theatreId = req.params.id;
        const showtimes = await Showtime.find({theatre : theatreId}).populate('movie'); //Find all showtimes for this theatre, and include the full movie details for each showtime.”
        res.status(200).json(showtimes);
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
    }
};


