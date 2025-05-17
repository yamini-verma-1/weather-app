import React from 'react'

const WeatherCard = (props) => {
  return (
    <div className='weather-card'>
       <h2>{props.cont}</h2>
       <div className="value">{props.values}</div>
    </div>
  )
}

export default WeatherCard
