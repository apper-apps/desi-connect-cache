import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Empty from '@/components/ui/Empty';

const CommunityFeed = ({ discussions }) => {
  if (!discussions || discussions.length === 0) {
    return <Empty type="discussions" />;
  }

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Local Recommendations': 'MapPin',
      'Immigration & Legal': 'FileText',
      'Events & Celebrations': 'Calendar',
      'Arts & Culture': 'Palette',
      'Family & Kids': 'Heart',
      'Professional Development': 'Briefcase',
      'Housing & Rentals': 'Home',
      'Food & Recipes': 'ChefHat'
    };
    return iconMap[category] || 'MessageSquare';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'Local Recommendations': 'text-green-600 bg-green-100',
      'Immigration & Legal': 'text-blue-600 bg-blue-100',
      'Events & Celebrations': 'text-purple-600 bg-purple-100',
      'Arts & Culture': 'text-pink-600 bg-pink-100',
      'Family & Kids': 'text-red-600 bg-red-100',
      'Professional Development': 'text-indigo-600 bg-indigo-100',
      'Housing & Rentals': 'text-yellow-600 bg-yellow-100',
      'Food & Recipes': 'text-orange-600 bg-orange-100'
    };
    return colorMap[category] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-semibold text-gray-900">
          Community Feed
        </h2>
        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
          View All Discussions
        </button>
      </div>

      <div className="space-y-6">
        {discussions.map((discussion) => (
          <article key={discussion.Id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
            {/* Discussion Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-10 h-10 rounded-full mandala-border">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                  alt="User avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-gray-900">Priya Sharma</h3>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(discussion.createdAt))} ago
                  </span>
                  {discussion.isPinned && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      <ApperIcon name="Pin" size={12} className="mr-1" />
                      Pinned
                    </span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(discussion.category)}`}>
                    <ApperIcon name={getCategoryIcon(discussion.category)} size={12} className="mr-1" />
                    {discussion.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Discussion Content */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 cursor-pointer transition-colors">
                {discussion.title}
              </h2>
              <p className="text-gray-700 leading-relaxed line-clamp-3">
                {discussion.content}
              </p>
            </div>

            {/* Tags */}
            {discussion.tags && discussion.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {discussion.tags.map((tag, index) => (
                  <span key={index} className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md hover:bg-primary-100 hover:text-primary-700 cursor-pointer transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Discussion Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-primary-600 transition-colors group">
                  <ApperIcon name="ArrowUp" size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{discussion.votes}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-500 hover:text-secondary-600 transition-colors group">
                  <ApperIcon name="MessageCircle" size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{discussion.commentCount}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-500 hover:text-accent-600 transition-colors group">
                  <ApperIcon name="Eye" size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{discussion.viewCount}</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
                  <ApperIcon name="Bookmark" size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
                  <ApperIcon name="Share2" size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors">
                  <ApperIcon name="MoreHorizontal" size={16} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;