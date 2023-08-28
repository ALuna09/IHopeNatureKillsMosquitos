import { useState } from "react";

const Search = (props) => {

    const [city, setCity] = useState('');

    const getCityWeather = (searchedCity) => {
        fetch(`http://localhost:8080/weather?id=poop`)
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.error(err))
    }

    const handleChange = (e) => {
        console.log(`This is e.target.value:`, e.target.value);
        setCity(e.target.value)
        console.log('This was city before change:', city);
    }

    return (
        <>
            <input
                type="text"
                placeholder="Search City"
                onChange={(e) => handleChange(e)}
            ></input>
            <button
                onClick={() => getCityWeather(city)}
            >Search</button>
        </>
    )
}

export default Search;