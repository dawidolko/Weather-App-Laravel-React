import { useState } from "react";
import PropTypes from "prop-types";
import ProductChart from "./ProductChart";
import ProductForecast from "./ProductForecast";
import "./product.scss";

export default function ProductCard({
  weather,
  added,
  handleAddToProfile,
  handleRemoveFromProfile,
}) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => setShowDetails((prev) => !prev);

  return (
    <div className="product-card">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <div className="current-weather">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
          className="weather-icon"
        />
        <p className="temperature">{Math.round(weather.main.temp)}°C</p>
        <p className="humidity">Humidity: {weather.main.humidity}%</p>
      </div>

      <button className="details-toggle" onClick={toggleDetails}>
        {showDetails ? "Hide details" : "Show details"}
      </button>

      {showDetails && (
        <div className="details-container">
          <ProductChart weather={weather} />
          <ProductForecast weather={weather} />
        </div>
      )}

      {typeof added === "boolean" && (
        <>
          {added ? (
            <button className="remove-button" onClick={handleRemoveFromProfile}>
              Added city
            </button>
          ) : (
            <button className="add-button" onClick={handleAddToProfile}>
              Add city
            </button>
          )}
        </>
      )}
    </div>
  );
}

ProductCard.propTypes = {
  weather: PropTypes.object.isRequired,
  added: PropTypes.bool.isRequired,
  handleAddToProfile: PropTypes.func.isRequired,
  handleRemoveFromProfile: PropTypes.func.isRequired,
};
