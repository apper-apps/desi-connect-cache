import eventData from '@/services/mockData/events.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const eventService = {
  async getAll() {
    await delay(300);
    return [...eventData].sort((a, b) => new Date(a.date) - new Date(b.date));
  },

  async getById(id) {
    await delay(200);
    const event = eventData.find(event => event.Id === parseInt(id));
    if (!event) {
      throw new Error(`Event with Id ${id} not found`);
    }
    return { ...event };
  },

  async getByCommunity(communityId) {
    await delay(300);
    return eventData
      .filter(event => event.communityId === parseInt(communityId))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(event => ({ ...event }));
  },

  async getUpcoming() {
    await delay(300);
    const now = new Date();
    return eventData
      .filter(event => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(event => ({ ...event }));
  },

  async getByDateRange(startDate, endDate) {
    await delay(300);
    return eventData
      .filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(event => ({ ...event }));
  },

  async create(eventData) {
    await delay(500);
    const maxId = Math.max(...eventData.map(e => e.Id));
    const newEvent = {
      ...eventData,
      Id: maxId + 1,
      attendees: [],
      status: 'upcoming'
    };
    return newEvent;
  },

  async update(id, updateData) {
    await delay(300);
    const eventIndex = eventData.findIndex(event => event.Id === parseInt(id));
    if (eventIndex === -1) {
      throw new Error(`Event with Id ${id} not found`);
    }
    const updatedEvent = { ...eventData[eventIndex], ...updateData };
    return updatedEvent;
  },

  async rsvp(eventId, userId, status) {
    await delay(300);
    const event = eventData.find(e => e.Id === parseInt(eventId));
    if (!event) {
      throw new Error(`Event with Id ${eventId} not found`);
    }
    
    let updatedAttendees = [...event.attendees];
    if (status === 'attending' && !updatedAttendees.includes(parseInt(userId))) {
      updatedAttendees.push(parseInt(userId));
    } else if (status === 'not_attending') {
      updatedAttendees = updatedAttendees.filter(id => id !== parseInt(userId));
    }
    
    return {
      ...event,
      attendees: updatedAttendees
    };
  },

  async delete(id) {
    await delay(300);
    const eventIndex = eventData.findIndex(event => event.Id === parseInt(id));
    if (eventIndex === -1) {
      throw new Error(`Event with Id ${id} not found`);
    }
    return { success: true, message: 'Event deleted successfully' };
  },

  async searchEvents(query, filters = {}) {
    await delay(300);
    let results = [...eventData];
    
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.category.toLowerCase().includes(searchTerm) ||
        event.location.name.toLowerCase().includes(searchTerm) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.category) {
      results = results.filter(event => event.category === filters.category);
    }
    
    if (filters.communityId) {
      results = results.filter(event => event.communityId === parseInt(filters.communityId));
    }
    
    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      results = results.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= new Date(start) && eventDate <= new Date(end);
      });
    }
    
    return results.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
};