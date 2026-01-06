import React from 'react'
import { motion } from 'framer-motion'
import GlassChart from '../widgets/GlassChart'
import { TrendingUp, Users, MapPin, Clock } from 'lucide-react'

const AnalyticsView = () => {
  const analyticsCards = [
    {
      title: 'Visitor Trends',
      description: 'Last 7 days visitor flow analysis',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Demographics',
      description: 'Age and gender distribution',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Zone Analytics',
      description: 'Area-wise crowd density',
      icon: MapPin,
      color: 'green'
    },
    {
      title: 'Time Analysis',
      description: 'Peak hours and patterns',
      icon: Clock,
      color: 'orange'
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analyticsCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl bg-${card.color}-500/20`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                <p className="text-sm text-zinc-400">{card.description}</p>
              </div>
            </div>
            <GlassChart type="line" data={[]} />
          </motion.div>
        ))}
      </div>

      {/* Detailed Analytics Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6"
      >
        <h3 className="text-xl font-bold text-white mb-4">Detailed Analytics Dashboard</h3>
        <div className="h-96">
          <GlassChart type="area" data={[]} height={350} />
        </div>
      </motion.div>
    </div>
  )
}

export default AnalyticsView
