import mongoose from 'mongoose'

const rfidEventSchema = new mongoose.Schema({
  tagId: {
    type: String,
    required: true,
    index: true
  },
  checkpointId: {
    type: String,
    required: true
  },
  checkpointName: String,
  zone: String,
  eventType: {
    type: String,
    enum: ['entry', 'exit', 'scan'],
    default: 'scan'
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  visitorInfo: {
    name: String,
    age: Number,
    gender: String,
    group: String
  },
  metadata: mongoose.Schema.Types.Mixed
})

rfidEventSchema.index({ timestamp: -1, zone: 1 })

export default mongoose.model('RFIDEvent', rfidEventSchema)
