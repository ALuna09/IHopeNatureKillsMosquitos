const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
require('./database-mongo/index.js');
const path = require('path');

const WeatherModel = require('./database-mongo/WeatherSchema.js');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.static(`${__dirname}/../dist`));

// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + `../dist/index.html`)
});

app.get('/test', (req, res) => {
    res.send(`Hello World!`)
})

app.get('/weather/:city/:units', async (req, res) => {
    let queriedCity = req.params.city;
    let units = req.params.units;

    let textDay;
    let date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const dayOfTheWeek = date.getDay();
    switch (dayOfTheWeek) {
        case 0:
            textDay = `Sunday`;
            break;
        case 1:
            textDay = `Monday`;
            break;
        case 2:
            textDay = `Tuesday`;
            break;
        case 3:
            textDay = `Wednesday`;
            break;
        case 4:
            textDay = `Thursday`;
            break;
        case 5:
            textDay = `Friday`;
            break;
        case 6:
            textDay = `Saturday`;
            break;
        default:
            console.log(`Invalid Date`);
            break;
    }
    const fullDate = `${textDay}, ${month}/${day}/${year}`;
    
    const condition = await WeatherModel.exists({
        city: queriedCity, 
        lastSearched: fullDate, 
        unitsOfMeasurement: units
    });
    
    if(condition) {
        // Look for and present data if match is found in our db
        const desiredWeatherObj = await WeatherModel.find({city: queriedCity, unitsOfMeasurement: units});
        res.send(desiredWeatherObj[0]);

    } else {
        // Deletion of data in our db to avoid duplicates/ conflicting forecasts
        await WeatherModel.findOneAndDelete({city: queriedCity, unitsOfMeasurement: units});

        // First fetch for current day forcast
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${queriedCity}&units=${units}&appid=${process.env.API_KEY}`)
        .then(res => res.json())
        .then(data => {
            const {list} = data;
            // console.log('Data:', data);

            const initialSearchedDate = list[0]; 

            // organize data in accordance with our schema
            const cityWeatherData = new WeatherModel({
                city: data.city.name,
                unitsOfMeasurement: units,
                lastSearched: fullDate,
                temp: Math.round(initialSearchedDate.main.temp),
                high: Math.round(initialSearchedDate.main.temp_max),
                low: Math.round(initialSearchedDate.main.temp_min),
                description: initialSearchedDate.weather[0].main,
                icon: initialSearchedDate.weather[0].icon,
                wind: {
                    speed: initialSearchedDate.wind.speed,
                    deg: initialSearchedDate.wind.deg,
                    gust: initialSearchedDate.wind.gust
                },
                nextFiveDays: [
                    list[0], 
                    list[8], 
                    list[16], 
                    list[24], 
                    list[32]
                ]
            });

            // save our schemas with the data
            cityWeatherData.save();
    
            res.send(cityWeatherData);
        })
        .catch(err => console.error(err))
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`Remember to start MongoDB through services.msc (win + R)`);
})


// https://api.openweathermap.org/data/2.5/weather?q=${queriedCity}&units=${units}&appid=${process.env.API_KEY}