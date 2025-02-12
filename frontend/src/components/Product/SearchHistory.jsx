import PropTypes from "prop-types";
import "./product.scss";

export default function SearchHistory({ history, onSelectCity, onRemoveCity }) {
  return (
    <div className="search-history">
      <h3 className="history-title">Saved Cities</h3>
      {history.length > 0 ? (
        <ul>
          {history.map((city) => (
            <li key={city.id} className="history-item">
              <span
                className="city-name"
                onClick={() => onSelectCity(city.name)}
                style={{ cursor: "pointer" }}>
                {city.name}, {city.country_code}
              </span>
              <button
                className="remove-city-button"
                onClick={() => onRemoveCity(city)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-history">No saved cities</p>
      )}
    </div>
  );
}

SearchHistory.propTypes = {
  history: PropTypes.array.isRequired,
  onSelectCity: PropTypes.func.isRequired,
  onRemoveCity: PropTypes.func.isRequired,
};
