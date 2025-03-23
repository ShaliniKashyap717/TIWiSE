import React, { useContext } from "react";
import { Camera } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeProvider";

const Settings = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [profileImage, setProfileImage] = React.useState("/default-avatar.png"); // Default profile pic

  // Handle Image Upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL); // Update preview
    }
  };

  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <Sidebar />

      <main className={`flex-1 p-8 ${isDarkMode ? "text-white" : "text-black"}`}>
        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>

        <div className="grid grid-cols-3 gap-6">
          {/* Profile Card */}
          <div
            className={`col-span-2 bg-white ${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } p-6 rounded-lg shadow-md`}
          >
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6">
              {/* Profile Picture */}
              <div className="relative w-20 h-20">
                <img
                  src={profileImage}
                  alt="User Profile"
                  className="w-20 h-20 rounded-full border shadow-md"
                />
                {/* Upload Button */}
                <label
                  className={`absolute bottom-0 right-0 bg-blue-600 ${
                    isDarkMode ? "bg-blue-500" : "bg-blue-600"
                  } p-2 rounded-full cursor-pointer`}
                >
                  <Camera
                    className={`text-white w-5 h-5 ${
                      isDarkMode ? "text-gray-200" : "text-white"
                    }`}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* User Info */}
              <div>
                <h2 className="text-lg font-semibold">Sarah Johnson</h2>
                <p className="text-gray-500 text-sm">Travel Enthusiast</p>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-4">
              <div>
                <label
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className={`w-full mt-1 p-2 border rounded-md ${
                    isDarkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-700"
                  }`}
                  defaultValue="Sarah Johnson"
                />
              </div>

              <div>
                <label
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  className={`w-full mt-1 p-2 border rounded-md ${
                    isDarkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-700"
                  }`}
                  defaultValue="sarah.j@example.com"
                />
              </div>

              <div>
                <label
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  Phone
                </label>
                <input
                  type="text"
                  className={`w-full mt-1 p-2 border rounded-md ${
                    isDarkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-700"
                  }`}
                  defaultValue="+1 234 567 8900"
                />
              </div>
            </div>
          </div>

          {/* Location & Preferences */}
          <div
            className={`bg-white ${
              isDarkMode ? "bg-gray-700" : "bg-white"
            } p-6 rounded-lg shadow-md`}
          >
            <h3
              className={`text-lg font-semibold ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              } mb-4`}
            >
              Current Location
            </h3>
            <p
              className={`text-gray-500 text-sm mb-2 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              San Francisco, CA
            </p>
            <img src="/map-placeholder.png" alt="Location" className="rounded-lg shadow-md" />
            <button
              className={`mt-4 bg-blue-600 ${
                isDarkMode ? "bg-blue-500" : "bg-blue-600"
              } text-white w-full py-2 rounded-md hover:bg-blue-700 transition`}
            >
              Update Location
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div
          className={`bg-white ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          } p-6 rounded-lg shadow-md mt-6 w-1/3`}
        >
          <h3
            className={`text-lg font-semibold ${
              isDarkMode ? "text-gray-200" : "text-gray-700"
            } mb-4`}
          >
            Preferences
          </h3>
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-gray-700 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email Notifications
            </span>
            <input type="checkbox" className="toggle-switch" />
          </div>
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-gray-700 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Location Services
            </span>
            <input type="checkbox" className="toggle-switch" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span
              className={`text-gray-700 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Dark Mode
            </span>
            <input
              type="checkbox"
              className="toggle-switch"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="text-right mt-6">
          <button
            className={`bg-blue-600 ${
              isDarkMode ? "bg-blue-500" : "bg-blue-600"
            } text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 transition`}
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
