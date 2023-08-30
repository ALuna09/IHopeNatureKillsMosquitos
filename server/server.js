const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());

app.get('/weather/:city', (req, res) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${process.env.API_KEY}`)
    .then( res => res.json() )
    .then( data => {
        res.send(data);
    })
    .catch( err => console.error(err))
});

app.get('/', (req, res) => {
});

app.listen(PORT, () => {
    console.log(`We evesdroppin on port ${PORT}`);
})