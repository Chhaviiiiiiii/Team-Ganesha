import React from 'react'
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

const GlassChart = ({ type = 'line', color = 'purple', height = 200 }) => {
  // Sample data - replace with real data from props
  const generateData = () => {
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      value: Math.floor(Math.random() * 1000) + 500,
      secondary: Math.floor(Math.random() * 800) + 300
    }))
  }

  const data = generateData()

  const colorMap = {
    purple: { 
      main: '#a855f7', 
      gradient: ['#a855f7', '#ec4899'],
      glow: 'rgba(168, 85, 247, 0.4)'
    },
    blue: { 
      main: '#3b82f6', 
      gradient: ['#3b82f6', '#06b6d4'],
      glow: 'rgba(59, 130, 246, 0.4)'
    },
    green: { 
      main: '#10b981', 
      gradient: ['#10b981', '#34d399'],
      glow: 'rgba(16, 185, 129, 0.4)'
    },
    orange: { 
      main: '#f97316', 
      gradient: ['#f97316', '#fb923c'],
      glow: 'rgba(249, 115, 22, 0.4)'
    }
  }

  const colors = colorMap[color] || colorMap.purple

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel px-4 py-2 border border-white/20">
          <p className="text-sm text-white font-medium">{payload[0].payload.time}</p>
          <p className="text-xs text-zinc-300">
            Value: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 5, left: -20, bottom: 5 }
    }

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.gradient[0]} stopOpacity={0.8} />
                <stop offset="100%" stopColor={colors.gradient[1]} stopOpacity={0.1} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.3)" 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
              tickLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.3)" 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors.main}
              strokeWidth={2}
              fill={`url(#gradient-${color})`}
              filter="url(#glow)"
            />
          </AreaChart>
        )

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <defs>
              <linearGradient id={`bar-gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors.gradient[0]} stopOpacity={0.9} />
                <stop offset="100%" stopColor={colors.gradient[1]} stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.3)" 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
              tickLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.3)" 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill={`url(#bar-gradient-${color})`} 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        )

      case 'line':
      default:
        return (
          <LineChart {...commonProps}>
            <defs>
              <filter id="line-glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(255,255,255,0.3)" 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
              tickLine={false}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.3)" 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={colors.main}
              strokeWidth={3}
              dot={false}
              filter="url(#line-glow)"
            />
          </LineChart>
        )
    }
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      {renderChart()}
    </ResponsiveContainer>
  )
}

export default GlassChart
