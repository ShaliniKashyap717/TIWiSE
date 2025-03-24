import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar, Line, Doughnut, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AMADEUS_BASE_URL = "https://test.api.amadeus.com";
const CLIENT_ID = "XxacBK7b75Du0C0jgQz7GiLR5jG7CVRG";
const CLIENT_SECRET = "RbrKuPBdDWBYL0ue";

const cities = [
  { code: "NYC", name: "New York" },
  { code: "LON", name: "London" },
  { code: "PAR", name: "Paris" },
  { code: "BKK", name: "Bangkok" },
  { code: "TOK", name: "Tokyo" },
];

const HotelChart = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState("Pie");
  const [selectedCity, setSelectedCity] = useState(cities[0].code);

  const getAccessToken = async () => {
    try {
      const response = await axios.post(
        `${AMADEUS_BASE_URL}/v1/security/oauth2/token`,
        `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      return response.data.access_token;
    } catch (err) {
      console.error("Token Error:", err.response ? err.response.data : err.message);
      setError("Failed to authenticate with Amadeus API.");
      return null;
    }
  };

  const fetchHotels = async (cityCode) => {
    setLoading(true);
    setError("");
    setHotels([]);
    
    const accessToken = await getAccessToken();
    if (!accessToken) return;
    
    try {
      const response = await axios.get(
        `${AMADEUS_BASE_URL}/v1/reference-data/locations/hotels/by-city`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: { cityCode },
        }
      );

      const hotelData = response.data.data
        .map((hotel) => ({
          name: hotel.name,
          rating: hotel.rating || Math.random() * 5,
        }))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 10);

      setHotels(hotelData);
    } catch (err) {
      console.error("Hotel Fetch Error:", err.response ? err.response.data : err.message);
      setError("Failed to fetch hotel data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels(selectedCity);
  }, [selectedCity]);

  const chartData = {
    labels: hotels.map((hotel) => hotel.name),
    datasets: [
      {
        label: "Hotel Rating",
        data: hotels.map((hotel) => hotel.rating),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#C9CBCF", "#FF6384", "#36A2EB", "#FFCE56"],
        borderWidth: 1,
      },
    ],
  };

  const renderChart = () => {
    switch (chartType) {
      case "Bar":
        return <Bar data={chartData} />;
      case "Line":
        return <Line data={chartData} />;
      case "Doughnut":
        return <Doughnut data={chartData} />;
      case "PolarArea":
        return <PolarArea data={chartData} />;
      default:
        return <Pie data={chartData} />;
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Top 10 Hotels by Rating
      </h2>

      <div className="flex justify-center gap-4 mb-6">
        <select
          className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city.code} value={city.code}>{city.name}</option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="Pie">Pie Chart</option>
          <option value="Bar">Bar Chart</option>
          <option value="Line">Line Chart</option>
          <option value="Doughnut">Doughnut Chart</option>
          <option value="PolarArea">Polar Area Chart</option>
        </select>
      </div>

      <div className="w-full h-[400px] flex justify-center items-center">
        {loading ? (
          <p className="text-gray-600">Loading chart...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          renderChart()
        )}
      </div>
    </div>
  );
};

export default HotelChart;
