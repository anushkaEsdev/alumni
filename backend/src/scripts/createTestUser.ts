import mongoose from 'mongoose';
import { User } from '../models/User';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://anushka:anushka11@alumni.w9d64fs.mongodb.net/alumni?retryWrites=true&w=majority';

async function createTestUser() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB successfully');

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    if (existingUser) {
      console.log('Test user already exists');
      await mongoose.disconnect();
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Test@123', salt);

    // Create test user
    const testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
      bio: 'This is a test user account',
      avatarUrl: 'https://ui-avatars.com/api/?name=Test+User',
      role: 'user',
      isVerified: true
    });

    await testUser.save();
    console.log('Test user created successfully');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error creating test user:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
    process.exit(1);
  }
}

createTestUser(); 