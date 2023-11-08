const mongoose = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/weatherDB')

const weatherDB = mongoose.connection;

weatherDB.on('error', function() {
  console.log('mongoose connection error');
});

weatherDB.once('open', function() {
  console.log('Mongoose connected successfully!');
});

module.exports = weatherDB;