import React, { useEffect, useState } from "react";
import axios from "axios";
import cloud from "../assets/clouds.webp";
import sunny from "../assets/sunny.png";
import "../assets/style.css";
import WeatherCard from "./WeatherCard";

const SearchCard = () => {
  const key = "2f745fa85d563da5adb87b6cd4b81caf";
  const [message, setMessage] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState("Bhilai");
  const [imgSrc, setImgSrc] = useState();

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const fetchWeather = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        setWeatherData(data);

        const cast = data.weather[0].main;
        if (cast === "Clouds") {
          setImgSrc(cloud);
        } else {
          setImgSrc(sunny);
        }

        // setCity("");
      })
      .catch((error) => {
        console.log("Error loading data:", error);
      });
  };

  // ✅ on page load
  useEffect(() => {
    fetchWeather(); // "Bhilai" by default
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeather(city);
    }
  };

  return (
    <div className="search-card">
      <form onSubmit={handleSearch} className="search">
        <div className="search-box">
          <input
            type="text"
            name="city"
            value={city}
            id="city"
            onChange={handleChange}
          />
          <button className="search-button">Search</button>
        </div>
      </form>

      <div className="weather-image">
        {imgSrc && <img src={imgSrc} alt="weather logo" />}
      </div>

      <div className="weather-forcast">
        <WeatherCard cont="Temp" values={weatherData.main?.temp} />
        <WeatherCard cont="Wind" values={weatherData.wind?.speed} />
        <WeatherCard cont="Humidity" values={weatherData.main?.humidity} />
      </div>
    </div>
  );
};

export default SearchCard;
