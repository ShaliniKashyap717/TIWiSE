import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Menu, Waves, Mountain, Search, SlidersHorizontal } from "lucide-react";
import Sidebar from "../components/Sidebar";
import MoodCard from "../components/MoodCard";
import DestinationCard from "../components/DestinationCard";
import Chart from "./charts/Charts";
const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMood, setSelectedMood] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [summarySection, setSummarySection]=useState('Most Liked Hotel')

  const moodCategories = [
    { icon: <Waves className="text-teal-500" size={20} />, title: "Relax", color: "bg-teal-100" },
    { icon: <Waves className="text-teal-500" size={20} />, title: "Party", color: "bg-teal-100" },
    { icon: <Mountain className="text-teal-500" size={20} />, title: "Adventure", color: "bg-teal-100" },
    { icon: <Waves className="text-teal-500" size={20} />, title: "Romance", color: "bg-teal-100" },
    { icon: <Waves className="text-teal-500" size={20} />, title: "Happy", color: "bg-teal-100" },
    { icon: <Waves className="text-teal-500" size={20} />, title: "Calming", color: "bg-teal-100" },
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

  const AnalyticsCategory=[
    {
      index: 1,
      title: "Most Visited Places"
    },
    {
      index: 2,
      title: "Most Liked Movies"
    },
    {
    index: 3,
    title: "Most Rated Hotels"
    }

    
  ]

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    toast.success(`Selected Mood: ${mood}`);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleSummarySectionChange = (e)=>{
    setSummarySection(e.target.value)
  }

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
        {/* Search Bar & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-3/4 lg:w-1/2">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search destinations, restaurants, places..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-teal flex items-center gap-2 px-4 py-2 rounded-md">
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
       
        {/* Graph Section*/}

        <section className=" mb-8">
  
        <h2 className="text-xl font-semibold mb-2">Select Category to See the summary</h2>
    
    {/* Dropdown */}
    <select
      className="border border-gray-300 rounded-lg px-1 py-1 text-gray-700 w-1/2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      value={summarySection}
      onChange={handleSummarySectionChange}
    >
      <option value={summarySection} disabled>{summarySection}</option>
      {AnalyticsCategory.map((category, index) => (
        <option key={index} value={category.title}>
          {category.title}
        </option>
      ))}
    </select>

    {/* Graph Container */}
    <div className="mt-1 flex justify-items-start">
      <div className="w-full max-w-2xl">
        <Chart type={summarySection}/>
      </div>
    </div>
  
</section>

      


        {/* Mood Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">How do you feel today?</h2>
          <p className="text-sm text-gray-600 mb-4">Select your mood to get personalized recommendations!</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {moodCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleMoodClick(category.title)}
                className="transition-transform transform hover:scale-105"
              >
                <MoodCard {...category} />
              </button>
            ))}
          </div>
        </section>

       
        {/* Destinations */}
        <section className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Most Visited Places</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {destinations.map((destination, index) => (
              <button
                key={index}
                onClick={() => toast.success(`You selected ${destination.city}`)}
                className="transition-transform transform hover:scale-105"
              >
                <DestinationCard {...destination} />
              </button>
            ))}
          </div>
        </section>

        {/* Additional Sections */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Expense Tracker", description: "Track and manage your travel expenses", route: "/expenses" },
            { title: "Newsletter", description: "Subscribe for travel updates", route: "/newsletter" },
            { title: "Safe Places", description: "Discover women-friendly destinations", route: "/safe-places" },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer transition"
              onClick={() => handleNavigation(item.route)}
            >
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
