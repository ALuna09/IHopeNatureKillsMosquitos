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
        unitToggle
    } = props;

    const getCityWeather = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/weather/${city}/${units}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIcon(data.weather[0].icon);
                setDescription(data.weather[0].description);
                setTemperature(data.main.temp);
                setTempMax(data.main.temp_max);
                setTempMin(data.main.temp_min);
            })
            .catch(err => console.error(err))
    }

    const handleChange = (e) => {
        setCity(e.target.value)
    }

    return (
        <>
            <form
                onSubmit={(e) => getCityWeather(e)}
            >
                <input
                    type="text"
                    placeholder="Search City"
                    onChange={(e) => handleChange(e)}
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