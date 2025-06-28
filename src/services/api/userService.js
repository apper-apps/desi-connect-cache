import userData from '@/services/mockData/users.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  async getAll() {
    await delay(300);
    return [...userData];
  },

  async getById(id) {
    await delay(200);
    const user = userData.find(user => user.Id === parseInt(id));
    if (!user) {
      throw new Error(`User with Id ${id} not found`);
    }
    return { ...user };
  },

  async getByCommunity(communityId) {
    await delay(300);
    return userData
      .filter(user => user.communities && user.communities.includes(parseInt(communityId)))
      .map(user => ({ ...user }));
  },

  async create(userData) {
    await delay(400);
    const maxId = Math.max(...userData.map(u => u.Id));
    const newUser = {
      ...userData,
      Id: maxId + 1,
      joinedDate: new Date().toISOString().split('T')[0],
      verified: false
    };
    return newUser;
  },

  async update(id, updateData) {
    await delay(300);
    const userIndex = userData.findIndex(user => user.Id === parseInt(id));
    if (userIndex === -1) {
      throw new Error(`User with Id ${id} not found`);
    }
    const updatedUser = { ...userData[userIndex], ...updateData };
    return updatedUser;
  },

  async delete(id) {
    await delay(250);
    const userIndex = userData.findIndex(user => user.Id === parseInt(id));
    if (userIndex === -1) {
      throw new Error(`User with Id ${id} not found`);
    }
    return { success: true, message: 'User deleted successfully' };
  },

  async searchUsers(query, filters = {}) {
    await delay(300);
    let results = [...userData];
    
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(user => 
        user.name.toLowerCase().includes(searchTerm) ||
        user.profession.toLowerCase().includes(searchTerm) ||
        user.location.city.toLowerCase().includes(searchTerm) ||
        user.interests.some(interest => interest.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.city) {
      results = results.filter(user => user.location.city === filters.city);
    }
    
    if (filters.profession) {
      results = results.filter(user => 
        user.profession.toLowerCase().includes(filters.profession.toLowerCase())
      );
    }
    
    return results;
  }
};