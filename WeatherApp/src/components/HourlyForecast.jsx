import React from 'react';
import Hour from './Hour';

const HourlyForecast = ({ data }) => {
  const list = data.list;

  const hours = list.slice(0, 24).map(hour => {
    const time = convertUnixToTime(hour.dt);
    const temp = kelvinToFahrenheit(hour.main.temp);
    const imgId = hour.weather[0].icon;

    return <Hour key={hour.dt} time={time} temp={temp + "º"} imgId={imgId} />;
  });

  function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(0);
  }

function convertUnixToTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  let hour = date.getHours() % 12; // Get hour in 12-hour format
  if (hour === 0) {
    hour = 12; // Convert 0 to 12 for 12-hour format
  }
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'; // Determine if it's AM or PM
  return hour.toString() + ampm;
}


  return (
    <div className="hourly-forecast-container">
      <div className='hourly-forecast'>
        {hours}
      </div>
    </div>
  );

}

export default HourlyForecast;
