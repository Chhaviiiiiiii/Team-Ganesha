import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { motion } from 'framer-motion'
import GlassChart from './GlassChart'
import 'react-grid-layout/css/styles.css'
import 'react-grid-layout/css/resizable.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

const WidgetGrid = ({ layout, onLayoutChange }) => {
  const widgets = {
    chart1: {
      title: 'Visitor Flow Trend',
      type: 'area',
      color: 'purple'
    },
    chart2: {
      title: 'Zone Distribution',
      type: 'bar',
      color: 'blue'
    },
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
        <div className="h-full glass-panel p-4 overflow-hidden flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-3">{widget.title}</h3>
          <div className="flex-1 overflow-y-auto space-y-2">
            {widget.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-3 flex items-start gap-3"
              >
                <span className="text-xs text-zinc-500 font-mono">{item.time}</span>
                <div className="flex-1">
                  <p className="text-sm text-zinc-300">{item.event}</p>
                </div>
                <span className={`w-2 h-2 rounded-full ${
                  item.status === 'success' ? 'bg-green-400' : 'bg-blue-400'
                }`} />
              </motion.div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="h-full glass-panel p-4">
        <h3 className="text-lg font-semibold text-white mb-3">{widget.title}</h3>
        <div className="h-[calc(100%-2rem)]">
          <GlassChart type={widget.type} color={widget.color} />
        </div>
      </div>
    )
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
