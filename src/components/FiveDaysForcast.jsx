import React from "react";
import dayjs from 'dayjs';

const FiveDaysForcast = ({ forecastData }) => {

  // Format the timestamp 
  const formatDate = (timestamp) => {
    return dayjs.unix(timestamp).format('DD MMM');
  };

  // Filter to get only distinct days
  const filteredForecast = forecastData.list.filter((item, index, self) => {
    const currentDate = dayjs.unix(item.dt).format('DD'); // Extract day from timestamp
    // Only keep the first instance of each day
    return index === self.findIndex((i) => dayjs.unix(i.dt).format('DD') === currentDate);
  });

  return (
    <div className="bg-[#1D1C1F] text-[#B9B6BF] rounded-3xl py-6 px-6 mt-5 lg:w-[380px]">
      {filteredForecast.slice(0, 5).map((item, index) => (
        <div key={index} className="my-4 grid grid-cols-3 items-center">
          <p className="text-base font-bold">
            {Math.round(item.main.temp)}&deg;C
          </p>
          <p className="text-[15px] font-bold">
            {formatDate(item.dt)}
          </p>
          <p className="text-sm">{item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );

};

export default FiveDaysForcast;
