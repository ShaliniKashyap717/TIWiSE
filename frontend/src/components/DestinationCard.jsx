
import React from 'react';

const DestinationCard = ({ image, city, country, visitors }) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer animate-fade-in">
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <img src={image} alt={city} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{city}, {country}</h3>
        <p className="text-sm text-gray-500">{visitors.toLocaleString()} visitors</p>
      </div>
    </div>
  );
};

export default DestinationCard;
