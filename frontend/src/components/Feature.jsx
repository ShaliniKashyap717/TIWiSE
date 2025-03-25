import { useState } from 'react';
import { Plane, Hotel, Map, Compass, Camera, Utensils, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DestinationCard from './DestinationCard';


const features = [
  { title: 'Flights', description: 'Find the best flights deals to anywhere in the world', icon: <Plane /> },
  { title: 'Hotels', description: 'Book accommodations that feel like home', icon: <Hotel /> },
  { title: 'Destinations', description: 'Explore top destinations for your next adventure', icon: <Map /> },
  { title: 'Activities', description: 'Discover unique experiences and tours', icon: <Compass /> },
  { title: 'Photography', description: 'Capture your memories with local photographers', icon: <Camera /> },
  { title: 'Food Tours', description: 'Taste local flavors with guided food experiences', icon: <Utensils /> },
];

const topDestinations = [
  { id: 1, image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1400&q=80', title: 'Paris', location: 'France', rating: 4.8, price: '$450', featured: true },
  { id: 2, image: 'https://images.unsplash.com/photo-1558104631-0fa41a8f6c20?auto=format&fit=crop&w=1400&q=80', title: 'Santorini', location: 'Greece', rating: 4.9, price: '$650' },
  { id: 3, image: 'https://images.unsplash.com/photo-1543906965-f9520aa2ed8a?auto=format&fit=crop&w=1400&q=80', title: 'Tokyo', location: 'Japan', rating: 4.7, price: '$800' },
  { id: 4, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80', title: 'Bali', location: 'Indonesia', rating: 4.6, price: '$550' },
];

const Feature = () => {
  const [activeTab, setActiveTab] = useState('hotels');

  return (
    <>
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-900">Travel Services</h2>
          <p className="text-teal-700 max-w-2xl mx-auto">Discover a world of possibilities with our comprehensive travel services designed to make your journey seamless and unforgettable.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-teal-50 hover:shadow-xl transition-all duration-300">
              <div className="travel-icon-container">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-teal-900">{feature.title}</h3>
              <p className="text-sm text-teal-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="destinations" className="py-16 md:py-24 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-900">Top Destinations</h2>
            <Button variant="ghost" className="mt-4 md:mt-0 text-teal-700 hover:text-teal-800 hover:bg-teal-100 group">
              View all destinations
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {topDestinations.map((destination, index) => (
              <DestinationCard key={destination.id} {...destination} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;
