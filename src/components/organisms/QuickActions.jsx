import React from 'react';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: 'Start Discussion',
      description: 'Share thoughts or ask questions',
      icon: 'MessageSquare',
      color: 'from-primary-500 to-primary-600',
      onClick: () => navigate('/discussions')
    },
    {
      id: 2,
      title: 'Create Event',
      description: 'Organize community gatherings',
      icon: 'Calendar',
      color: 'from-secondary-500 to-secondary-600',
      onClick: () => navigate('/events')
    },
    {
      id: 3,
      title: 'Add Business',
      description: 'List your Indian business',
      icon: 'Store',
      color: 'from-accent-400 to-accent-500',
      onClick: () => navigate('/businesses')
    },
    {
      id: 4,
      title: 'Find People',
      description: 'Connect with community members',
      icon: 'UserCheck',
      color: 'from-purple-500 to-purple-600',
      onClick: () => navigate('/people')
    },
    {
      id: 5,
      title: 'Join Communities',
      description: 'Discover local groups',
      icon: 'Users',
      color: 'from-green-500 to-green-600',
      onClick: () => navigate('/communities')
    },
    {
      id: 6,
      title: 'Browse Events',
      description: 'Find cultural celebrations',
      icon: 'Sparkles',
      color: 'from-pink-500 to-pink-600',
      onClick: () => navigate('/events')
    }
  ];

  return (
    <div className="bg-surface rounded-xl p-6 shadow-soft">
      <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="group p-4 rounded-xl border border-gray-200 hover:border-transparent hover:shadow-medium transition-all duration-200 hover:scale-105 text-center"
          >
            <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              <ApperIcon name={action.icon} size={20} className="text-white" />
            </div>
            
            <h3 className="font-medium text-gray-900 text-sm mb-1 group-hover:text-primary-600 transition-colors">
              {action.title}
            </h3>
            
            <p className="text-xs text-gray-500 leading-tight">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;