import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

const ZoneCard = ({ zone, onClick }) => {
  const getStatusColor = () => {
    switch(zone.status) {
      case 'safe': return 'green'
      case 'warning': return 'yellow'
      case 'critical': return 'red'
      default: return 'gray'
    }
  }

  const getStatusBg = () => {
    switch(zone.status) {
      case 'safe': return 'bg-green-500/10 border-green-500/20'
      case 'warning': return 'bg-yellow-500/10 border-yellow-500/20'
      case 'critical': return 'bg-red-500/10 border-red-500/20'
      default: return 'bg-gray-500/10 border-gray-500/20'
    }
  }

  const percentage = (zone.current / zone.capacity) * 100
  const TrendIcon = zone.trend === 'up' ? TrendingUp : TrendingDown

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        bg-slate-800 border-2 ${getStatusBg()}
        rounded-lg p-4 cursor-pointer
        hover:border-cyan-500/40 transition-all
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold text-base">{zone.name}</h3>
          <div className="text-xs text-slate-500 mt-0.5">
            {zone.current.toLocaleString()} / {zone.capacity.toLocaleString()}
          </div>
        </div>
        <div className={`
          px-2 py-1 rounded text-xs font-bold uppercase
          ${zone.status === 'safe' ? 'bg-green-500/20 text-green-400' : ''}
          ${zone.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : ''}
          ${zone.status === 'critical' ? 'bg-red-500/20 text-red-400' : ''}
        `}>
          {zone.status}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full ${
              zone.status === 'safe' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : ''
            } ${
              zone.status === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : ''
            } ${
              zone.status === 'critical' ? 'bg-gradient-to-r from-red-500 to-rose-500' : ''
            }`}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-slate-400">{percentage.toFixed(1)}% Capacity</span>
          <div className="flex items-center gap-1">
            <TrendIcon className={`w-3 h-3 ${
              zone.trend === 'up' ? 'text-red-400' : 'text-green-400'
            }`} />
            <span className={`text-xs ${
              zone.trend === 'up' ? 'text-red-400' : 'text-green-400'
            }`}>
              {zone.trend === 'up' ? 'Rising' : 'Falling'}
            </span>
          </div>
        </div>
      </div>

      {/* Alert Badge if Critical */}
      {zone.status === 'critical' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 px-2 py-1.5 rounded"
        >
          <AlertCircle className="w-3 h-3" />
          <span className="font-medium">Immediate attention required</span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ZoneCard
