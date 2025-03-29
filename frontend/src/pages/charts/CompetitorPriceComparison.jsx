import React, { useState, useEffect } from 'react';
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

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'];

// Function to generate realistic random prices with a max difference of 1000
const generateRandomData = () => {
  let prices = [Math.floor(Math.random() * 2000) + 3000]; // Start with a random price between 3000-5000

  for (let i = 1; i < 10; i++) {
    let change = Math.floor(Math.random() * 1000) - 500; // Random change between -500 and +500
    let newPrice = Math.max(2500, Math.min(prices[i - 1] + change, 5000)); // Keep price within 2500-5000
    prices.push(newPrice);
  }

  return prices;
};

const CompetitorPriceComparison = () => {
  const [dataType, setDataType] = useState('flights');
  const [fromCity, setFromCity] = useState('Delhi');
  const [toCity, setToCity] = useState('Mumbai');
  const [competitorData, setCompetitorData] = useState(null);

  useEffect(() => {
    const newData = {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
      datasets: [
        {
          label: 'Cleartrip',
          data: generateRandomData(),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'MakeMyTrip',
          data: generateRandomData(),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: 'Yatra',
          data: generateRandomData(),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],
    };
    setCompetitorData(newData);
  }, [fromCity, toCity]);

  const options = {
    responsive: true,
    aspectRatio: 1.5,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: `Competitor Prices for ${dataType.charAt(0).toUpperCase() + dataType.slice(1)} (${fromCity} to ${toCity})`,
      },
    },
  };

  return (
    <section className="bg-white rounded-xl shadow p-6 h-full">
      <h2 className="text-xl font-semibold mb-4">Get the cheapest possible deal!</h2>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Flights</label>
        <select
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
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
            <label className="block text-gray-700 text-sm font-bold mb-2">From:</label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">To:</label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {competitorData && (
        <div className="h-[calc(100%-200px)]">
          <Line options={options} data={competitorData} />
        </div>
      )}
    </section>
  );
};

export default CompetitorPriceComparison;
