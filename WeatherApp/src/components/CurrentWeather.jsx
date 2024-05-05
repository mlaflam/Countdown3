import React from 'react';
import GridItem from './GridItem';

const CurrentWeather = ({ data, cityName }) => {
  const imgId = data.weather[0].icon;
  const url = `https://openweathermap.org/img/wn/${imgId}@2x.png`;

  const tempFahrenheit = kelvinToFahrenheit(data.main.temp);
  const tempFahrenheitMax = kelvinToFahrenheit(data.main.temp_max);
  const tempFahrenheitMin = kelvinToFahrenheit(data.main.temp_min);

  const weatherType = data.weather[0].main;
  const windSpeed = metersPerSecToMph(data.wind.speed);
  const humidity = data.main.humidity;

  const sunrise = convertUnixToTime(data.sys.sunrise);
  const sunset = convertUnixToTime(data.sys.sunset);

  function metersPerSecToMph(mps) {
    return (mps * 2.23694).toFixed(2);
  }

  function kelvinToFahrenheit(kelvin) {
    return ((kelvin - 273.15) * 9/5 + 32).toFixed(0);
  }

  function convertUnixToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  return (
    <> 
      {/* change how city name shown  */}
      <div className='title-container'>
        <div className='title-city'>{cityName}</div>
      </div>
      <div className='info-container'>
        <div className='main-info'>
          <div className='main-weather-container'>
            <img src={url} alt="Weather Icon" className='weather-icon'/>
            <div className='main-temp-container'>
              <div className='main-temp'>{tempFahrenheit}º</div>
              <div className='weather-type'>{weatherType} </div>
            </div>
          </div>
        </div>

      <div className='secondary-info'>
          <GridItem value={tempFahrenheitMax + "º"} label="High" />
          <GridItem value={`${humidity}%`} label="Humidity" />
          <GridItem value={sunrise} label="Sunrise" />
          <GridItem value={tempFahrenheitMin + "º"} label="Low" />
          <GridItem value={`${windSpeed}mph`} label="Wind" />
          <GridItem value={sunset} label="Sunset" />
      </div>
  </div>


    </>
  );
};

export default CurrentWeather;
