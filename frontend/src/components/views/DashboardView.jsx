import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import WidgetGrid from '../widgets/WidgetGrid'
import StatCard from '../widgets/StatCard'
import { Users, Activity, AlertTriangle, CheckCircle } from 'lucide-react'

const DashboardView = ({ data }) => {
  const [widgetLayout, setWidgetLayout] = useState([])

  useEffect(() => {
    // Load saved layout from localStorage
    const savedLayout = localStorage.getItem('dashboardLayout')
    if (savedLayout) {
      setWidgetLayout(JSON.parse(savedLayout))
    } else {
      // Default layout
      setWidgetLayout([
        { i: 'visitors', x: 0, y: 0, w: 3, h: 2, type: 'kpi' },
        { i: 'zones', x: 3, y: 0, w: 3, h: 2, type: 'kpi' },
        { i: 'alerts', x: 6, y: 0, w: 3, h: 2, type: 'kpi' },
        { i: 'health', x: 9, y: 0, w: 3, h: 2, type: 'kpi' },
        { i: 'chart1', x: 0, y: 2, w: 6, h: 4, type: 'chart' },
        { i: 'chart2', x: 6, y: 2, w: 6, h: 4, type: 'chart' },
        { i: 'activity', x: 0, y: 6, w: 12, h: 3, type: 'list' },
      ])
    }
  }, [])

  const handleLayoutChange = (newLayout) => {
    setWidgetLayout(newLayout)
    localStorage.setItem('dashboardLayout', JSON.stringify(newLayout))
  }

  const kpiCards = [
    {
      id: 'visitors',
      title: 'Total Visitors',
      value: data?.kpis?.totalVisitors?.toLocaleString() || '0',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'zones',
      title: 'Active Zones',
      value: data?.kpis?.activeZones || '0',
      change: '+3',
      trend: 'up',
      icon: Activity,
      color: 'purple'
    },
    {
      id: 'alerts',
      title: 'Active Alerts',
      value: data?.kpis?.alertsActive || '0',
      change: '-2',
      trend: 'down',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 'health',
      title: 'System Health',
      value: `${data?.kpis?.systemHealth || '0'}%`,
      change: '+0.5%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Widget Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <WidgetGrid 
          layout={widgetLayout}
          onLayoutChange={handleLayoutChange}
        />
      </motion.div>
    </div>
  )
}

export default DashboardView
