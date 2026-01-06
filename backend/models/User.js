import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [
      'admin', 
      'operator', 
      'viewer',
      'LIVE_MANAGEMENT',
      'RFID_REGISTRY',
      'ALERTS_EMERGENCY',
      'POLICE_DASHBOARD',
      'MEDICAL_DASHBOARD',
      'OPERATOR_STAFF',
      'PUBLIC_PILGRIM'
    ],
    default: 'viewer'
  },
  avatar: String,
  status: {
    type: String,
    enum: ['online', 'offline', 'away'],
    default: 'offline'
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('User', userSchema)
