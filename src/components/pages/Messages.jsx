import React, { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Raj Patel',
      lastMessage: 'Hey, I saw your post about software engineering opportunities...',
      timestamp: '2 min ago',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      online: true
    },
    {
      id: 2,
      name: 'Anita Reddy',
      lastMessage: 'The Diwali event planning is going great! Can you help with...',
      timestamp: '1 hour ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      online: false
    },
    {
      id: 3,
      name: 'Fremont Community Group',
      lastMessage: 'New member joined: Welcome to the community!',
      timestamp: '3 hours ago',
      unread: 5,
      avatar: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=150&fit=crop',
      online: false,
      isGroup: true
    },
    {
      id: 4,
      name: 'Meera Iyer',
      lastMessage: 'Thank you for the restaurant recommendation!',
      timestamp: '1 day ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      online: false
    },
    {
      id: 5,
      name: 'Vikram Singh',
      lastMessage: 'Are you joining the cricket match this weekend?',
      timestamp: '2 days ago',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      online: true
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: 2,
      senderName: 'Raj Patel',
      content: 'Hey Priya! I saw your post about software engineering opportunities in the Bay Area.',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      senderId: 1,
      senderName: 'You',
      content: 'Hi Raj! Yes, there are quite a few openings at my company. Are you looking to switch?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: 3,
      senderId: 2,
      senderName: 'Raj Patel',
      content: 'Actually yes! I\'ve been with my current company for 3 years and looking for new challenges. What kind of roles are available?',
      timestamp: '10:35 AM',
      isOwn: false
    },
    {
      id: 4,
      senderId: 1,
      senderName: 'You',
      content: 'We have openings for Senior Software Engineers, especially in our cloud infrastructure team. The work is really interesting and the team is great!',
      timestamp: '10:38 AM',
      isOwn: true
    },
    {
      id: 5,
      senderId: 2,
      senderName: 'Raj Patel',
      content: 'That sounds perfect! I have experience with AWS and Kubernetes. Would you be able to refer me?',
      timestamp: '10:40 AM',
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] flex bg-surface rounded-xl shadow-soft overflow-hidden">
      {/* Sidebar - Conversations List */}
      <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-display font-bold text-gray-900">Messages</h1>
            <button className="p-2 rounded-lg bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors">
              <ApperIcon name="Edit3" size={20} />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conversation.id ? 'bg-primary-50 border-primary-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {conversation.name}
                      {conversation.isGroup && (
                        <ApperIcon name="Users" size={14} className="inline ml-1 text-gray-400" />
                      )}
                    </h3>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    {conversation.unread > 0 && (
                      <span className="ml-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {conversation.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="hidden md:flex flex-1 flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={selectedConversation.avatar}
                      alt={selectedConversation.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedConversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedConversation.name}</h2>
                    <p className="text-sm text-gray-500">
                      {selectedConversation.online ? 'Online' : 'Last seen 2 hours ago'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                    <ApperIcon name="Phone" size={20} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                    <ApperIcon name="Video" size={20} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                    <ApperIcon name="MoreVertical" size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isOwn 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-white text-gray-900 shadow-soft'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      message.isOwn ? 'text-primary-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                  <ApperIcon name="Paperclip" size={20} />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
                    <ApperIcon name="Smile" size={18} />
                  </button>
                </div>
                
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                >
                  <ApperIcon name="Send" size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* No conversation selected */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <ApperIcon name="MessageCircle" size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile: Show selected conversation or list */}
      {selectedConversation && (
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          {/* Mobile Chat Header */}
          <div className="p-4 border-b border-gray-200 bg-white flex items-center">
            <button
              onClick={() => setSelectedConversation(null)}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors mr-3"
            >
              <ApperIcon name="ArrowLeft" size={20} />
            </button>
            
            <div className="flex items-center space-x-3 flex-1">
              <img
                src={selectedConversation.avatar}
                alt={selectedConversation.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">{selectedConversation.name}</h2>
                <p className="text-xs text-gray-500">
                  {selectedConversation.online ? 'Online' : 'Last seen 2h ago'}
                </p>
              </div>
            </div>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
              <ApperIcon name="MoreVertical" size={20} />
            </button>
          </div>

          {/* Mobile Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50" style={{ height: 'calc(100vh - 140px)' }}>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.isOwn 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-white text-gray-900 shadow-soft'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.isOwn ? 'text-primary-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Message Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                className="p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              >
                <ApperIcon name="Send" size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;