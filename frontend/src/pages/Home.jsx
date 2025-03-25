import React, { useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import './Home.css';
import Hero from '../components/Hero';
import Feature from '../components/Feature';
import SearchForm from '../components/SearchForm';

const Home = () => {
 
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

<div className="flex-1">
    <Hero />
    <SearchForm />
  </div>
    </div>
  );
};

export default Home;
