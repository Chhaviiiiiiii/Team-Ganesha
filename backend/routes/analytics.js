import express from 'express'
import Analytics from '../models/Analytics.js'
import RFIDEvent from '../models/RFIDEvent.js'

const router = express.Router()

// Get analytics summary
router.get('/summary', async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const todayAnalytics = await Analytics.findOne({
      date: { $gte: today }
    })

    const totalVisitors = await RFIDEvent.countDocuments({
      timestamp: { $gte: today }
    })

    res.json({
      success: true,
      data: {
        totalVisitors,
        analytics: todayAnalytics,
        lastUpdated: new Date()
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get visitor trends
router.get('/trends', async (req, res) => {
  try {
    const { days = 7 } = req.query
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const trends = await Analytics.find({
      date: { $gte: startDate }
    }).sort({ date: 1 })

    res.json({
      success: true,
      data: trends
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get zone analytics
router.get('/zones', async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const zoneData = await RFIDEvent.aggregate([
      { $match: { timestamp: { $gte: today } } },
      {
        $group: {
          _id: '$zone',
          count: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$tagId' }
        }
      },
      {
        $project: {
          zone: '$_id',
          visitorCount: { $size: '$uniqueVisitors' },
          totalScans: '$count'
        }
      }
    ])

    res.json({
      success: true,
      data: zoneData
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get hourly distribution
router.get('/hourly', async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const hourlyData = await RFIDEvent.aggregate([
      { $match: { timestamp: { $gte: today } } },
      {
        $group: {
          _id: { $hour: '$timestamp' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ])

    res.json({
      success: true,
      data: hourlyData
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get demographics
router.get('/demographics', async (req, res) => {
  try {
    const demographics = await RFIDEvent.aggregate([
      { $match: { 'visitorInfo.gender': { $exists: true } } },
      {
        $group: {
          _id: '$visitorInfo.gender',
          count: { $sum: 1 }
        }
      }
    ])

    res.json({
      success: true,
      data: demographics
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router
