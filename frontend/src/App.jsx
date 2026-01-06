import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CommandSidebar from './components/CommandSidebar'
import CommandHeader from './components/CommandHeader'
import DashboardController from './components/DashboardController'
import ZoneDetailPanel from './components/ZoneDetailPanel'
import LoginPage from './components/LoginPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [currentView, setCurrentView] = useState('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedZone, setSelectedZone] = useState(null)

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated')
    const userRole = localStorage.getItem('userRole')
    const userName = localStorage.getItem('userName')
    const userPhone = localStorage.getItem('userPhone')
    
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      setCurrentUser({
        role: userRole,
        name: userName,
        phone: userPhone
      })
    }
  }, [])

  const handleLogin = (userData) => {
    setIsAuthenticated(true)
    setCurrentUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userName')
    localStorage.removeItem('userPhone')
    setIsAuthenticated(false)
    setCurrentUser(null)
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

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
        <CommandHeader currentUser={currentUser} onLogout={handleLogout} />
        
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
