import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { motion } from 'framer-motion'
import GlassChart from './GlassChart'
import '/node_modules/react-grid-layout/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

const WidgetGrid = ({ layout, onLayoutChange }) => {
  const widgets = {
    activity: {
      title: 'Recent Activity',
      type: 'list',
      items: [
        { time: '14:32', event: 'Zone A checkpoint: 234 visitors passed', status: 'success' },
        { time: '14:28', event: 'Alert cleared: High density in Zone B', status: 'info' },
        { time: '14:15', event: 'New RFID registration: 45 tags', status: 'success' },
        { time: '14:02', event: 'System backup completed', status: 'info' },
      ]
    }
  }

  const renderWidget = (key) => {
    const widget = widgets[key]
    if (!widget) return null

    if (widget.type === 'list') {
      return (
        <div className="h-full p-4 overflow-hidden flex flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 backdrop-blur-xl border-2 border-purple-200 shadow-2xl rounded-2xl">
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-3">{widget.title}</h3>
          <div className="flex-1 overflow-y-auto space-y-2">
            {widget.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/80 backdrop-blur-xl border-l-4 border-gray-100 hover:border-l-purple-400 rounded-xl p-3 flex items-start gap-3 shadow-md hover:shadow-xl transition-all"
                style={{
                  background: item.status === 'success' 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(255, 255, 255, 0.9) 100%)'
                    : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0.9) 100%)'
                }}
              >
                <span className="text-xs text-purple-600 font-bold bg-purple-100 px-2 py-1 rounded-lg">{item.time}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 font-medium">{item.event}</p>
                </div>
                <span className={`w-3 h-3 rounded-full shadow-lg ${
                  item.status === 'success' ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-blue-400 to-cyan-500'
                }`} />
              </motion.div>
            ))}
          </div>
        </div>
      )
    }

    // Charts removed - return null for non-list widgets
    return null
  }

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={{ lg: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={60}
      onLayoutChange={(layout) => onLayoutChange(layout)}
      isDraggable={true}
      isResizable={true}
      compactType="vertical"
      preventCollision={false}
    >
      {layout.map((item) => (
        <div key={item.i} className="widget-item">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderWidget(item.i)}
          </motion.div>
        </div>
      ))}
    </ResponsiveGridLayout>
  )
}

export default WidgetGrid
