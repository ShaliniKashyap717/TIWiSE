import React from 'react';
import { 
  Star, 
  Shield, 
  Users, 
  PhoneCall, 
  MapPin, 
  MessageCircle 
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const SafePlaces = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Safe Places for Women</h1>
          <p className="text-gray-600">
            Discover women-friendly destinations, accommodations, and local communities.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
            <Star className="text-yellow-500" />
            <div>
              <p className="text-lg font-semibold">4.8/5</p>
              <p className="text-sm text-gray-600">Safety Rating</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
            <Shield className="text-blue-500" />
            <div>
              <p className="text-lg font-semibold">24/7</p>
              <p className="text-sm text-gray-600">Surveillance</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
            <Users className="text-green-500" />
            <div>
              <p className="text-lg font-semibold">100+</p>
              <p className="text-sm text-gray-600">Help Centers</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
            <Users className="text-purple-500" />
            <div>
              <p className="text-lg font-semibold">5K+</p>
              <p className="text-sm text-gray-600">Community Members</p>
            </div>
          </div>
        </div>

        {/* Verified Safe Accommodations */}
        <h2 className="text-xl font-semibold mb-4">Verified Safe Accommodations</h2>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            {
              name: 'Serenity Hotel',
              location: 'Downtown District',
              rating: '4.9 (2.5k reviews)',
              img: '/hotel1.jpg'
            },
            {
              name: "Women's Boutique Hotel",
              location: 'Arts District',
              rating: '4.8 (1.8k reviews)',
              img: '/hotel2.jpg'
            },
            {
              name: 'SafeStay Hostel',
              location: 'University Area',
              rating: '4.7 (950 reviews)',
              img: '/hotel3.jpg'
            }
          ].map((hotel, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md">
              <img src={hotel.img} alt={hotel.name} className="rounded-t-lg w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{hotel.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {hotel.location}
                </p>
                <p className="text-sm font-semibold mt-1">{hotel.rating}</p>
                <a href="#" className="text-blue-500 text-sm font-medium mt-2 inline-block">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Contacts & Safety Community */}
        <div className="grid grid-cols-2 gap-6">
          {/* Emergency Contacts */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Emergency Contacts</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-semibold">Emergency Helpline</p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                </div>
                <button className="bg-red-500 text-white px-4 py-1 rounded-lg">Call Now</button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-semibold">Local Police Station</p>
                  <p className="text-sm text-gray-500">Direct Contact</p>
                </div>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-lg">Contact</button>
              </div>
            </div>
          </div>

          {/* Safety Community */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Safety Community</h2>
            <div className="space-y-3">
              {[
                { name: 'Sarah Williams', role: 'Local Guide & Safety Advisor' },
                { name: 'Emma Chen', role: 'Community Manager' }
              ].map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                  <button className="bg-gray-200 px-4 py-1 rounded-lg flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> Message
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-lg font-semibold mb-4">Essential Safety Tips</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { tip: 'Share Location', desc: 'Always share your location with trusted contacts' },
              { tip: 'Stay Alert', desc: 'Be aware of your surroundings at all times' },
              { tip: 'Travel in Groups', desc: 'Prefer group activities when possible' }
            ].map((tip, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <p className="font-semibold">{tip.tip}</p>
                <p className="text-sm text-gray-500">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SafePlaces;
