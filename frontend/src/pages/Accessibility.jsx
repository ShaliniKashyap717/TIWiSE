import React from 'react';
import Sidebar from '../components/Sidebar';
import { FaEye, FaAssistiveListeningSystems, FaKeyboard } from 'react-icons/fa';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { AiOutlineFileText } from 'react-icons/ai';

const Accessibility = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        <h1 className="text-3xl font-semibold text-center mb-2">Accessibility Features</h1>
        <p className="text-center text-gray-600 mb-6">Making technology accessible for everyone</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <FeatureCard icon={<FaEye className="text-blue-500" />} title="Vision Assistance" 
            features={["Screen Reader Compatible", "High Contrast Mode", "Text Size Adjustment"]} />
          <FeatureCard icon={<FaAssistiveListeningSystems className="text-purple-500" />} title="Hearing Assistance" 
            features={["Closed Captions", "Audio Transcripts", "Visual Alerts"]} />
          <FeatureCard icon={<FaKeyboard className="text-red-500" />} title="Motor Assistance" 
            features={["Keyboard Navigation", "Voice Commands", "Switch Control"]} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <CustomizationOptions />
          <AccessibilitySupport />
        </div>

        <div className="text-center text-gray-700">
          <h2 className="font-semibold">Compliance & Standards</h2>
          <p className="flex justify-center gap-4 mt-2 text-sm">
            <span className="text-blue-500">WCAG 2.1 AAA</span>
            <span className="text-gray-500">Section 508</span>
            <span className="text-blue-500">ADA Compliant</span>
          </p>
        </div>
      </main>
    </div>
  );
};

const FeatureCard = ({ icon, title, features }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center gap-2 mb-3">
      {icon} <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <ul className="text-gray-600 text-sm space-y-1">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          ✔ {feature}
        </li>
      ))}
    </ul>
  </div>
);

const CustomizationOptions = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-3">Customization Options</h3>
    <div className="space-y-2">
      <p>Text Size</p>
      <div className="flex gap-2">
        <button className="px-2 py-1 bg-gray-200 rounded">-</button>
        <button className="px-2 py-1 bg-gray-200 rounded">+</button>
      </div>
      <p>Contrast</p>
      <div className="w-full h-2 bg-gray-300 rounded-full">
        <div className="w-2/3 h-full bg-blue-500 rounded-full"></div>
      </div>
      <p>Animation Speed</p>
      <div className="w-full h-2 bg-gray-300 rounded-full">
        <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
      </div>
    </div>
  </div>
);

const AccessibilitySupport = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-3">Accessibility Support</h3>
    <p className="flex items-center gap-2 text-sm text-gray-600 mb-2">
      <MdOutlineSupportAgent className="text-green-500" /> <strong>24/7 Support</strong> - Our accessibility experts are always here to help
    </p>
    <p className="flex items-center gap-2 text-sm text-gray-600">
      <AiOutlineFileText className="text-yellow-500" /> <strong>Resources</strong> - Comprehensive guides and documentation
    </p>
    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md w-full">Contact Support</button>
  </div>
);

export default Accessibility;
