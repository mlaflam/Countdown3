import React, { useState, useEffect } from 'react';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import WeeklyForecast from './WeeklyForecast';
import News from './News';

const WeatherApp = () => {
  const [location, setLocation] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [placeName, setPlaceName] = useState(null);

  const LOCATION_API_KEY = import.meta.env.VITE_LOCATION_API_KEY;
  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const limit = 2;

  const searchLocation = async () => {
    try {
      const result = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${LOCATION_API_KEY}`);
      const resultJSON = await result.json();
      console.log('JSON Results:', resultJSON);

      const lat = parseFloat(resultJSON[0].lat).toFixed(2);
      const lon = parseFloat(resultJSON[0].lon).toFixed(2);
      const placeName = resultJSON[0].name;
      setLat(lat);
      setLon(lon);
      setPlaceName(placeName);
      setLocation(true);
      
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
  }, [location, lat, lon]); // Add lat and lon as dependencies


  const searchWeather = async () => {
    try {
      const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${LOCATION_API_KEY}`);
      const resultJSON = await result.json();
      setWeatherData(resultJSON);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const searchHourly = async () => {
    try {
      const result = await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${LOCATION_API_KEY}`);
      const resultJSON = await result.json();
      setHourlyData(resultJSON);
    } catch (error) {
      console.error('Error fetching hourly data:', error);
    }
  };

  const searchDaily = async () => {
    try {
      const result = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&appid=${LOCATION_API_KEY}`);
      const resultJSON = await result.json();
      setDailyData(resultJSON);
    } catch (error) {
      console.error('Error fetching daily data:', error);
    }
  };

  const searchNews = async () => {
    try {
      const result = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${NEWS_API_KEY}`);
      const resultJSON = await result.json();
      setNewsData(resultJSON);
      console.log('JSON Results News:', resultJSON);
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };


  const handleClick = async () => {
    if (cityName === "" && stateCode === "" && countryCode === "") {
      return;
    }
    await searchLocation(); // Wait for searchLocation to complete
    await searchNews();
  };

  return (
    <>
      <div className='website-title'>
        Weather and News App
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

      {weatherData && hourlyData && dailyData && newsData &&(
        <>
          <CurrentWeather data={weatherData} cityName={placeName} />
          <div className='lower-section-container'>
            <div className='future-weather-container'>
              <HourlyForecast data={hourlyData} />
              <WeeklyForecast data={dailyData} />
            </div>
            <div className="news-container">
              <News data={newsData} />
            </div>
          </div>
        </>
      )}

    </>
  )
}

export default WeatherApp;
