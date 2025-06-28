import React, { useState, useEffect } from 'react';
import { communityService } from '@/services/api/communityService';
import { eventService } from '@/services/api/eventService';
import { discussionService } from '@/services/api/discussionService';
import { businessService } from '@/services/api/businessService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';
import CommunityFeed from '@/components/organisms/CommunityFeed';
import QuickActions from '@/components/organisms/QuickActions';
import UpcomingEvents from '@/components/organisms/UpcomingEvents';
import TrendingDiscussions from '@/components/organisms/TrendingDiscussions';
import FeaturedBusinesses from '@/components/organisms/FeaturedBusinesses';
import WelcomeHeader from '@/components/organisms/WelcomeHeader';
import ApperIcon from '@/components/ApperIcon';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    communities: [],
    events: [],
    discussions: [],
    businesses: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [communities, events, discussions, businesses] = await Promise.all([
        communityService.getAll(),
        eventService.getUpcoming(),
        discussionService.getAll(),
        businessService.getFeatured()
      ]);

      setDashboardData({
        communities: communities.slice(0, 3),
        events: events.slice(0, 5),
        discussions: discussions.slice(0, 8),
        businesses: businesses.slice(0, 6)
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) return <Loading type="feed" />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <WelcomeHeader />

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main Feed - Takes up 2/3 of the width on larger screens */}
        <div className="xl:col-span-3 space-y-8">
          {/* Community Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white shadow-large">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-100 text-sm font-medium">Active Communities</p>
                  <p className="text-3xl font-display font-bold">{dashboardData.communities.length}</p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Users" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-primary-100">
                <ApperIcon name="TrendingUp" size={16} className="mr-2" />
                <span className="text-sm">12% increase this month</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl p-6 text-white shadow-large">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-secondary-100 text-sm font-medium">Upcoming Events</p>
                  <p className="text-3xl font-display font-bold">{dashboardData.events.length}</p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Calendar" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-secondary-100">
                <ApperIcon name="Calendar" size={16} className="mr-2" />
                <span className="text-sm">This week & beyond</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent-400 to-accent-500 rounded-xl p-6 text-white shadow-large">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-100 text-sm font-medium">Active Discussions</p>
                  <p className="text-3xl font-display font-bold">{dashboardData.discussions.length}</p>
                </div>
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <ApperIcon name="MessageSquare" size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-accent-100">
                <ApperIcon name="MessageCircle" size={16} className="mr-2" />
                <span className="text-sm">Join the conversation</span>
              </div>
            </div>
          </div>

          {/* Community Feed */}
          <CommunityFeed discussions={dashboardData.discussions} />

          {/* Featured Businesses */}
          <FeaturedBusinesses businesses={dashboardData.businesses} />
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1 space-y-6">
          {/* Upcoming Events */}
          <UpcomingEvents events={dashboardData.events} />

          {/* Trending Discussions */}
          <TrendingDiscussions discussions={dashboardData.discussions.slice(0, 5)} />

          {/* Community Highlights */}
          <div className="bg-surface rounded-xl p-6 shadow-soft">
            <h3 className="font-display font-semibold text-gray-900 mb-4">
              Your Communities
            </h3>
            <div className="space-y-3">
              {dashboardData.communities.map((community) => (
                <div key={community.Id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <img
                    src={community.coverImage}
                    alt={community.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {community.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {community.memberCount.toLocaleString()} members
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-center text-sm text-primary-600 hover:text-primary-700 font-medium py-2 rounded-lg hover:bg-primary-50 transition-colors">
              View All Communities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;