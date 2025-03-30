
import React, { useContext, useState, useEffect } from "react";
import { Camera } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { ThemeContext } from "../context/ThemeProvider";

const Settings = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone_no: "",
    profileImage: "",
  });

  // ✅ Load user details from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUserName = localStorage.getItem("loggedInUser");
    const storedImage = localStorage.getItem("profileImage");

    console.log("Stored User:", storedUser);
    console.log("Stored User Name:", storedUserName);
    console.log("Stored Image:", storedImage);

    if (storedUser) {
      setUser((prev) => ({
        ...prev,
        //...storedUser,
        name: storedUserName || storedUser.name,
        email:storedUser.email,
        phone_no: storedUser.phone_no,
        profileImage: storedImage || storedUser.profileImage || "",
      }));
    }
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  console.log("handlechange after log",user);

  // ✅ Handle Image Upload (Save to LocalStorage)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setUser((prev) => ({ ...prev, profileImage: imageURL }));
      localStorage.setItem("profileImage", imageURL);
    }
  };

  // ✅ Save Changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("🔹 Sending Request with Token:", token);
      console.log("🔹 Updated User Data:", user);

      const response = await fetch("http://localhost:8080/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (data.success) {
        alert("Profile updated successfully!");
        const updatedUser = {  ...data.updatedUser };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
      <Sidebar />

      <main className={`flex-1 p-8 ${isDarkMode ? "text-white" : "text-black"}`}>
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>

        <div className="grid grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className={`col-span-2 p-6 rounded-lg shadow-md ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
            <div className="flex items-center gap-4 mb-6">
              {/* Profile Picture */}
              <div className="relative w-20 h-20">
                <img 
                  src={user.profileImage || "/default-avatar.png"} 
                  alt="User Profile" 
                  className="w-20 h-20 rounded-full border shadow-md" 
                />

                <label className={`absolute bottom-0 right-0 p-2 rounded-full cursor-pointer ${isDarkMode ? "bg-blue-500" : "bg-blue-600"}`}>
                  <Camera className={`w-5 h-5 ${isDarkMode ? "text-gray-200" : "text-white"}`} />
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </label>
              </div>

              {/* User Info */}
              <div>
                <h2 className="text-lg font-semibold">{user.name || "Guest User"}</h2>
                <p className="text-gray-500 text-sm">Travel Enthusiast</p>
              </div>
            </div>

            {/* Editable Fields */}
            <div className="space-y-4">
              <div>
                <label className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  className={`w-full mt-1 p-2 border rounded-md ${isDarkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-700"}`}
                  value={user.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Email</label>
                <input
                  type="email"
                  name="email"
                  className={`w-full mt-1 p-2 border rounded-md ${isDarkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-700"}`}
                  value={user.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className={`text-sm font-medium ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Phone</label>
                <input
                  type="text"
                  name="phone_no"
                  className={`w-full mt-1 p-2 border rounded-md ${isDarkMode ? "bg-gray-600 text-gray-200" : "bg-gray-100 text-gray-700"}`}
                  value={user.phone_no}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Location & Preferences */}
          <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}>Current Location</h3>
            <p className={`text-gray-500 text-sm mb-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>San Francisco, CA</p>
            <img src="/map-placeholder.png" alt="Location" className="rounded-lg shadow-md" />
            <button className={`mt-4 w-full py-2 rounded-md hover:bg-blue-700 transition ${isDarkMode ? "bg-blue-500" : "bg-blue-600"} text-white`}>
              Update Location
            </button>
          </div>
        </div>

        {/* Preferences */}
        <div className={`p-6 rounded-lg shadow-md mt-6 w-1/3 ${isDarkMode ? "bg-gray-700" : "bg-white"}`}>
          <h3 className="text-lg font-semibold mb-4">Preferences</h3>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700">Email Notifications</span>
            <input type="checkbox" className="toggle-switch" />
          </div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700">Location Services</span>
            <input type="checkbox" className="toggle-switch" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Dark Mode</span>
            <input type="checkbox" className="toggle-switch" checked={isDarkMode} onChange={toggleTheme} />
          </div>
        </div>

        {/* Save Button */}
        <div className="text-right mt-6">
          <button onClick={handleSubmit} className={`px-6 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 transition ${isDarkMode ? "bg-blue-500" : "bg-blue-600"} text-white`}>
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
};

export default Settings;

