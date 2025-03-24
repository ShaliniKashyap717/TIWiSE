import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Menu, Waves, Mountain, Search, SlidersHorizontal } from "lucide-react";
import debounce from "lodash/debounce"; // Add this import if lodash is available

import Sidebar from "../components/Sidebar";
import MoodCard from "../components/MoodCard";
import DestinationCard from "../components/DestinationCard";
import { fetchPopularPlaces } from "../lib/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [displayTerm, setDisplayTerm] = useState(""); // For display purposes
  const [selectedMood, setSelectedMood] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [popularPlaces, setPopularPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const moodCategories = [
    { icon: <Waves className="text-teal-500" size={20} />, title: "Relax", color: "bg-teal-100" },
    { icon: <Waves className="text-purple-500" size={20} />, title: "Party", color: "bg-purple-100" },
    { icon: <Mountain className="text-green-500" size={20} />, title: "Adventure", color: "bg-green-100" },
    { icon: <Waves className="text-rose-500" size={20} />, title: "Romance", color: "bg-rose-100" },
    { icon: <Waves className="text-yellow-500" size={20} />, title: "Happy", color: "bg-yellow-100" },
    { icon: <Waves className="text-blue-500" size={20} />, title: "Calming", color: "bg-blue-100" },
  ];

  // Debounced search function to avoid too many API calls
  const debouncedFetchPlaces = useCallback(
    debounce(async (term) => {
      if (!term || term.trim() === "") {
        setPopularPlaces([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const places = await fetchPopularPlaces(term);
        setPopularPlaces(places || []);
        setDisplayTerm(term); // Update the display term after successful fetch
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("Failed to load places. Please try again.");
        setPopularPlaces([]);
      } finally {
        setIsLoading(false);
      }
    }, 800),
    []
  );

  // Effect to fetch places when search term changes
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      debouncedFetchPlaces(searchTerm);
    } else {
      setPopularPlaces([]);
      setDisplayTerm("");
    }

    // Cleanup
    return () => {
      debouncedFetchPlaces.cancel();
    };
  }, [searchTerm, debouncedFetchPlaces]);

  
  const moodToGenre = {
    Relax: 'Drama',
    Party: 'Music',
    Adventure: 'Action',
    Romance: 'Romantic Comedy',
    Happy: 'Animation,Comedy,Family',
    Calming: 'Drama',
  };

  const fetchMoviesByMood = async (mood) => {
    const genre = moodToGenre[mood];
    const apiKey = 'f688c63d';
    const currentYear = new Date().getFullYear();
    const fiveYearsAgo = currentYear - 5;

    try {
      console.log(`Fetching movies for mood: ${mood}, genre: ${genre}`); //**NEW**
      const apiUrl = `http://www.omdbapi.com/?s=${genre}&apikey=${apiKey}&type=movie`;
      console.log(`API URL: ${apiUrl}`); // **NEW**

      const response = await axios.get(apiUrl);
      console.log(`Full API Response:`, response);  // **NEW - VERY IMPORTANT**
      console.log(`API Response data:`, response.data); //**NEW**


      const filteredMovies = response.data.Search ? response.data.Search.filter(movie => {
          const movieYear = parseInt(movie.Year);
          return movieYear >= fiveYearsAgo && movieYear <= currentYear;
      }) : [];

      console.log(`Filtered Movies:`, filteredMovies); // **NEW**

      return filteredMovies || [];
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  };

  const handleMoodClick = async (mood) => {

    setSelectedMood(mood);
    toast.success(`Selected Mood: ${mood}`);
    const fetchedMovies = await fetchMoviesByMood(mood);
    setMovies(fetchedMovies);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsLoading(true); // Show loading immediately for better UX
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 relative">
      {/* Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 bg-white p-2 rounded-full shadow-md z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform z-50 lg:static lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        {/* Search Bar & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-3/4 lg:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Enter location to find most visited places..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-teal-500 text-white flex items-center gap-2 px-4 py-2 rounded-md">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>

            <div
              className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-200 transition"
              onClick={() => handleNavigation("/settings")}
            >
              <span className="font-medium">John Doe</span>
              <img
                src="https://i.pravatar.cc/150?img=32"
                alt="User Avatar"
                className="w-8 h-8 rounded-full border border-gray-200"
              />
            </div>
          </div>
        </div>

        {/* Mood Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">How do you feel today?</h2>
          <p className="text-sm text-gray-600 mb-4">Select your mood to get personalized recommendations!</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {moodCategories.map((category, index) => (
              <button key={index} onClick={() => handleMoodClick(category.title)} className="transition-transform hover:scale-105">
                <MoodCard {...category} />
              </button>
            ))}
          </div>
        </section>

        {/* Most Visited Places (Dynamic API Data) */}
        <section className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Most Visited Places in {displayTerm || "Your Location"}
          </h2>
          
          {isLoading ? (
            <div className="py-8 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 p-4 text-center">
              {error}
            </div>
          ) : popularPlaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {popularPlaces.map((place, index) => (
                <button 
                  key={index} 
                  onClick={() => toast.success(`You selected ${place.name}`)} 
                  className="transition-transform hover:scale-105"
                >
                  <DestinationCard
                    city={place.name}
                    country={place.country || "Unknown"}
                    image={place.image || "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"}
                  />
                </button>
              ))}
            </div>
          ) : searchTerm ? (
            <p className="text-gray-500 text-center py-4">No popular places found for "{searchTerm}".</p>
          ) : (
            <p className="text-gray-500 text-center py-4">Enter a location to see most visited places.</p>
          )}
        </section>

        {/* Additional Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Expense Tracker", description: "Track and manage your travel expenses", route: "/expenses" },
            { title: "Newsletter", description: "Subscribe for travel updates", route: "/newsletter" },
            { title: "Safe Places", description: "Discover women-friendly destinations", route: "/safe-places" },
          ].map((item, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer transition" onClick={() => handleNavigation(item.route)}>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <span className="text-teal-600 font-medium">View Details →</span>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
