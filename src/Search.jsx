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
        setGust
    } = props;

    const getCityWeather = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/weather/${city}/${units}`)
            .then(res => res.json())
            .then(data => {
                console.log(`Data from Search.jsx Component:`, data);
                setIcon(data.icon);
                setDescription(data.setDescription);
                setTemperature(Math.round(data.temp));
                setTempMax(Math.round(data.high));
                setTempMin(Math.round(data.low));
                setSearchedCity(data.city);
                setWindSpeed(data.wind.speed);
                setWindDegree(data.wind.deg);

                data.wind.gust ? setGust(data.wind.gust) : setGust(0);
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