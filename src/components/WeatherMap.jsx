import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./ui/Loader";


const WeatherMap = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [layerName, setLayerName] = useState("clouds_new");
    const [loading, setLoading] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        getWeatherMap(layerName);
    }, [layerName]);

    // Get the layer name from the dropdown and call API to fetch map
    const getLayerName = (val) => {
        const layerCollection = {
            1: "clouds_new",
            2: "precipitation_new",
            3: "pressure_new",
            4: "wind_new",
            5: "temp_new",
        };

        const selectedLayer = layerCollection[val];

        getWeatherMap(selectedLayer); // Fetch the weather map based on the selected layer
        setIsOpen(false); // Close the dropdown after selection
        setLayerName(selectedLayer);
    };

    // get weather map
    const getWeatherMap = (setLayerName) =>{

        const API_KEY = import.meta.env.VITE_API_KEY;
        setLoading(true);

        axios.get(`https://tile.openweathermap.org/map/${setLayerName}/1/0/1.png?appid=${API_KEY}`, 
            {
                responseType: 'blob'
            }
        )
        .then(response => {
            // creates a URL for the image blob
            const img_url = URL.createObjectURL(response.data);
            setLoading(false); // Set loading to false after loading the image

            // setting the URL as the source for the image element
            document.getElementById('mapImage').src = img_url; 
        })
        .catch(error => {
            console.error('Error fetching the map data:', error);
            setLoading(false);
        });
    }

    
    return (
        <div className="bg-[#1D1C1F] py-8 px-7 mt-5 rounded-3xl">
            <div className="flex flex-col lg:flex-row justify-between">
                <p className="text-xl font-bold text-white mb-3 lg:mb-0">Weather Map</p>
                <div className="relative">
                    <button
                        id="dropdownDefaultButton"
                        onClick={toggleDropdown}
                        className="text-[#4d1a33] font-extrabold bg-[#E589B7] hover:bg-[#ca6a9a] focus:ring-4 focus:outline-none focus:ring-[#ecb2cf] rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                        type="button"
                    >
                        Select a type
                        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                        </svg>
                    </button>

                    {isOpen && (
                        <div id="dropdown" className="absolute z-10 rounded-lg shadow w-36 dark:bg-[#ecb2cf] cursor-pointer">
                            <ul className="py-2 text-sm font-bold text-[#4d1a33]" aria-labelledby="dropdownDefaultButton">
                                <li className="px-4 py-2 hover:bg-[#d68bb1]" onClick={() => getLayerName(1)}>Clouds</li>
                                <li className="px-4 py-2 hover:bg-[#d68bb1]" onClick={() => getLayerName(2)}>Precipitation</li>
                                <li className="px-4 py-2 hover:bg-[#d68bb1]" onClick={() => getLayerName(3)}>Sea level pressure</li>
                                <li className="px-4 py-2 hover:bg-[#d68bb1]" onClick={() => getLayerName(4)}>Wind speed</li>
                                <li className="px-4 py-2 hover:bg-[#d68bb1]" onClick={() => getLayerName(5)}>Temperature</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {/* display the map */}
            <div className="mt-4 border border-solid border-slate-300 rounded-lg h-[240px]">
                {loading && <Loader height="h-[240px]" />}
                <img id="mapImage" alt="Weather Map" className={`h-[240px] w-full object-cover rounded-lg ${loading ? "hidden" : "block"}`}/>
            </div>
        </div>
    );
};

export default WeatherMap;
