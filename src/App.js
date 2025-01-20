import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WeatherApp from "./WeatherApp";
import WeatherForecastApp from "./WeatherForecastApp";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import WeatherAlertsApp from "./WeatherAlertsApp";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isNightMode, setIsNightMode] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleTheme = () => {
        setIsNightMode(!isNightMode);
    };

    return (
        <Router>
            <div className={`d-flex ${isNightMode ? "night-mode" : "day-mode"}`}>
                <nav
                    className={`bg-primary text-white p-4 sidebar ${
                        sidebarOpen ? "open" : ""
                    }`}
                >
                    <h2 className="text-center mt-4">WEATHER</h2>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <Link
                                to="/"
                                className="text-white text-decoration-none"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link
                                to="/forecast"
                                className="text-white text-decoration-none"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Forecast
                            </Link>
                        </li>
                        <li className="nav-item mb-2">
                            <Link
                                to="/alert"
                                className="text-white text-decoration-none"
                                onClick={() => setSidebarOpen(false)}
                            >
                                Weather Alert
                            </Link>
                        </li>
                    </ul>
                </nav>

                <button
                    className="btn btn-primary toggle-button d-md-none"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>

                <button
                    className="btn theme-toggle position-fixed top-0 end-0 m-3"
                    onClick={toggleTheme}
                >
                    <i className={`fas ${isNightMode ? "fa-sun" : "fa-moon"}`}></i>
                </button>

                <main className="flex-grow-1 p-4">
                    <Routes>
                        <Route path="/" element={<WeatherApp />} />
                        <Route path="/forecast" element={<WeatherForecastApp />} />
                        <Route path="/alert" element={<WeatherAlertsApp/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
