
import React, { useState } from 'react';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Search,
  MapPin,
  Star,
  Shield,
  Users,
  ThumbsUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

import Sidebar from '../components/Sidebar';


const SafePlaces = () => {
    return (
      <div className="flex h-screen bg-gray-50">
      <Sidebar />
       <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              
              <h1 className="text-2xl font-semibold">Safe Places</h1>
            </div> 
          </div>
        </div>
      </main>
    </div>  
     );
};

export default SafePlaces;
