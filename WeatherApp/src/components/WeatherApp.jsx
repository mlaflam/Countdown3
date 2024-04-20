import React from 'react'
import { useState, useEffect } from 'react'
import CurrentWeather from './CurrentWeather'
import HourlyForecast from './HourlyForecast'
import WeeklyForecast from './WeeklyForecast'

const WeatherApp = () => {
  const [locationData, setLocationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  
  const LOCATION_API_KEY = import.meta.env.VITE_LOCATION_API_KEY || '6dced70317214a5b1b5ffc8257210d5d';
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '996c3fd1f937b0f34b4e3274699c24b6';

  const limit = 2;


  useEffect(() => {

  }, []);

  //when they click search for location and set lat and lon 
  const searchLocation = async (cityName, stateCode, countryCode) => {
    try {
      console.log(LOCATION_API_KEY);

      const result =
        await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=${limit}&appid=${LOCATION_API_KEY}`);
      const resultJSON = await result.json();
      setLocationData(resultJSON);
      //console.log('Success! Status:', result.status);
      console.log('JSON Results:', resultJSON);
      
      //setting lat and lon
      setLat(resultJSON[0].lat);
      setLon(resultJSON[0].lon);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  //when they click search for location and set lat and lon 
  const searchWeather = async () => {
    try {
      // console.log(WEATHER_API_KEY);
      // console.log(lat);

      const result =
        await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${LOCATION_API_KEY}`);
      const resultJSON = await result.json();
      setWeatherData(resultJSON);
      //console.log('Success! Status:', result.status);
      console.log('JSON Results:', resultJSON);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  //handle search for weather - call api and display results 
  //on click make api call to other thing using the data u got 
  const handleClick = () => {
    searchLocation(cityName, stateCode, countryCode); //should set lat and long 
    searchWeather(); //then search for weather 
  };


  return (
    <>
      <div className='website-title'>
        Weather App
      </div>
      <div className='search-container'>
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
      </div>
  
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