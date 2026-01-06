import React from 'react'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Map, 
  AlertTriangle, 
  Radio,
  BarChart3,
  Settings,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const CommandSidebar = ({ currentView, setCurrentView, collapsed, setCollapsed }) => {
  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview', color: 'cyan' },
    { id: 'heatmap', icon: Map, label: 'Live Heatmap', color: 'blue' },
    { id: 'alerts', icon: AlertTriangle, label: 'Alerts Center', color: 'red' },
    { id: 'rfid', icon: Radio, label: 'RFID Registry', color: 'purple' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'green' },
    { id: 'settings', icon: Settings, label: 'System Settings', color: 'gray' },
    { id: 'users', icon: Users, label: 'User & Permissions', color: 'indigo' },
  ]

  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ width: collapsed ? 80 : 240, x: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full bg-slate-900 border-r border-slate-800 flex flex-col relative z-50"
    >
      {/* Logo / Title */}
      <div className="h-16 border-b border-slate-800 flex items-center justify-center px-4">
        {!collapsed ? (
          <div className="text-center">
            <h1 className="text-cyan-400 font-bold text-lg tracking-wider">KUMBH</h1>
            <p className="text-slate-500 text-xs uppercase tracking-widest">Command Center</p>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500 flex items-center justify-center">
            <span className="text-cyan-400 font-bold text-sm">K</span>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              className={`
                w-full flex items-center gap-4 px-4 py-3 mb-1
                ${isActive ? 'bg-cyan-500/10 border-l-4 border-cyan-500' : 'border-l-4 border-transparent hover:bg-slate-800'}
                transition-all group
              `}
            >
              <Icon className={`
                w-5 h-5 transition-colors
                ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}
              `} />
              
              {!collapsed && (
                <span className={`
                  text-sm font-medium transition-colors
                  ${isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-slate-200'}
                `}>
                  {item.label}
                </span>
              )}
              
              {!collapsed && isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="ml-auto w-2 h-2 rounded-full bg-cyan-400"
                />
              )}
            </motion.button>
          )
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-12 border-t border-slate-800 flex items-center justify-center hover:bg-slate-800 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronLeft className="w-5 h-5 text-slate-400" />
        )}
      </button>
    </motion.div>
  )
}

export default CommandSidebar
