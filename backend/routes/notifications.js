import express from 'express'
import Notification from '../models/Notification.js'

const router = express.Router()

// Get user notifications
router.get('/', async (req, res) => {
  try {
    const { userId, read } = req.query
    const filter = {}
    
    if (userId) filter.userId = userId
    if (read !== undefined) filter.read = read === 'true'

    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)

    const unreadCount = await Notification.countDocuments({
      userId,
      read: false
    })

    res.json({
      success: true,
      data: notifications,
      unreadCount
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// Create notification
router.post('/', async (req, res) => {
  try {
    const notification = new Notification(req.body)
    await notification.save()
    
    // TODO: Send push notification or WebSocket event
    
    res.status(201).json({
      success: true,
      data: notification
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// Mark as read
router.patch('/:id/read', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
        readAt: new Date()
      },
      { new: true }
    )

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        error: 'Notification not found' 
      })
    }

    res.json({ success: true, data: notification })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// Mark all as read
router.patch('/read-all', async (req, res) => {
  try {
    const { userId } = req.body
    
    await Notification.updateMany(
      { userId, read: false },
      { read: true, readAt: new Date() }
    )

    res.json({ 
      success: true, 
      message: 'All notifications marked as read' 
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// Delete notification
router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id)
    
    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        error: 'Notification not found' 
      })
    }

    res.json({ 
      success: true, 
      message: 'Notification deleted' 
    })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

export default router
