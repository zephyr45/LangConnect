<div align="center">

# 🌍 LangConnect

### Learn Languages Naturally by Talking with Native Speakers

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> *"The best way to learn a language is by speaking it with those who live it daily."*

[Features](#-features) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Installation](#-installation) • [Deployment](#-deployment)

</div>

---

## 📖 About

**LangConnect** is a language learning platform built on a simple yet powerful idea: **the best way to master a language is through real conversations with native speakers**. Traditional language learning apps teach you grammar and vocabulary, but they can't replicate the natural flow of authentic conversation, cultural nuances, and real-world context that comes from talking to someone who grew up speaking the language.

This full-stack MERN application connects language learners with native speakers worldwide, enabling them to practice through live video calls and text chat. Whether you're preparing for travel, advancing your career, or simply passionate about languages, LangConnect provides an immersive environment where you can:

- 🗣️ **Practice Speaking** - Have real conversations, not scripted dialogues
- 👂 **Improve Listening** - Understand natural accents and speaking speeds
- 🧠 **Learn Context** - Discover idioms, slang, and cultural expressions
- 🤝 **Build Connections** - Make friends across cultures while learning
- ⚡ **Get Instant Feedback** - Correct mistakes in real-time through natural conversation

Built with modern web technologies and powered by Stream SDK for crystal-clear, low-latency communication, LangConnect removes the barriers between learners and fluency.

## ✨ Features

### 🎯 Language Learning Core
- **Connect with Native Speakers** - Match with speakers of the language you're learning
- **Practice Real Conversations** - Move beyond textbooks with authentic dialogue
- **Cultural Immersion** - Learn idioms, slang, and cultural context naturally
- **Flexible Learning Schedule** - Practice whenever works for you, with learners worldwide

### 💬 Communication Tools
- **Real-time Text Chat** - Message with typing indicators and emoji reactions for quick practice
- **HD Video Calls** - Face-to-face conversations for pronunciation and speaking practice
- **Screen Sharing** - Share materials, corrections, or resources during sessions
- **Call Recording** - Record practice sessions to review your progress later

### 👥 Community Features
- **Language Partner Matching** - Find friends who speak your target language
- **User Profiles** - Showcase languages you speak and want to learn
- **Online Availability** - See who's ready for practice right now
- **Friend System** - Build lasting connections with your language partners
- **Real-time Notifications** - Never miss a practice opportunity

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
