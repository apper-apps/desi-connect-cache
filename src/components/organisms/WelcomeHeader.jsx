import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const WelcomeHeader = () => {
  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good morning' : currentTime < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-400 rounded-2xl p-8 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 rangoli-pattern opacity-20" />
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              {greeting}, Priya! 🙏
            </h1>
            <p className="text-lg text-white text-opacity-90 mb-4">
              Welcome back to your Desi Connect community
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <ApperIcon name="MapPin" size={16} />
                <span>Fremont, CA</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Users" size={16} />
                <span>3 Communities</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Calendar" size={16} />
                <span>5 Events This Week</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-opacity-30 transition-all duration-200 hover:scale-105">
              <ApperIcon name="Plus" size={18} />
              <span>Create Post</span>
            </button>
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 hover:scale-105">
              <ApperIcon name="Calendar" size={18} />
              <span>New Event</span>
            </button>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">247</div>
            <div className="text-sm opacity-90">Connections</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm opacity-90">Posts This Week</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm opacity-90">Events Attended</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm opacity-90">Community Points</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;