import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import 'leaflet/dist/leaflet.css';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion'; // For animations

const socket = io('http://localhost:5000'); // Connect to backend server

const SocialConnect = () => {
  const [roomId, setRoomId] = useState('');
  const [joined, setJoined] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [otherUserLocation, setOtherUserLocation] = useState(null);
  const [distanceData, setDistanceData] = useState([]);

  // Function to create a new room
  const createRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8);
    setRoomId(newRoomId);
    socket.emit('create-room', newRoomId);
    setJoined(true);
  };

  // Function to join an existing room
  const joinRoom = () => {
    if (roomId) {
      socket.emit('join-room', roomId);
      setJoined(true);
    }
  };

  // Track user location
  useEffect(() => {
    if (!joined) return;
    
    const updateLocation = (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation({ lat: latitude, lng: longitude });
      socket.emit('send-location', { roomId, location: { lat: latitude, lng: longitude } });
    };
    
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(updateLocation);
    }
  }, [joined, roomId]);

  // Listen for other user's location
  useEffect(() => {
    socket.on('receive-location', (location) => {
      setOtherUserLocation(location);
    });
  }, []);

  // Calculate distance (Haversine formula)
  const calculateDistance = (loc1, loc2) => {
    if (!loc1 || !loc2) return 0;
    const R = 6371;
    const dLat = (loc2.lat - loc1.lat) * (Math.PI / 180);
    const dLng = (loc2.lng - loc1.lng) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(loc1.lat * (Math.PI / 180)) *
              Math.cos(loc2.lat * (Math.PI / 180)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  useEffect(() => {
    if (userLocation && otherUserLocation) {
      const distance = calculateDistance(userLocation, otherUserLocation);
      setDistanceData((prev) => [...prev, { time: new Date().toLocaleTimeString(), distance }]);
    }
  }, [userLocation, otherUserLocation]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Use the main Sidebar component */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-center mb-4 text-teal-500"
        >
          Social Connect
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-600 text-center mb-6"
        >
          Connect with friends in real-time, anywhere, anytime.
        </motion.p>

        {!joined ? (
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={createRoom}
              className="bg-teal-500 text-white px-4 py-2 rounded"
            >
              Create Room
            </motion.button>
            <input 
              type="text" 
              placeholder="Enter Room ID" 
              value={roomId} 
              onChange={(e) => setRoomId(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={joinRoom}
              className="bg-teal-500 text-white px-4 py-2 rounded"
            >
              Join Room
            </motion.button>
          </div>
        ) : (
          <>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center text-lg"
            >
              Room ID: <strong>{roomId}</strong>
            </motion.p>
            <div className="grid grid-cols-2 gap-6 mt-6">
              {/* Map View */}
              <MapContainer center={[20, 77]} zoom={5} className="h-64 w-full rounded">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} />}
                {otherUserLocation && <Marker position={[otherUserLocation.lat, otherUserLocation.lng]} />}
                {userLocation && otherUserLocation && (
                  <Polyline positions={[[userLocation.lat, userLocation.lng], [otherUserLocation.lat, otherUserLocation.lng]]} color="teal" />
                )}
              </MapContainer>
              
              {/* Distance Chart */}
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={distanceData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="distance" stroke="#0097A7" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600 text-center mt-6"
            >
              Stay connected, stay close.
            </motion.p>
          </>
        )}
      </main>
    </div>
  );
};

export default SocialConnect;