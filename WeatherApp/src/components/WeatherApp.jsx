import React, { useState, useEffect } from 'react';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import WeeklyForecast from './WeeklyForecast';

const WeatherApp = () => {
  const [location, setLocation] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [placeName, setPlaceName] = useState(null);

  const LOCATION_API_KEY = import.meta.env.VITE_LOCATION_API_KEY || "e4a91b2108cdc0e89d893af15a97224f";
  const limit = 2;

  const searchLocation = async () => {
    try {
      const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${LOCATION_API_KEY}`);
      const resultJSON = await result.json();
      console.log('JSON Results:', resultJSON);

      if (resultJSON.length > 0) {
        const lat = parseFloat(resultJSON[0].lat).toFixed(2);
        const lon = parseFloat(resultJSON[0].lon).toFixed(2);
        const placeName = resultJSON[0].name;
        setLat(lat);
        setLon(lon);
        setPlaceName(placeName);
        setLocation(true);
      } else {
        console.error('No location data found.');
        setLocation(false);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      setLocation(false);
    }
  };

  useEffect(() => {
    if (location) {
      searchWeather();
      searchHourly();
      searchDaily();
    }
  }, [location]);

  const searchWeather = async () => {
    try {
      const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${LOCATION_API_KEY}`);
      const resultJSON = await result.json();
      setWeatherData(resultJSON);
      console.log('JSON Results Weather:', resultJSON);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const searchHourly = async () => {
    try {
      const result = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${LOCATION_API_KEY}`);
      const resultJSON = await result.json();
      setHourlyData(resultJSON);
      console.log('JSON Results Hourly:', resultJSON);
    } catch (error) {
      console.error('Error fetching hourly data:', error);
    }
  };

  const searchDaily = async () => {
    try {
      const result = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${LOCATION_API_KEY}`);
      const resultJSON = await result.json();
      setDailyData(resultJSON);
      console.log('JSON Results Daily:', resultJSON);
    } catch (error) {
      console.error('Error fetching daily data:', error);
    }
  };

  const handleClick = async () => {
    if (cityName === "" && stateCode === "" && countryCode === "") {
      return;
    }
    await searchLocation(); // Wait for searchLocation to complete
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

        <input
          id='state'
          className="state-box"
          type="text"
          placeholder="Enter State Code"
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value)}
        />

        <input
          id='country'
          className="country-box"
          type="text"
          placeholder="Enter Country Code"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        />

        <button className="search-button" onClick={handleClick}>
          Search
        </button>
      </div>

      {weatherData && hourlyData && dailyData && (
        <>
          <CurrentWeather data={weatherData} cityName={placeName}/>
          <HourlyForecast data={hourlyData} />
          <WeeklyForecast data={dailyData} />
        </>
      )}

    </>
  )
}

export default WeatherApp;
