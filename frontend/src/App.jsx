import React from "react";
import { Routes, Route } from "react-router-dom"; // Only import Routes and Route
import { Toaster } from "./components/ui/sonner";
import Dashboard from './pages/Dashboard'
import Profile from "./pages/Profile";
import Expenses from "./pages/Expenses";
import SafePlaces from "./pages/SafePlaces";
import SocialConnect from "./pages/SocialConnect";
import Accessibility from "./pages/Accessibility";
import Settings from "./pages/Settings";
import Newsletter from "./pages/Newsletter"; // ✅ Added Newsletter route
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Signup from "./pages/Signup"; // Path check karo
import Login from './pages/Login';  // Ya jahan bhi Login component hai


import { Navigate } from "react-router-dom";

const App = () => (
  <>
    <Toaster position="top-right" />
    <Routes>
      <Route path='/' element={<Navigate to="/login"/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/safe-places" element={<SafePlaces />} />
      <Route path="/social-connect" element={<SocialConnect />} />
      <Route path="/accessibility" element={<Accessibility />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/newsletter" element={<Newsletter />} /> {/* ✅ Now it will work */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
