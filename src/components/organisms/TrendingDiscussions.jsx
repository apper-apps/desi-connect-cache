import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Empty from '@/components/ui/Empty';

const TrendingDiscussions = ({ discussions }) => {
  if (!discussions || discussions.length === 0) {
    return (
      <div className="bg-surface rounded-xl p-6 shadow-soft">
        <h3 className="font-display font-semibold text-gray-900 mb-4">Trending Discussions</h3>
        <Empty type="discussions" />
      </div>
    );
  }

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Local Recommendations': 'MapPin',
      'Immigration & Legal': 'FileText',
      'Events & Celebrations': 'Calendar',
      'Arts & Culture': 'Palette',
      'Family & Kids': 'Heart',
      'Professional Development': 'Briefcase'
    };
    return iconMap[category] || 'MessageSquare';
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-gray-900">Trending Discussions</h3>
        <ApperIcon name="TrendingUp" size={20} className="text-primary-500" />
      </div>

      <div className="space-y-4">
        {discussions.map((discussion, index) => (
          <div key={discussion.Id} className="group cursor-pointer">
            <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              {/* Trending Number */}
              <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                  {discussion.title}
                </h4>
                
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <ApperIcon name={getCategoryIcon(discussion.category)} size={12} />
                    <span>{discussion.category}</span>
                  </div>
                  
                  <span>•</span>
                  
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="ArrowUp" size={12} />
                    <span>{discussion.votes}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <ApperIcon name="MessageCircle" size={12} />
                    <span>{discussion.commentCount}</span>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(discussion.createdAt))} ago
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-2 rounded-lg hover:bg-primary-50 transition-colors">
          View All Discussions
        </button>
      </div>
    </div>
  );
};

export default TrendingDiscussions;