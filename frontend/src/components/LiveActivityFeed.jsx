import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Radio, AlertTriangle, Shield, Clock, Activity } from 'lucide-react'

const LiveActivityFeed = () => {
  const [activities, setActivities] = useState([
    { id: 1, type: 'rfid', icon: Radio, message: 'RFID scan: Entry at Gate 5', time: '2s ago', priority: 'low' },
    { id: 2, type: 'alert', icon: AlertTriangle, message: 'High density detected in Zone Alpha', time: '12s ago', priority: 'high' },
    { id: 3, type: 'action', icon: Shield, message: 'Admin: Blocked entry to Zone Gamma', time: '45s ago', priority: 'medium' },
    { id: 4, type: 'rfid', icon: Radio, message: 'RFID scan: Exit at Gate 12', time: '1m ago', priority: 'low' },
    { id: 5, type: 'alert', icon: AlertTriangle, message: 'Medical alert triggered at Zone Beta', time: '2m ago', priority: 'high' },
    { id: 6, type: 'action', icon: Shield, message: 'Police team dispatched to Zone Epsilon', time: '3m ago', priority: 'medium' },
    { id: 7, type: 'rfid', icon: Radio, message: 'RFID scan: Entry at Gate 3', time: '4m ago', priority: 'low' },
    { id: 8, type: 'system', icon: Activity, message: 'System health check completed', time: '5m ago', priority: 'low' },
  ])

  const getActivityColor = (type, priority) => {
    if (priority === 'high') return 'text-red-400 border-red-500'
    if (priority === 'medium') return 'text-yellow-400 border-yellow-500'
    if (type === 'rfid') return 'text-cyan-400 border-cyan-500'
    if (type === 'action') return 'text-purple-400 border-purple-500'
    return 'text-slate-400 border-slate-600'
  }

  const getActivityBg = (type, priority) => {
    if (priority === 'high') return 'bg-red-500/5'
    if (priority === 'medium') return 'bg-yellow-500/5'
    if (type === 'rfid') return 'bg-cyan-500/5'
    if (type === 'action') return 'bg-purple-500/5'
    return 'bg-slate-800'
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Live Activity Feed</h2>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-green-400"
        />
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        <AnimatePresence>
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`
                  ${getActivityBg(activity.type, activity.priority)}
                  border-l-4 ${getActivityColor(activity.type, activity.priority).split(' ')[1]}
                  rounded p-3 hover:bg-slate-800/50 transition-colors
                `}
              >
                <div className="flex items-start gap-3">
                  <Icon className={`w-4 h-4 mt-0.5 ${getActivityColor(activity.type, activity.priority).split(' ')[0]}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 leading-snug">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span className="text-xs text-slate-500">{activity.time}</span>
                      {activity.priority === 'high' && (
                        <span className="ml-auto text-xs font-semibold text-red-400 uppercase">Urgent</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Auto-refresh indicator */}
      <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-500">
        <Activity className="w-3 h-3" />
        <span>Auto-refreshing every 5 seconds</span>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }
      `}</style>
    </div>
  )
}

export default LiveActivityFeed
