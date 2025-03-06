import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Calendar, BookOpen, CheckSquare, Plus, DollarSign, Users } from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          <NavLink 
            to="/" 
            className={({ isActive }) => `flex flex-col items-center ${
              isActive ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </NavLink>
          <NavLink 
            to="/calendar" 
            className={({ isActive }) => `flex flex-col items-center ${
              isActive ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
            }`}
          >
            <Calendar size={24} />
            <span className="text-xs mt-1">Calendar</span>
          </NavLink>
          
          <NavLink 
            to="/notes" 
            className={({ isActive }) => `flex flex-col items-center ${
              isActive ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
            }`}
          >
            <BookOpen size={24} />
            <span className="text-xs mt-1">Notes</span>
          </NavLink>
          <div className="relative -top-6">
            <button 
              onClick={() => navigate('/create')}
              className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors"
            >
              <Plus size={24} />
            </button>
          </div>
          <NavLink 
            to="/tasks" 
            className={({ isActive }) => `flex flex-col items-center ${
              isActive ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
            }`}
          >
            <CheckSquare size={24} />
            <span className="text-xs mt-1">Tasks</span>
          </NavLink>
          <NavLink 
            to="/pricing" 
            className={({ isActive }) => `flex flex-col items-center ${
              isActive ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
            }`}
          >
            <DollarSign size={24} />
            <span className="text-xs mt-1">Pricing</span>
          </NavLink>
          <NavLink 
            to="/parent" 
            className={({ isActive }) => `flex flex-col items-center ${
              isActive ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
            }`}
          >
            <Users size={24} />
            <span className="text-xs mt-1">Parent</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}