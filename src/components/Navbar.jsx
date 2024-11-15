import React, { useState } from "react";

import logo from '../images/logo.png'

const Navbar = ({onSearch, fetchWeatherData}) => {

    const [searchedCity, setSearchedCity] = useState('');

    const handleSearchClick = () =>{
        if(searchedCity.trim()){
            onSearch(searchedCity);
        }
    };

    // getting user's current location by using geolocation api
    const handleUserLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    fetchWeatherData(latitude, longitude);  // Fetch weather data using lat/lon
                },
                (error) => {
                    console.error("Error getting location: ", error);
                }
            );
        } else {
            alert(
                "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
              );
        }
    };
    
    return (
        <nav className="font-nunitoSans bg-[#100E17] flex flex-col md:flex-row md:items-center justify-between py-4 px-8">
            {/* Logo & website name */}
            <div className="flex justify-between mb-5 md:m-0">
                <div className="flex items-center gap-2">
                    <img
                        className="object-contain h-12"
                        src={logo}
                        alt="weatherVani logo"
                    />
                    <p className="font-bold text-xl text-white">weatherVani</p>
                </div>

                {/* Current Location for mobile devices */}
                <div onClick={handleUserLocation} className="md:hidden  bg-[#B5A1E5] h-11 w-11 text-[#443b57] rounded-3xl flex items-center justify-center shadow-md cursor-pointer">
                <i className="ri-crosshair-2-fill text-2xl"></i>
                </div>
            </div>

            {/* search bar */}
            <div className="relative flex items-center gap-3">
                <label htmlFor="Search" className="sr-only">Search</label>

                <input
                    type="text"
                    id="Search"
                    placeholder="Search city..."
                    value={searchedCity}
                    onChange={(e)=> setSearchedCity(e.target.value)}
                    className="w-full text-[#B9B6BF] rounded-3xl pl-5 py-2.5 pe-10 shadow-md sm:text-sm focus:outline-none focus: ring-[#B5A1E5] focus:ring-2 bg-[#1D1C1F]"
                />

                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button type="button" className="text-gray-600 hover:text-[#B5A1E5]"
                    onClick={handleSearchClick}>
                        <span className="sr-only">Search</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round" strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                </span>
            </div>

            {/* Current Location */}
            <div onClick={handleUserLocation} className="hidden bg-[#B5A1E5] h-11 w-44 text-[#443b57] gap-2 rounded-3xl md:flex items-center justify-center shadow-md cursor-pointer">
                <i className="ri-crosshair-2-fill text-xl"></i>
                <p className="text-sm font-bold">Current Location</p>
            </div>


        </nav>
    );
};

export default Navbar;
