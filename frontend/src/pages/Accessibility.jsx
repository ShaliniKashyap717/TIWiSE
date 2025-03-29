import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { FaMicrophone, FaVolumeUp, FaWheelchair, FaSun, FaMoon, FaBars, FaArrowLeft } from 'react-icons/fa';

const Accessibility = () => {
  const [voiceCommand, setVoiceCommand] = useState('');
  const [textToRead, setTextToRead] = useState('');
  const [speechInput, setSpeechInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  // Toggle sidebar visibility
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  // Toggle dark mode / high contrast mode
  const toggleContrast = () => setHighContrast(!highContrast);

  // Dynamic styles
  const containerClass = highContrast ? 'bg-black text-yellow-300' : 'bg-gray-50';
  const cardClass = highContrast 
    ? 'bg-gray-900 text-yellow-300 border border-yellow-400 shadow-lg' 
    : 'bg-white text-black shadow-md';
  const buttonClass = highContrast 
    ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
    : 'bg-teal-600 text-white hover:bg-teal-700';
  const inputClass = highContrast 
    ? 'bg-gray-800 text-yellow-300 border border-yellow-500' 
    : 'bg-white text-black border border-gray-300';

  return (
    <div className={`flex h-screen ${containerClass}`}>
      {/* Sidebar - Conditional Rendering */}
      <div className={`transition-all duration-300 ${showSidebar ? 'w-64' : 'w-0'} overflow-hidden`}>
        {showSidebar && <Sidebar />}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          {/* Sidebar Toggle Button */}
          <button onClick={toggleSidebar} className="p-2 rounded-full border-2 border-gray-700">
            {showSidebar ? <FaArrowLeft size={20} /> : <FaBars size={20} />}
          </button>

          <h1 className="text-3xl font-semibold text-center flex-1">AI-Powered Accessibility Assistant</h1>
          
          {/* Dark Mode Toggle */}
          <button onClick={toggleContrast} className="p-2 rounded-full border-2 border-gray-700">
            {highContrast ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        <p className="text-center text-lg mb-6">
          <em>"The world is a book, and those who do not travel read only one page." - Saint Augustine</em>
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Voice Navigation */}
          <div className={`${cardClass} p-6 rounded-lg`}>
            <h3 className="text-lg font-semibold mb-3">Voice Navigation</h3>
            <input
              type="text"
              value={voiceCommand}
              onChange={(e) => setVoiceCommand(e.target.value)}
              placeholder="Enter your command..."
              className={`${inputClass} rounded p-2 w-full`}
              aria-label="Voice command input"
            />
            <button className={`${buttonClass} w-full mt-3 p-2 rounded-md`}>Submit</button>
            <p className="text-sm mt-4 text-gray-600">
              <em>"Travel is more than the seeing of sights; it is a change that goes on, deep and permanent, in the ideas of living." - Miriam Beard</em>
            </p>
          </div>

          {/* Text-to-Speech */}
          <div className={`${cardClass} p-6 rounded-lg`}>
            <h3 className="text-lg font-semibold mb-3">Text-to-Speech</h3>
            <textarea
              value={textToRead}
              onChange={(e) => setTextToRead(e.target.value)}
              placeholder="Enter text to read aloud..."
              className={`${inputClass} rounded p-2 w-full`}
              rows={3}
              aria-label="Text to speech input"
            />
            <button className={`${buttonClass} w-full mt-3 p-2 rounded-md`}>
              {isSpeaking ? 'Speaking...' : 'Read Aloud'}
            </button>
            <p className="text-sm mt-4 text-gray-600">
              <em>"The journey of a thousand miles begins with a single step." - Lao Tzu</em>
            </p>
          </div>

          {/* Speech-to-Text */}
          <div className={`${cardClass} p-6 rounded-lg`}>
            <h3 className="text-lg font-semibold mb-3">Speech-to-Text</h3>
            <input
              type="text"
              value={speechInput}
              onChange={(e) => setSpeechInput(e.target.value)}
              placeholder="Say something..."
              className={`${inputClass} rounded p-2 w-full`}
              aria-label="Speech to text input"
            />
            <button className={`${buttonClass} w-full mt-3 p-2 rounded-md`}>Convert</button>
            <p className="text-sm mt-4 text-gray-600">
              <em>"Wherever you go becomes a part of you somehow." - Anita Desai</em>
            </p>
          </div>

          {/* Wheelchair-Friendly Routes */}
          <div className={`${cardClass} p-6 rounded-lg`}>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <FaWheelchair /> Wheelchair-Friendly Routes
            </h3>
            <input
              type="text"
              placeholder="Enter destination..."
              className={`${inputClass} rounded p-2 w-full`}
              aria-label="Wheelchair accessible route input"
            />
            <button className={`${buttonClass} w-full mt-3 p-2 rounded-md`}>Find Routes</button>
            <p className="text-sm mt-4 text-gray-600">
              <em>"Travel far, travel wide, and travel often. Understand that everyone you meet is afraid of something, loves something, and has lost something." - H. Jackson Brown Jr.</em>
            </p>
          </div>
        </div>

        {/* Compliance Section */}
        <div className="text-center mt-6">
          <h2 className="font-semibold">Compliance & Standards</h2>
          <p className="mt-2 text-sm flex justify-center gap-4">
            <span className="text-teal-500">WCAG 2.1 AAA</span>
            <span className="text-gray-500">Section 508</span>
            <span className="text-teal-500">ADA Compliant</span>
          </p>
          <p className="text-lg mt-4">
            <em>"The world is full of magic things, patiently waiting for our senses to grow sharper." - W.B. Yeats</em>
          </p>
        </div>

        {/* Inspirational Quote */}
        <div className="text-center mt-6">
          <p className="text-lg">
            <em>"Jobs fill your pocket, but adventures fill your soul." - Jaime Lyn Beatty</em>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Accessibility;
