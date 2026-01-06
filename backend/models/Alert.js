import mongoose from 'mongoose'

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['critical', 'warning', 'info', 'success'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  location: String,
  zone: String,
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['active', 'acknowledged', 'resolved', 'scheduled'],
    default: 'active'
  },
  acknowledgedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  acknowledgedAt: Date,
  resolvedAt: Date,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

alertSchema.index({ status: 1, priority: -1, createdAt: -1 })

export default mongoose.model('Alert', alertSchema)
