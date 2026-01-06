import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Info, CheckCircle, XCircle, Clock } from 'lucide-react'

const AlertsView = () => {
  const [filter, setFilter] = useState('all')

  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'High Crowd Density in Zone A',
      message: 'Crowd density has exceeded safe threshold. Immediate attention required.',
      timestamp: '2 minutes ago',
      location: 'Zone A - Main Ghat',
      status: 'active'
    },
    {
      id: 2,
      type: 'warning',
      title: 'RFID Reader Offline',
      message: 'RFID checkpoint #12 is not responding. Check connection.',
      timestamp: '15 minutes ago',
      location: 'Gate 3',
      status: 'active'
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System backup will begin at 11:00 PM tonight.',
      timestamp: '1 hour ago',
      location: 'System',
      status: 'scheduled'
    },
    {
      id: 4,
      type: 'success',
      title: 'Incident Resolved',
      message: 'Medical emergency at Zone B has been resolved.',
      timestamp: '2 hours ago',
      location: 'Zone B',
      status: 'resolved'
    },
  ]

  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical':
        return { Icon: AlertTriangle, color: 'red' }
      case 'warning':
        return { Icon: XCircle, color: 'yellow' }
      case 'info':
        return { Icon: Info, color: 'blue' }
      case 'success':
        return { Icon: CheckCircle, color: 'green' }
      default:
        return { Icon: Clock, color: 'gray' }
    }
  }

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(a => a.type === filter)

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="glass-panel p-2 flex gap-2 inline-flex">
        {['all', 'critical', 'warning', 'info', 'success'].map((type) => (
          <motion.button
            key={type}
            onClick={() => setFilter(type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg capitalize font-medium transition-colors ${
              filter === type 
                ? 'bg-white/20 text-white' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            {type}
          </motion.button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert, index) => {
          const { Icon, color } = getAlertIcon(alert.type)
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-panel p-6 border-l-4 border-${color}-400`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-${color}-500/20`}>
                  <Icon className={`w-6 h-6 text-${color}-400`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                      <p className="text-sm text-zinc-400">{alert.location}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${color}-500/20 text-${color}-400`}>
                        {alert.status}
                      </span>
                      <p className="text-xs text-zinc-500 mt-1">{alert.timestamp}</p>
                    </div>
                  </div>
                  
                  <p className="text-zinc-300 mb-4">{alert.message}</p>
                  
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                    >
                      View Details
                    </motion.button>
                    {alert.status === 'active' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg bg-${color}-500/20 hover:bg-${color}-500/30 text-${color}-400 text-sm font-medium transition-colors`}
                      >
                        Acknowledge
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default AlertsView
