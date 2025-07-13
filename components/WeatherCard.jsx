// src/components/WeatherCard.jsx
import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ city }) => {
  return (
    <div className="weather-row">
      <div className="city-name">{city.city_name}</div>
      <div>{city.weather.description}</div>
      <div>{city.temp}°C</div>
      <div>{city.rh}%</div>
      <div>{city.wind_spd} m/s</div>
    </div>
  );
};

export default WeatherCard;
