import React from 'react'
import { useState, useEffect } from 'react'
import CurrentWeather from './CurrentWeather'
import HourlyForecast from './HourlyForecast'
import WeeklyForecast from './WeeklyForecast'

const WeatherApp = () => {
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState('');
  const [cityName, setCityName] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  
  const LOCATION_API_KEY = import.meta.env.VITE_LOCATION_API_KEY;
  const limit = 1;


  useEffect(() => {

  }, []);

  //when they click search for location and set lat and lon 
  const searchLocation = async (cityName, stateCode, countryCode) => {
    try {
      console.log(LOCATION_API_KEY);

      const result =
        await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=6dced70317214a5b1b5ffc8257210d5d`);
      const resultJSON = await result.json();
      setLocationData(resultJSON);
      console.log('Success! Status:', result.status);
      console.log('JSON Results:', resultJSON);
      
      //setting lat and lon
      setLat(resultJSON.lat);
      setLon(resultJSON.lon);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  //when they click search for location and set lat and lon 
  const searchWeather = async (cityName, stateCode, countryCode) => {
    try {
      console.log(LOCATION_API_KEY);

      const result =
        await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${VITE_LOCATION_API_KEY}`);
      const resultJSON = await result.json();
      setWeatherData(resultJSON);
      console.log('Success! Status:', result.status);
      console.log('JSON Results:', resultJSON);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  //handle search for weather - call api and display results 
  //on click make api call to other thing using the data u got 
  const handleClick = () => {
    searchLocation(cityName, stateCode, countryCode); //should set lat and long 


  };


  return (
    <>
      <input
        id='city'
        className="city-box"
        type="text"
        placeholder="Enter City Name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />

      <button className="search-button" onClick={handleClick}>
        Search
      </button>
      {weatherData && ( //display if there is data 
        <>
          <CurrentWeather data={weatherData} />
          <HourlyForecast data={weatherData} />
          <WeeklyForecast data={weatherData} />
        </>
      )
      }


    </>
  )
}

export default WeatherApp



      {/* <input
        id='state'
        className="state-box"
        type="text"
        placeholder="Enter State Code"
        value={stateCode}
        onChange={(e) => setStateCode(e.target.value)}
        onKeyDown={handleClick}
      />

      <input
        id='country'
        className="country-box"
        type="text"
        placeholder="Enter State Code"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
        onKeyDown={handleClick}
      /> */}