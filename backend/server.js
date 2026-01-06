import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import dashboardRoutes from './routes/dashboard.js'
import analyticsRoutes from './routes/analytics.js'
import alertsRoutes from './routes/alerts.js'
import rfidRoutes from './routes/rfid.js'
import authRoutes from './routes/auth.js'
import notificationsRoutes from './routes/notifications.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kumbh-sava', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    console.log('✅ MongoDB Connected')
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err)
    process.exit(1)
  }
}

connectDB()

// Routes
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/alerts', alertsRoutes)
app.use('/api/rfid', rfidRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/notifications', notificationsRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Kumbh Sava Backend running on port ${PORT}`)
  console.log(`📊 Dashboard: http://localhost:${PORT}/api/dashboard`)
  console.log(`🔍 Health: http://localhost:${PORT}/api/health`)
})

export default app
