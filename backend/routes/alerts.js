import express from 'express'
import Alert from '../models/Alert.js'

const router = express.Router()

// Get all alerts
router.get('/', async (req, res) => {
  try {
    const { type, status, priority } = req.query
    const filter = {}
    
    if (type) filter.type = type
    if (status) filter.status = status
    if (priority) filter.priority = priority

    const alerts = await Alert.find(filter)
      .sort({ priority: -1, createdAt: -1 })
      .limit(100)
      .populate('acknowledgedBy', 'name email')

    res.json({
      success: true,
      count: alerts.length,
      data: alerts
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Create new alert
router.post('/', async (req, res) => {
  try {
    const alert = new Alert(req.body)
    await alert.save()
    
    // TODO: Trigger real-time notification via WebSocket
    
    res.status(201).json({
      success: true,
      data: alert
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// Acknowledge alert
router.patch('/:id/acknowledge', async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        status: 'acknowledged',
        acknowledgedBy: req.body.userId,
        acknowledgedAt: new Date()
      },
      { new: true }
    )

    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert not found' })
    }

    res.json({ success: true, data: alert })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// Resolve alert
router.patch('/:id/resolve', async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        status: 'resolved',
        resolvedAt: new Date()
      },
      { new: true }
    )

    if (!alert) {
      return res.status(404).json({ success: false, error: 'Alert not found' })
    }

    res.json({ success: true, data: alert })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// Get alert statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await Alert.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ])

    const priorityStats = await Alert.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ])

    res.json({
      success: true,
      data: {
        byStatus: stats,
        byPriority: priorityStats
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router
