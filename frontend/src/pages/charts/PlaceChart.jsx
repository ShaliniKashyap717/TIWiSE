import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie, Bar, Line, Doughnut, PolarArea } from "react-chartjs-2";
import { 
  Chart as ChartJS, CategoryScale, RadialLinearScale, LinearScale, 
  BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement 
} from "chart.js";


ChartJS.register(
  RadialLinearScale, CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, ArcElement, Title, Tooltip, Legend
);

const API_KEY = "rEcQbOXTSdXi0hJH4IgJs7gfYZ3JgZSw"; 
const API_SECRET = "6Nb2C6nnSyLmhFP0";
const TOKEN_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const DESTINATIONS_URL = "https://test.api.amadeus.com/v1/travel/analytics/air-traffic/booked";

const PlaceChart = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("Pie"); 

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.post(
          TOKEN_URL,
          new URLSearchParams({
            grant_type: "client_credentials",
            client_id: API_KEY,
            client_secret: API_SECRET,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        return response.data.access_token;
      } catch (err) {
        console.error("Failed to authenticate:", err.response?.data || err.message);
        setError("Failed to authenticate with Amadeus API.");
        setLoading(false);
        return null;
      }
    };

    const fetchTopDestinations = async () => {
      const token = await fetchAccessToken();
      if (!token) return;

      try {
        const response = await axios.get(DESTINATIONS_URL, {
          headers: { Authorization: `Bearer ${token}` },
          params: { 
            originCityCode: "NYC",
            period: "2023-12" 
          },
        });

        if (response.data && response.data.data) {
          setPlaces(response.data.data.slice(0, 10));
        } else {
          setError("No travel destination data found.");
        }
      } catch (err) {
        console.error("API Request Failed:", err.response?.data || err.message);
        setError("Failed to fetch travel destinations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopDestinations();
  }, []);

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  const chartData = {
    labels: places.map((place) => place.destination || "Unknown"),
    datasets: [
      {
        label: "Number of Bookings",
        data: places.map((place) => place.analytics?.bookings || 0),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", 
          "#FF9F40", "#C9CBCF", "#FF6384", "#36A2EB", "#FFCE56"
        ],
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
    <div className="w-full h-full flex flex-col items-center bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Most Booked Travel Destinations
      </h2>

      <select 
        className="mb-2 border border-gray-300 rounded-lg p-2 text-gray-700 w-2/3"
        value={chartType} 
        onChange={(e) => setChartType(e.target.value)}
      >
        <option value="Pie">Pie Chart</option>
        <option value="Bar">Bar Chart</option>
        <option value="Line">Line Chart</option>
        <option value="Doughnut">Doughnut Chart</option>
        <option value="PolarArea">Polar Area Chart</option>
      </select>

      <div className="w-full max-w-4xl h-[450px] flex justify-center items-center">
        {renderChart()}
      </div>
    </div>
  );
};

export default PlaceChart;