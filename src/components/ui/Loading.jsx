import React from 'react';

const Loading = ({ type = 'feed' }) => {
  if (type === 'feed') {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-surface rounded-xl p-6 shadow-soft">
            {/* User info skeleton */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded shimmer w-1/4" />
                <div className="h-3 bg-gray-200 rounded shimmer w-1/6" />
              </div>
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-3 mb-4">
              <div className="h-4 bg-gray-200 rounded shimmer w-3/4" />
              <div className="h-4 bg-gray-200 rounded shimmer w-1/2" />
              <div className="h-4 bg-gray-200 rounded shimmer w-2/3" />
            </div>
            
            {/* Actions skeleton */}
            <div className="flex items-center space-x-6">
              {[1, 2, 3].map((action) => (
                <div key={action} className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-gray-200 rounded shimmer" />
                  <div className="h-3 bg-gray-200 rounded shimmer w-8" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-surface rounded-xl p-6 shadow-soft">
            <div className="w-full h-48 bg-gray-200 rounded-lg shimmer mb-4" />
            <div className="space-y-3">
              <div className="h-5 bg-gray-200 rounded shimmer w-3/4" />
              <div className="h-4 bg-gray-200 rounded shimmer w-1/2" />
              <div className="h-3 bg-gray-200 rounded shimmer w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-surface rounded-xl p-4 shadow-soft">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded shimmer w-1/3" />
                <div className="h-3 bg-gray-200 rounded shimmer w-1/2" />
              </div>
              <div className="w-16 h-8 bg-gray-200 rounded shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default skeleton
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  );
};

export default Loading;