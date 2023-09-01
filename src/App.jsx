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

  let image = `http://openweathermap.org/img/wn/${icon}.png`

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
        />
        
      </div>
      {icon ? <img src={image} alt={description}></img> : <></>}
      <hr></hr>
      <p>Currently looks like: <strong>{description}</strong></p>
      <p>Temp:</p>
      <h2>{temperature? temperature : '-'}°</h2>
      <p>H: <strong>{tempMax ? tempMax : '-'}°</strong></p>
      <p>L: <strong>{tempMin ? tempMin : '-'}°</strong></p>
      
    </>
  )
}

export default App
