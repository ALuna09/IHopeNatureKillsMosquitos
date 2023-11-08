const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
require('../database-mongo/index.js');
const path = require('path');

const WeatherModel = require('../database-mongo/WeatherSchema.js');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/weather/:city/:units', async (req, res) => {

    let date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = `${month}/${day}/${year}`;
    
    // // TODO: Include units to differentiate between the same city and prefered measurements
    const condition = await WeatherModel.exists({
        city: req.params.city, 
        lastSearched: fullDate, 
        unitsOfMeasurement: req.params.units
    });
    
    //If city exists in our db but lastSearched doesn't match todays date then we move into else statement and fetch data
    if(condition) {
        const desiredWeatherObj = await WeatherModel.find({city: req.params.city});
        res.send(desiredWeatherObj[0]);

    } else {
        await WeatherModel.findOneAndDelete({city: req.params.city});

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&units=${req.params.units}&appid=${process.env.API_KEY}`)
        .then(res => res.json())
        .then(data => {

            console.log('Data:', data);

            const cityWeatherData = new WeatherModel({
                city: data.name,
                unitsOfMeasurement: req.params.units,
                lastSearched: fullDate,
                temp: Math.round(data.main.temp),
                high: Math.round(data.main.temp_max),
                low: Math.round(data.main.temp_min),
                description: data.weather[0].main,
                icon: data.weather[0].icon,
                wind: {
                    speed: data.wind.speed,
                    deg: data.wind.deg,
                    gust: data.wind.gust
                }
            });

            cityWeatherData.save();
    
            res.send(cityWeatherData);
            // res.send(data);
        })
        .catch(err => console.error(err))

        // fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${req.params.city}&units=${req.params.units}&appid=${process.env.API_KEY}`)
        // .then(res => res.json())
        // .then(data => {
        //     console.log(`Hi I'm the "daily" weather data`, data);

            //! Doesn't work. API Key is invalid because paid subscription is needed
        // })
    }
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`)
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Remember to start MongoDB through services.msc (win + R)`);
})