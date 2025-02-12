import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import SearchHistory from "./SearchHistory";
import { useAuth } from "../../Context/AuthContext";
import "./product.scss";

export default function ProductSearch() {
  const { user, token } = useAuth();
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (user && token) {
      axios
        .get("http://127.0.0.1:8000/api/user/cities", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setHistory(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user's cities", error);
        });
    }
  }, [user, token]);

  const fetchWeather = async (cityName) => {
    const searchQuery = cityName || query;
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/weather?q=${encodeURIComponent(searchQuery)}`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  /**
   * Dodawanie miasta do profilu
   */
  const handleAddToProfile = async () => {
    if (!user || !token) {
      setModal({
        message: "You must be logged in to add a city!",
        type: "error",
      });
      setTimeout(() => setModal(null), 3000);
      return;
    }

    const cityId = weather.id;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/add-city",
        { city_id: cityId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (
        response.status === 200 &&
        response.data.message === "City already added."
      ) {
        setModal({
          message: "City already added. You cannot add the same city again.",
          type: "error",
        });
        setTimeout(() => setModal(null), 3000);
      } else if (response.status === 200) {
        axios
          .get("http://127.0.0.1:8000/api/user/cities", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setHistory(res.data);
            setModal({
              message: "City added successfully. Check your saved cities.",
              type: "success",
            });
            setTimeout(() => setModal(null), 3000);
          });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setModal({
          message: error.response.data.message,
          type: "error",
        });
      } else {
        setModal({
          message: "Failed to add city. Please try again.",
          type: "error",
        });
      }
      setTimeout(() => setModal(null), 3000);
    }
  };

  const handleRemoveFromProfile = async (city) => {
    if (!user || !token) {
      setModal({
        message: "You must be logged in to remove a city!",
        type: "error",
      });
      setTimeout(() => setModal(null), 3000);
      return;
    }

    const cityId = city.openweather_city_id || city.id;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/remove-city",
        { city_id: cityId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        axios
          .get("http://127.0.0.1:8000/api/user/cities", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setHistory(res.data);
            setModal({
              message:
                "City removed successfully. Your saved cities list is updated.",
              type: "success",
            });
            setTimeout(() => setModal(null), 3000);
          });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setModal({
          message: error.response.data.message,
          type: "error",
        });
      } else {
        setModal({
          message: "Failed to remove city. Please try again.",
          type: "error",
        });
      }
      setTimeout(() => setModal(null), 3000);
    }
  };

  return (
    <div className="weather-container">
      {user && history.length > 0 && (
        <SearchHistory
          history={history}
          onSelectCity={(cityName) => fetchWeather(cityName)}
          onRemoveCity={handleRemoveFromProfile}
        />
      )}

      <div className="product-search">
        <h2 className="weather__title">Check Weather</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter city name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => fetchWeather()}>&#128269;</button>
        </div>

        {error && <p className="error-message">{error}</p>}
        {weather && (
          <ProductCard
            weather={weather}
            added={history.some(
              (city) => Number(city.openweather_city_id) === weather.id
            )}
            handleAddToProfile={handleAddToProfile}
            handleRemoveFromProfile={() => handleRemoveFromProfile(weather)}
          />
        )}
      </div>
      {modal && (
        <div className={`modal ${modal.type}`}>
          <p>{modal.message}</p>
        </div>
      )}
    </div>
  );
}
