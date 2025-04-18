# Alumni Portal Deployment Guide

This guide provides step-by-step instructions for deploying the Alumni Portal application to Render.com.

## Prerequisites

Before deployment, ensure you have:

1. A Render.com account
2. A MongoDB Atlas account with a running database
3. Git repository with your project code

## MongoDB Setup

1. The MongoDB connection string is: `mongodb+srv://anushka:anushka11@alumni.w9d64fs.mongodb.net/`
2. Ensure the database is accessible from your deployment environment
3. Create a test user:
   ```
   cd backend
   npm run create-test-user
   ```

## Deployment to Render.com

### Method 1: Using render.yaml Blueprint

1. Commit and push your latest changes to your Git repository
2. Log in to your Render dashboard
3. Click on "New" and select "Blueprint"
4. Connect your Git repository
5. Render will automatically detect the `render.yaml` file and set up your services

### Method 2: Manual Setup

#### Backend Deployment

1. In your Render dashboard, click "New" and select "Web Service"
2. Connect your Git repository
3. Enter the following settings:
   - Name: `alumni-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `node dist/index.js`
4. Under "Environment Variables", add:
   - `MONGODB_URI`: `mongodb+srv://anushka:anushka11@alumni.w9d64fs.mongodb.net/`
   - `JWT_SECRET`: `alumni_portal_secret_key`
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `CORS_ORIGIN`: `https://alumni-7bn6.onrender.com`
5. Click "Create Web Service"

#### Frontend Deployment

1. In your Render dashboard, click "New" and select "Static Site"
2. Connect your Git repository
3. Enter the following settings:
   - Name: `alumni-frontend`
   - Root Directory: (leave blank)
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Under "Environment Variables", add:
   - `VITE_API_URL`: `https://alumni-7bn6.onrender.com/api`
   - `NODE_ENV`: `production`
5. Click "Create Static Site"

## Verifying Deployment

After deployment:

1. Visit your backend API endpoint at `https://alumni-7bn6.onrender.com/api/posts` to ensure the API is working
2. Visit your frontend at `https://alumni-frontend-xxxx.onrender.com` to access the application
3. Use the following credentials to log in:
   - Email: `test@example.com`
   - Password: `Test@123`

## Troubleshooting

If you encounter issues:

1. Check Render logs for both frontend and backend services
2. Verify your environment variables are correctly set
3. Ensure your MongoDB database is accessible
4. Check the CORS configuration in the backend to ensure it's allowing requests from your frontend domain

## Local Development

For local development:

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   cd backend && npm install
   ```
3. Start the backend:
   ```
   cd backend
   npm install
   npm run dev
   ```
4. In a new terminal, start the frontend:
   ```
   npm install
   npm run dev
   ```
5. The application will be available at `http://localhost:3000` 