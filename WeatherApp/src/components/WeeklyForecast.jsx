import React from 'react'
import Day from './Day';

const WeeklyForcast = ({data}) => {
  const list = data.list;
  console.log(list);

  const days = list.slice(0, 6).map(day => {
    const dayName = getDayNameFromTimestamp(day.dt);
    const tempMax = kelvinToFahrenheit(day.temp.max);
    const tempMin = kelvinToFahrenheit(day.temp.min);
    const imgId = day.weather[0].icon;

    return <Day key={day.dt} day={dayName} tempMax={tempMax + "º"} tempMin={tempMin + "º"} imgId={imgId} />;
  });

  function kelvinToFahrenheit(kelvin) {
      return ((kelvin - 273.15) * 9/5 + 32).toFixed(0);
  }

  function getDayNameFromTimestamp(timestamp) {
    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
    const options = { weekday: 'long' }; // Specify that we want the full name of the day
    return new Intl.DateTimeFormat('en-US', options).format(date);
}



  return (
    <div className="weekly-forecast-container">
      <div className='weekly-forecast'>
        {days}
      </div>
    </div>
  );


}

export default WeeklyForcast