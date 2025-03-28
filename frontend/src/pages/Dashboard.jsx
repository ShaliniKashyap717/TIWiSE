import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Menu, Waves, Mountain, Search, SlidersHorizontal } from "lucide-react";
import axios from 'axios';
import CompetitorPriceComparison from "./charts/CompetitorPriceComparison";

import Sidebar from "../components/Sidebar";
import MoodCard from "../components/MoodCard";
import DestinationCard from "../components/DestinationCard";
import Chart from "./charts/Charts";
import POITrends from "./charts/POITrends";

const indianCities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Chennai",
  "Kolkata",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Udaipur",
  "Goa",
  "Agra",
  "Varanasi",
  "Surat",
  "Indore",
  "Chandigarh",
  "Lucknow",
  "Bhopal",
  "Coimbatore",
  "Visakhapatnam",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [summarySection, setSummarySection] = useState('Most Visited Places');

  const AnalyticsCategory = [
    { title: "Most Visited Places" },
    { title: "Most Liked Movies" },
    { title: "Most Rated Hotels" }
  ];

  const [cityA, setCityA] = useState("Mumbai"); 
  const [cityB, setCityB] = useState("Delhi");

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <button
        className="lg:hidden fixed top-4 left-4 bg-white p-2 rounded-full shadow-md z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } lg:hidden`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform z-50 lg:static lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          
          {/* Left Column - Competitor Prices */}
          <div className="w-full lg:w-1/2">
            <CompetitorPriceComparison /> {/* Use the new component */}
          </div>

          {/* Right Column - Graph Section */}
          <div className="w-full lg:w-1/2">
            <section className="bg-white rounded-xl shadow p-6 h-full">
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 w-full mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none "
                value={summarySection}
                onChange={(e) => setSummarySection(e.target.value)}
              >
                {AnalyticsCategory.map((category, index) => (
                  <option key={index} value={category.title}>
                    {category.title}
                  </option>
                ))}
              </select>
              <div className="h-[calc(100%-100px)]">
                <Chart type={summarySection} />
              </div>
            </section>
          </div>
        </div>

     

        <div className="p-6 bg-gray-100 min-h-screen">
      {/* City Selection */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <label className="font-semibold">Select City A:</label>
        <select
          value={cityA}
          onChange={(e) => setCityA(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          {indianCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label className="font-semibold">Select City B:</label>
        <select
          value={cityB}
          onChange={(e) => setCityB(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >   {indianCities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <POITrends cityA={cityA} cityB={cityB} />
    </div>


      </main>
    </div>
  );
};

export default Dashboard;
