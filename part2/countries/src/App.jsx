import { useState, useEffect } from "react";
import countriesService from "./services/countries";
import weatherService from "./services/weather";
import Country from "./components/country";
import Weather from "./components/weather";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [showCountry, setShowCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    countriesService.getAll().then((data) => {
      setCountries(data);
      setLoading(false);
    });
  }, []);

  const countriesToShow =
    filter === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase()),
        );

  const handleFilterCountries = (event) => {
    setFilter(event.target.value);
    setShowCountry(null); // Reset showCountry when filter changes
  };

  const handleSHowCountryWithWeather = (country) => {
    setShowCountry(country);
    weatherService.getWeatherByCountry(country).then((weather) => {
      setShowCountry({ ...country, weather });
    });
  };

  return (
    <div>
      <p>
        {loading
          ? "Loading data from server..."
          : countries.length + " countries loaded"}
      </p>
      find countries <input onChange={handleFilterCountries} />
      <ul>
        {countriesToShow.length >= 10
          ? "Too many matches, specify another filter"
          : countriesToShow.map((country) => (
              <li key={country.name.common}>
                {country.name.common}{" "}
                {countriesToShow.length === 1 ? null : (
                  <button onClick={() => handleSHowCountryWithWeather(country)}>
                    show
                  </button>
                )}
              </li>
            ))}
      </ul>
      {(showCountry || countriesToShow.length === 1) && (
        <>
          <Country country={showCountry || countriesToShow[0]} />
          <Weather
            weather={
              showCountry ? showCountry.weather : countriesToShow[0].weather
            }
          />
        </>
      )}
    </div>
  );
}

export default App;
