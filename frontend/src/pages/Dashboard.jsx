import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Film, MoonStar, Waves, Mountain, Search, SlidersHorizontal
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import MoodCard from "../components/MoodCard";
import DestinationCard from "../components/DestinationCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);

  const moodCategories = [
    { icon: <Film className="text-purple-500" size={20} />, title: "Movies", color: "bg-purple-100" },
    { icon: <MoonStar className="text-indigo-500" size={20} />, title: "Astrology", color: "bg-indigo-100" },
    { icon: <Waves className="text-orange-500" size={20} />, title: "Beach", color: "bg-orange-100" },
    { icon: <Mountain className="text-teal-500" size={20} />, title: "Adventure", color: "bg-teal-100" },
  ];

  const destinations = [
    {
      city: "Paris",
      country: "France",
      visitors: 1300000,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&q=75&fit=crop&w=600",
    },
    {
      city: "Bali",
      country: "Indonesia",
      visitors: 850000,
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&q=75&fit=crop&w=600",
    },
  ];

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    toast.success(`Selected Mood: ${mood}`);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        {/* 🔎 Search Bar & Filters */}
        <div className="flex items-center justify-between mb-8">
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search destinations, restaurants, places..."
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-teal flex items-center gap-2">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>

            {/* 🟢 Clickable Profile Section */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition duration-300"
              onClick={() => handleNavigation("/settings")}
            >
              <span className="font-medium">John Doe</span>
              <img
                src="https://i.pravatar.cc/150?img=32"
                alt="User Avatar"
                className="w-8 h-8 rounded-full border border-gray-200 hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* 🎭 Mood Section */}
        <section className="mb-8 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">What's your mood?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {moodCategories.map((category, index) => (
              <button key={index} onClick={() => handleMoodClick(category.title)}>
                <MoodCard {...category} />
              </button>
            ))}
          </div>
        </section>

        {/* 🌍 Destinations */}
        <section className="bg-white rounded-xl shadow p-6 animate-scale-in">
          <h2 className="text-xl font-semibold mb-4">Most Visited Places</h2>
          <div className="space-y-2">
            {destinations.map((destination, index) => (
              <button key={index} onClick={() => toast.success(`You selected ${destination.city}`)}>
                <DestinationCard {...destination} />
              </button>
            ))}
          </div>
        </section>

        {/* 📢 Additional Sections */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div
            className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer transition"
            onClick={() => handleNavigation("/expenses")}
          >
            <h3 className="font-semibold">Expense Tracker</h3>
            <p className="text-sm text-gray-600">Track and manage your travel expenses</p>
            <span className="text-blue-600 font-medium">View Details →</span>
          </div>

          <div
            className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer transition"
            onClick={() => handleNavigation("/newsletter")}
          >
            <h3 className="font-semibold">Newsletter</h3>
            <p className="text-sm text-gray-600">Subscribe for travel updates</p>
            <span className="text-blue-600 font-medium">Subscribe →</span>
          </div>

          <div
            className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer transition"
            onClick={() => handleNavigation("/safe-places")}
          >
            <h3 className="font-semibold">Safe Places</h3>
            <p className="text-sm text-gray-600">Discover women-friendly destinations</p>
            <span className="text-blue-600 font-medium">Explore →</span>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;