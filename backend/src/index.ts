import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth';
import postRoutes from './routes/posts';
import { eventRoutes } from './routes/events';
import { questionRoutes } from './routes/questions';

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://alumni-7bn6.onrender.com']
    : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Add a health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://anushka:anushka11@alumni.w9d64fs.mongodb.net/alumni?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 10000,
  maxPoolSize: 10,
  minPoolSize: 5,
  retryWrites: true,
  w: 'majority',
  heartbeatFrequencyMS: 2000,
  serverMonitoringMode: 'poll'
})
.then(() => {
  console.log('Connected to MongoDB');
  // Only start the server after successful database connection
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  console.log('Please make sure:');
  console.log('1. Your IP address is whitelisted in MongoDB Atlas');
  console.log('2. Your MongoDB connection string is correct');
  console.log('3. Your network connection is stable');
  process.exit(1);
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to NIELIT Alumni API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/questions', questionRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
}); 