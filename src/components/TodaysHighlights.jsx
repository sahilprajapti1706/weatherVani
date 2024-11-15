import React from 'react'
import dayjs from 'dayjs';
import HighlightBox from './HighlightBox';

const TodaysHighlights = ({weatherData, airQualityData}) => {

    const {main, visibility, sys} = weatherData;
    const airQualityIndex = airQualityData?.main?.aqi; 
    const {co, no, no2, o3, nh3, so2} = airQualityData?.components || {};

    const renderAirQualityDescription = (aqi) => {
        switch (aqi) {
          case 1:
            return "Good";
          case 2:
            return "Fair";
          case 3:
            return "Moderate";
          case 4:
            return "Poor";
          case 5:
            return "Very Poor";
          default:
            return "Unknown";
        }
    };

    const highlights = [
        { title: "Humidity", 
            value: `${main.humidity}%`, 
            Icon: "ri-water-percent-line" 
        },
        {
          title: "Pressure",
          value: `${main.pressure}hPa`,
          Icon: "ri-arrow-up-down-fill",
        },
        {
          title: "Visibility",
          value: `${visibility / 1000}km`,
          Icon:  "ri-eye-line",
        },
        {
          title: "Feels Like",
          value: `${main.feels_like}°C`,
          Icon: "ri-temp-hot-line",
        },
    ];

    // Format the sunrise and sunset times 
    const formatTime = (timestamp) => {
        return dayjs.unix(timestamp).format('hh:mm A'); // Format: "hh:mm AM/PM"
    };

  return (
    <div className='bg-[#1D1C1F] text-white rounded-3xl px-7 py-8 font-nunitoSans'>
        <h2 className='text-xl font-bold'>Today's Highlights</h2>

        <div className='my-5'>
            {/* air quality */}
            <div className='bg-[#131214] text-white px-5 pt-5 pb-6 rounded-lg mt-3 lg:mt-5 w-full'>

                <div className='flex justify-between text-xl'>
                    <p className='text-[#B9B6BF]'>Air Quality Index</p>
                    <p className='text-base font-bold bg-[#89E589] text-[#2e502e] rounded-2xl flex items-center justify-items-center px-3'>
                        {renderAirQualityDescription(airQualityIndex)}
                    </p>
                </div>

                <div className='flex gap-5 justify-evenly'>
                    <i className="ri-windy-line text-4xl mt-6"></i>
                    <div className='mt-6 grid grid-cols-3 lg:grid-cols-6 gap-4'>
                        {/* <i className="ri-windy-line text-4xl"></i> */}
                        <div className='text-sm lg:text-base flex flex-col items-center'>
                            <p className='font-bold'>CO</p>
                            <p>{co} µg/m³</p>
                        </div>
                        <div className='text-sm lg:text-base flex flex-col items-center'>
                            <p className='font-bold'>NO</p>
                            <p>{no} µg/m³</p>
                        </div>
                        <div className='text-sm lg:text-base flex flex-col items-center'>
                            <p className='font-bold'>NO₂</p>
                            <p>{no2} µg/m³</p>
                        </div>
                        <div className='text-sm lg:text-base flex flex-col items-center'>
                            <p className='font-bold'>O₃</p>
                            <p>{o3} µg/m³</p>
                        </div>
                        <div className='text-sm lg:text-base flex flex-col items-center'>
                            <p className='font-bold'>NH₃</p>
                            <p>{nh3} µg/m³</p>
                        </div>
                        <div className='text-sm lg:text-base flex flex-col items-center'>
                            <p className='font-bold'>SO₂</p>
                            <p>{so2} µg/m³</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='flex flex-col lg:flex-row justify-between gap-4'>
                {/* sunrise and sunset */}
                <div className='text-xl bg-[#131214] text-white px-5 pt-5 pb-6 rounded-lg mt-3 lg:mt-5 lg:w-[400px]'>
                    <p className='text-[#B9B6BF]'>Sunrise and Sunset</p>
                    <div className='flex flex-col items-center justify-around md:flex-row mt-6'>

                        <div className='flex justify-around'>
                            <i className="ri-sun-fill text-4xl"></i>
                            <div className='ml-4'>
                                <p className='text-base'>Sunrise</p>
                                <p className='text-2xl'>
                                    {formatTime(sys.sunrise)}
                                </p>
                            </div>
                        </div>

                        <div className='flex justify-around mt-3 lg:mt-0'>
                            <i className="ri-moon-fill text-4xl"></i>
                            <div className='ml-4'>
                                <p className='text-base'>Sunset</p>
                                <p className='text-2xl'>
                                    {formatTime(sys.sunset)}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* maximum and minimum temperature */}
                <div className='text-xl bg-[#131214] text-white px-5 pt-5 pb-6 rounded-lg mt-3 lg:mt-5 lg:w-[400px]'>
                    <p className='text-[#B9B6BF]'>Temperature Spectrum</p>
                    <div className='flex flex-col items-center justify-around md:flex-row mt-6'>

                        <div className='flex justify-around'>
                            <i className="ri-temp-cold-fill text-4xl"></i>
                            <div className='ml-4'>
                                <p className='text-base'>Min</p>
                                <p className='text-2xl'>
                                    {main.temp_min}&deg;C
                                </p>
                            </div>
                        </div>

                        <div className='flex justify-around mt-3 lg:mt-0'>
                            <i className="ri-temp-hot-fill text-4xl"></i>
                            <div className='ml-4'>
                                <p className='text-base'>Max</p>
                                <p className='text-2xl'>
                                    {main.temp_max}&deg;C
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>

        {/* highlights */}
        <div className='grid grid-col-1 md:grid-cols-2 xl:grid-cols-4 justify-around gap-1 mt-4'>
            {highlights.map((highlight, index) => (
                <HighlightBox
                    key={index}
                    title={highlight.title}
                    value={highlight.value}
                    Icon={highlight.Icon}
                />
            ))}
        </div>

    </div>
  )
};

export default TodaysHighlights;