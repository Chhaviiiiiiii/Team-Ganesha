import mongoose from 'mongoose'

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    index: true
  },
  hour: Number,
  zone: String,
  metrics: {
    visitorCount: { type: Number, default: 0 },
    crowdDensity: { type: Number, default: 0 },
    averageStayTime: { type: Number, default: 0 },
    peakHour: String,
    demographics: {
      male: { type: Number, default: 0 },
      female: { type: Number, default: 0 },
      children: { type: Number, default: 0 },
      elderly: { type: Number, default: 0 }
    }
  },
  trends: {
    hourlyFlow: [Number],
    peakTimes: [String],
    bottlenecks: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

analyticsSchema.index({ date: -1, zone: 1 })

export default mongoose.model('Analytics', analyticsSchema)
