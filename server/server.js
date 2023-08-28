// import express from 'express';
// import dotenv from 'dotenv';
// const fs = require("fs/promises"); //probably un-needed
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());

app.get('/weather/:id', (req, res) => {
    // res.send("Hi I'm the weather end point");
    console.log('Hi, I was reached', req.query);
});

app.get('/', (req, res) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=Vallejo&appid=${process.env.API_KEY}`)
    .then( res => res.json() )
    .then( data => {
        res.send(data);
    })
    .catch( err => console.error(err))
});

app.listen(PORT, () => {
    console.log(`We evesdroppin on port ${PORT}`);
})