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
        setSearchedCity
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
                    placeholder="Search City"
                    onChange={(e) => citySetter(e)}
                ></input>
                <button
                    type="submit"
                >Search</button>
                <button
                    onClick={() => unitToggle()}
                >{units === 'imperial' ? 'Imperial' : 'Metric'}</button>
            </form>
        </>
    )
}

export default Search;