<div align="center">

# 🌍 LangConnect

### Language Exchange Platform with Real-Time Video & Chat

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

![Demo App](/frontend/public/screenshot-for-readme.png)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Installation](#-installation) • [Deployment](#-deployment)

</div>

---

## 📖 About

**LangConnect** is a full-stack MERN application designed for language learners to connect and practice with native speakers worldwide. Built with modern web technologies and powered by Stream SDK for low-latency communication, it offers a seamless platform for cultural exchange and language learning through real-time video calls and messaging.

## ✨ Features

### 💬 Communication
- **Real-time Messaging** - Instant chat with typing indicators, emoji reactions, and message history
- **HD Video Calls** - Crystal-clear 1-on-1 and group video calls
- **Screen Sharing** - Share your screen during calls for enhanced learning
- **Call Recording** - Record sessions for later review

### 👥 Social Features
- **Friend System** - Send and manage friend requests
- **User Profiles** - Customize your profile with language preferences
- **Online Status** - See who's available for practice
- **Notifications** - Stay updated with real-time notifications

### 🎨 User Experience
- **32 UI Themes** - Personalize your experience with DaisyUI themes
- **Responsive Design** - Seamless experience across all devices
- **Dark Mode** - Eye-friendly interface for any time of day

### 🔐 Security
- **JWT Authentication** - Secure token-based authentication
- **Protected Routes** - Route-level access control
- **Password Encryption** - bcrypt for secure password hashing
- **HTTP-only Cookies** - Secure session management

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library with latest features
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS + DaisyUI** - Utility-first CSS with pre-built components
- **TanStack Query** - Powerful data fetching and caching
- **Zustand** - Lightweight state management
- **Stream Video & Chat React SDK** - Real-time communication
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Node.js + Express.js** - Fast and minimal web framework
- **MongoDB + Mongoose** - NoSQL database with elegant ODM
- **Stream Chat & Video SDK** - Low-latency real-time communication
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing
- **Cookie-parser** - Cookie management
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** Atlas account or local MongoDB
- **Stream.io** account ([Sign up here](https://getstream.io/))
- **Git**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/zephyr45/LangConnect.git
cd LangConnect
```

2. **Install dependencies**
```bash
# Install all dependencies at once
npm install

# Or install separately
cd backend && npm install
cd ../frontend && npm install
```

3. **Set up environment variables**

**Backend** (`/backend/.env`):
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret_key
NODE_ENV=development
```

**Frontend** (`/frontend/.env`):
```env
VITE_STREAM_API_KEY=your_stream_api_key
```

4. **Get Stream.io credentials**
   - Sign up at [getstream.io](https://getstream.io/)
   - Create a new app
   - Copy your API Key and Secret
   - Paste them in the `.env` files

5. **Run the application**

**Backend** (Terminal 1):
```bash
cd backend
npm run dev
```

**Frontend** (Terminal 2):
```bash
cd frontend
npm run dev
```

6. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5001`

## 📁 Project Structure

```
LangConnect/
├── backend/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── lib/            # Database & Stream config
│   │   └── server.js       # Entry point
│   ├── .env               # Environment variables
│   └── package.json
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities & API client
│   │   ├── store/         # Zustand state
│   │   └── constants/     # App constants
│   ├── .env              # Environment variables
│   └── package.json
│
└── package.json          # Root package.json
```

## 🌐 Deployment

### Option 1: Render (Recommended)

**Backend:**
1. Create a new Web Service on [Render](https://render.com/)
2. Connect your GitHub repository
3. Configure:
   - Build Command: `cd backend && npm install`
   - Start Command: `npm run start --prefix backend`
   - Add environment variables from `.env`

**Frontend:**
1. Create a Static Site on Render
2. Configure:
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/dist`
   - Add environment variables

### Option 2: Vercel + Railway

- **Frontend**: Deploy to [Vercel](https://vercel.com/)
- **Backend**: Deploy to [Railway](https://railway.app/)

### Important: Update CORS

Before deploying, update CORS settings in `backend/src/server.js`:
```javascript
app.use(cors({
  origin: "https://your-frontend-domain.com",
  credentials: true,
}));
```

## 🐛 Troubleshooting

**MongoDB Connection Error**
- Whitelist your IP in MongoDB Atlas (Network Access → Add IP → Allow from Anywhere)

**CORS Issues**
- Verify CORS origin matches your frontend URL
- Ensure `credentials: true` is set

**Stream Chat/Video Not Working**
- Double-check API credentials in `.env` files
- Verify Stream.io dashboard shows your app as active

## 📝 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Root
- `npm run build` - Build entire project
- `npm start` - Start production server

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Stream.io](https://getstream.io/) - For the amazing real-time SDK
- [DaisyUI](https://daisyui.com/) - For beautiful UI components
- [MongoDB](https://www.mongodb.com/) - For the flexible database

---

<div align="center">

**Made with ❤️ for language learners worldwide**

⭐ Star this repo if you find it helpful!

</div>
