import discussionData from '@/services/mockData/discussions.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const discussionService = {
  async getAll() {
    await delay(300);
    return [...discussionData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async getById(id) {
    await delay(200);
    const discussion = discussionData.find(discussion => discussion.Id === parseInt(id));
    if (!discussion) {
      throw new Error(`Discussion with Id ${id} not found`);
    }
    return { ...discussion };
  },

  async getByCommunity(communityId) {
    await delay(300);
    return discussionData
      .filter(discussion => discussion.communityId === parseInt(communityId))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(discussion => ({ ...discussion }));
  },

  async getByCategory(category) {
    await delay(300);
    return discussionData
      .filter(discussion => discussion.category.toLowerCase() === category.toLowerCase())
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(discussion => ({ ...discussion }));
  },

  async create(discussionData) {
    await delay(400);
    const maxId = Math.max(...discussionData.map(d => d.Id));
    const newDiscussion = {
      ...discussionData,
      Id: maxId + 1,
      votes: 0,
      commentCount: 0,
      viewCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPinned: false,
      comments: []
    };
    return newDiscussion;
  },

  async update(id, updateData) {
    await delay(300);
    const discussionIndex = discussionData.findIndex(discussion => discussion.Id === parseInt(id));
    if (discussionIndex === -1) {
      throw new Error(`Discussion with Id ${id} not found`);
    }
    const updatedDiscussion = { 
      ...discussionData[discussionIndex], 
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    return updatedDiscussion;
  },

  async vote(id, voteType) {
    await delay(250);
    const discussion = discussionData.find(d => d.Id === parseInt(id));
    if (!discussion) {
      throw new Error(`Discussion with Id ${id} not found`);
    }
    const voteChange = voteType === 'up' ? 1 : -1;
    return { 
      ...discussion, 
      votes: discussion.votes + voteChange 
    };
  },

  async addComment(discussionId, commentData) {
    await delay(300);
    const discussion = discussionData.find(d => d.Id === parseInt(discussionId));
    if (!discussion) {
      throw new Error(`Discussion with Id ${discussionId} not found`);
    }
    
    const maxCommentId = discussion.comments.length > 0 
      ? Math.max(...discussion.comments.map(c => c.id)) 
      : 0;
    
    const newComment = {
      id: maxCommentId + 1,
      ...commentData,
      votes: 0,
      createdAt: new Date().toISOString()
    };
    
    return {
      ...discussion,
      comments: [...discussion.comments, newComment],
      commentCount: discussion.commentCount + 1
    };
  },

  async searchDiscussions(query, filters = {}) {
    await delay(300);
    let results = [...discussionData];
    
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(discussion => 
        discussion.title.toLowerCase().includes(searchTerm) ||
        discussion.content.toLowerCase().includes(searchTerm) ||
        discussion.category.toLowerCase().includes(searchTerm) ||
        discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.category) {
      results = results.filter(discussion => discussion.category === filters.category);
    }
    
    if (filters.communityId) {
      results = results.filter(discussion => discussion.communityId === parseInt(filters.communityId));
    }
    
    return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};