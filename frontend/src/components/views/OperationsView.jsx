import React from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Download, Upload, Radio } from 'lucide-react'

const OperationsView = () => {
  const operations = [
    {
      id: 1,
      name: 'RFID System',
      status: 'running',
      uptime: '99.8%',
      lastUpdate: '2m ago',
      icon: Radio,
      color: 'green'
    },
    {
      id: 2,
      name: 'Crowd Analytics',
      status: 'running',
      uptime: '100%',
      lastUpdate: '1m ago',
      icon: Radio,
      color: 'blue'
    },
    {
      id: 3,
      name: 'Alert Engine',
      status: 'paused',
      uptime: '95.2%',
      lastUpdate: '30m ago',
      icon: Radio,
      color: 'yellow'
    },
    {
      id: 4,
      name: 'Data Sync',
      status: 'running',
      uptime: '98.5%',
      lastUpdate: '5m ago',
      icon: Radio,
      color: 'purple'
    },
  ]

  const quickActions = [
    { icon: Download, label: 'Export Logs', color: 'blue' },
    { icon: Upload, label: 'Import Data', color: 'green' },
    { icon: RotateCcw, label: 'Restart Services', color: 'orange' },
    { icon: Pause, label: 'Pause All', color: 'red' },
  ]

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`glass-panel-hover p-6 flex flex-col items-center gap-3 bg-gradient-to-br from-${action.color}-500/10 to-transparent`}
          >
            <action.icon className={`w-8 h-8 text-${action.color}-400`} />
            <span className="text-sm font-medium text-white">{action.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Operations Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {operations.map((op, index) => (
          <motion.div
            key={op.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="glass-panel p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-${op.color}-500/20`}>
                  <op.icon className={`w-6 h-6 text-${op.color}-400`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{op.name}</h3>
                  <p className="text-sm text-zinc-400">Last update: {op.lastUpdate}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                op.status === 'running' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {op.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Uptime</span>
                <span className="text-white font-medium">{op.uptime}</span>
              </div>
              
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: op.uptime }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                  className={`h-full bg-gradient-to-r from-${op.color}-500 to-${op.color}-400`}
                />
              </div>

              <div className="flex gap-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {op.status === 'running' ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Resume
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Logs */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="glass-panel p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Recent System Logs</h3>
        <div className="space-y-2 font-mono text-xs">
          {[
            { time: '14:32:45', level: 'INFO', message: 'RFID checkpoint sync completed successfully' },
            { time: '14:31:12', level: 'WARN', message: 'High latency detected in Zone C analytics' },
            { time: '14:29:03', level: 'INFO', message: 'Database backup completed' },
            { time: '14:25:18', level: 'ERROR', message: 'Failed to connect to external API, retrying...' },
          ].map((log, idx) => (
            <div key={idx} className="glass-panel p-3 flex gap-4">
              <span className="text-zinc-500">{log.time}</span>
              <span className={`${
                log.level === 'ERROR' ? 'text-red-400' :
                log.level === 'WARN' ? 'text-yellow-400' :
                'text-green-400'
              } font-bold w-12`}>
                {log.level}
              </span>
              <span className="text-zinc-300 flex-1">{log.message}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default OperationsView
