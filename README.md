# 🚀 MERN Stack Project

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring TypeScript, modern authentication, and responsive design.

## ✨ Features

- **🔐 Authentication & Authorization**: JWT-based auth with access & refresh tokens
- **🔒 Security**: Password hashing with bcrypt
- **📱 Responsive Design**: Built with Tailwind CSS
- **⚡ Fast Development**: Hot reload for both frontend and backend
- **🛡️ Type Safety**: Full TypeScript implementation
- **🗄️ Database**: MongoDB with Mongoose ODM
- **🎨 Modern UI**: React with Tailwind CSS styling

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **bcrypt** - Password hashing
- **JWT** - JSON Web Tokens for authentication

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and development server

## 📁 Project Structure

```
project-root/
├── backend/
│   ├── controllers/          # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── db/                  # Database configuration
│   |─ .env                 # Environment variables
│          
├── frontend/
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # React components
│   │   ├── context/         # React context providers
│   │   ├── data/            # Static data
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── types/           # TypeScript type definitions
│   ├── public/
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <https://github.com/Kaif-Zakey/MERN-stack-Application.git>
   cd project-name
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   JWT_ACCESS_SECRET=your-jwt-access-secret
   JWT_REFRESH_SECRET=your-jwt-refresh-secret
   JWT_ACCESS_EXPIRY=15m
   JWT_REFRESH_EXPIRY=7d
   NODE_ENV=development
   ```

5. **Start the development servers**
   
   Backend (runs on port 3000):
   ```bash
   cd node-server
   npm run dev
   ```
   
   Frontend (runs on port 5173):
   ```bash
   cd mini-pos-redux
   npm run dev
   ```

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📚 API Documentation

### Authentication Endpoints

```
POST /api/auth/signup            # User registration
POST /api/auth/login             # User login
POST /api/auth/refresh-token     # Refresh access token
POST /api/auth/logout            # User logout
```

### Protected Routes

```
GET /api/auth/users      # Get user profile
```

## 🔒 Authentication Flow

1. **Registration/Login**: User provides credentials
2. **Token Generation**: Server generates access & refresh tokens
3. **Token Storage**: Tokens stored securely (httpOnly cookies recommended)
4. **API Requests**: Access token sent with each request
5. **Token Refresh**: Refresh token used to get new access token when expired

## 🏗️ Architecture Overview

### Backend Architecture
- **Controllers**: Handle HTTP requests and responses
- **Middleware**: Authentication, error handling, logging
- **Models**: Database schemas and validation
- **Routes**: API endpoint definitions
- **Services**: Business logic layer

### Frontend Architecture
- **Components**: Reusable UI components
- **Pages**: Route-based page components
- **Context**: Global state management
- **Services**: API communication layer
- **Types**: TypeScript type definitions

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 📦 Deployment

### Backend Deployment
1. Build the TypeScript code: `npm run build`
2. Set production environment variables
3. Start the server: `npm start`

### Frontend Deployment
1. Build the React app: `npm run build`
2. Serve the `dist` folder using a static server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [MongoDB](https://www.mongodb.com/) for the database
- [Express.js](https://expressjs.com/) for the web framework
- [React](https://reactjs.org/) for the frontend library
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [TypeScript](https://www.typescriptlang.org/) for type safety

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact [kaifzakey22@example.com].

---

**Vibe Code!** 🎉
