# NIELIT Alumni Network

A comprehensive web platform designed to connect NIELIT graduates, facilitate networking, and provide resources for professional growth.

## Project Overview

The NIELIT Alumni Network is a full-stack web application developed as part of my college project. It serves as a digital platform for NIELIT alumni to connect, share experiences, and access valuable resources.

### Key Features

- **User Authentication**: Secure login and registration system
- **Profile Management**: Customizable user profiles with professional information
- **Networking**: Connect with fellow alumni and industry professionals
- **Resource Sharing**: Share and access educational and professional resources
- **Event Management**: Create and manage alumni events
- **Discussion Forums**: Engage in meaningful discussions and knowledge sharing
- **Job Opportunities**: Access and share job postings within the alumni network

## Tech Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- Vite for build tooling

### Backend
- Node.js with Express
- TypeScript
- MongoDB for database
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/anushkaEsdev/nielitalumni.git
cd nielitalumni
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

3. Set up environment variables:
```bash
# Frontend
cp .env.example .env

# Backend
cd backend
cp .env.example .env
```

4. Start the development servers:
```bash
# Start frontend
npm run dev

# Start backend (in a separate terminal)
cd backend
npm run dev
```

## Project Structure

```
nielitalumni/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── services/          # API services
│   └── contexts/          # React contexts
├── backend/               # Backend source code
│   ├── src/              # Backend source
│   ├── models/           # Database models
│   └── routes/           # API routes
└── public/               # Static assets
```

## Development

This project was developed by Anushka Choudhary as part of my college curriculum at NIELIT. The goal was to create a platform that would help maintain connections between NIELIT graduates and provide them with valuable resources for their professional growth.

## Contributing

While this is primarily a college project, contributions and suggestions are welcome. Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Anushka Choudhary
- GitHub: [@anushkaEsdev](https://github.com/anushkaEsdev)
