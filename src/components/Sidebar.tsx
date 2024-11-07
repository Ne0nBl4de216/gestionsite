import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Sidebar = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Mon App</h1>
      </div>
      
      <nav className="space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <Home size={20} />
          <span>Accueil</span>
        </NavLink>
        
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        
        <button
          onClick={logout}
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 w-full text-left text-red-400"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </nav>
    </div>
  );
};