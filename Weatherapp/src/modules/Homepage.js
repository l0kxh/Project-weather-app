import axios from "axios";
import { useState } from "react"
import CityComponent from "./CityComponent.js";
import WeatherComponent from "./WeatherInfoComponent";
import './Homepage.css'
import ForecastComponents from "./ForecastComponents.js";
const API_K = "452c0f36bef65e371e0fef4d0aa653ce";
function Homepage() {
  const [city, updateCity] = useState();
  const [weather, updateWeather] = useState();
  const [forecastWeatherData, setForecastWeatherData] = useState();
  const [forecastData, setForecastData] = useState();
  const saveLocation = async (position) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_K}`);
    updateWeather(response.data);
    updateCity(response.data.name);
  }
  const fetchLoc = async (e) => {
    e.preventDefault();
    await window.navigator.geolocation.getCurrentPosition(saveLocation)
  }
  const fetchWeather = async (e) => {
    e.preventDefault();
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_K}`)
    updateWeather(response.data);
  }
  const forecastWeather = async () => {  
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=452c0f36bef65e371e0fef4d0aa653ce`)
    setForecastData(response.data);
    console.log(response.data)
  }
  if (city !== undefined) {
    forecastWeather();
  }
  return (
    <>
    <div className="text-dark Box col-8 col-sm-6 col-md-4 mx-auto block">
      <div className="applabel"> WEATHER FORECAST </div>
      {weather  ? (
          <WeatherComponent weather={weather} forecastWeatherData={forecastWeatherData} />
      ) : (
            <CityComponent updateCity={updateCity} fetchWeather={fetchWeather}  fetchLoc={fetchLoc} />
      )}
      </div>
      {weather && forecastData!==undefined ? (
        <ForecastComponents data={forecastData?.list} setForecastWeatherData={setForecastWeatherData} />
      ) : (<></>)}
    </>
  );
}
export default Homepage;
