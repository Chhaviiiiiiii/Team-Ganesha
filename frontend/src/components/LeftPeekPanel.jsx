import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Sparkles, Zap, Brain, MessageSquare, Target } from 'lucide-react'

const LeftPeekPanel = () => {
  const [isHovered, setIsHovered] = useState(false)

  const teamMembers = [
    { id: 1, name: 'Rajesh Kumar', role: 'Operations Lead', status: 'online', avatar: '👨‍💼' },
    { id: 2, name: 'Priya Sharma', role: 'Analytics', status: 'online', avatar: '👩‍💻' },
    { id: 3, name: 'Amit Patel', role: 'Security', status: 'away', avatar: '👨‍✈️' },
    { id: 4, name: 'Sneha Reddy', role: 'Communications', status: 'online', avatar: '👩‍💼' },
  ]

  const aiShortcuts = [
    { icon: Brain, label: 'AI Insights', action: 'insights' },
    { icon: Sparkles, label: 'Smart Suggestions', action: 'suggestions' },
    { icon: Zap, label: 'Quick Actions', action: 'actions' },
    { icon: Target, label: 'Predictive Alerts', action: 'predictive' },
  ]

  return (
    <>
      {/* Hover trigger zone */}
      <div
        className="fixed left-0 top-0 h-full w-4 z-40"
        onMouseEnter={() => setIsHovered(true)}
      />

      {/* Panel */}
      <motion.div
        initial={{ x: -320 }}
        animate={{ x: isHovered ? 0 : -320 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed left-0 top-0 h-full w-80 z-50"
      >
        <div className="h-full glass-panel m-4 p-6 overflow-y-auto">
          {/* Team Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Team Status</h3>
            </div>
            
            <div className="space-y-3">
              {teamMembers.map((member) => (
                <motion.div
                  key={member.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="glass-panel-hover p-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{member.avatar}</div>
                    <div className="flex-1">
                      <div className="font-medium text-white text-sm">{member.name}</div>
                      <div className="text-xs text-zinc-400">{member.role}</div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${
                      member.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'
                    }`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Shortcuts */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {aiShortcuts.map((shortcut) => (
                <motion.button
                  key={shortcut.action}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass-panel-hover p-4 flex flex-col items-center gap-2"
                >
                  <shortcut.icon className="w-6 h-6 text-purple-400" />
                  <span className="text-xs text-white text-center">{shortcut.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Quick Chat */}
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Quick Chat</h3>
            </div>
            <div className="glass-panel p-4">
              <input
                type="text"
                placeholder="Message team..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default LeftPeekPanel
