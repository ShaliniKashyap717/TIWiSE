import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CompetitorPriceComparison = () => {
  const [dataType, setDataType] = useState('flights'); // Default to flights
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata'];

  // Dummy data for competitor prices
  const [competitorData, setCompetitorData] = useState({
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
    datasets: [
      {
        label: 'Cleartrip',
        data: [4200, 4300, 4100, 4400, 4500, 4350, 4250, 4400, 4300, 4200],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'MakeMyTrip',
        data: [4500, 4600, 4400, 4700, 4800, 4650, 4550, 4700, 4600, 4500],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Yatra',
        data: [4350, 4450, 4250, 4550, 4650, 4500, 4400, 4550, 4450, 4350],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  });

  const options = {
    responsive: true,
    aspectRatio: 1.5, 
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Competitor Prices for ${dataType.charAt(0).toUpperCase() + dataType.slice(1)} ${fromCity && toCity ? `(${fromCity} to ${toCity})` : ''}`,
      },
    },
  };

  return (
    <section className="bg-white rounded-xl shadow p-6 h-full">
      <h2 className="text-xl font-semibold mb-4">Get the cheapest possible deal!</h2>

    
      <div className="mb-4">
        <label htmlFor="dataType" className="block text-gray-700 text-sm font-bold mb-2">
         Flights
        </label>
        <select
          id="dataType"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <option value="flights">Flights</option>
          <option value="hotels">Hotels</option>
          <option value="packages">Packages</option>
        </select>
      </div>

  
      {dataType === 'flights' && (
        <div className="flex gap-4 mb-4">
          <div>
            <label htmlFor="fromCity" className="block text-gray-700 text-sm font-bold mb-2">
             Delhi
            </label>
            <select
              id="fromCity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              <option value="">Bangalore</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="toCity" className="block text-gray-700 text-sm font-bold mb-2">
              To:
            </label>
            <select
              id="toCity"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className="h-[calc(100%-200px)]"> {/* Adjust height calculation */}
        <Line options={options} data={competitorData} />
      </div>
    </section>
  );
};

export default CompetitorPriceComparison;
