const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title : {type: String, required: true},
    description: String,
    duration: Number,
    genre: [String], // means array of strings
    releaseDate: Date,
    language: String,
    createdAt: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Movie', movieSchema);
