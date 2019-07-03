const express = require('express');
const Schema = express.Schema;
const mongoose = require('mongoose');

const movieSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: 2019  // Will need to be updated every year
    },
    daily_price: {
        type: Number,
        required: true
    },
    overage_multiple: {  // factor by which to multiply daily_price to get late fees per day
        type: Number,
        default: 1.5
    },
    genre: {
        type: String,
        enum: ['Fantasy', 'Comedy', 'Sci-Fi', 'Documentary', 'Thriller', 'Suspense', 'Action', 'Horror']
    },
    length: Number  // Minutes
});

movieSchema.virtual('dailyOverage').get(function() {
    // this is the cost per day of late returns
    return this.daily_price * this.overage_multiple;
});

module.exports = mongoose.model('Movie', movieSchema);