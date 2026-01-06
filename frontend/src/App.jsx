import React, { useState } from 'react'
import { motion } from 'framer-motion'
import CommandSidebar from './components/CommandSidebar'
import CommandHeader from './components/CommandHeader'
import DashboardController from './components/DashboardController'
import ZoneDetailPanel from './components/ZoneDetailPanel'

function App() {
  const [currentView, setCurrentView] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedZone, setSelectedZone] = useState(null)

  return (
    <div className="h-screen w-screen bg-slate-950 overflow-hidden flex">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      {/* Left Command Sidebar */}
      <CommandSidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Command Header */}
        <CommandHeader />
        
        {/* Main Dashboard Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 overflow-auto"
        >
          <DashboardController 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            setSelectedZone={setSelectedZone}
          />
        </motion.div>
      </div>
      
      {/* Right Zone Detail Panel */}
      <ZoneDetailPanel 
        zone={selectedZone} 
        onClose={() => setSelectedZone(null)}
      />
    </div>
  )
}

export default App
