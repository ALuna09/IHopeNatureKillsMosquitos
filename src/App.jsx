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
  const [windSpeed, setWindSpeed] = useState(0); //TODO: Organize wind details
  const [windDegree, setWindDegree] = useState(0);
  const [gust, setGust] = useState(0);

  let image = `http://openweathermap.org/img/wn/${icon}@2x.png`

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
    </>
  )
}

export default App
