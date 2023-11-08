const mongoose = require('mongoose');
require('./index.js');

const weatherSchema = mongoose.Schema({
    city: String,
    unitsOfMeasurement: String,
    lastSearched: String,
    description: String,
    icon: String,
    high: Number,
    low: Number,
    temp: Number,
    wind: {
        speed: Number,
        deg: Number,
        gust: Number
    }
});

const WeatherModel = mongoose.model('Weather', weatherSchema);

module.exports = WeatherModel;