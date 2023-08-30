import './App.css'
import Search from './Search.jsx'
import { useState } from 'react'

function App() {
  const [city, setCity] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [tempMin, setTempMin] = useState('');

  let image = `http://openweathermap.org/img/wn/${icon}.png`

  return (
    <>
      <h2>Curious about the Outside?</h2>
      <h5>Look up your city</h5>
      <Search 
        city={city}
        setCity={setCity}
        setIcon={setIcon}
        setDescription={setDescription}
        setTempMax={setTempMax}
        setTempMin={setTempMin}
      />
      {icon === '' ? <></> : <img src={image}></img>}
      <p>Currently looks like: <strong>{description}</strong></p>
      <p>H: <strong>{tempMax ? tempMax : '-'}°</strong></p>
      <p>L: <strong>{tempMin ? tempMin : '-'}°</strong></p>
    </>
  )
}

export default App

// const [count, setCount] = useState(0)

// return (
//   <>
//     <div>
//       <a href="https://vitejs.dev" target="_blank">
//         <img src={viteLogo} className="logo" alt="Vite logo" />
//       </a>
//       <a href="https://react.dev" target="_blank">
//         <img src={reactLogo} className="logo react" alt="React logo" />
//       </a>
//     </div>
//     <h1>Vite + React</h1>
//     <div className="card">
//       <button onClick={() => setCount((count) => count + 1)}>
//         count is {count}
//       </button>
//       <p>
//         Edit <code>src/App.jsx</code> and save to test HMR
//       </p>
//     </div>
//     <p className="read-the-docs">
//       Click on the Vite and React logos to learn more
//     </p>
//   </>
// )