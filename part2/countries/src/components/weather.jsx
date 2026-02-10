export default function Weather({ weather }) {
  if (!weather) {
    return null; // Return null if weather data is not available
  }
  return (
    <div>
      <h2>Weather in {weather.location.name}</h2>
      <p>temperature {weather.current.temp_c} Celsius</p>
      <img
        src={weather.current.condition.icon}
        alt={weather.current.condition.text}
      />
      <p>
        wind {weather.current.wind_kph} kph direction {weather.current.wind_dir}
      </p>
    </div>
  );
}
