import axios from 'axios'
import bcrypt from 'bcryptjs'
import User from './models/User.js'
import RFIDEvent from './models/RFIDEvent.js'
import Alert from './models/Alert.js'
import Notification from './models/Notification.js'

// Connect to MongoDB first - this assumes your server.js handles the connection
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...')

    // Clear existing data
    await User.deleteMany({})
    await RFIDEvent.deleteMany({})
    await Alert.deleteMany({})
    await Notification.deleteMany({})
    console.log('✅ Cleared existing data')

    // Hash default password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('team@123', salt)

    // Create users with mobile numbers
    const users = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@kumbh-sava.com',
        mobileNumber: '9876543210',
        password: hashedPassword,
        role: 'admin',
        status: 'online'
      },
      {
        name: 'Operator User',
        email: 'operator@kumbh-sava.com',
        mobileNumber: '9876543211',
        password: hashedPassword,
        role: 'operator',
        status: 'online'
      },
      {
        name: 'Viewer User',
        email: 'viewer@kumbh-sava.com',
        mobileNumber: '9876543212',
        password: hashedPassword,
        role: 'viewer',
        status: 'offline'
      }
    ])
    console.log('✅ Created 3 users with password: team@123')
    console.log('   - Admin: admin@kumbh-sava.com / 9876543210')
    console.log('   - Operator: operator@kumbh-sava.com / 9876543211')
    console.log('   - Viewer: viewer@kumbh-sava.com / 9876543212')

    // Create RFID events
    const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D']
    const checkpoints = [
      'Checkpoint 1', 'Checkpoint 2', 'Checkpoint 3',
      'Checkpoint 4', 'Checkpoint 5'
    ]

    const events = []
    for (let i = 0; i < 100; i++) {
      events.push({
        tagId: `TAG-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        checkpointId: `CP-${Math.floor(Math.random() * 5) + 1}`,
        checkpointName: checkpoints[Math.floor(Math.random() * checkpoints.length)],
        zone: zones[Math.floor(Math.random() * zones.length)],
        eventType: 'scan',
        timestamp: new Date(Date.now() - Math.random() * 86400000),
        visitorInfo: {
          name: `Visitor ${i + 1}`,
          age: Math.floor(Math.random() * 80) + 10,
          gender: Math.random() > 0.5 ? 'M' : 'F'
        }
      })
    }
    await RFIDEvent.insertMany(events)
    console.log('✅ Created 100 RFID events')

    // Create alerts
    await Alert.insertMany([
      {
        type: 'crowd_density',
        title: 'High Crowd Density',
        message: 'Zone C is experiencing high crowd density',
        location: 'Zone C',
        zone: 'Zone C',
        priority: 'high',
        status: 'active'
      },
      {
        type: 'capacity_warning',
        title: 'Capacity Warning',
        message: 'Checkpoint 2 is at 85% capacity',
        location: 'Checkpoint 2',
        zone: 'Zone B',
        priority: 'medium',
        status: 'active'
      },
      {
        type: 'lost_person',
        title: 'Lost Person Report',
        message: 'A person has been reported missing',
        location: 'Zone A',
        zone: 'Zone A',
        priority: 'high',
        status: 'acknowledged'
      },
      {
        type: 'system_status',
        title: 'System Status Update',
        message: 'All systems operational',
        location: 'Control Center',
        zone: 'Zone D',
        priority: 'low',
        status: 'resolved'
      }
    ])
    console.log('✅ Created 4 alerts')

    // Create notifications
    await Notification.insertMany([
      {
        userId: users[0]._id,
        type: 'alert',
        title: 'New Alert',
        message: 'High crowd density in Zone C',
        read: false
      },
      {
        userId: users[1]._id,
        type: 'info',
        title: 'System Update',
        message: 'Database seeding completed successfully',
        read: false
      },
      {
        userId: users[2]._id,
        type: 'reminder',
        title: 'Daily Briefing',
        message: 'Your daily briefing is ready',
        read: true
      }
    ])
    console.log('✅ Created 3 notifications')

    console.log('\n🎉 Database seeding completed successfully!')
    console.log('\n📝 Default Credentials:')
    console.log('   Password: team@123 (for all users)')
    console.log('   Mobile numbers: 9876543210, 9876543211, 9876543212')
    console.log('\n✨ You can now login and start using the application!')

    return true
  } catch (error) {
    console.error('❌ Error seeding database:', error.message)
    return false
  }
}

export default seedDatabase
