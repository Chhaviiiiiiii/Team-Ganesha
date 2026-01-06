import express from 'express'
import Alert from '../models/Alert.js'
import RFIDEvent from '../models/RFIDEvent.js'
import Analytics from '../models/Analytics.js'

const router = express.Router()

// Get dashboard summary
router.get('/', async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Get today's visitor count
    const totalVisitors = await RFIDEvent.countDocuments({
      timestamp: { $gte: today }
    })

    // Get active zones count
    const activeZones = await RFIDEvent.distinct('zone', {
      timestamp: { $gte: today }
    })

    // Get active alerts count
    const activeAlerts = await Alert.countDocuments({
      status: 'active'
    })

    // System health (mocked - implement real health check)
    const systemHealth = 98.5

    // Recent activity
    const recentActivity = await RFIDEvent.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .select('checkpointName zone eventType timestamp')

    // Get analytics for trends
    const analytics = await Analytics.findOne({
      date: { $gte: today }
    })

    res.json({
      success: true,
      data: {
        kpis: {
          totalVisitors,
          activeZones: activeZones.length,
          alertsActive: activeAlerts,
          systemHealth
        },
        recentActivity,
        analytics,
        timestamp: new Date()
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get widget data
router.get('/widgets/:widgetId', async (req, res) => {
  try {
    const { widgetId } = req.params
    
    // Implement specific widget data fetching
    // This is a placeholder for widget-specific data
    
    res.json({
      success: true,
      widgetId,
      data: {}
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Save widget layout
router.post('/layout', async (req, res) => {
  try {
    const { userId, layout } = req.body
    
    // In a real app, save this to a UserPreferences collection
    // For now, just acknowledge
    
    res.json({
      success: true,
      message: 'Layout saved successfully'
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

export default router
