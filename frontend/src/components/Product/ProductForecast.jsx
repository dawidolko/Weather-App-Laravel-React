import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./product.scss";

export default function ProductForecast({ weather }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function fetchForecast() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/weather/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}`
        );
        if (!response.ok) throw new Error("Error fetching forecast data");
        const data = await response.json();

        const dailyForecast = {};
        data.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0];
          if (!dailyForecast[date]) {
            dailyForecast[date] = item;
          }
        });

        setForecast(Object.values(dailyForecast).slice(0, 5));
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchForecast();
  }, [weather]);

  return (
    <div className="product-forecast">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-container">
        {forecast.map((day) => (
          <div key={day.dt} className="forecast-card">
            <p className="forecast-date">{day.dt_txt.split(" ")[0]}</p>
            <div className="forecast-divider">
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                alt={day.weather[0].description}
                className="forecast-icon"
              />
            </div>
            <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
            <p className="forecast-desc">{day.weather[0].description}</p>
            <p className="forecast-wind">💨 {day.wind.speed} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ProductForecast.propTypes = {
  weather: PropTypes.shape({
    coord: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
