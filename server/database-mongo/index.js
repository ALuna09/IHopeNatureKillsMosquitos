const mongoose = require('mongoose');
const dotenv = require("dotenv").config();

// var mongoConnectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_CONNECT_NAME}?authSource=${process.env.DB_AUTH_NAME}`
var mongoConnectionString = `mongodb://root:password@host.docker.internal:27017/weatherDB?authSource=admin`;

mongoose.connect(mongoConnectionString)

const weatherDB = mongoose.connection;

weatherDB.on('error', function() {
  console.log('mongoose connection error');
});

weatherDB.once('open', function() {
  console.log('Mongoose connected successfully!');
});

module.exports = weatherDB;