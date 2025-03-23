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

const API_KEY = "e843e965a578c5bd829c86cbf6fe3d6d"; 
const API_URL = "https://api.themoviedb.org/3/movie/popular";

const MovieChart = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("Pie"); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: { api_key: API_KEY, language: "en-US", page: 1 },
        });

        setMovies(response.data.results.slice(0, 10));
      } catch (err) {
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="text-center text-gray-700">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  const chartData = {
    labels: movies.map((movie) => movie.title),
    datasets: [
      {
        label: "Popularity",
        data: movies.map((movie) => movie.popularity),
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
    <div className="w-full h-full flex flex-col items-center bg-white shadow-lg p-2 rounded-lg">
      {/* Title */}
      <h6 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Most Liked Movies
      </h6>

      {/* Chart Type Selector */}
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

      {/* Chart */}
      <div className="w-full max-w-4xl h-[450px] flex justify-center items-center">
        {renderChart()}
      </div>
    </div>
  );
};

export default MovieChart;
