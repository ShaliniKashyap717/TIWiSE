import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import { handleSuccess } from "../lib/utils";

const UserProfile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("loggedInUser") || "Guest"; 
  const userAvatar = localStorage.getItem("userAvatar") || "https://i.pravatar.cc/150";

  const handleLogout = () => {
    localStorage.removeItem("token"); // JWT remove karein
    localStorage.removeItem("loggedInUser"); // User name remove karein
    localStorage.removeItem("userAvatar");
    handleSuccess('User Loggedout');
    setTimeout(() => {
        navigate("/login"); 
      }, 1000);
    };

  return (
    <div className="relative">
      {/* Profile Section */}
      <div
        className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-gray-200 rounded-lg"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={userAvatar}  // 🟢 Dynamic user image
          alt="User"
          className="w-10 h-10 rounded-full"
        />
         <div>
          <p className="text-sm font-medium">{userName}</p> {/* 🟢 Dynamic user name */}
          <p className="text-xs text-gray-500">Travel Enthusiast</p>
        </div>
      </div>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute bottom-12 left-0 bg-white shadow-lg rounded-lg py-2 w-40">
          <button
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            onClick={() => navigate("/settings")}
          >
            View Profile
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
          <ToastContainer/>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
