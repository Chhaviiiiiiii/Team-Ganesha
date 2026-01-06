import express from 'express'
import RFIDEvent from '../models/RFIDEvent.js'
import Alert from '../models/Alert.js'

const router = express.Router()

// Get public zone status - minimal data exposure
router.get('/zones-status', async (req, res) => {
  try {
    const zoneStats = await RFIDEvent.aggregate([
      {
        $group: {
          _id: '$zone',
          totalScans: { $sum: 1 },
          checkpointCount: { $addToSet: '$checkpointName' }
        }
      },
      {
        $project: {
          _id: 1,
          totalScans: 1,
          checkpointCount: { $size: '$checkpointName' }
        }
      }
    ])

    // Add status based on visitor count
    const enhancedStats = zoneStats.map(zone => ({
      ...zone,
      status: zone.totalScans < 1000 ? 'safe' : 
              zone.totalScans < 3000 ? 'moderate' : 
              zone.totalScans < 5000 ? 'crowded' : 'emergency'
    }))

    res.json({
      success: true,
      data: enhancedStats
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get active safety alerts only
router.get('/safety-alerts', async (req, res) => {
  try {
    const alerts = await Alert.find({ status: 'active' })
      .select('message type priority location zone createdAt')
      .limit(5)
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      data: alerts
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get helpline information
router.get('/helpline', (req, res) => {
  const helplineData = {
    police: { number: '100', name: 'Police Emergency' },
    ambulance: { number: '102', name: 'Ambulance' },
    first_aid: { number: '1298', name: 'First Aid' },
    lost_found: { number: '1076', name: 'Lost & Found' },
    information: { number: '1077', name: 'Information Desk' },
    disaster_management: { number: '1079', name: 'Disaster Management' }
  }

  res.json({
    success: true,
    data: helplineData
  })
})

// Get crowd metrics summary
router.get('/crowd-summary', async (req, res) => {
  try {
    const stats = await RFIDEvent.aggregate([
      {
        $group: {
          _id: '$zone',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ])

    const total = stats.reduce((sum, stat) => sum + stat.count, 0)
    const busiest = stats[0]
    const safest = stats[stats.length - 1]

    res.json({
      success: true,
      data: {
        totalVisitors: total,
        zoneCount: stats.length,
        busiestZone: busiest?._id || 'N/A',
        busiestCount: busiest?.count || 0,
        safestZone: safest?._id || 'N/A',
        overallStatus: total < 3000 ? 'safe' : total < 6000 ? 'moderate' : 'crowded'
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get hourly crowd distribution
router.get('/hourly-distribution', async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const distribution = await RFIDEvent.aggregate([
      {
        $match: {
          timestamp: { $gte: today }
        }
      },
      {
        $group: {
          _id: { $hour: '$timestamp' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ])

    res.json({
      success: true,
      data: distribution
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router
