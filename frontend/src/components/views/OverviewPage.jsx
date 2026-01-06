import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, MapPin, AlertTriangle, Activity, TrendingUp, TrendingDown } from 'lucide-react'
import ZoneCard from '../widgets/ZoneCard'
import LiveActivityFeed from '../LiveActivityFeed'

const OverviewPage = ({ setSelectedZone }) => {
  const [kpiData, setKpiData] = useState({
    totalCrowd: 2847532,
    activeZones: 24,
    warningZones: 3,
    emergencies: 0
  })

  const [zones, setZones] = useState([
    { id: 1, name: 'Zone Alpha', capacity: 50000, current: 42500, status: 'warning', trend: 'up' },
    { id: 2, name: 'Zone Beta', capacity: 75000, current: 54000, status: 'safe', trend: 'down' },
    { id: 3, name: 'Zone Gamma', capacity: 60000, current: 58500, status: 'critical', trend: 'up' },
    { id: 4, name: 'Zone Delta', capacity: 45000, current: 28000, status: 'safe', trend: 'up' },
    { id: 5, name: 'Zone Epsilon', capacity: 80000, current: 61000, status: 'warning', trend: 'up' },
    { id: 6, name: 'Zone Zeta', capacity: 55000, current: 23000, status: 'safe', trend: 'down' },
    { id: 7, name: 'Zone Eta', capacity: 70000, current: 52000, status: 'safe', trend: 'up' },
    { id: 8, name: 'Zone Theta', capacity: 50000, current: 41000, status: 'warning', trend: 'up' },
  ])

  const kpiCards = [
    {
      id: 'crowd',
      title: 'Live Crowd Count',
      value: kpiData.totalCrowd.toLocaleString(),
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'zones',
      title: 'Active Zones',
      value: kpiData.activeZones,
      change: '+2',
      trend: 'up',
      icon: MapPin,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'warnings',
      title: 'Warning/Critical Zones',
      value: kpiData.warningZones,
      change: '+1',
      trend: 'up',
      icon: AlertTriangle,
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'emergencies',
      title: 'Active Emergencies',
      value: kpiData.emergencies,
      change: '0',
      trend: 'neutral',
      icon: Activity,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600'
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Global KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => {
          const Icon = card.icon
          const TrendIcon = card.trend === 'up' ? TrendingUp : TrendingDown
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${card.gradient} p-1 rounded-xl`}
            >
              <div className="bg-slate-900 rounded-lg p-5 h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-lg bg-${card.color}-500/10`}>
                    <Icon className={`w-6 h-6 text-${card.color}-400`} />
                  </div>
                  {card.trend !== 'neutral' && (
                    <div className={`flex items-center gap-1 text-xs font-semibold ${
                      card.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      <TrendIcon className="w-4 h-4" />
                      {card.change}
                    </div>
                  )}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                <div className="text-sm text-slate-400">{card.title}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Zone Status Grid - Left 2/3 */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Zone Status Overview</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-slate-400">Safe</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-slate-400">Warning</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-slate-400">Critical</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {zones.map((zone) => (
                <ZoneCard 
                  key={zone.id} 
                  zone={zone} 
                  onClick={() => setSelectedZone(zone)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Live Activity Feed - Right 1/3 */}
        <div className="lg:col-span-1">
          <LiveActivityFeed />
        </div>
      </div>
    </div>
  )
}

export default OverviewPage
