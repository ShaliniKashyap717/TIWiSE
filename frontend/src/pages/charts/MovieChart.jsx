import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const API_KEY = '9680287e6a3746ce4e45e7c9cd7fc829';

const MovieChart = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'popular', label: 'Popular Movies' },
    { value: 'top_rated', label: 'Top Rated' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'now_playing', label: 'Now Playing' }
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results.slice(0, 10));
        setError('');
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  const chartData = {
    labels: movies.map(movie => movie.title),
    datasets: [{
      data: movies.map(movie => movie.vote_average * 10),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', 
        '#9966FF', '#FF9F40', '#8AC24A', '#FF5722', 
        '#607D8B', '#9C27B0'
      ],
      borderWidth: 1
    }]
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Top 10 Movies
      </h2>
      
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-xs">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Select Category:
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          >
            {categories.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
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
                  text: `Top 10 ${categories.find(c => c.value === category)?.label}`,
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

export default MovieChart;