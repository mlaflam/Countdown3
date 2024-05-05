import React from 'react'

const Day = ({ day, tempMax, tempMin, imgId }) => {
  const url = `https://openweathermap.org/img/wn/${imgId}@2x.png`;

  return (
    <div className='day-box'>
      <div className='day-name'>{day}</div>
      <img src={url} alt="Weather Icon" />
      <div className='temps-box'>
        <div className='temp-max'>{tempMax}</div>
        <div className='temp-min'>{tempMin}</div>
      </div>
    </div>
  )
}

export default Day