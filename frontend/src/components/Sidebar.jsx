
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  DollarSign, 
  Users, 
  Accessibility, 
  Shield, 
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col animate-slide-in">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
            <span className="text-white font-bold">T</span>
          </div>
          <h1 className="text-xl font-bold text-gray-800">WanderWise</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-3 py-4">
        <NavLink to="/" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Home size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/expenses" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''} mt-2`}>
          <DollarSign size={20} />
          <span>Expenses</span>
        </NavLink>
        
        <NavLink to="/social-connect" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''} mt-2`}>
          <Users size={20} />
          <span>Social Connect</span>
        </NavLink>
        
        <NavLink to="/accessibility" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''} mt-2`}>
          <Accessibility size={20} />
          <span>Accessibility</span>
        </NavLink>
        
        <NavLink to="/safe-places" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''} mt-2`}>
          <Shield size={20} />
          <span>Safe Places</span>
        </NavLink>
        
        <NavLink to="/settings" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''} mt-2`}>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.pravatar.cc/150?img=32" 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full border border-gray-200"
          />
          <div>
            <p className="font-medium text-sm">John Doe</p>
            <p className="text-xs text-gray-500">Travel Enthusiast</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
