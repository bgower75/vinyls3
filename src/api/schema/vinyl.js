const mongoose = require('mongoose');

const vinylSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the name of the vinyl']
    },
    artist: {
        type: String,
        required: [true, 'Please enter the artist name']
    },
    year: {
        type: Number,
        required: [true, 'Please enter the year the vinyl was released']
    },
    genre: {
        type: String,
        required: [true, 'Please enter the genre category for the vinyl']
    }
});

module.exports = vinylSchema;