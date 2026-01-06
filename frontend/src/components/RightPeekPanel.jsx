import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Calendar, Zap, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

const RightPeekPanel = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // Simulated auto-refreshing notifications
    const mockNotifications = [
      { id: 1, type: 'alert', icon: AlertTriangle, message: 'High crowd density in Zone A', time: '2m ago', priority: 'high' },
      { id: 2, type: 'success', icon: CheckCircle, message: 'RFID checkpoint sync complete', time: '15m ago', priority: 'low' },
      { id: 3, type: 'info', icon: TrendingUp, message: 'Visitor count +12% from yesterday', time: '1h ago', priority: 'medium' },
      { id: 4, type: 'warning', icon: Clock, message: 'Schedule shift change at 6 PM', time: '2h ago', priority: 'medium' },
    ]
    setNotifications(mockNotifications)
  }, [])

  const todayHighlights = [
    { label: 'Events Today', value: '8', icon: Calendar },
    { label: 'Active Alerts', value: '3', icon: Bell },
    { label: 'Quick Actions', value: '12', icon: Zap },
  ]

  const quickTools = [
    { name: 'Export Data', color: 'purple' },
    { name: 'Generate Report', color: 'blue' },
    { name: 'Send Alert', color: 'red' },
    { name: 'Refresh All', color: 'green' },
  ]

  return (
    <>
      {/* Hover trigger zone */}
      <div
        className="fixed right-0 top-0 h-full w-4 z-40"
        onMouseEnter={() => setIsHovered(true)}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: 320 }}
        animate={{ x: isHovered ? 0 : 320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed right-0 top-0 h-full w-80 z-50"
      >
        <div className="h-full glass-panel m-4 p-6 overflow-y-auto">
          {/* Today's Highlights */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Today's Highlights</h3>
            <div className="space-y-3">
              {todayHighlights.map((item, idx) => (
                <div key={idx} className="glass-panel p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-zinc-300">{item.label}</span>
                  </div>
                  <span className="text-xl font-bold text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-2 h-2 rounded-full bg-green-400"
              />
            </div>
            
            <div className="space-y-3">
              {notifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`glass-panel-hover p-3 cursor-pointer border-l-2 ${
                    notif.priority === 'high' ? 'border-red-400' :
                    notif.priority === 'medium' ? 'border-yellow-400' :
                    'border-green-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <notif.icon className={`w-4 h-4 mt-1 ${
                      notif.priority === 'high' ? 'text-red-400' :
                      notif.priority === 'medium' ? 'text-yellow-400' :
                      'text-green-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-white">{notif.message}</p>
                      <span className="text-xs text-zinc-500">{notif.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Tools */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Tools</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickTools.map((tool, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`glass-panel-hover p-4 text-sm text-white font-medium bg-gradient-to-br from-${tool.color}-500/20 to-transparent`}
                >
                  {tool.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Daily Insight */}
          <div className="mt-6 glass-panel p-4 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-semibold text-white">Daily Insight</span>
            </div>
            <p className="text-xs text-zinc-300">
              Visitor flow is 23% smoother today compared to last week. Great job team!
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default RightPeekPanel
