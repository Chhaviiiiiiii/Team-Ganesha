import express from 'express'
import RFIDEvent from '../models/RFIDEvent.js'

const router = express.Router()

// Get all RFID events
router.get('/events', async (req, res) => {
  try {
    const { zone, checkpoint, limit = 100 } = req.query
    const filter = {}
    
    if (zone) filter.zone = zone
    if (checkpoint) filter.checkpointId = checkpoint

    const events = await RFIDEvent.find(filter)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit))

    res.json({
      success: true,
      count: events.length,
      data: events
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Record new RFID event
router.post('/events', async (req, res) => {
  try {
    const event = new RFIDEvent(req.body)
    await event.save()
    
    // TODO: Trigger real-time updates and analytics processing
    
    res.status(201).json({
      success: true,
      data: event
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// Get checkpoint statistics
router.get('/checkpoints/stats', async (req, res) => {
  try {
    const stats = await RFIDEvent.aggregate([
      {
        $group: {
          _id: {
            checkpoint: '$checkpointId',
            zone: '$zone'
          },
          count: { $sum: 1 },
          lastScan: { $max: '$timestamp' }
        }
      },
      {
        $project: {
          checkpointId: '$_id.checkpoint',
          zone: '$_id.zone',
          scanCount: '$count',
          lastScan: 1,
          _id: 0
        }
      }
    ])

    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Get visitor journey
router.get('/visitor/:tagId/journey', async (req, res) => {
  try {
    const { tagId } = req.params
    
    const journey = await RFIDEvent.find({ tagId })
      .sort({ timestamp: 1 })
      .select('checkpointName zone timestamp eventType')

    res.json({
      success: true,
      tagId,
      journey
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router
