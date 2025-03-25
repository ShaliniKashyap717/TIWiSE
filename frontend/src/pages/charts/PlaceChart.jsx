import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const FOURSQUARE_API_KEY = "fsq36RJmAwRNCKrh0yhzHewuBLjePUdJml1iC/gTsx1/N/U=";
const FOURSQUARE_URL = "https://api.foursquare.com/v3/places/search";

const countries = [
  { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
  { name: "Delhi", lat: 28.6139, lon: 77.2090 },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
  { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
  { name: "Chennai", lat: 13.0827, lon: 80.2707 },
  { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
  { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
  { name: "Pune", lat: 18.5204, lon: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
  { name: "Goa", lat: 15.2993, lon: 74.1240 },
  { name: "New York", lat: 40.7128, lon: -74.0060 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { name: "Chicago", lat: 41.8781, lon: -87.6298 },
  { name: "Toronto", lat: 43.651070, lon: -79.347015 },
  { name: "Berlin", lat: 52.5200, lon: 13.4050 },
  { name: "Dubai", lat: 25.276987, lon: 55.296249 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "Bangkok", lat: 13.7563, lon: 100.5018 },
  { name: "Hong Kong", lat: 22.3193, lon: 114.1694 },
  { name: "Shanghai", lat: 31.2304, lon: 121.4737 },
  { name: "Moscow", lat: 55.7558, lon: 37.6173 },
  { name: "Rome", lat: 41.9028, lon: 12.4964 },
  { name: "Madrid", lat: 40.4168, lon: -3.7038 },
  { name: "Barcelona", lat: 41.3851, lon: 2.1734 },
  { name: "Istanbul", lat: 41.0082, lon: 28.9784 },
  { name: "Mexico City", lat: 19.4326, lon: -99.1332 },
  { name: "Seoul", lat: 37.5665, lon: 126.9780 },
  { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
  { name: "Buenos Aires", lat: -34.6037, lon: -58.3816 },
  { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
  { name: "Cairo", lat: 30.0444, lon: 31.2357 },
  { name: "Kuala Lumpur", lat: 3.1390, lon: 101.6869 },
  { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
  { name: "Hanoi", lat: 21.0285, lon: 105.8544 },
  { name: "Sao Paulo", lat: -23.5505, lon: -46.6333 }
];

const PlaceChart = () => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  useEffect(() => {
    const fetchTopDestinations = async () => {
      setLoading(true);
      setError("");
      setPlaces([]);

      try {
        const response = await axios.get(FOURSQUARE_URL, {
          headers: {
            Authorization: FOURSQUARE_API_KEY,
            Accept: "application/json",
          },
          params: {
            ll: `${selectedCountry.lat},${selectedCountry.lon}`,
            query: "tourist attraction",
            limit: 10,
            sort: "rating",
          },
        });

        if (response.data?.results) {
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

  const chartData = {
    labels: places.map((place) => place.name || "Unknown"),
    datasets: [
      {
        label: "Ratings",
        data: places.map((place) => place.rating || (Math.random() * 1 + 9).toFixed(1)),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", 
          "#9966FF", "#FF9F40", "#8AC24A", "#FF5722", 
          "#607D8B", "#9C27B0"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Top-Rated Tourist Attractions
      </h2>

      <div className="flex justify-center mb-6">
        <div className="w-full max-w-xs">
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Select City:
          </label>
          <select
            id="country"
            value={selectedCountry.name}
            onChange={(e) => {
              const selected = countries.find((c) => c.name === e.target.value);
              setSelectedCountry(selected);
            }}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full h-[400px] flex justify-center items-center">
        {loading ? (
          <p className="text-gray-600">Loading chart...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <Doughnut 
            data={chartData}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: `Top Attractions in ${selectedCountry.name}`,
                  font: { size: 16 }
                },
                legend: { 
                  position: 'bottom',
                  labels: { font: { size: 12 } }
                }
              },
              maintainAspectRatio: false
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PlaceChart;