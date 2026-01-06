import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  BarChart3, 
  Bell, 
  Settings, 
  Folder,
  Users,
  Zap,
  Activity
} from 'lucide-react'

const MacOSDock = ({ currentView, setCurrentView }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const dockRef = useRef(null)

  const dockItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'blue' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'purple' },
    { id: 'alerts', icon: Bell, label: 'Alerts', color: 'red' },
    { id: 'operations', icon: Activity, label: 'Operations', color: 'green' },
    { id: 'divider', isDivider: true },
    { id: 'files', icon: Folder, label: 'Files', color: 'yellow' },
    { id: 'team', icon: Users, label: 'Team', color: 'pink' },
    { id: 'quick', icon: Zap, label: 'Quick Actions', color: 'orange' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'gray' },
  ]

  const getScale = (index) => {
    if (hoveredIndex === null) return 1
    const distance = Math.abs(index - hoveredIndex)
    if (distance === 0) return 1.6
    if (distance === 1) return 1.3
    if (distance === 2) return 1.1
    return 1
  }

  const handleItemClick = (itemId) => {
    if (itemId && !dockItems.find(i => i.id === itemId)?.isDivider) {
      if (['dashboard', 'analytics', 'alerts', 'operations'].includes(itemId)) {
        setCurrentView(itemId)
      }
    }
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        ref={dockRef}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.5 }}
        className="glass-panel px-4 py-3 flex items-end gap-2"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {dockItems.map((item, index) => {
          if (item.isDivider) {
            return (
              <div
                key={item.id}
                className="w-px h-12 bg-white/20 mx-2"
              />
            )
          }

          const Icon = item.icon
          const scale = getScale(index)
          const isActive = currentView === item.id

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => handleItemClick(item.id)}
              className="relative group cursor-pointer"
              animate={{ 
                scale,
                y: hoveredIndex === index ? -10 : 0
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? -60 : -50
                }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap"
              >
                <div className="glass-panel px-3 py-1.5 text-xs text-white font-medium">
                  {item.label}
                </div>
              </motion.div>

              {/* Icon Container */}
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${isActive ? 'bg-white/20 glow-effect' : 'bg-white/5'}
                ${item.color === 'blue' && 'hover:bg-blue-500/30'}
                ${item.color === 'purple' && 'hover:bg-purple-500/30'}
                ${item.color === 'red' && 'hover:bg-red-500/30'}
                ${item.color === 'green' && 'hover:bg-green-500/30'}
                ${item.color === 'yellow' && 'hover:bg-yellow-500/30'}
                ${item.color === 'pink' && 'hover:bg-pink-500/30'}
                ${item.color === 'orange' && 'hover:bg-orange-500/30'}
                ${item.color === 'gray' && 'hover:bg-gray-500/30'}
                transition-colors
              `}>
                <Icon className={`
                  w-6 h-6
                  ${item.color === 'blue' && 'text-blue-400'}
                  ${item.color === 'purple' && 'text-purple-400'}
                  ${item.color === 'red' && 'text-red-400'}
                  ${item.color === 'green' && 'text-green-400'}
                  ${item.color === 'yellow' && 'text-yellow-400'}
                  ${item.color === 'pink' && 'text-pink-400'}
                  ${item.color === 'orange' && 'text-orange-400'}
                  ${item.color === 'gray' && 'text-gray-400'}
                `} />
              </div>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeDockItem"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default MacOSDock
