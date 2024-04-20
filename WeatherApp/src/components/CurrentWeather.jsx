import React from 'react'

const CurrentWeather = (data) => {
  const url = "https://openweathermap.org/img/wn/{img id}@2x.png"
  return (
    <>
      <div className='title-container'>
        <h1>City Name</h1>
        <h2>date</h2>
      </div>
      <div className='info-container'>
        <div className='main-info'>
          <p>image</p>
          <p>temp</p>
          <p>type of weather</p>
        </div>

        <div className='secondary-info'>
          <p>image</p>
          <p>temp</p>
          <p>type of weather</p>
        </div>
      </div>

    </>
  )
}

export default CurrentWeather