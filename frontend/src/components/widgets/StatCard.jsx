import React from 'react'
import { motion } from 'framer-motion'

const StatCard = ({ title, value, change, trend, icon: Icon, color }) => {
  const gradients = {
    blue: 'from-blue-400 to-cyan-500',
    purple: 'from-purple-400 to-pink-500',
    red: 'from-red-400 to-orange-500',
    green: 'from-green-400 to-emerald-500'
  }
  
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      className={`bg-gradient-to-br ${gradients[color]} backdrop-blur-xl rounded-2xl shadow-xl p-6 cursor-pointer transform transition-all`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-white/30 backdrop-blur-sm">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm font-bold text-white bg-white/20 px-2 py-1 rounded-lg backdrop-blur-sm">
          {change}
        </span>
      </div>
      
      <h3 className="text-3xl font-bold text-white mb-1 drop-shadow-lg">{value}</h3>
      <p className="text-sm text-white/90 font-medium">{title}</p>
      
      {/* Animated bar */}
      <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '75%' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-white/60 shadow-lg"
        />
      </div>
    </motion.div>
  )
}

export default StatCard
