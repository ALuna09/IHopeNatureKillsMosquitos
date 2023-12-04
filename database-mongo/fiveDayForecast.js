const mongoose = require('mongoose');
require('./index.js');

const futureForecastSchema = mongoose.Schema({
    nextFiveDays: []
});

const ForecastModel = mongoose.model('Forecast', futureForecastSchema);
module.exports = ForecastModel;