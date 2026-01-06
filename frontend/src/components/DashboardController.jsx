import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DashboardView from './views/DashboardView'
import AnalyticsView from './views/AnalyticsView'
import AlertsView from './views/AlertsView'
import OperationsView from './views/OperationsView'

const DashboardController = ({ currentView, setCurrentView }) => {
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    // Load dashboard data from API or localStorage
    const loadDashboardData = async () => {
      try {
        // Simulated API call - replace with actual API
        const data = {
          kpis: {
            totalVisitors: 2847532,
            activeZones: 24,
            alertsActive: 3,
            systemHealth: 98.5
          },
          recentActivity: []
        }
        setDashboardData(data)
      } catch (error) {
        console.error('Failed to load dashboard:', error)
      }
    }
    
    loadDashboardData()
  }, [])

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardView data={dashboardData} />
      case 'analytics':
        return <AnalyticsView />
      case 'alerts':
        return <AlertsView />
      case 'operations':
        return <OperationsView />
      default:
        return <DashboardView data={dashboardData} />
    }
  }

  return (
    <div className="flex-1 p-8 overflow-auto pb-32">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Kumbh Sava Control System
        </h1>
        <p className="text-zinc-400 mt-2">Mission-critical dashboard • Real-time monitoring</p>
      </motion.div>

      {/* View Container with smooth transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default DashboardController
