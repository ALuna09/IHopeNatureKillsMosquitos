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
    let queriedCity = req.params.city;
    let units = req.params.units;

    let date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fullDate = `${month}/${day}/${year}`;
    
    const condition = await WeatherModel.exists({
        city: queriedCity, 
        lastSearched: fullDate, 
        unitsOfMeasurement: units
    });
    
    if(condition) {
        const desiredWeatherObj = await WeatherModel.find({city: queriedCity, unitsOfMeasurement: units});
        res.send(desiredWeatherObj[0]);

    } else {
        await WeatherModel.findOneAndDelete({city: queriedCity, unitsOfMeasurement: units});

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${queriedCity}&units=${units}&appid=${process.env.API_KEY}`)
        .then(res => res.json())
        .then(data => {

            console.log('Data:', data);

            // organize data in accordance with our schema
            const cityWeatherData = new WeatherModel({
                city: data.name,
                unitsOfMeasurement: units,
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
        })
        .catch(err => console.error(err))
    }
});

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`)
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Remember to start MongoDB through services.msc (win + R)`);
})