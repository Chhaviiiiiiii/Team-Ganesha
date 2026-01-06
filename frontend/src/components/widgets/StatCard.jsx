import React from 'react'
import { motion } from 'framer-motion'

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass-panel p-6 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-${color}-500/20`}>
          <Icon className={`w-6 h-6 text-${color}-400`} />
        </div>
        <span className={`text-sm font-medium ${
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {change}
        </span>
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
      <p className="text-sm text-zinc-400">{title}</p>
      
      {/* Animated bar */}
      <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '75%' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-400`}
        />
      </div>
    </motion.div>
  )
}

export default StatCard
