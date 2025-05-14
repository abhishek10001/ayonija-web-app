import React, { useEffect, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AdminContext } from '../context/AdminContext';
import { Clock, Mail, User, MessageCircle, Trash, Reply, Star, Filter, Search, CheckCircle, AlertCircle } from 'lucide-react';

const Messages = () => {
  const { messages: initialMessages, getMessages } = useContext(AdminContext);
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        await getMessages();
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching messages:', error);
        toast.error('Failed to fetch messages');
        setIsLoading(false);
      }
    };
    
    fetchMessages();
  }, []);

  // Update local messages state when context messages change
  useEffect(() => {
    if (Array.isArray(initialMessages)) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
  };

  const handleDeleteMessage = (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this message?')) {
        // Frontend-only deletion
        setMessages(prevMessages => prevMessages.filter(message => message._id !== id));
        
        // Reset selected message if deleted
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
        
        toast.success('Message deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
      toast.error('Failed to delete message');
    }
  };

  const handleReply = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Mark as read functionality
  const handleMarkAsRead = (id) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message._id === id ? { ...message, read: true } : message
      )
    );
    
    if (selectedMessage && selectedMessage._id === id) {
      setSelectedMessage({ ...selectedMessage, read: true });
    }
    
    toast.success('Message marked as read');
  };
  
  // Flag as important functionality
  const handleFlagImportant = (id) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message._id === id ? { ...message, important: !message.important } : message
      )
    );
    
    if (selectedMessage && selectedMessage._id === id) {
      setSelectedMessage({ ...selectedMessage, important: !selectedMessage.important });
    }
    
    toast.success('Message importance updated');
  };

  // Filter and search logic
  const filteredMessages = Array.isArray(messages) 
    ? messages.filter(message => {
        // Filter by status
        if (filter === 'all') {
          // No filter, continue
        } else if (filter === 'unread' && message.read) {
          return false;
        }
        
        // Search functionality
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return (
            (message.subject && message.subject.toLowerCase().includes(searchLower)) ||
            (message.name && message.name.toLowerCase().includes(searchLower)) ||
            (message.email && message.email.toLowerCase().includes(searchLower)) ||
            (message.message && message.message.toLowerCase().includes(searchLower))
          );
        }
        
        return true;
      })
    : [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getMessageDate = (createdAt) => {
    const date = new Date(createdAt);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Contact Messages</h1>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => handleFilterChange('all')}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              All
            </button>
            <button 
              onClick={() => handleFilterChange('unread')}
              className={`px-3 py-2 text-sm rounded-lg flex items-center transition-colors ${filter === 'unread' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
              Unread
            </button>
          </div>
        </div>
      </div>
      
      {Array.isArray(messages) && messages.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden max-h-screen">
            <div className="sticky top-0 p-4 border-b border-gray-100 bg-white z-10 flex justify-between items-center">
              <h2 className="font-medium text-gray-700">Messages</h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                {filteredMessages.length}
              </span>
            </div>
            
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
              {filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <div 
                    key={message._id}
                    onClick={() => handleMessageSelect(message)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 ${
                      selectedMessage && selectedMessage._id === message._id 
                        ? 'bg-blue-50 border-l-4 border-l-primary' 
                        : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                    } ${message.important ? 'bg-yellow-50/30' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center mb-1">
                          {!message.read && (
                            <span className="h-2 w-2 rounded-full bg-blue-500 mr-2 flex-shrink-0"></span>
                          )}
                          {message.important && (
                            <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                          )}
                          <h3 className={`font-medium line-clamp-1 ${message.read ? 'text-gray-700' : 'text-gray-900'}`}>
                            {message.subject || 'No Subject'}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-1 mb-1">{message.name}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">{message.message}</p>
                      </div>
                      <div className="flex flex-col items-end ml-2">
                        <span className="text-xs text-gray-400 whitespace-nowrap mb-2">
                          {getMessageDate(message.createdAt)}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(message._id);
                          }} 
                          className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  {searchTerm ? (
                    <>
                      <Search size={40} className="text-gray-300 mb-2" />
                      <p className="text-gray-500">No messages match your search</p>
                    </>
                  ) : (
                    <>
                      <Mail size={40} className="text-gray-300 mb-2" />
                      <p className="text-gray-500">No messages found</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow-sm h-full">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="bg-gray-100 rounded-full h-10 w-10 flex items-center justify-center text-gray-500 mr-3">
                      {selectedMessage.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{selectedMessage.subject || 'No Subject'}</h2>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock size={14} className="mr-1" />
                        <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleReply(selectedMessage.email)}
                      className="flex items-center gap-1 px-3 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
                    >
                      <Reply size={16} />
                      <span className="hidden sm:inline">Reply</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteMessage(selectedMessage._id)}
                      className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition-colors"
                    >
                      <Trash size={16} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="bg-gray-50 rounded-lg p-5 mb-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex-shrink-0">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">From</div>
                        <div className="text-gray-800">{selectedMessage.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex-shrink-0">
                        <Mail size={18} className="text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Email</div>
                        <div className="text-gray-800">{selectedMessage.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <MessageCircle size={18} className="text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-700">Message</div>
                        <div className="mt-2 text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <AlertCircle size={14} className="mr-1" />
                        <span>This message is saved automatically</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => handleFlagImportant(selectedMessage._id)}
                          className={`px-3 py-2 text-sm rounded-md transition-colors ${
                            selectedMessage.important 
                              ? 'bg-yellow-50 text-yellow-600 border border-yellow-200 hover:bg-yellow-100' 
                              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Star 
                            size={16} 
                            className={`inline mr-1 ${selectedMessage.important ? 'fill-yellow-500' : ''}`} 
                          />
                          {selectedMessage.important ? 'Unflag' : 'Flag Important'}
                        </button>
                        {!selectedMessage.read && (
                          <button 
                            onClick={() => handleMarkAsRead(selectedMessage._id)}
                            className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                          >
                            <CheckCircle size={16} className="inline mr-1" />
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm flex flex-col items-center justify-center py-16 px-4 h-full">
                <Mail size={64} className="text-gray-200 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Message Selected</h3>
                <p className="text-gray-500 text-center max-w-md">
                  Select a message from the list to view its details here
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm flex flex-col items-center justify-center py-16 px-4">
          <Mail size={64} className="text-gray-200 mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Messages Yet</h3>
          <p className="text-gray-500 text-center max-w-md">
            When users submit contact forms, their messages will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;