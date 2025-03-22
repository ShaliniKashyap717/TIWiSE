
import React from 'react';

import Sidebar from '../components/Sidebar';

const Settings = () => {
  return (
    <div className="flex h-screen bg-gray-50">
    <Sidebar />
     <main className="flex-1 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            
            <h1 className="text-2xl font-semibold">Settings</h1>
          </div> 
        </div>
      </div>
    </main>
  </div>    );
};

export default Settings;
