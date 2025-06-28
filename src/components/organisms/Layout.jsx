import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/organisms/Sidebar';
import Header from '@/components/organisms/Header';
import ApperIcon from '@/components/ApperIcon';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 transform bg-surface shadow-large transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuClick={toggleSidebar} />
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-gray-200 lg:hidden">
        <div className="flex items-center justify-around py-2">
          {[
            { path: '/', icon: 'Home', label: 'Home' },
            { path: '/communities', icon: 'Users', label: 'Communities' },
            { path: '/events', icon: 'Calendar', label: 'Events' },
            { path: '/messages', icon: 'MessageCircle', label: 'Messages' },
            { path: '/profile', icon: 'User', label: 'Profile' },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => window.location.href = item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'text-primary-500 bg-primary-50' 
                  : 'text-gray-600 hover:text-primary-500'
              }`}
            >
              <ApperIcon name={item.icon} size={20} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;