import React from 'react';
import Sidebar from '../components/Sidebar';
import { motion } from 'framer-motion';

const SocialConnect = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-teal-600 mb-4"
        >
          Social Connect
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-600 mb-6"
        >
          Track real distance between you and your friend. Stay connected, no matter where you are!
        </motion.p>
        
     
        <input 
          type="text" 
          placeholder="Enter meetup point" 
          className="border px-4 py-2 rounded-md w-80 text-center mb-4 shadow-sm" 
        />
        
       
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-teal-500 text-white px-6 py-2 rounded-md shadow-md"
          >
            Create Room
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-teal-500 text-white px-6 py-2 rounded-md shadow-md"
          >
            Enter Room
          </motion.button>
        </div>

  
        <div className="mt-10 bg-white p-6 rounded-lg shadow-lg w-3/4">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">Why Use Social Connect?</h2>
          <ul className="text-gray-700 text-left space-y-2">
            <li>✅ Real-time location tracking</li>
            <li>✅ Secure and private rooms</li>
            <li>✅ Easy to use with friends and family</li>
            <li>✅ Plan meetups effortlessly</li>
          </ul>
        </div>
        
      
        <div className="mt-10 text-gray-500 text-lg italic">
          <p>"Distance means so little when someone means so much."</p>
          <p>"Stay close, even when you're far apart."</p>
          <p>"Wherever you go, go with all your heart."</p>
        </div>
      </main>
    </div>
  );
};

export default SocialConnect;