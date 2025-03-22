
import React, { useState } from 'react';
import { toast } from 'sonner';
import { 
  MapPin, 
  Save,
  ArrowLeft 
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Sidebar from '../components/Sidebar';

const Profile = () => {
  const [profile, setProfile] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 234 567 8900',
    preferences: {
      emailNotifications: true,
      locationServices: true,
      darkMode: false
    }
  });
  
  const [currentLocation] = useState({
    city: 'San Francisco',
    state: 'CA',
    lastUpdated: '2 mins ago'
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };
  
  const handleToggleChange = (name) => {
    setProfile({
      ...profile,
      preferences: {
        ...profile.preferences,
        [name]: !profile.preferences[name]
      }
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };
  
  const handleUpdateLocation = () => {
    toast.success('Location updated successfully!');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Link to="/" className="w-8 h-8 rounded-full bg-white shadow flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft size={16} />
              </Link>
              <h1 className="text-2xl font-semibold">Profile Settings</h1>
            </div>
            
            <button 
              className="btn-teal flex items-center gap-2"
              onClick={handleSubmit}
            >
              <Save size={16} />
              <span>Save Changes</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <section className="bg-white rounded-xl shadow p-6 animate-fade-in">
                <div className="flex items-center gap-4 mb-8">
                  <img 
                    src="https://i.pravatar.cc/150?img=45" 
                    alt="User Avatar" 
                    className="w-16 h-16 rounded-full border border-gray-200"
                  />
                  <div>
                    <h2 className="font-semibold">{profile.fullName}</h2>
                    <p className="text-gray-500">Travel Enthusiast</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        className="input-field"
                        value={profile.fullName}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="input-field"
                        value={profile.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        className="input-field"
                        value={profile.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h3 className="font-medium text-lg mb-4">Preferences</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Email Notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={profile.preferences.emailNotifications}
                              onChange={() => handleToggleChange('emailNotifications')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Location Services</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={profile.preferences.locationServices}
                              onChange={() => handleToggleChange('locationServices')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Dark Mode</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="sr-only peer"
                              checked={profile.preferences.darkMode}
                              onChange={() => handleToggleChange('darkMode')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </section>
            </div>
            
            <div>
              <section className="bg-white rounded-xl shadow p-6 mb-6 animate-scale-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Current Location</h3>
                  <MapPin className="text-red-500" size={18} />
                </div>
                
                <div className="text-gray-700 mb-4">
                  <p className="font-medium">{currentLocation.city}, {currentLocation.state}</p>
                  <p className="text-sm text-gray-500">Last updated: {currentLocation.lastUpdated}</p>
                </div>
                
                <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img 
                    src="https://maps.googleapis.com/maps/api/staticmap?center=San+Francisco,CA&zoom=13&size=400x300&maptype=roadmap&markers=color:red%7CSan+Francisco,CA&key=YOUR_API_KEY" 
                    alt="Map"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <button 
                  className="btn-blue w-full"
                  onClick={handleUpdateLocation}
                >
                  Update Location
                </button>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
