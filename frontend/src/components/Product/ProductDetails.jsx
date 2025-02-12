import PropTypes from "prop-types";

export default function ProductDetails({ weather }) {
  return (
    <div className="product-details">
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Pressure: {weather.main.pressure} hPa</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}

ProductDetails.propTypes = {
  weather: PropTypes.shape({
    main: PropTypes.shape({
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
