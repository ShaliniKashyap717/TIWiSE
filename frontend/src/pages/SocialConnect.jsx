import React from 'react';
import { Users, Calendar, MessageSquare, PlusCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const SocialConnect = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Connect with Fellow Travelers</h1>
          <p className="text-gray-600 mt-2">
            Join our vibrant community of global explorers. Share experiences, get travel tips, and make friends from around the world.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Travel Communities */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-blue-600 w-6 h-6" />
              <h2 className="text-lg font-semibold">Travel Communities</h2>
            </div>
            <p className="text-gray-600 text-sm">
              Join themed groups based on your travel interests, from backpacking to luxury travels.
            </p>
            <div className="mt-4 flex -space-x-2">
              {/* Dummy avatars */}
              {['/avatar1.jpg', '/avatar2.jpg', '/avatar3.jpg', '/avatar4.jpg'].map((src, index) => (
                <img key={index} src={src} alt="user" className="w-8 h-8 rounded-full border-2 border-white" />
              ))}
              <span className="text-sm text-gray-500 ml-2">+42</span>
            </div>
          </div>

          {/* Meetups & Events */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="text-purple-600 w-6 h-6" />
              <h2 className="text-lg font-semibold">Meetups & Events</h2>
            </div>
            <p className="text-gray-600 text-sm">
              Attend local meetups, travel workshops, and cultural exchange events.
            </p>
            <ul className="text-sm text-gray-700 mt-3">
              <li>✅ Next event in Paris - <span className="text-gray-900 font-medium">June 15, 2025</span></li>
              <li>✅ Tokyo Meetup - <span className="text-gray-900 font-medium">July 2, 2025</span></li>
            </ul>
          </div>

          {/* Travel Forum */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <MessageSquare className="text-green-600 w-6 h-6" />
              <h2 className="text-lg font-semibold">Travel Forum</h2>
            </div>
            <p className="text-gray-600 text-sm">
              Ask questions, share tips, and engage in travel discussions.
            </p>
            <p className="text-sm text-gray-700 mt-3">
              <strong className="text-gray-900">1.2K</strong> Active Discussions <br />
              <strong className="text-gray-900">250+</strong> Daily Posts
            </p>
          </div>
        </div>

        {/* Featured Travelers */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold">Featured Travelers</h2>
        </div>

        <div className="flex justify-center gap-8 mb-8">
          {[
            { name: 'Mike R.', category: 'Adventure', img: '/traveler1.jpg' },
            { name: 'Sarah L.', category: 'Food & Culture', img: '/traveler2.jpg' },
            { name: 'Emma K.', category: 'Photography', img: '/traveler3.jpg' },
            { name: 'Lisa M.', category: 'Eco Travel', img: '/traveler4.jpg' }
          ].map((traveler, index) => (
            <div key={index} className="text-center">
              <img src={traveler.img} alt={traveler.name} className="w-14 h-14 rounded-full mx-auto mb-2" />
              <p className="text-sm font-medium">{traveler.name}</p>
              <p className="text-xs text-gray-500">{traveler.category}</p>
            </div>
          ))}
        </div>

        {/* Join Button */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 transition">
            Join Our Community
          </button>
        </div>
      </main>
    </div>
  );
};

export default SocialConnect;
