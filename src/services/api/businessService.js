import businessData from '@/services/mockData/businesses.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const businessService = {
  async getAll() {
    await delay(300);
    return [...businessData];
  },

  async getById(id) {
    await delay(200);
    const business = businessData.find(business => business.Id === parseInt(id));
    if (!business) {
      throw new Error(`Business with Id ${id} not found`);
    }
    return { ...business };
  },

  async getByCategory(category) {
    await delay(300);
    return businessData
      .filter(business => business.category.toLowerCase() === category.toLowerCase())
      .map(business => ({ ...business }));
  },

  async getByLocation(city, state) {
    await delay(300);
    return businessData
      .filter(business => 
        business.location.city.toLowerCase() === city.toLowerCase() &&
        business.location.state.toLowerCase() === state.toLowerCase()
      )
      .map(business => ({ ...business }));
  },

  async getFeatured() {
    await delay(300);
    return businessData
      .filter(business => business.verified && business.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6)
      .map(business => ({ ...business }));
  },

  async create(businessData) {
    await delay(500);
    const maxId = Math.max(...businessData.map(b => b.Id));
    const newBusiness = {
      ...businessData,
      Id: maxId + 1,
      verified: false,
      rating: 0,
      reviewCount: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    return newBusiness;
  },

  async update(id, updateData) {
    await delay(300);
    const businessIndex = businessData.findIndex(business => business.Id === parseInt(id));
    if (businessIndex === -1) {
      throw new Error(`Business with Id ${id} not found`);
    }
    const updatedBusiness = { ...businessData[businessIndex], ...updateData };
    return updatedBusiness;
  },

  async delete(id) {
    await delay(300);
    const businessIndex = businessData.findIndex(business => business.Id === parseInt(id));
    if (businessIndex === -1) {
      throw new Error(`Business with Id ${id} not found`);
    }
    return { success: true, message: 'Business deleted successfully' };
  },

  async searchBusinesses(query, filters = {}) {
    await delay(300);
    let results = [...businessData];
    
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(business => 
        business.name.toLowerCase().includes(searchTerm) ||
        business.description.toLowerCase().includes(searchTerm) ||
        business.category.toLowerCase().includes(searchTerm) ||
        business.subcategory.toLowerCase().includes(searchTerm) ||
        business.services.some(service => service.toLowerCase().includes(searchTerm)) ||
        business.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.category) {
      results = results.filter(business => business.category === filters.category);
    }
    
    if (filters.city) {
      results = results.filter(business => 
        business.location.city.toLowerCase() === filters.city.toLowerCase()
      );
    }
    
    if (filters.verified) {
      results = results.filter(business => business.verified === filters.verified);
    }
    
    if (filters.priceRange) {
      results = results.filter(business => business.priceRange === filters.priceRange);
    }
    
    return results.sort((a, b) => b.rating - a.rating);
  },

  async addReview(businessId, reviewData) {
    await delay(300);
    const business = businessData.find(b => b.Id === parseInt(businessId));
    if (!business) {
      throw new Error(`Business with Id ${businessId} not found`);
    }
    
    // Simulate updating rating and review count
    const newReviewCount = business.reviewCount + 1;
    const newRating = ((business.rating * business.reviewCount) + reviewData.rating) / newReviewCount;
    
    return {
      ...business,
      rating: parseFloat(newRating.toFixed(1)),
      reviewCount: newReviewCount
    };
  }
};