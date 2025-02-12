import { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "./CityHistory.scss";

export default function CityHistory() {
  const { token } = useAuth();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeRecord, setActiveRecord] = useState(null);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/cities", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCities(res.data);
        setLoadingCities(false);
      })
      .catch(() => {
        setError("Failed to fetch cities");
        setLoadingCities(false);
      });
  }, [token]);

  const fetchHistory = (cityId) => {
    setLoadingHistory(true);
    axios
      .get(`http://127.0.0.1:8000/api/city-history/${cityId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setHistory(res.data);
        setLoadingHistory(false);
      })
      .catch(() => {
        setError("Failed to fetch weather history");
        setLoadingHistory(false);
      });
  };

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    const city = cities.find((c) => c.id.toString() === cityId);
    setSelectedCity(city);
    setActiveRecord(null);
    if (city) {
      fetchHistory(city.id);
    } else {
      setHistory([]);
    }
  };

  const handleRemoveCity = () => {
    if (!selectedCity) return;
    axios
      .post(
        "http://127.0.0.1:8000/api/user/remove-city",
        { city_id: selectedCity.openweather_city_id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setCities(cities.filter((city) => city.id !== selectedCity.id));
        setHistory([]);
        setSelectedCity(null);
        setActiveRecord(null);
      })
      .catch(() => {
        setError("Failed to remove city");
      });
  };

  return (
    <div className="city-history">
      <h2>City Weather History</h2>
      {loadingCities ? (
        <p>Loading cities...</p>
      ) : (
        <select
          value={selectedCity ? selectedCity.id : ""}
          onChange={handleCityChange}>
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}, {city.country_code}
            </option>
          ))}
        </select>
      )}
      {selectedCity && (
        <>
          <button onClick={handleRemoveCity} className="remove-city-btn">
            Remove City
          </button>
          {loadingHistory ? (
            <p>Loading history...</p>
          ) : history.length === 0 ? (
            <p>No weather history available for this city.</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={history}
                  onMouseMove={(state) => {
                    if (state.activePayload && state.activePayload.length > 0) {
                      setActiveRecord(state.activePayload[0].payload);
                    }
                  }}>
                  <XAxis
                    dataKey="forecast_time"
                    tickFormatter={(tick) =>
                      new Date(tick).toLocaleTimeString()
                    }
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#007bff"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="pressure"
                    stroke="#ff7300"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="humidity"
                    stroke="#82ca9d"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
              {activeRecord && (
                <div className="detail-card">
                  <img
                    src={(() => {
                      const w = activeRecord.weather_main?.toLowerCase();
                      switch (w) {
                        case "clear":
                          return "https://openweathermap.org/img/wn/01d@2x.png";
                        case "clouds":
                          return "https://openweathermap.org/img/wn/03d@2x.png";
                        case "rain":
                          return "https://openweathermap.org/img/wn/09d@2x.png";
                        case "drizzle":
                          return "https://openweathermap.org/img/wn/09d@2x.png";
                        case "thunderstorm":
                          return "https://openweathermap.org/img/wn/11d@2x.png";
                        case "snow":
                          return "https://openweathermap.org/img/wn/13d@2x.png";
                        default:
                          return "https://openweathermap.org/img/wn/50d@2x.png";
                      }
                    })()}
                    alt={activeRecord.weather_main}
                    className="weather-icon"
                  />
                  <div className="detail-info">
                    <p>
                      <strong>Time: </strong>
                      {new Date(activeRecord.forecast_time).toLocaleString()}
                    </p>
                    <p>
                      <strong>Temperature: </strong>
                      {activeRecord.temperature}°C
                    </p>
                    <p>
                      <strong>Pressure: </strong>
                      {activeRecord.pressure} hPa
                    </p>
                    <p>
                      <strong>Humidity: </strong>
                      {activeRecord.humidity}%
                    </p>
                    <p>
                      <strong>Weather: </strong>
                      {activeRecord.weather_main} (
                      {activeRecord.weather_description})
                    </p>
                  </div>
                </div>
              )}
              <div className="history-list">
                <h3>Detailed History</h3>
                <ul>
                  {history.map((record) => (
                    <li key={record.forecast_time}>
                      <strong>
                        {new Date(record.forecast_time).toLocaleString()}:
                      </strong>{" "}
                      Temp: {record.temperature}°C, Humidity: {record.humidity}
                      %, Pressure: {record.pressure} hPa, Weather:{" "}
                      {record.weather_main} ({record.weather_description})
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
