import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Users, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Shield,
  Ban,
  CheckCircle,
  Bell,
  X,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react';

// Simulated zones data
const ZONES_DATA = [
  // Gates
  { id: 'gate-1', name: 'Gate 1 - Main Entry', type: 'gate', x: 15, y: 20, current: 4500, max: 5000, entry: 150, exit: 80 },
  { id: 'gate-2', name: 'Gate 2 - East Entry', type: 'gate', x: 85, y: 25, current: 3200, max: 4000, entry: 120, exit: 90 },
  { id: 'gate-3', name: 'Gate 3 - West Entry', type: 'gate', x: 15, y: 75, current: 2800, max: 4000, entry: 100, exit: 110 },
  
  // Ghats
  { id: 'ghat-1', name: 'Sangam Ghat', type: 'ghat', x: 50, y: 50, current: 8500, max: 10000, entry: 200, exit: 150 },
  { id: 'ghat-2', name: 'Ram Ghat', type: 'ghat', x: 65, y: 60, current: 6200, max: 7000, entry: 180, exit: 120 },
  { id: 'ghat-3', name: 'Hanuman Ghat', type: 'ghat', x: 35, y: 40, current: 4800, max: 6000, entry: 140, exit: 100 },
  
  // Sectors
  { id: 'sector-1', name: 'Sector A - North', type: 'sector', x: 50, y: 20, current: 3500, max: 5000, entry: 80, exit: 60 },
  { id: 'sector-2', name: 'Sector B - Central', type: 'sector', x: 50, y: 35, current: 5200, max: 6000, entry: 110, exit: 85 },
  { id: 'sector-3', name: 'Sector C - South', type: 'sector', x: 50, y: 70, current: 4100, max: 5500, entry: 95, exit: 70 },
  { id: 'sector-4', name: 'Sector D - East', type: 'sector', x: 70, y: 45, current: 2900, max: 4500, entry: 70, exit: 55 },
  { id: 'sector-5', name: 'Sector E - West', type: 'sector', x: 30, y: 55, current: 3800, max: 5000, entry: 90, exit: 75 },
];

const getRiskLevel = (current, max) => {
  const percentage = (current / max) * 100;
  if (percentage >= 90) return { level: 'critical', color: '#ef4444', label: 'Critical' };
  if (percentage >= 75) return { level: 'warning', color: '#f59e0b', label: 'Warning' };
  return { level: 'safe', color: '#10b981', label: 'Safe' };
};

const getZoneSize = (type) => {
  switch(type) {
    case 'gate': return 40;
    case 'ghat': return 60;
    case 'sector': return 50;
    default: return 45;
  }
};

export default function HeatmapView() {
  const [zones, setZones] = useState(ZONES_DATA);
  const [selectedZone, setSelectedZone] = useState(null);
  const [hoveredZone, setHoveredZone] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prev => prev.map(zone => ({
        ...zone,
        current: Math.max(0, zone.current + Math.floor(Math.random() * 200 - 100)),
        entry: Math.max(0, zone.entry + Math.floor(Math.random() * 20 - 10)),
        exit: Math.max(0, zone.exit + Math.floor(Math.random() * 20 - 10))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate historical data for selected zone
  useEffect(() => {
    if (selectedZone) {
      const data = [];
      const now = Date.now();
      for (let i = 30; i >= 0; i--) {
        data.push({
          time: new Date(now - i * 60000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          count: Math.floor(selectedZone.current * (0.7 + Math.random() * 0.3))
        });
      }
      setHistoricalData(data);
    }
  }, [selectedZone]);

  const handleBlockEntry = (zoneId) => {
    alert(`Entry BLOCKED for ${zones.find(z => z.id === zoneId)?.name}`);
    // API call would go here
  };

  const handleAllowEntry = (zoneId) => {
    alert(`Entry ALLOWED for ${zones.find(z => z.id === zoneId)?.name}`);
    // API call would go here
  };

  const handleSendAlert = (zoneId) => {
    alert(`Alert SENT for ${zones.find(z => z.id === zoneId)?.name}`);
    // API call would go here
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/50 backdrop-blur-xl border-b border-cyan-500/20 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <MapPin className="w-8 h-8 text-cyan-400" />
              Live Crowd Heatmap
            </h1>
            <p className="text-gray-400 mt-1">Real-time crowd monitoring across all zones</p>
          </div>
          
          {/* Legend */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-300">Safe (&lt;75%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-300">Warning (75-90%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-300">Critical (&gt;90%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map Area */}
      <div className="absolute inset-0 pt-24 pb-4 px-4">
        <div className="relative w-full h-full bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-cyan-500/20 overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          {/* Zones */}
          {zones.map((zone) => {
            const risk = getRiskLevel(zone.current, zone.max);
            const size = getZoneSize(zone.type);
            const percentage = (zone.current / zone.max) * 100;

            return (
              <motion.div
                key={zone.id}
                className="absolute cursor-pointer"
                style={{
                  left: `${zone.x}%`,
                  top: `${zone.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                whileHover={{ scale: 1.1 }}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
                onClick={() => setSelectedZone(zone)}
              >
                {/* Zone Circle */}
                <motion.div
                  className="relative rounded-full flex items-center justify-center shadow-2xl"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: `${risk.color}40`,
                    border: `3px solid ${risk.color}`,
                    boxShadow: `0 0 30px ${risk.color}80`
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${risk.color}60`,
                      `0 0 40px ${risk.color}90`,
                      `0 0 20px ${risk.color}60`
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="w-5 h-5 text-white" />
                  
                  {/* Percentage Badge */}
                  <div 
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center text-white"
                    style={{ backgroundColor: risk.color }}
                  >
                    {Math.round(percentage)}
                  </div>
                </motion.div>

                {/* Zone Label */}
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white border border-white/20">
                    {zone.name}
                  </div>
                </div>

                {/* Pulse Animation for Critical Zones */}
                {risk.level === 'critical' && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ border: `2px solid ${risk.color}` }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>
            );
          })}

          {/* Hover Tooltip */}
          <AnimatePresence>
            {hoveredZone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute z-30 pointer-events-none"
                style={{
                  left: `${hoveredZone.x}%`,
                  top: `${hoveredZone.y - 15}%`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div className="bg-black/95 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-4 shadow-2xl min-w-[250px]">
                  <h3 className="text-white font-semibold mb-2">{hoveredZone.name}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Current:</span>
                      <span className="text-white font-semibold">{hoveredZone.current.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Capacity:</span>
                      <span className="text-white font-semibold">{hoveredZone.max.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Risk Level:</span>
                      <span 
                        className="font-semibold"
                        style={{ color: getRiskLevel(hoveredZone.current, hoveredZone.max).color }}
                      >
                        {getRiskLevel(hoveredZone.current, hoveredZone.max).label}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> Entry:
                      </span>
                      <span className="text-green-400 font-semibold">{hoveredZone.entry}/min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 flex items-center gap-1">
                        <ArrowDownRight className="w-3 h-3" /> Exit:
                      </span>
                      <span className="text-red-400 font-semibold">{hoveredZone.exit}/min</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Side Panel */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-0 right-0 bottom-0 w-[450px] bg-black/95 backdrop-blur-xl border-l border-cyan-500/30 z-50 overflow-y-auto"
          >
            {/* Panel Header */}
            <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-blue-600 p-4 border-b border-cyan-500/30">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedZone.name}</h2>
                  <p className="text-cyan-100 text-sm mt-1 capitalize">{selectedZone.type} Zone</p>
                </div>
                <button
                  onClick={() => setSelectedZone(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Current Status */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Current Status
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Crowd Count</div>
                    <div className="text-2xl font-bold text-white">{selectedZone.current.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Capacity</div>
                    <div className="text-2xl font-bold text-white">{selectedZone.max.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Utilization</div>
                    <div className="text-2xl font-bold text-cyan-400">
                      {Math.round((selectedZone.current / selectedZone.max) * 100)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs mb-1">Risk Level</div>
                    <div 
                      className="text-lg font-bold"
                      style={{ color: getRiskLevel(selectedZone.current, selectedZone.max).color }}
                    >
                      {getRiskLevel(selectedZone.current, selectedZone.max).label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Flow Rates */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  Flow Rates
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-2">
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                      Entry Rate
                    </span>
                    <span className="text-green-400 font-bold">{selectedZone.entry} people/min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 flex items-center gap-2">
                      <ArrowDownRight className="w-4 h-4 text-red-400" />
                      Exit Rate
                    </span>
                    <span className="text-red-400 font-bold">{selectedZone.exit} people/min</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <span className="text-gray-400">Net Flow</span>
                    <span className={`font-bold ${selectedZone.entry - selectedZone.exit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedZone.entry - selectedZone.exit > 0 ? '+' : ''}{selectedZone.entry - selectedZone.exit} people/min
                    </span>
                  </div>
                </div>
              </div>

              {/* 30-Min Trend Graph */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-4">Last 30 Minutes Trend</h3>
                <div className="h-32 relative">
                  <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.1" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map(y => (
                      <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    ))}
                    
                    {/* Trend line */}
                    <polyline
                      points={historicalData.map((d, i) => 
                        `${(i / (historicalData.length - 1)) * 300},${100 - (d.count / selectedZone.max) * 100}`
                      ).join(' ')}
                      fill="url(#gradient)"
                      stroke="#06b6d4"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>-30 min</span>
                  <span>Now</span>
                </div>
              </div>

              {/* AI Prediction */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-400" />
                  AI Risk Prediction (Next 15 min)
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Predicted Crowd:</span>
                    <span className="text-white font-semibold">
                      {Math.round(selectedZone.current * 1.15).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Risk Level:</span>
                    <span className="text-yellow-400 font-semibold">Increasing ⚠️</span>
                  </div>
                  <div className="mt-3 p-3 bg-black/30 rounded-lg">
                    <p className="text-xs text-gray-300">
                      ⚡ High inflow detected. Consider restricting entry if trend continues.
                    </p>
                  </div>
                </div>
              </div>

              {/* Super Admin Actions */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  Super Admin Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleBlockEntry(selectedZone.id)}
                    className="w-full px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Ban className="w-5 h-5" />
                    Block Entry
                  </button>
                  
                  <button
                    onClick={() => handleAllowEntry(selectedZone.id)}
                    className="w-full px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Allow Entry
                  </button>
                  
                  <button
                    onClick={() => handleSendAlert(selectedZone.id)}
                    className="w-full px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Bell className="w-5 h-5" />
                    Send Alert
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Bar (Bottom) */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex gap-4">
        <div className="flex-1 bg-black/70 backdrop-blur-xl border border-green-500/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Safe Zones</div>
          <div className="text-2xl font-bold text-green-400">
            {zones.filter(z => getRiskLevel(z.current, z.max).level === 'safe').length}
          </div>
        </div>
        <div className="flex-1 bg-black/70 backdrop-blur-xl border border-yellow-500/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Warning Zones</div>
          <div className="text-2xl font-bold text-yellow-400">
            {zones.filter(z => getRiskLevel(z.current, z.max).level === 'warning').length}
          </div>
        </div>
        <div className="flex-1 bg-black/70 backdrop-blur-xl border border-red-500/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Critical Zones</div>
          <div className="text-2xl font-bold text-red-400">
            {zones.filter(z => getRiskLevel(z.current, z.max).level === 'critical').length}
          </div>
        </div>
        <div className="flex-1 bg-black/70 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-3">
          <div className="text-xs text-gray-400 mb-1">Total Crowd</div>
          <div className="text-2xl font-bold text-cyan-400">
            {zones.reduce((acc, z) => acc + z.current, 0).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
