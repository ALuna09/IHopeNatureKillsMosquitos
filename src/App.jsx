import './App.css'
import Search from './Search.jsx'
import { useState } from 'react'

function App() {
  const [city, setCity] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [temperature, setTemperature] = useState(0);
  const [tempMax, setTempMax] = useState('');
  const [tempMin, setTempMin] = useState('');
  const [units, setUnits] = useState('imperial');
  const [searchedCity, setSearchedCity] = useState('');
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDegree, setWindDegree] = useState(0);
  const [gust, setGust] = useState(0);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  let image = `http://openweathermap.org/img/wn/${icon}@2x.png`

  const textDays =[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  const unitToggle = () => {
    if (units === 'imperial') {
      setUnits('metric');
      return;
    }

    if (units === 'metric') {
      setUnits('imperial');
      return;
    }
  }

  const forecastsIntoElements = (forecasts) => {
    let collectionOfElements = [];

    //! Important properties of "day":
    // day.main.temp_max
    // day.main.temp_min
    // day.weather[0].icon
    // day.weather[0].main
    let id = 0;

    for(let day of forecasts) {
      let forecastedIcon = day.weather[0].icon;
      let description = day.weather[0].main;
      let max = Math.round(day.main.temp_max);
      let min = Math.round(day.main.temp_min);
      let date = new Date(day.dt_txt);

      let element = (
        <li key={id}>
          <strong>{textDays[date.getDay()]}</strong>
          <p>{description}</p>
          <img src={`http://openweathermap.org/img/wn/${forecastedIcon}.png`} alt={description}></img>
          <p>H: {max} L: {min}</p>
        </li>
      );

      collectionOfElements.push(element);

      id++;
    }

    return collectionOfElements;
  }

  return (
    <>
      <div
        className='heading'
      >
        <Search 
          city={city}
          setCity={setCity}
          setIcon={setIcon}
          setDescription={setDescription}
          setTemperature={setTemperature}
          setTempMax={setTempMax}
          setTempMin={setTempMin}
          units={units}
          unitToggle={unitToggle}
          setSearchedCity={setSearchedCity}
          setWindSpeed={setWindSpeed}
          setWindDegree={setWindDegree}
          setGust={setGust}
          setFiveDayForecast={setFiveDayForecast}
        />
      </div>

      <div
        className='focus-info'
      >
        <h2>{searchedCity}</h2>
        <h2>{temperature ? temperature : '-'}°</h2>
        {icon ? <img src={image} alt={description}></img> : <></>}
        <p><strong>{description}</strong></p>
        <p>H: <strong>{tempMax ? tempMax : '-'}°</strong> L: <strong>{tempMin ? tempMin : '-'}°</strong></p>
      </div>

      <hr></hr>

      {searchedCity ? 
        <div
          className='wind-details'
        >
          <h2>Wind</h2>
          <p>Speed: {windSpeed}</p>
          <p>Degrees: {windDegree}</p>
          {gust === 0 ? <></> : <p>Gust: {gust}</p>}
        </div>
        : <></>
      }

      {fiveDayForecast ? 
        <ol className='forecasts'>
          {forecastsIntoElements(fiveDayForecast)}
        </ol>
        : <></>
      }
    </>
  )
}

export default App
