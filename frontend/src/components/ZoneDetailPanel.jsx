import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, TrendingUp, Users, ArrowUpRight, ArrowDownRight, AlertTriangle, Lock, Radio, Phone } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const ZoneDetailPanel = ({ zone, onClose }) => {
  // Mock data for last 15 minutes
  const crowdData = zone ? [
    { time: '14:45', count: 38000 },
    { time: '14:48', count: 39500 },
    { time: '14:51', count: 41000 },
    { time: '14:54', count: 42500 },
    { time: '14:57', count: zone.current },
  ] : []

  const aiPrediction = zone ? {
    next10min: Math.floor(zone.current * 1.08),
    next15min: Math.floor(zone.current * 1.12),
    risk: zone.status === 'critical' ? 'High' : zone.status === 'warning' ? 'Medium' : 'Low'
  } : null

  return (
    <AnimatePresence>
      {zone && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-40"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-[480px] bg-slate-900 border-l border-slate-800 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{zone.name}</h2>
                <p className="text-sm text-slate-400 mt-1">Zone Details & Controls</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Current Status */}
              <div className={`
                p-4 rounded-lg border-2
                ${zone.status === 'safe' ? 'bg-green-500/10 border-green-500' : ''}
                ${zone.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500' : ''}
                ${zone.status === 'critical' ? 'bg-red-500/10 border-red-500' : ''}
              `}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-400">Current Status</span>
                  <span className={`
                    px-3 py-1 rounded-full text-xs font-bold uppercase
                    ${zone.status === 'safe' ? 'bg-green-500 text-white' : ''}
                    ${zone.status === 'warning' ? 'bg-yellow-500 text-black' : ''}
                    ${zone.status === 'critical' ? 'bg-red-500 text-white' : ''}
                  `}>
                    {zone.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl font-bold text-white">{zone.current.toLocaleString()}</div>
                    <div className="text-xs text-slate-400 mt-1">Current Crowd</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-400">{zone.capacity.toLocaleString()}</div>
                    <div className="text-xs text-slate-400 mt-1">Max Capacity</div>
                  </div>
                </div>
              </div>

              {/* Entry/Exit Rate */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-slate-400 uppercase">Entry Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-white">245/min</div>
                  <div className="text-xs text-green-400 mt-1">↑ 12% from avg</div>
                </div>
                <div className="bg-slate-800 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowDownRight className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-slate-400 uppercase">Exit Rate</span>
                  </div>
                  <div className="text-2xl font-bold text-white">180/min</div>
                  <div className="text-xs text-blue-400 mt-1">↓ 5% from avg</div>
                </div>
              </div>

              {/* Last 15 Minutes Chart */}
              <div className="bg-slate-800 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-white mb-4">Last 15 Minutes Trend</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={crowdData}>
                    <XAxis 
                      dataKey="time" 
                      stroke="#64748b" 
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #334155',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#06b6d4" 
                      strokeWidth={3}
                      dot={{ fill: '#06b6d4', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* AI Prediction */}
              {aiPrediction && (
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <h3 className="text-sm font-semibold text-white">AI Predicted Risk</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Next 10 minutes</span>
                      <span className="text-lg font-bold text-white">{aiPrediction.next10min.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Next 15 minutes</span>
                      <span className="text-lg font-bold text-white">{aiPrediction.next15min.toLocaleString()}</span>
                    </div>
                    <div className="pt-3 border-t border-purple-500/30">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Risk Level</span>
                        <span className={`
                          px-3 py-1 rounded-full text-xs font-bold
                          ${aiPrediction.risk === 'High' ? 'bg-red-500 text-white' : ''}
                          ${aiPrediction.risk === 'Medium' ? 'bg-yellow-500 text-black' : ''}
                          ${aiPrediction.risk === 'Low' ? 'bg-green-500 text-white' : ''}
                        `}>
                          {aiPrediction.risk} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
                
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Lock className="w-5 h-5" />
                  Block Zone Entry
                </button>

                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <AlertTriangle className="w-5 h-5" />
                  Send Alert to Ground Staff
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Phone className="w-4 h-4" />
                    Call Police
                  </button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Radio className="w-4 h-4" />
                    Medical Team
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ZoneDetailPanel
