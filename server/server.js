const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
require('../database-mongo/index.js');

const WeatherModel = require('../database-mongo/WeatherSchema.js');

const app = express();
const PORT = 8080;

app.use(cors());

app.get('/weather/:city/:units', async (req, res) => {

    let date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = `${month}/${day}/${year}`;

    let condition = await WeatherModel.exists({city: req.params.city, lastSearched: fullDate});

    //If city exists in our db but lastSearched doesn't match todays date then we move into else statement and fetch data
    if(condition) {
        const desiredWeatherObj = await WeatherModel.find({city: req.params.city});
        res.send(desiredWeatherObj[0]);

    } else {
        await WeatherModel.findOneAndDelete({city: req.params.city});

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&units=${req.params.units}&appid=${process.env.API_KEY}`)
        .then(res => res.json())
        .then(data => {

            const cityWeatherData = new WeatherModel({
                city: data.name,
                temp: Math.round(data.main.temp),
                high: Math.round(data.main.temp_max),
                low: Math.round(data.main.temp_min),
                description: data.weather[0].main,
                icon: data.weather[0].icon,
                lastSearched: fullDate
            });

            cityWeatherData.save();
    
            res.send(cityWeatherData);
            // res.send(data);
        })
        .catch(err => console.error(err))
    }
});

app.get('/', (req, res) => {
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})