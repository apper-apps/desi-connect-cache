import communityData from '@/services/mockData/communities.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const communityService = {
  async getAll() {
    await delay(350);
    return [...communityData];
  },

  async getById(id) {
    await delay(200);
    const community = communityData.find(community => community.Id === parseInt(id));
    if (!community) {
      throw new Error(`Community with Id ${id} not found`);
    }
    return { ...community };
  },

  async getByLocation(city, state) {
    await delay(300);
    return communityData
      .filter(community => 
        community.location.city.toLowerCase() === city.toLowerCase() ||
        (community.location.state.toLowerCase() === state.toLowerCase() && 
         community.location.city.includes('Multiple'))
      )
      .map(community => ({ ...community }));
  },

  async create(communityData) {
    await delay(500);
    const maxId = Math.max(...communityData.map(c => c.Id));
    const newCommunity = {
      ...communityData,
      Id: maxId + 1,
      memberCount: 1,
      established: new Date().toISOString().split('T')[0],
      stats: {
        posts: 0,
        events: 0,
        businesses: 0
      }
    };
    return newCommunity;
  },

  async update(id, updateData) {
    await delay(300);
    const communityIndex = communityData.findIndex(community => community.Id === parseInt(id));
    if (communityIndex === -1) {
      throw new Error(`Community with Id ${id} not found`);
    }
    const updatedCommunity = { ...communityData[communityIndex], ...updateData };
    return updatedCommunity;
  },

  async joinCommunity(communityId, userId) {
    await delay(300);
    const community = communityData.find(c => c.Id === parseInt(communityId));
    if (!community) {
      throw new Error(`Community with Id ${communityId} not found`);
    }
    return { 
      success: true, 
      message: 'Successfully joined community',
      community: { ...community, memberCount: community.memberCount + 1 }
    };
  },

  async leaveCommunity(communityId, userId) {
    await delay(300);
    const community = communityData.find(c => c.Id === parseInt(communityId));
    if (!community) {
      throw new Error(`Community with Id ${communityId} not found`);
    }
    return { 
      success: true, 
      message: 'Successfully left community',
      community: { ...community, memberCount: Math.max(0, community.memberCount - 1) }
    };
  },

  async searchCommunities(query, filters = {}) {
    await delay(300);
    let results = [...communityData];
    
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(community => 
        community.name.toLowerCase().includes(searchTerm) ||
        community.description.toLowerCase().includes(searchTerm) ||
        community.location.city.toLowerCase().includes(searchTerm) ||
        community.category.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters.category) {
      results = results.filter(community => community.category === filters.category);
    }
    
    if (filters.city) {
      results = results.filter(community => 
        community.location.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    
    return results;
  }
};