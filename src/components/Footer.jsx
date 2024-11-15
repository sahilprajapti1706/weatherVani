import dayjs from 'dayjs'
import React from 'react'

const Footer = () => {
  const currentYear = dayjs().year();

  return (
    <div className="w-full p-8 text-center font-nunitoSans">
        <p className="text-[#B5A1E5] font-bold text-sm md:text-base">
        weatherVani &copy; {currentYear}{' '}
        <a
          href="https://github.com/sahilprajapti1706"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Link to solanki03 GitHub profile"
          className="hover:text-[#8e7bb8] ml-1"
        >
          Sahil
        </a>. All Rights Reserved.
      </p>
      <p className="text-sm mt-2 text-[#ab96db]">
        Bringing real-time weather updates and detailed forecasts directly to you.
      </p>
    </div>
  )
}

export default Footer