# Kumbh Sava - Quick Reference

## 🚀 Quick Start Commands

### Installation
```bash
# Automated (Recommended)
./install.sh  # macOS/Linux
install.bat   # Windows

# Manual
cd backend && npm install
cd ../frontend && npm install
```

### Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Or both (requires root package.json setup)
npm run dev
```

### Access
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- Health: http://localhost:5000/api/health

---

## 📁 Project Structure

```
Team-Ganesha/
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── components/     # UI Components
│   │   │   ├── views/      # Dashboard views
│   │   │   └── widgets/    # Chart widgets
│   │   ├── services/       # API client
│   │   ├── utils/          # Helpers
│   │   └── App.jsx         # Main app
│   └── package.json
│
├── backend/                # Node + Express
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Auth, etc.
│   ├── server.js           # Entry point
│   └── package.json
│
└── Documentation/
    ├── README.md           # Overview
    ├── SETUP.md            # Setup guide
    ├── API.md              # API docs
    ├── FEATURES.md         # Feature list
    └── DEPLOYMENT.md       # Deploy guide
```

---

## 🎨 Key Components

### Frontend

| Component | Purpose |
|-----------|---------|
| `App.jsx` | Main container, layout orchestration |
| `DashboardController.jsx` | View management, state controller |
| `MacOSDock.jsx` | Bottom dock navigation |
| `LeftPeekPanel.jsx` | Team & AI panel (left edge) |
| `RightPeekPanel.jsx` | Notifications panel (right edge) |
| `WidgetGrid.jsx` | Draggable widget container |
| `GlassChart.jsx` | Recharts wrapper with styling |
| `StatCard.jsx` | KPI display cards |

### Backend Routes

| Route | Purpose |
|-------|---------|
| `/api/dashboard` | Dashboard summary & widgets |
| `/api/analytics` | Visitor analytics & trends |
| `/api/alerts` | Alert management |
| `/api/rfid` | RFID event tracking |
| `/api/auth` | Authentication |
| `/api/notifications` | User notifications |

---

## 🔑 Essential API Endpoints

### Quick Tests

```bash
# Health check
curl http://localhost:5000/api/health

# Get dashboard
curl http://localhost:5000/api/dashboard

# Create alert
curl -X POST http://localhost:5000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{"type":"warning","title":"Test","message":"Test alert","priority":"medium"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"admin123"}'
```

---

## 🎯 UI Interaction Guide

### Peek Panels
- **Left Panel**: Hover on left edge → Team & AI tools
- **Right Panel**: Hover on right edge → Notifications & utilities

### Dock Navigation
- **Hover**: Icons scale with Gaussian wave effect
- **Click**: Switch between views (Dashboard, Analytics, Alerts, Operations)
- **Active**: Dot indicator below active icon

### Widgets
- **Drag**: Click and drag to reorder
- **Resize**: Drag bottom-right corner to resize
- **Auto-save**: Layout saved to localStorage automatically

### Views
- **Dashboard**: KPIs + customizable widget grid
- **Analytics**: Charts and trend analysis
- **Alerts**: Filterable alert management
- **Operations**: System status and controls

---

## 🎨 Customization Quick Guide

### Colors (tailwind.config.js)
```javascript
colors: {
  glass: {
    light: 'rgba(255, 255, 255, 0.05)',   // Panel background
    border: 'rgba(255, 255, 255, 0.1)',   // Panel borders
    glow: 'rgba(168, 85, 247, 0.4)',      // Glow effects
  }
}
```

### Animations (utils/animations.js)
```javascript
springConfig: {
  stiffness: 300,  // Higher = faster
  damping: 30      // Higher = less bounce
}
```

### Theme Colors
- **Primary**: Purple (`#a855f7`)
- **Secondary**: Blue (`#3b82f6`)
- **Success**: Green (`#10b981`)
- **Warning**: Yellow/Orange (`#f97316`)
- **Danger**: Red (`#ef4444`)

---

## 📊 Data Models Quick Reference

### User
```javascript
{
  name: String,
  email: String (unique),
  role: 'admin' | 'operator' | 'viewer',
  status: 'online' | 'offline' | 'away'
}
```

### Alert
```javascript
{
  type: 'critical' | 'warning' | 'info' | 'success',
  title: String,
  message: String,
  priority: 'high' | 'medium' | 'low',
  status: 'active' | 'acknowledged' | 'resolved'
}
```

### RFID Event
```javascript
{
  tagId: String,
  checkpointId: String,
  zone: String,
  eventType: 'entry' | 'exit' | 'scan',
  timestamp: Date,
  visitorInfo: { name, age, gender }
}
```

---

## 🐛 Common Issues & Fixes

### Port in Use
```bash
# Backend (5000)
lsof -ti:5000 | xargs kill -9

# Frontend (3000)
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection
```bash
# Check if MongoDB is running
mongosh

# Start MongoDB
mongod

# Or use MongoDB Atlas (cloud)
```

### Module Not Found
```bash
# Reinstall dependencies
cd backend && rm -rf node_modules && npm install
cd frontend && rm -rf node_modules && npm install
```

### CORS Error
Check `backend/server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000'
}))
```

---

## ⚡ Performance Tips

1. **Widget Limit**: Keep < 15 widgets for smooth performance
2. **Chart Data Points**: Limit to < 100 points per chart
3. **Polling**: Use 5-10 second intervals for auto-refresh
4. **Images**: Optimize/compress all images
5. **Build**: Run `npm run build` for production optimizations

---

## 🔒 Security Checklist

- [ ] Change `JWT_SECRET` in production
- [ ] Use HTTPS in production
- [ ] Validate all user inputs
- [ ] Sanitize database queries
- [ ] Set secure CORS origins
- [ ] Enable rate limiting
- [ ] Use environment variables
- [ ] Keep dependencies updated

---

## 📚 Documentation Files

| File | Description |
|------|-------------|
| `README.md` | Project overview & quick start |
| `SETUP.md` | Detailed installation guide |
| `API.md` | Complete API documentation |
| `FEATURES.md` | Full feature list |
| `DEPLOYMENT.md` | Production deployment guide |
| `QUICK_REFERENCE.md` | This file - quick lookup |

---

## 🆘 Getting Help

1. Check documentation (README, SETUP, API docs)
2. Review error messages in terminal
3. Check browser console for frontend errors
4. Verify MongoDB connection
5. Ensure all environment variables are set
6. Check that all ports are available

---

## 🎓 Learning Resources

### Technologies Used
- **React**: reactjs.org
- **Vite**: vitejs.dev
- **Tailwind CSS**: tailwindcss.com
- **Framer Motion**: framer.com/motion
- **Express**: expressjs.com
- **MongoDB**: mongodb.com/docs
- **Mongoose**: mongoosejs.com

### Advanced Topics
- WebSocket integration (Socket.io)
- Redis caching
- Docker containerization
- CI/CD pipelines
- Load balancing
- Microservices architecture

---

## 🚀 Next Steps After Setup

1. **Explore the UI**: Test all panels, dock, widgets
2. **Test APIs**: Use Postman/Insomnia or cURL
3. **Customize**: Change colors, add widgets
4. **Add Data**: Create test alerts, RFID events
5. **Deploy**: Follow DEPLOYMENT.md for production
6. **Extend**: Add new features, integrate services

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production Ready ✅

For detailed information, see complete documentation files.
