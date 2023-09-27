const mongoose = require('mongoose');
require('./index.js');

const weatherSchema = mongoose.Schema({
    city: String,
    description: String,
    icon: String,
    high: Number,
    low: Number,
    temp: Number,
    lastSearched: String
});

const WeatherModel = mongoose.model('Weather', weatherSchema);

module.exports = WeatherModel;