import React from 'react'

const HighlightBox = ({title, value, Icon}) => {
  return (
    <div className='bg-[#131214] text-white p-5 mb-2 rounded-lg w-[310px] md:w-auto md:mb-0 md:mx-2'>
        <div>
            <p className='text-lg mb-4 text-[#B9B6BF]'>{title}</p>
            <div className='flex items-center justify-around gap-3 md:justify-between'>
                <i className={`${Icon} text-2xl`}></i> 
                <p className='text-3xl md:text-lg lg:text-3xl'>{value}</p>
            </div>
        </div>
    </div>
  )
}

export default HighlightBox;