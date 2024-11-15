import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const WeatherContext = createContext();

const WeatherContextProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("New Delhi");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDaysForecast, setFiveDaysForecast] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (city) fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((response) => {
        setAirQualityData(response.data.list[0]);
      })
      .catch((error) => console.error("Error fetching air quality data:", error));
  };

  const fetchWeatherData = (cityOrLat, lon = null) => {
    let url = lon
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${cityOrLat}&lon=${lon}&units=metric&appid=${API_KEY}`
      : `https://api.openweathermap.org/data/2.5/weather?q=${cityOrLat}&units=metric&appid=${API_KEY}`;

    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        setError(false);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${API_KEY}`
          )
          .then((response) => {
            setFiveDaysForecast(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching 5-day forecast data:", error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError(true);
        setLoading(false);
      });
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
    
  };

  const value = {
    weatherData,
    airQualityData,
    fetchWeatherData,
    fiveDaysForecast,
    error,
    loading,
    handleSearch,
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherContextProvider;
