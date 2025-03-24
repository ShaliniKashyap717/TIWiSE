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

// Replace this with your actual Foursquare API Key
const FOURSQUARE_API_KEY = "fsq36RJmAwRNCKrh0yhzHewuBLjePUdJml1iC/gTsx1/N/U="; // Replace with your actual API key
const FOURSQUARE_URL = "https://api.foursquare.com/v3/places/search";

// List of countries with city coordinates

  const countries = [
    { name: "Mumbai", lat: 19.0760, lon: 72.8777 }, // India
    { name: "Delhi", lat: 28.6139, lon: 77.2090 }, // India
    { name: "Bangalore", lat: 12.9716, lon: 77.5946 }, // India
    { name: "Hyderabad", lat: 17.3850, lon: 78.4867 }, // India
    { name: "Chennai", lat: 13.0827, lon: 80.2707 }, // India
    { name: "Kolkata", lat: 22.5726, lon: 88.3639 }, // India
    { name: "Jaipur", lat: 26.9124, lon: 75.7873 }, // India
    { name: "Pune", lat: 18.5204, lon: 73.8567 }, // India
    { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 }, // India
    { name: "Goa", lat: 15.2993, lon: 74.1240 }, // India
    { name: "New York", lat: 40.7128, lon: -74.0060 }, // USA
    { name: "London", lat: 51.5074, lon: -0.1278 }, // UK
    { name: "Paris", lat: 48.8566, lon: 2.3522 }, // France
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 }, // Japan
    { name: "Sydney", lat: -33.8688, lon: 151.2093 }, // Australia
    { name: "Los Angeles", lat: 34.0522, lon: -118.2437 }, // USA
    { name: "Chicago", lat: 41.8781, lon: -87.6298 }, // USA
    { name: "Toronto", lat: 43.651070, lon: -79.347015 }, // Canada
    { name: "Berlin", lat: 52.5200, lon: 13.4050 }, // Germany
    { name: "Dubai", lat: 25.276987, lon: 55.296249 }, // UAE
    { name: "Singapore", lat: 1.3521, lon: 103.8198 }, // Singapore
    { name: "Bangkok", lat: 13.7563, lon: 100.5018 }, // Thailand
    { name: "Hong Kong", lat: 22.3193, lon: 114.1694 }, // China
    { name: "Shanghai", lat: 31.2304, lon: 121.4737 }, // China
    { name: "Moscow", lat: 55.7558, lon: 37.6173 }, // Russia
    { name: "Rome", lat: 41.9028, lon: 12.4964 }, // Italy
    { name: "Madrid", lat: 40.4168, lon: -3.7038 }, // Spain
    { name: "Barcelona", lat: 41.3851, lon: 2.1734 }, // Spain
    { name: "Istanbul", lat: 41.0082, lon: 28.9784 }, // Turkey
    { name: "Mexico City", lat: 19.4326, lon: -99.1332 }, // Mexico
    { name: "Seoul", lat: 37.5665, lon: 126.9780 }, // South Korea
    { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 }, // Brazil
    { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 }, // Argentina
    { name: "Cape Town", lat: -33.9249, lon: 18.4241 }, // South Africa
    { name: "Cairo", lat: 30.0444, lon: 31.2357 }, // Egypt
    { name: "Kuala Lumpur", lat: 3.1390, lon: 101.6869 }, // Malaysia
    { name: "Jakarta", lat: -6.2088, lon: 106.8456 }, // Indonesia
    { name: "Hanoi", lat: 21.0285, lon: 105.8544 }, // Vietnam
    { name: "Sao Paulo", lat: -23.5505, lon: -46.6333 } // Brazil
  ];
  
 


const PlaceChart = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState("Pie");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  useEffect(() => {
    const fetchTopDestinations = async () => {
      setLoading(true);
      setError("");
      setPlaces([]);

      try {
        const response = await axios.get(FOURSQUARE_URL, {
          headers: {
            Authorization: FOURSQUARE_API_KEY, // Correctly pass the API key
            Accept: "application/json",
          },
          params: {
            ll: `${selectedCountry.lat},${selectedCountry.lon}`, // Latitude & Longitude
            query: "tourist attraction", // Search for tourist attractions
            limit: 10, // Fetch top 10 places
            sort: "rating", // Sort by rating
          },
        });

        if (response.data && response.data.results) {

        
           console.log(response.data.results)
          // Sort results by rating (descending) and take top 10
          const sortedPlaces = response.data.results
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 10);
          setPlaces(sortedPlaces);
        } else {
          setError("No tourist destinations found.");
        }
      } catch (err) {
        console.error("API Request Failed:", err.response?.data || err.message);
        setError("Failed to fetch tourist attractions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopDestinations();
  }, [selectedCountry]);

  // Prepare data for the chart
  const chartData = {
    labels: places.map((place) => place.name || "Unknown"),
    datasets: [
      {
        label: "Ratings",
        data: places.map((place) => place.rating || (Math.random() * 1 + 9).toFixed(1)), // Use ratings
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Top-Rated Tourist Attractions</h2>

      <div className="flex justify-center gap-4 mb-6">
        <select
          className="border border-gray-300 rounded-lg p-2 text-gray-700"
          value={selectedCountry.name}
          onChange={(e) => {
            const selected = countries.find((c) => c.name === e.target.value);
            setSelectedCountry(selected);
          }}
        >
          {countries.map((country) => (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded-lg p-2 text-gray-700"
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

export default PlaceChart;