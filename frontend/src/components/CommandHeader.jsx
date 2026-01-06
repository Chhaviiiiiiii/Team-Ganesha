import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Wifi, Shield, User, Circle } from 'lucide-react'

const CommandHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemHealth, setSystemHealth] = useState('operational') // operational, degraded, critical

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getHealthColor = () => {
    switch(systemHealth) {
      case 'operational': return 'text-green-400'
      case 'degraded': return 'text-yellow-400'
      case 'critical': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getHealthBgColor = () => {
    switch(systemHealth) {
      case 'operational': return 'bg-green-500/20'
      case 'degraded': return 'bg-yellow-500/20'
      case 'critical': return 'bg-red-500/20'
      default: return 'bg-gray-500/20'
    }
  }

  return (
    <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      {/* Left: Live Clock */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-cyan-400" />
          <div>
            <div className="text-white font-mono text-lg font-semibold">
              {currentTime.toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: false 
              })}
            </div>
            <div className="text-slate-500 text-xs">
              {currentTime.toLocaleDateString('en-IN', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800">
          <Wifi className="w-4 h-4 text-green-400" />
          <span className="text-xs text-slate-300">Live</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-400"
          />
        </div>
      </div>

      {/* Center: System Health */}
      <div className="flex items-center gap-3">
        <Shield className={`w-5 h-5 ${getHealthColor()}`} />
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wider">System Status</div>
          <div className={`text-sm font-semibold uppercase ${getHealthColor()}`}>
            {systemHealth}
          </div>
        </div>
        <div className={`px-3 py-1.5 rounded-lg ${getHealthBgColor()}`}>
          <Circle className={`w-3 h-3 ${getHealthColor()} fill-current`} />
        </div>
      </div>

      {/* Right: User Info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="text-sm text-white font-medium">Control Officer</div>
          <div className="text-xs text-slate-500">Admin Authority</div>
        </div>
        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500 flex items-center justify-center">
          <User className="w-5 h-5 text-cyan-400" />
        </div>
      </div>
    </div>
  )
}

export default CommandHeader
