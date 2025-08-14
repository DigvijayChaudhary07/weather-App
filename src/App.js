import React, { useState } from "react";
import "./style.css";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=023b1045aaaa4b37ba1162451250208&q=${city}&aqi=yes`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Loading..." : "Get Weather"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div className="weather-details">
          <h2>{weather.location.name}, {weather.location.country}</h2>
          <p><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
          <p><strong>Condition:</strong> {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
          <p><strong>Humidity:</strong> {weather.current.humidity}%</p>
          <p><strong>Wind:</strong> {weather.current.wind_kph} kph</p>
          <p><strong>Air Quality (PM2.5):</strong> {weather.current.air_quality.pm2_5?.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
