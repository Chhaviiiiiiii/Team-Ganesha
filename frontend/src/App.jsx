import React, { useState } from 'react'
import { motion } from 'framer-motion'
import DashboardController from './components/DashboardController'
import LeftPeekPanel from './components/LeftPeekPanel'
import RightPeekPanel from './components/RightPeekPanel'
import MacOSDock from './components/MacOSDock'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')

  return (
    <div className="h-screen w-screen bg-zinc-950 overflow-hidden relative">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-zinc-950 to-blue-900/10 pointer-events-none" />
      
      {/* Left Peek Panel */}
      <LeftPeekPanel />
      
      {/* Main Dashboard Controller */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full w-full flex flex-col"
      >
        <DashboardController currentView={currentView} setCurrentView={setCurrentView} />
      </motion.div>
      
      {/* Right Peek Panel */}
      <RightPeekPanel />
      
      {/* macOS-style Dock */}
      <MacOSDock currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  )
}

export default App
