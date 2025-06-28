import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  type = 'general'
}) => {
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: 'WifiOff',
          title: 'Connection Error',
          message: 'Unable to connect to the server. Please check your internet connection.',
          color: 'text-red-500'
        };
      case 'notFound':
        return {
          icon: 'Search',
          title: 'Nothing Found',
          message: 'We couldn\'t find what you\'re looking for.',
          color: 'text-gray-500'
        };
      case 'permission':
        return {
          icon: 'Lock',
          title: 'Access Denied',
          message: 'You don\'t have permission to view this content.',
          color: 'text-orange-500'
        };
      default:
        return {
          icon: 'AlertCircle',
          title: 'Oops! Something went wrong',
          message: message,
          color: 'text-red-500'
        };
    }
  };

  const errorConfig = getErrorConfig();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon 
          name={errorConfig.icon} 
          size={32} 
          className={errorConfig.color}
        />
      </div>
      
      <h3 className="text-lg font-display font-semibold text-gray-900 mb-2">
        {errorConfig.title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {errorConfig.message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <ApperIcon name="RefreshCw" size={16} />
          <span>Try Again</span>
        </button>
      )}
      
      <p className="text-sm text-gray-500 mt-4">
        If this problem persists, please contact our support team.
      </p>
    </div>
  );
};

export default Error;