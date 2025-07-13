import React, { useEffect, useState } from "react";
import Sidenav from "./components/Sidenav";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const API_KEY = "23f1d95af0004a42a05d8c4dfe4cba5f";

const App = () => {
  const [weatherData, setWeatherData] = useState([]);

  const cities = [
    "Los Angeles", "New York", "Chicago", "Miami", "Seattle",
    "Dallas", "San Francisco", "Atlanta", "Phoenix", "Boston"
  ]; // Add more if you want!

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("All");


  useEffect(() => {
    const fetchWeatherForCities = async () => {
      try {
        const responses = await Promise.all(
          cities.map(async (city) => {
            const res = await fetch(
              `https://api.weatherbit.io/v2.0/current?city=${encodeURIComponent(
                city
              )}&key=${API_KEY}`
            );
            const json = await res.json();
            return json.data[0]; // Extract only the first result
          })
        );
        setWeatherData(responses);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherForCities();
  }, []);

  const filteredData = weatherData.filter((city) => {
    const matchesSearch = city.city_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCondition =
      selectedCondition === "All" ||
      city.weather.description.includes(selectedCondition);

    return matchesSearch && matchesCondition;
  });

  const totalCities = filteredData.length;

const averageTemp = filteredData.length
  ? (
      filteredData.reduce((sum, city) => sum + city.temp, 0) / filteredData.length
    ).toFixed(1)
  : 0;

const hottestCity = filteredData.reduce((maxCity, city) =>
  city.temp > maxCity.temp ? city : maxCity, filteredData[0] || { city_name: "", temp: -Infinity }
);



  return (
    <div className="app-layout">
      <Sidenav />
      <div className="main-content">
        <h1>🌦 Weather Dashboard</h1>

<div className="summary-stats">
  <div className="stat-box">
    <h3>Total Cities</h3>
    <p>{totalCities}</p>
  </div>
  <div className="stat-box">
    <h3>Average Temp</h3>
    <p>{averageTemp}°C</p>
  </div>
  <div className="stat-box">
    <h3>Hottest City</h3>
    <p>{hottestCity.city_name} ({hottestCity.temp}°C)</p>
  </div>
</div>


        {/* This stays fixed at the top */}
        <div className="filter-bar-fixed">
          <div className="search-filter-bar">
            <input
              type="text"
              placeholder="Search by city name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Clear">Clear</option>
              <option value="Clouds">Clouds</option>
              <option value="Rain">Rain</option>
              <option value="Snow">Snow</option>
              <option value="Mist">Mist</option>
            </select>
          </div>
        </div>
        

        {/* Scrollable list area */}
        <div className="weather-list-scroll">
          <div className="weather-row header-row">
            <div>City</div>
            <div>Condition</div>
            <div>Temp</div>
            <div>Humidity</div>
            <div>Wind</div>
          </div>

          {filteredData.map((city, index) => (
            <WeatherCard key={index} city={city} />
          ))}
        </div>
      </div>
    </div>

  );
};

export default App;
