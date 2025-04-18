# NIELIT Alumni Portal

A modern alumni portal for NIELIT Calicut, built with React, TypeScript, and Node.js.

## Project Structure

```
alumni/
├── backend/               # Backend server (Node.js + Express)
│   ├── src/
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Express middleware
│   │   └── index.ts      # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── src/                  # Frontend (React + TypeScript)
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   └── lib/            # Utility functions
├── public/              # Static assets
├── package.json
└── vite.config.ts
```

## Tech Stack

- Frontend:
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - Radix UI
  - React Router

- Backend:
  - Node.js
  - Express
  - TypeScript
  - MongoDB
  - JWT Authentication

## Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/alumni-portal.git
cd alumni-portal
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

3. Start development servers:
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server (in a new terminal)
npm run dev
```

## Deployment

### Backend (Render)

1. Push your code to GitHub
2. Connect your repository to Render
3. Configure environment variables in Render:
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production
   - PORT=5000
   - CORS_ORIGIN=https://alumni-portal.netlify.app

### Frontend (Netlify)

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Configure environment variables:
   - VITE_API_URL=https://alumni-backend.onrender.com
   - NODE_ENV=production

4. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://your-mongodb-uri
JWT_SECRET=your-secret-key
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## API Documentation

The API documentation is available at `/api/docs` when running the backend server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
