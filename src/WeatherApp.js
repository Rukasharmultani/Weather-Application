import React, { useState } from "react";
import "./WeatherApp.css";

const WeatherApp = () => {
    const [location, setLocation] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [astronomyData, setAstronomyData] = useState(null);

    const fetchWeatherData = async (location) => {
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${location}`;
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "b3497dfc87mshc6f2630050b128cp1119d2jsn7d4b255babdd",
                "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const fetchAstronomyData = async (location) => {
        const url = `https://weatherapi-com.p.rapidapi.com/astronomy.json?q=${location}`;
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "f55d0e2db6mshe843b6c6cfb5fa2p171bcejsnf6444255ae48",
                "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setAstronomyData(data.astronomy);
        } catch (error) {
            console.error("Error fetching astronomy data:", error);
        }
    };

    const handleSearch = () => {
        if (location) {
            fetchWeatherData(location);
            fetchAstronomyData(location);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && location) {
            fetchWeatherData(location);
            fetchAstronomyData(location);
        }
    };

    return (
        <div className="container mt-5">
            <header className="text-center mb-4">
                <h1>🌤️ Weather and Astronomy Details</h1>
            </header>

            <div className="d-flex justify-content-center mb-4">
                <div className="input-group w-50">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Enter city name"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="btn btn-primary search-btn" onClick={handleSearch}>
                        🔍 Search
                    </button>
                </div>
            </div>

            {weatherData && (
                <div id="weather-info" className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card p-3 pop-card">
                            <h4 className="card-title">📍 Location Information</h4>
                            <p><strong>🌍 Location:</strong> {weatherData.location.name}</p>
                            <p><strong>🏞️ Region:</strong> {weatherData.location.region}</p>
                            <p><strong>🏞️ Country:</strong> {weatherData.location.country}</p>
                            <p><strong>📏 Latitude:</strong> {weatherData.location.lat}</p>
                            <p><strong>📏 Longitude:</strong> {weatherData.location.lon}</p>
                            <p><strong>🕒 Time Zone:</strong> {weatherData.location.tz_id}</p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card p-3 pop-card">
                            <h4 className="card-title">🌡️ Current Weather</h4>
                            <p><strong>🕒 Last Updated:</strong> {weatherData.current.last_updated}</p>
                            <p><strong>🌡️ Temperature:</strong> {weatherData.current.temp_c}°C / {weatherData.current.temp_f}°F</p>
                            <p><strong>🌬️ Feels Like:</strong> {weatherData.current.feelslike_c}°C / {weatherData.current.feelslike_f}°F</p>
                            <p><strong>💨 Wind Speed:</strong> {weatherData.current.wind_kph} kph</p>
                            <p><strong>🧭 Wind Direction:</strong> {weatherData.current.wind_dir}</p>
                            <p><strong>💧 Humidity:</strong> {weatherData.current.humidity}%</p>
                            <p><strong>☁️ Cloud Cover:</strong> {weatherData.current.cloud}%</p>
                        </div>
                    </div>

                    <div className="col-md-4 mb-4">
                        <div className="card p-3 pop-card text-center">
                            <h4 className="card-title">🌈 Weather Condition</h4>
                            <p>{weatherData.current.condition.text}</p>
                            <img
                                src={weatherData.current.condition.icon}
                                alt="Weather Icon"
                                className="weather-icon"
                                style={{height:"240px"}}
                            />
                        </div>
                    </div>
                </div>
            )}

            {astronomyData && (
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-3 pop-card">
                            <h4 className="card-title">🌌 Astronomy Details</h4>
                            <p><strong>🌅 Sunrise:</strong> {astronomyData.astro.sunrise}</p>
                            <p><strong>🌇 Sunset:</strong> {astronomyData.astro.sunset}</p>
                            <p><strong>🌙 Moonrise:</strong> {astronomyData.astro.moonrise}</p>
                            <p><strong>🌒 Moonset:</strong> {astronomyData.astro.moonset}</p>
                            <p><strong>🌓 Moon Phase:</strong> {astronomyData.astro.moon_phase}</p>
                            <p><strong>🌑 Moon Illumination:</strong> {astronomyData.astro.moon_illumination}%</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
