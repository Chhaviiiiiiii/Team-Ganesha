import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Info, CheckCircle, XCircle, Clock, X, MapPin, Users, Calendar } from 'lucide-react'

const AlertsView = () => {
  const [filter, setFilter] = useState('all')
  const [selectedAlert, setSelectedAlert] = useState(null)
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'High Crowd Density in Zone A',
      message: 'Crowd density has exceeded safe threshold. Immediate attention required.',
      timestamp: '2 minutes ago',
      location: 'Zone A - Main Ghat',
      status: 'active',
      details: {
        currentCrowd: 8500,
        maxCapacity: 10000,
        riskLevel: 'High',
        entryRate: 200,
        exitRate: 150,
        recommendation: 'Consider restricting entry to prevent overcrowding'
      }
    },
    {
      id: 2,
      type: 'warning',
      title: 'RFID Reader Offline',
      message: 'RFID checkpoint #12 is not responding. Check connection.',
      timestamp: '15 minutes ago',
      location: 'Gate 3',
      status: 'active',
      details: {
        deviceId: 'RFID-012',
        lastActive: '15 minutes ago',
        affectedArea: 'Gate 3 - East Entry',
        technician: 'Assigned to Tech Team',
        recommendation: 'Immediate hardware check required'
      }
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'System backup will begin at 11:00 PM tonight.',
      timestamp: '1 hour ago',
      location: 'System',
      status: 'scheduled',
      details: {
        scheduledTime: '11:00 PM',
        duration: '2 hours',
        affectedSystems: 'Database, Analytics',
        downtime: 'No expected downtime',
        recommendation: 'No action required'
      }
    },
    {
      id: 4,
      type: 'success',
      title: 'Incident Resolved',
      message: 'Medical emergency at Zone B has been resolved.',
      timestamp: '2 hours ago',
      location: 'Zone B',
      status: 'resolved',
      details: {
        incidentType: 'Medical Emergency',
        responseTime: '3 minutes',
        resolvedBy: 'Medical Team Alpha',
        patientStatus: 'Stable',
        recommendation: 'Incident closed'
      }
    },
  ])

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

  const handleAcknowledge = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'acknowledged' }
        : alert
    ))
    alert(`Alert #${alertId} has been acknowledged!`)
  }

  const handleViewDetails = (alert) => {
    setSelectedAlert(alert)
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
                      onClick={() => handleViewDetails(alert)}
                      className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                    >
                      View Details
                    </motion.button>
                    {alert.status === 'active' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAcknowledge(alert.id)}
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

      {/* Details Modal */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAlert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 max-w-2xl w-full shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  {(() => {
                    const { Icon, color } = getAlertIcon(selectedAlert.type)
                    return (
                      <div className={`p-3 rounded-xl bg-${color}-500/20`}>
                        <Icon className={`w-6 h-6 text-${color}-400`} />
                      </div>
                    )
                  })()}
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedAlert.title}</h2>
                    <p className="text-gray-400 mt-1">{selectedAlert.message}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Alert Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <MapPin className="w-4 h-4" />
                    Location
                  </div>
                  <div className="text-white font-semibold">{selectedAlert.location}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    Timestamp
                  </div>
                  <div className="text-white font-semibold">{selectedAlert.timestamp}</div>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-cyan-400" />
                  Detailed Information
                </h3>
                <div className="space-y-3">
                  {Object.entries(selectedAlert.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedAlert.status === 'active' && (
                  <button
                    onClick={() => {
                      handleAcknowledge(selectedAlert.id)
                      setSelectedAlert(null)
                    }}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all"
                  >
                    Acknowledge Alert
                  </button>
                )}
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="flex-1 px-4 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AlertsView
