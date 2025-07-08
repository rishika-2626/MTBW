const Movie = require('../models/movies');
const Theatre = require('../models/theatres');
const Showtime = require('../models/showtimes');

exports.getAllMovies = async (req, res) => {
    try {
        const genre = req.query.genre;
        const language = req.query.language;

        const filter = {};   
        if (genre) filter.genre = genre; 
        if (language) filter.language = language;

        const movies = await Movie.find(filter); 
        res.status(200).json(movies);
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
    }
};


exports.getMovieById = async (req, res) => {
    try{
        const movie = await Movie.findById(req.params.id);
        if(!movie) return res.status(404).json({message : 'Movie not found'});

        res.status(200).json(movie);
    }
    catch(err){
        res.status(500).json({message : 'Server error'});
    }
};

exports.getTheatresForMovie = async (req, res) => {
    try {
        const movieId = req.params.id;
        const showtimes = await Showtime.find({movie : movieId}).populate('theatre');
    }
    catch(err){

    }
};





