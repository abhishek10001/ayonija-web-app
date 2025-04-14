import React, { createContext, useContext, useEffect, useState } from 'react';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Create context for MongoDB connection
const MongoDBContext = createContext({
  isConnected: false,
  isInMemory: false,
  error: null,
});

export const useMongoDB = () => useContext(MongoDBContext);

// For in-memory MongoDB if connection to Atlas fails
let mongoServer = null;

export const MongoDBProvider = ({ children }) => {
  const [state, setState] = useState({
    isConnected: false,
    isInMemory: false,
    error: null,
  });

  useEffect(() => {
    const connectToMongoDB = async () => {
      try {
        // Try to connect to MongoDB Atlas first
        const MONGODB_URI = process.env.REACT_APP_MONGODB_URI;
        
        if (!MONGODB_URI) {
          console.warn('MONGODB_URI not provided in environment variables');
          return await setupInMemoryMongoDB();
        }
        
        // Set connection timeout to 10 seconds
        const connectionOptions = {
          serverSelectionTimeoutMS: 10000,
          connectTimeoutMS: 10000
        };
        
        console.log('Attempting to connect to MongoDB Atlas...');
        await mongoose.connect(MONGODB_URI, connectionOptions);
        console.log('Successfully connected to MongoDB Atlas');
        
        // Set up event listeners for the connection
        mongoose.connection.on('error', (error) => {
          console.error('MongoDB connection error:', error);
          setState(prev => ({ ...prev, error }));
        });
        
        mongoose.connection.on('disconnected', () => {
          console.warn('MongoDB disconnected, attempting to reconnect...');
          setState(prev => ({ ...prev, isConnected: false }));
        });

        setState({
          isConnected: true,
          isInMemory: false,
          error: null,
        });
        
      } catch (error) {
        console.error('Failed to connect to MongoDB Atlas:', error);
        console.log('Falling back to in-memory MongoDB instance...');
        
        try {
          const inMemoryState = await setupInMemoryMongoDB();
          setState({
            isConnected: true,
            isInMemory: true,
            error: null,
          });
        } catch (inMemoryError) {
          setState({
            isConnected: false,
            isInMemory: false,
            error: inMemoryError,
          });
        }
      }
    };

    const setupInMemoryMongoDB = async () => {
      try {
        // Start in-memory MongoDB server
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        
        // Connect to in-memory MongoDB
        await mongoose.connect(mongoUri);
        console.log('Successfully connected to in-memory MongoDB');
        
        return { isInMemory: true };
      } catch (error) {
        console.error('Failed to create in-memory MongoDB:', error);
        throw error;
      }
    };

    connectToMongoDB();

    // Cleanup function
    return async () => {
      try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        
        if (mongoServer) {
          await mongoServer.stop();
          console.log('Stopped in-memory MongoDB server');
        }
      } catch (error) {
        console.error('Error while disconnecting from MongoDB:', error);
      }
    };
  }, []);

  return (
    <MongoDBContext.Provider value={state}>
      {children}
    </MongoDBContext.Provider>
  );
};

// Helper function to check if we're using in-memory database
export const isUsingInMemoryDatabase = () => {
  return !!mongoServer;
}; 