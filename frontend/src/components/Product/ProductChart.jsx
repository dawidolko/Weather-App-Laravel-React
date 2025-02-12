import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProductChart({ weather }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function fetchForecast() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/weather/forecast?lat=${weather.coord.lat}&lon=${weather.coord.lon}`
        );
        if (!response.ok) throw new Error("Error fetching forecast data");
        const data = await response.json();
        // Get only the next few measurements (e.g. 8 measurements taken every 3 hours)
        const formattedData = data.list.slice(0, 8).map((item) => ({
          time: item.dt_txt.split(" ")[1].substring(0, 5),
          temp: Math.round(item.main.temp),
        }));
        setForecast(formattedData);
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchForecast();
  }, [weather]);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={forecast}>
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="temp" stroke="#007bff" />
      </LineChart>
    </ResponsiveContainer>
  );
}

ProductChart.propTypes = {
  weather: PropTypes.shape({
    coord: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lon: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};
