import axios from 'axios'
const baseUrl = 'http://api.weatherapi.com/v1'
const apiKey =import.meta.env.VITE_REACT_APP_WEATHER_API_KEY

const getWeatherByCountry = (country) => {
    const request = axios.get(`${baseUrl}/current.json?q=${country.capital}&key=${apiKey}&aqi=no`)
    return request.then(response => response.data)
}

export default { getWeatherByCountry }