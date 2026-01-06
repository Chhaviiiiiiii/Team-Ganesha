# Kumbh Sava - Setup Guide

## Prerequisites

- **Node.js** 18 or higher
- **MongoDB** 6 or higher (local or Atlas)
- **npm** or **yarn**
- Modern browser (Chrome, Firefox, Safari, Edge)

## Quick Start

### Option 1: Automated Installation (Recommended)

**For macOS/Linux:**
```bash
chmod +x install.sh
./install.sh
```

**For Windows:**
```cmd
install.bat
```

### Option 2: Manual Installation

#### 1. Clone and Setup

```bash
cd Team-Ganesha
```

#### 2. Install Root Dependencies (Optional - for concurrent dev mode)

```bash
npm install
```

#### 3. Backend Setup

```bash
cd backend
npm install

# Create environment file
cp .env.example .env

# Edit .env with your settings
nano .env
```

Update `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kumbh-sava
JWT_SECRET=your-super-secret-key-here-change-this
NODE_ENV=development
```

#### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Or use concurrently (from root):**
```bash
npm run dev
```

### Production Mode

**Build Frontend:**
```bash
cd frontend
npm run build
```

**Start Backend:**
```bash
cd backend
npm start
```

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB from [mongodb.com/download](https://www.mongodb.com/try/download/community)

2. Start MongoDB:
```bash
mongod
```

3. Use default connection string:
```
mongodb://localhost:27017/kumbh-sava
```

### Option 2: MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/kumbh-sava?retryWrites=true&w=majority
```

## Environment Variables

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/kumbh-sava

# Security
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# CORS (Optional)
CORS_ORIGIN=http://localhost:3000
```

### Frontend (Optional - create .env in frontend/)

```env
VITE_API_URL=http://localhost:5000/api
```

## Verification

### 1. Check Backend Health

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-01-06T...",
  "uptime": 123.456
}
```

### 2. Check Frontend

Open browser: `http://localhost:3000`

You should see the Kumbh Sava dashboard with:
- ✅ Glassmorphic dark theme
- ✅ Left and right peek panels (hover to reveal)
- ✅ macOS-style dock at bottom
- ✅ Dashboard with widgets

## Troubleshooting

### MongoDB Connection Issues

**Error:** `MongoNetworkError: failed to connect`

**Solutions:**
1. Ensure MongoDB is running: `mongod`
2. Check connection string in `.env`
3. Verify MongoDB port (default: 27017)

### Port Already in Use

**Backend (5000):**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9

# Or change PORT in backend/.env
```

**Frontend (3000):**
```bash
# Vite will automatically use next available port
# Or specify: npm run dev -- --port 3001
```

### Module Not Found

```bash
# Clear node_modules and reinstall
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors

Update `backend/server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
```

## Default Test Data

### Create Test User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@kumbhsava.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### Create Test Alert

```bash
curl -X POST http://localhost:5000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "type": "warning",
    "title": "High Crowd Density",
    "message": "Zone A approaching capacity",
    "location": "Zone A - Main Ghat",
    "priority": "high"
  }'
```

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│           Frontend (React + Vite)           │
│  ┌─────────────────────────────────────┐   │
│  │  Components                          │   │
│  │  • DashboardController               │   │
│  │  • LeftPeekPanel / RightPeekPanel   │   │
│  │  • MacOSDock                         │   │
│  │  • Widgets (Draggable/Resizable)    │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │  Styling                             │   │
│  │  • Tailwind CSS (Zinc theme)        │   │
│  │  • Framer Motion (Animations)       │   │
│  │  • Glassmorphism effects            │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                      ↕ HTTP/REST
┌─────────────────────────────────────────────┐
│         Backend (Node + Express)            │
│  ┌─────────────────────────────────────┐   │
│  │  Routes                              │   │
│  │  • /api/dashboard                    │   │
│  │  • /api/analytics                    │   │
│  │  • /api/alerts                       │   │
│  │  • /api/rfid                         │   │
│  │  • /api/auth                         │   │
│  │  • /api/notifications                │   │
│  └─────────────────────────────────────┘   │
│  ┌─────────────────────────────────────┐   │
│  │  Models (Mongoose)                   │   │
│  │  • User, Alert, RFIDEvent           │   │
│  │  • Analytics, Notification          │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                      ↕
┌─────────────────────────────────────────────┐
│              MongoDB Database               │
│  Collections: users, alerts, rfids, etc.   │
└─────────────────────────────────────────────┘
```

## Next Steps

1. **Customize**: Modify colors, layouts, and branding
2. **Add Features**: Implement WebSocket for real-time updates
3. **Security**: Add proper authentication middleware
4. **Testing**: Write unit and integration tests
5. **Deployment**: Deploy to production (Vercel, Railway, etc.)

## Support

For issues or questions:
- Check the [README.md](README.md)
- Review API documentation in [API.md](API.md)
- Check troubleshooting section above

## License

MIT License - See LICENSE file for details
