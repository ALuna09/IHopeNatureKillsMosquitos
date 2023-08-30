const Search = (props) => {

    const {
        city,
        setCity,
        setIcon,
        setDescription,
        setTempMin,
        setTempMax
    } = props;

    const getCityWeather = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/weather/${city}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setIcon(data.weather[0].icon);
                setDescription(data.weather[0].description);
                setTempMax(Math.round((data.main.temp_max - 273.15) * 9 / 5 + 32));
                setTempMin(Math.round((data.main.temp_min - 273.15) * 9 / 5 + 32));
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
            </form>
        </>
    )
}

export default Search;