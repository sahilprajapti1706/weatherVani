import React from "react";
import dayjs from 'dayjs';

import sunImage from '../images/sun.png'
import snowImage from '../images/snow.png'
import cloudImage from '../images/cloud.png'

const MainWeather = ({ weatherData }) => {

    const temperatureInCelsius = weatherData.main.temp || 'N/A';
    const weatherDescription = weatherData.weather[0].description || 'N/A';
    const cityName = weatherData.name || 'city not available';
    const countryName = weatherData.sys.country || 'country not available';
    const timeStamp = weatherData.dt || null;

    // Format the current date
    const currentDate = timeStamp
    ? dayjs.unix(timeStamp).format('dddd, D MMM') // Format: "Monday, 5 Oct"
    : "date not available";

    // Function to render the temperature icon based on the temperature
    const renderTemperatureIcon = ()=>{
      if(temperatureInCelsius > 23){
          return sunImage;
      } else if(temperatureInCelsius < 10){
          return snowImage;
      } else {
          return cloudImage;
      }
  }

  return (
    <div className="font-nunitoSans bg-[#1D1C1F] text-white rounded-3xl p-8">
      <div className="text-md mb-1">Now</div>
      <div className="text-4xl font-bold flex items-center justify-around">
        {temperatureInCelsius}&deg;C
        <img src={renderTemperatureIcon(temperatureInCelsius)} 
          alt="weather icon" className="h-16" 
        />
      </div>

      <div className="text-base mt-2 font-bold capitalize text-[#B9B6BF] pb-1 border-b-2 border-[#3E3D40]">
        {weatherDescription}
      </div>

      <div className="mt-3">
        <div className="flex items-center">
            <i className="ri-calendar-line mr-2 text-[#B9B6BF]"></i>
            <p className="text-[#7B7980]">{currentDate}</p>
        </div>

        <div className="mt-1 flex items-center">
            <i className="ri-map-pin-2-line mr-2 text-[#B9B6BF]"></i>
            <p className="text-[#7B7980]">{cityName}, {countryName}</p>
        </div>
      </div>

    </div>
  );
};

export default MainWeather;
