import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./WeatherForecastApp.css"; 

const WeatherForecastApp = () => {
    const [city, setCity] = useState("");
    const [forecastData, setForecastData] = useState(null);

    const fetchForecastData = async (city) => {
        const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
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
            setForecastData(data);
        } catch (error) {
            console.error("Error fetching forecast data:", error);
        }
    };

    const handleCitySearch = () => {
        if (city) {
            fetchForecastData(city);
        }
    };

    const handleCityKeyDown = (event) => {
        if (event.key === "Enter" && city) {
            fetchForecastData(city);
        }
    };

    return (
        <div className="container mt-5">
            <header className="text-center mb-4">
                <h1>🌤️ Weather Forecast</h1>
            </header>

            <div className="d-flex justify-content-center mb-4">
                <div className="input-group w-50">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={handleCityKeyDown}
                    />
                    <button className="btn btn-primary search-btn" onClick={handleCitySearch}>
                        🔍 Search
                    </button>
                </div>
            </div>

            {forecastData && (
                <div>
                    <div className="card pop-card mb-4">
                        <div className="card-body">
                            <h4 className="card-title">📍 Location Details</h4>
                            <p><strong>City:</strong> {forecastData.location.name}</p>
                            <p><strong>Region:</strong> {forecastData.location.region}</p>
                            <p><strong>Country:</strong> {forecastData.location.country}</p>
                            <p><strong>Local Time:</strong> {forecastData.location.localtime}</p>
                        </div>
                    </div>

                    <div className="card pop-card mb-4">
                        <div className="card-body">
                            <h4 className="card-title">🌡️ Current Weather</h4>
                            <p><strong>Last Updated:</strong> {forecastData.current.last_updated}</p>
                            <p><strong>Temperature:</strong> {forecastData.current.temp_c}°C / {forecastData.current.temp_f}°F</p>
                            <p><strong>Feels Like:</strong> {forecastData.current.feelslike_c}°C / {forecastData.current.feelslike_f}°F</p>
                            <p><strong>Wind Speed:</strong> {forecastData.current.wind_kph} kph</p>
                            <p><strong>Wind Direction:</strong> {forecastData.current.wind_dir}</p>
                            <p><strong>Humidity:</strong> {forecastData.current.humidity}%</p>
                            <p><strong>Cloud Cover:</strong> {forecastData.current.cloud}%</p>
                            <p><strong>Condition:</strong> {forecastData.current.condition.text}</p>
                            <img
                                src={forecastData.current.condition.icon}
                                alt="Current Weather Icon"
                                className="img-fluid"
                            />
                        </div>
                    </div>

                    <div className="card pop-card">
                        <div className="card-body">
                            <h4 className="card-title">3-Day Weather Forecast</h4>
                            {forecastData.forecast.forecastday.map((day, index) => (
                                <div key={index} className="mb-4">
                                    <h5>📅 Date: {day.date}</h5>
                                    <p><strong>Max Temp:</strong> {day.day.maxtemp_c}°C / {day.day.maxtemp_f}°F</p>
                                    <p><strong>Min Temp:</strong> {day.day.mintemp_c}°C / {day.day.mintemp_f}°F</p>
                                    <p><strong>Condition:</strong> {day.day.condition.text}</p>
                                    <img
                                        src={day.day.condition.icon}
                                        alt="Day Condition Icon"
                                        className="img-fluid"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherForecastApp;
