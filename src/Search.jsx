const Search = (props) => {

    const {
        city,
        setCity,
        setIcon,
        setDescription,
        setTemperature,
        setTempMin,
        setTempMax,
        units,
        unitToggle,
        setSearchedCity,
        setWindSpeed,
        setWindDegree,
        setGust,
        setFiveDayForecast
    } = props;

    const getCityWeather = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/weather/${city}/${units}`)
            .then(res => res.json())
            .then(data => {
                console.log(`Data from Search.jsx Component:`, data);
                const {cityWeatherData, futureForecasts} = data;

                //set all desired states with weather data
                setIcon(cityWeatherData.icon);
                setDescription(cityWeatherData.description);
                setTemperature(Math.round(cityWeatherData.temp));
                setTempMax(Math.round(cityWeatherData.high));
                setTempMin(Math.round(cityWeatherData.low));
                setSearchedCity(cityWeatherData.city);
                setWindSpeed(cityWeatherData.wind.speed);
                setWindDegree(cityWeatherData.wind.deg);
                setFiveDayForecast(futureForecasts.nextFiveDays);

                // if cityWeatherData.wind.gust is not present we will just set gust to 0
                cityWeatherData.wind.gust ? setGust(cityWeatherData.wind.gust) : setGust(0);
            })
            .catch(err => console.error(err))
    }

    const citySetter = (e) => {
        e.preventDefault();
        setCity(e.target.value);
    }

    return (
        <>
            <form
                onSubmit={(e) => getCityWeather(e)}
            >
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search City"
                    onChange={(e) => citySetter(e)}
                ></input>
                <button
                    type="submit"
                    className="search-btn"
                >Search</button>
                <button
                    className="units-btn"
                    onClick={() => unitToggle()}
                >{units === 'imperial' ? 'Imperial' : 'Metric'}</button>
            </form>
        </>
    )
}

export default Search;