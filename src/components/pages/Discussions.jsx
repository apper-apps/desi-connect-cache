import React, { useState, useEffect } from 'react';
import { discussionService } from '@/services/api/discussionService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import ApperIcon from '@/components/ApperIcon';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';

const Discussions = () => {
  const [discussions, setDiscussions] = useState([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    'All',
    'Local Recommendations',
    'Immigration & Legal',
    'Events & Celebrations',
    'Arts & Culture',
    'Family & Kids',
    'Professional Development',
    'Housing & Rentals',
    'Food & Recipes'
  ];

  const loadDiscussions = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await discussionService.getAll();
      setDiscussions(data);
      setFilteredDiscussions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiscussions();
  }, []);

  useEffect(() => {
    let filtered = [...discussions];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(discussion =>
        discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(discussion => discussion.category === selectedCategory);
    }

    // Sort discussions
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.votes - a.votes);
    } else if (sortBy === 'comments') {
      filtered.sort((a, b) => b.commentCount - a.commentCount);
    }

    setFilteredDiscussions(filtered);
  }, [discussions, searchQuery, selectedCategory, sortBy]);

  const handleVote = async (discussionId, voteType) => {
    try {
      const updatedDiscussion = await discussionService.vote(discussionId, voteType);
      setDiscussions(prev => prev.map(discussion =>
        discussion.Id === discussionId ? updatedDiscussion : discussion
      ));
      toast.success(`${voteType === 'up' ? 'Upvoted' : 'Downvoted'} discussion`);
    } catch (err) {
      toast.error('Failed to vote');
    }
  };

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

  if (loading) return <Loading type="feed" />;
  if (error) return <Error message={error} onRetry={loadDiscussions} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-500 to-primary-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-display font-bold mb-2">Community Discussions</h1>
        <p className="text-lg text-white text-opacity-90">
          Join conversations, ask questions, and share knowledge with the community
        </p>
      </div>

      {/* Search, Filters and Create Button */}
      <div className="bg-surface rounded-xl p-6 shadow-soft">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="comments">Most Comments</option>
          </select>

          {/* Create Discussion Button */}
          <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-200 hover:scale-105">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Plus" size={18} />
              <span>New Discussion</span>
            </div>
          </button>
        </div>
      </div>

      {/* Discussions List */}
      {filteredDiscussions.length === 0 ? (
        <Empty type="discussions" />
      ) : (
        <div className="space-y-6">
          {filteredDiscussions.map((discussion) => (
            <div key={discussion.Id} className="bg-surface rounded-xl p-6 shadow-soft hover:shadow-medium transition-all duration-200">
              {/* Discussion Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full mandala-border">
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
                <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-primary-600 cursor-pointer transition-colors">
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
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleVote(discussion.Id, 'up')}
                      className="flex items-center space-x-1 text-gray-500 hover:text-primary-600 transition-colors group"
                    >
                      <ApperIcon name="ArrowUp" size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">{discussion.votes}</span>
                    </button>
                    <button 
                      onClick={() => handleVote(discussion.Id, 'down')}
                      className="text-gray-500 hover:text-red-600 transition-colors group"
                    >
                      <ApperIcon name="ArrowDown" size={18} className="group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-secondary-600 transition-colors group">
                    <ApperIcon name="MessageCircle" size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{discussion.commentCount} comments</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-accent-600 transition-colors group">
                    <ApperIcon name="Eye" size={18} className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{discussion.viewCount} views</span>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Discussions;