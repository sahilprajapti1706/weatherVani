import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import sunImage from '../images/sun.png'
import moonImage from '../images/moon.png'
import arrowImage from '../images/direction-arrow.png'

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const HourlyForecast = ({ forecastData }) => {
  const [todayForecast, setTodayForecast] = useState([]);
  
  useEffect(() => {
    if (forecastData) {
      const today = dayjs().format('YYYY-MM-DD'); // Get today's date in 'YYYY-MM-DD' format
      
      // Filter the forecast data to only include entries for today
      const filteredData = forecastData.list.filter(item => item.dt_txt.startsWith(today));
      
      // Format the filtered data (convert temp to Celsius and time to 12-hour format)
      const formattedData = filteredData.map(item => {
        const time = dayjs(item.dt_txt).format('h A'); // Format time in 12-hour format
        const temperature = item.main.temp; 
        const windSpeed = item.wind.speed; 
        const windDeg = item.wind.deg; 
        
        return {
          time,
          temperature,
          windSpeed,
          windDeg
        };
      });

      // Set the formatted forecast data to the state
      setTodayForecast(formattedData);
    }
  }, [forecastData]); // Re-run this effect when forecastData changes

  // Function to render the icon based on it's time of the day
  const renderIcon = (time) => {
    // Check if the time is 6 AM, 9 AM, 12 PM, or 3 PM to display sun image, else display moon image
    if (time === "6 AM" || time === "9 AM" || time === "12 PM" || time === "3 PM") {
      return sunImage;
    } else {
      return moonImage;
    }
  };
  
  return (
    <div className='overflow-x-auto pb-4 text-[#B9B6BF]'>
      {/* time and temperature */}
      <div className='flex justify-between gap-6'>
      {todayForecast.map((item, index) => (
        <div key={index} className='bg-[#1D1C1F] text-lg flex flex-col items-center py-5 min-w-24 flex-[1_1_100%] rounded-xl'>
          <p className='mb-3'>{item.time}</p>
          <img src={renderIcon(item.time)} 
            alt="weather icon" className="h-9"
          />
          <p className='mt-3'>{item.temperature}&deg;C</p>
        </div>
       ))}
      </div>

      {/* time and wind speed */}
      <div className='flex justify-between gap-6 mt-5'>
        {todayForecast.map((item, index) => (
          <div key={index} className='bg-[#1D1C1F] text-lg flex flex-col items-center py-5 min-w-24 flex-[1_1_100%] rounded-xl'>
            <p className='mb-3'>{item.time}</p>
            <img src={arrowImage} alt="Wind Direction" className='h-9' style={{ transform: `rotate(${item.windDeg}deg)`}} />
            <p className='mt-3'>{item.windSpeed}km/h</p>
          </div>
         ))}
      </div>

    </div>
  )
}

export default HourlyForecast