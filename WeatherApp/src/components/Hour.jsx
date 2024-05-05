import React from 'react';

const Hour = ({ time, temp, imgId }) => {
  const url = `https://openweathermap.org/img/wn/${imgId}@2x.png`;

  return (
    <div className='hourly-box'>
      <div>{time}</div>
      <img src={url} alt="Weather Icon"/>
      <div>{temp}</div>
    </div>
  );
}

export default Hour;
