import React, { useState } from "react";
import axios from "axios";
import "../assets/style.css";
import WeatherCard from "./WeatherCard";
// import { response } from "express";
const SearchCard = () => {
  let key = "2f745fa85d563da5adb87b6cd4b81caf";
  const [message, setMessage] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("");
  const handleChange = (e) => {
    setCity(e.target.value);
  };
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(city, key);
    axios
      .get(url)
      .then((response) => {
        setWeatherData(response.data);
        setCity("")
        console.log(response.data);
      })
      .catch((error) => {
        console.log("City not found");
      });
  };
  return (
    <div className="search-card">
      <form action="" onClick={handleSearch} className="search">
        <div className="search-box">
          <input type="text" name="city" id="city" onChange={handleChange} />
          <button className="search-button">Search</button>
        </div>
      </form>

      <div className="weather-image"></div>
      <div className="weather-forcast">
        <WeatherCard cont="Temp" values={`${weatherData.main?.temp}°C`} />
        <WeatherCard cont="Wind" values={weatherData.wind?.speed} />
        <WeatherCard cont="Humidity" values={weatherData.main?.humidity} />
      </div>
    </div>
  );
};

export default SearchCard;
