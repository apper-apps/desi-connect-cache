import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import Empty from '@/components/ui/Empty';

const FeaturedBusinesses = ({ businesses }) => {
  if (!businesses || businesses.length === 0) {
    return (
      <div className="bg-surface rounded-xl p-6 shadow-soft">
        <h2 className="text-xl font-display font-semibold text-gray-900 mb-6">
          Featured Businesses
        </h2>
        <Empty type="businesses" />
      </div>
    );
  }

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Restaurant': 'ChefHat',
      'Healthcare': 'Heart',
      'Retail': 'ShoppingBag',
      'Grocery': 'ShoppingCart',
      'Professional Services': 'Briefcase',
      'Beauty & Wellness': 'Sparkles',
      'Education': 'BookOpen',
      'Technology': 'Laptop'
    };
    return iconMap[category] || 'Store';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'Restaurant': 'text-orange-600 bg-orange-100',
      'Healthcare': 'text-red-600 bg-red-100',
      'Retail': 'text-purple-600 bg-purple-100',
      'Grocery': 'text-green-600 bg-green-100',
      'Professional Services': 'text-blue-600 bg-blue-100',
      'Beauty & Wellness': 'text-pink-600 bg-pink-100',
      'Education': 'text-indigo-600 bg-indigo-100',
      'Technology': 'text-gray-600 bg-gray-100'
    };
    return colorMap[category] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-display font-semibold text-gray-900">
          Featured Businesses
        </h2>
        <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
          View All Businesses
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businesses.map((business) => (
          <div key={business.Id} className="group p-4 border border-gray-200 rounded-xl hover:border-primary-200 hover:shadow-medium transition-all duration-200 cursor-pointer">
            {/* Business Image */}
            <div className="relative mb-4">
              <img
                src={business.images[0]}
                alt={business.name}
                className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
              />
              {business.verified && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <ApperIcon name="Check" size={14} className="text-white" />
                </div>
              )}
            </div>

            {/* Business Info */}
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
                  {business.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {business.description}
                </p>
              </div>

              {/* Category and Rating */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(business.category)}`}>
                  <ApperIcon name={getCategoryIcon(business.category)} size={12} className="mr-1" />
                  {business.category}
                </span>
                
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Star" size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">{business.rating}</span>
                  <span className="text-xs text-gray-500">({business.reviewCount})</span>
                </div>
              </div>

              {/* Location and Contact */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ApperIcon name="MapPin" size={14} />
                  <span className="truncate">{business.location.city}, {business.location.state}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <ApperIcon name="Phone" size={14} />
                  <span>{business.contact.phone}</span>
                </div>
              </div>

              {/* Price Range and Services */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-700">
                  {business.priceRange}
                </span>
                
                <div className="flex items-center space-x-1">
                  {business.services.slice(0, 2).map((service, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {service}
                    </span>
                  ))}
                  {business.services.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{business.services.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBusinesses;