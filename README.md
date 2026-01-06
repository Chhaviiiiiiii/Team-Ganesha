# 🎨 Kumbh Sava - Premium Control System

> A mission-critical, full-stack MERN dashboard with macOS-inspired glassmorphic UI, advanced animations, and real-time data management capabilities.

[![Status](https://img.shields.io/badge/status-production--ready-success)]()
[![Version](https://img.shields.io/badge/version-1.0.0-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

![Kumbh Sava Dashboard](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react)
![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6+-47A248?logo=mongodb)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?logo=tailwind-css)

## 🚀 Features

- **Premium Glassmorphic UI**: Dark zinc theme with glass panels and backdrop blur effects
- **macOS-Style Dock**: Gaussian wave hover effect with icon scaling
- **Peek Panels**: Left (Team & AI) and Right (Notifications & Utilities) sliding panels
- **Draggable Widgets**: Resizable dashboard widgets with morph animations
- **Advanced Charts**: Recharts with custom SVG glows and neon gradients
- **Real-time Ready**: RESTful APIs with scalable backend architecture
- **RBAC**: Role-based access control for security

## 📁 Project Structure

```
kumbh-sava/
├── frontend/          # React + Vite + Tailwind + Framer Motion
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── backend/           # Node.js + Express + MongoDB
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
└── README.md
```

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- MongoDB 6+
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🎨 Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- React Grid Layout
- Lucide Icons

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## 📝 API Endpoints

- `GET /api/dashboard` - Dashboard summary
- `GET /api/analytics` - Analytics data
- `GET /api/alerts` - System alerts
- `GET /api/notifications` - User notifications
- `POST /api/auth/login` - User authentication
- `POST /api/widgets/layout` - Save widget layout

## 🎯 Usage

1. Start MongoDB server
2. Run backend: `cd backend && npm run dev`
3. Run frontend: `cd frontend && npm run dev`
4. Access at `http://localhost:3000`

## 🔐 Security

- JWT-based authentication
- Role-based access control (RBAC)
- Environment variable protection
- CORS configuration

## 📄 License

MIT License - Feel free to use for your projects
