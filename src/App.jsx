import { useContext, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

import Navbar from "./components/Navbar";
import MainWeather from "./components/MainWeather";
import TodaysHighlights from "./components/TodaysHighlights";
import FiveDaysForcast from "./components/FiveDaysForcast";
import WeatherMap from "./components/WeatherMap";
import HourlyForecast from "./components/HourlyForecast";
import Footer from "./components/Footer";
import ErrorPage from "./components/ui/ErrorPage";
import Loader from "./components/ui/Loader";
import { WeatherContext } from "./context/WeatherContext";

function App() {
  const {
    weatherData,
    airQualityData,
    fetchWeatherData,
    fiveDaysForecast,
    error,
    loading,
    handleSearch,
  } = useContext(WeatherContext);

  return (
    <div className="bg-[#100E17]">
      <Navbar onSearch={handleSearch} fetchWeatherData={fetchWeatherData} />

      {/* Display loader when loading state is true and ErrorPage if there's an error */}
      {loading ? (
        <Loader height="h-screen" />
      ) : error ? (
        <ErrorPage />
      ) : (
        weatherData &&
        airQualityData && (
          <div className="font-nunitoSans flex flex-col px-3 md:flex-row md:justify-around lg:px-8 gap-5">
            <div>
              <MainWeather weatherData={weatherData} />
              <p className="text-xl font-bold mt-5 ml-1 text-white">
                5 Days Forecast
              </p>
              {fiveDaysForecast && (
                <FiveDaysForcast forecastData={fiveDaysForecast} />
              )}
              <WeatherMap />
            </div>

            <div className="flex flex-col gap-5">
              <TodaysHighlights
                weatherData={weatherData}
                airQualityData={airQualityData}
              />
              <p className="text-xl font-bold ml-1 text-white">Today at</p>
              <HourlyForecast forecastData={fiveDaysForecast} />
            </div>
          </div>
        )
      )}

      <Footer />
    </div>
  );
}

export default App;
