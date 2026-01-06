import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['alert', 'info', 'success', 'warning'],
    default: 'info'
  },
  title: {
    type: String,
    required: true
  },
  message: String,
  read: {
    type: Boolean,
    default: false
  },
  actionUrl: String,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  },
  readAt: Date
})

notificationSchema.index({ userId: 1, read: 1, createdAt: -1 })

export default mongoose.model('Notification', notificationSchema)
