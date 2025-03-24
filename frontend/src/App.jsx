import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => (
  <Router>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/safe-places" element={<SafePlaces />} />
      <Route path="/social-connect" element={<SocialConnect />} />
      <Route path="/accessibility" element={<Accessibility />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/newsletter" element={<Newsletter />} /> {/* ✅ Now it will work */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
