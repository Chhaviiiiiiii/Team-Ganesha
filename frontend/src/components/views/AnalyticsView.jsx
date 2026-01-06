import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Activity,
  MapPin,
  Calendar,
  Clock,
  Download,
  Filter,
  BarChart3,
  LineChart,
  PieChart,
  AlertTriangle,
  ChevronDown,
  FileText,
  FileSpreadsheet
} from 'lucide-react';

// Generate sample data for charts
const generateCrowdData = () => {
  const data = [];
  for (let i = 0; i < 24; i++) {
    data.push({
      time: `${String(i).padStart(2, '0')}:00`,
      crowd: Math.floor(Math.random() * 800) + 400,
      expected: Math.floor(Math.random() * 700) + 500,
    });
  }
  return data;
};

const generateZoneData = () => {
  return [
    { zone: 'Gate 1', current: 460, capacity: 500, percentage: 92 },
    { zone: 'Gate 2', current: 320, capacity: 400, percentage: 80 },
    { zone: 'Gate 3', current: 241, capacity: 350, percentage: 69 },
    { zone: 'Sangam Ghat', current: 672, capacity: 800, percentage: 84 },
    { zone: 'Ram Ghat', current: 534, capacity: 600, percentage: 89 },
    { zone: 'Hanuman Ghat', current: 400, capacity: 500, percentage: 80 },
    { zone: 'Sector A', current: 690, capacity: 1000, percentage: 69 },
    { zone: 'Sector B', current: 1008, capacity: 1200, percentage: 84 },
    { zone: 'Sector C', current: 684, capacity: 900, percentage: 76 },
    { zone: 'Sector D', current: 520, capacity: 800, percentage: 65 },
    { zone: 'Sector E', current: 546, capacity: 700, percentage: 78 },
  ];
};

export default function AnalyticsView() {
  const [crowdData, setCrowdData] = useState(generateCrowdData());
  const [zoneData, setZoneData] = useState(generateZoneData());
  const [dateFilter, setDateFilter] = useState('today');
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedZone, setSelectedZone] = useState('all');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Calculate key insights
  const peakHour = crowdData.reduce((max, item) => item.crowd > max.crowd ? item : max, crowdData[0]);
  const avgDensity = Math.floor(zoneData.reduce((sum, zone) => sum + zone.percentage, 0) / zoneData.length);
  const totalVisitors = zoneData.reduce((sum, zone) => sum + zone.current, 0);
  const highRiskZones = zoneData.filter(zone => zone.percentage > 85).length;

  const handleExport = (format) => {
    if (format === 'csv') {
      alert('Exporting analytics data as CSV...');
    } else if (format === 'pdf') {
      alert('Generating PDF report...');
    }
    setShowExportMenu(false);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <BarChart3 className="w-10 h-10 text-cyan-400" />
              Analytics Dashboard
            </h1>
            <p className="text-gray-400">Live and historical crowd behavior insights</p>
          </div>
          
          {/* Export Button */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg flex items-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              <Download className="w-4 h-4" />
              Export Report
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-white/20 rounded-lg shadow-2xl z-50">
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full px-4 py-2 text-left hover:bg-white/10 transition-colors text-white flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Export as CSV
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full px-4 py-2 text-left hover:bg-white/10 transition-colors text-white flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Export as PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="1h">Last 1 Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Zones</option>
              <option value="gates">Gates Only</option>
              <option value="ghats">Ghats Only</option>
              <option value="sectors">Sectors Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-cyan-400" />
            <span className="text-xs text-gray-400">Total Visitors</span>
          </div>
          <div className="text-3xl font-bold text-white">{totalVisitors.toLocaleString()}</div>
          <div className="text-xs text-green-400 mt-1">↑ 12% from yesterday</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-green-500/30 rounded-lg p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <span className="text-xs text-gray-400">Peak Hour</span>
          </div>
          <div className="text-3xl font-bold text-white">{peakHour.time}</div>
          <div className="text-xs text-gray-400 mt-1">{peakHour.crowd} visitors</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-orange-500/30 rounded-lg p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-6 h-6 text-orange-400" />
            <span className="text-xs text-gray-400">Avg. Density</span>
          </div>
          <div className="text-3xl font-bold text-white">{avgDensity}%</div>
          <div className="text-xs text-orange-400 mt-1">Moderate congestion</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-red-500/30 rounded-lg p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <span className="text-xs text-gray-400">High-Risk Zones</span>
          </div>
          <div className="text-3xl font-bold text-white">{highRiskZones}</div>
          <div className="text-xs text-red-400 mt-1">Requires attention</div>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Visitor Trends */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Visitor Trends
          </h2>
          <p className="text-sm text-gray-400 mb-4">Last 7 days visitor flow analysis</p>
          
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 800 256">
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="0" y1={i * 64} x2="800" y2={i * 64} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
              <text x="5" y="20" fill="rgba(255,255,255,0.4)" fontSize="12">1600</text>
              <text x="5" y="84" fill="rgba(255,255,255,0.4)" fontSize="12">1200</text>
              <text x="5" y="148" fill="rgba(255,255,255,0.4)" fontSize="12">800</text>
              <text x="5" y="212" fill="rgba(255,255,255,0.4)" fontSize="12">400</text>
              <text x="5" y="256" fill="rgba(255,255,255,0.4)" fontSize="12">0</text>
              <path
                d={crowdData.map((point, i) => {
                  const x = (i / crowdData.length) * 800;
                  const y = 256 - (point.crowd / 1600) * 256;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              {crowdData.filter((_, i) => i % 3 === 0).map((point, i) => (
                <text key={i} x={(i * 3 / crowdData.length) * 800} y="250" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">{point.time}</text>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Demographics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Demographics
          </h2>
          <p className="text-sm text-gray-400 mb-4">Age and gender distribution</p>
          
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 800 256">
              <path d="M 100 128 Q 200 50, 400 80 T 700 120 Q 750 150, 700 180 T 400 200 Q 200 220, 100 128" fill="none" stroke="url(#gradient2)" strokeWidth="3" />
              <defs>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              {[100, 200, 300, 400, 500, 600, 700].map((x, i) => (
                <circle key={i} cx={x} cy={Math.sin(i * 0.8) * 60 + 128} r="4" fill="#a855f7" opacity="0.8" />
              ))}
              <text x="5" y="20" fill="rgba(255,255,255,0.4)" fontSize="12">1600</text>
              <text x="5" y="84" fill="rgba(255,255,255,0.4)" fontSize="12">1200</text>
              <text x="5" y="148" fill="rgba(255,255,255,0.4)" fontSize="12">800</text>
              <text x="5" y="212" fill="rgba(255,255,255,0.4)" fontSize="12">400</text>
              {['1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'].map((label, i) => (
                <text key={i} x={(i / 11) * 700 + 50} y="250" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">{label}</text>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Zone Analytics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-400" />
            Zone Analytics
          </h2>
          <p className="text-sm text-gray-400 mb-4">Area-wise crowd density</p>
          
          <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
            {zoneData.map((zone, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">{zone.zone}</span>
                  <span className="text-white font-semibold">{zone.percentage}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${zone.percentage}%` }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className={`h-full rounded-full ${
                      zone.percentage > 85 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                      zone.percentage > 75 ? 'bg-gradient-to-r from-orange-500 to-yellow-500' :
                      'bg-gradient-to-r from-green-500 to-cyan-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Time Analysis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-400" />
            Time Analysis
          </h2>
          <p className="text-sm text-gray-400 mb-4">Peak hours and patterns</p>
          
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 800 256">
              {[0, 1, 2, 3, 4].map(i => (
                <line key={i} x1="0" y1={i * 64} x2="800" y2={i * 64} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
              <path
                d={`M 0 256 ${crowdData.map((point, i) => {
                  const x = (i / crowdData.length) * 800;
                  const y = 256 - (point.crowd / 1600) * 256;
                  return `L ${x} ${y}`;
                }).join(' ')} L 800 256 Z`}
                fill="url(#gradient3)"
                opacity="0.3"
              />
              <path
                d={crowdData.map((point, i) => {
                  const x = (i / crowdData.length) * 800;
                  const y = 256 - (point.crowd / 1600) * 256;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="url(#gradient3)"
                strokeWidth="3"
              />
              <defs>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
              <text x="5" y="20" fill="rgba(255,255,255,0.4)" fontSize="12">1600</text>
              <text x="5" y="84" fill="rgba(255,255,255,0.4)" fontSize="12">1200</text>
              <text x="5" y="148" fill="rgba(255,255,255,0.4)" fontSize="12">800</text>
              <text x="5" y="212" fill="rgba(255,255,255,0.4)" fontSize="12">400</text>
              {['1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00', '21:00', '23:00'].map((label, i) => (
                <text key={i} x={(i / 11) * 750 + 25} y="250" fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">{label}</text>
              ))}
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Key Insights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6 mt-6"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          Key Insights & Patterns
        </h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Most Congested Zone</div>
            <div className="text-xl font-bold text-white">Sector B - Central</div>
            <div className="text-sm text-orange-400 mt-1">84% capacity (1008/1200)</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Recurring Risk Pattern</div>
            <div className="text-xl font-bold text-white">14:00 - 16:00</div>
            <div className="text-sm text-red-400 mt-1">Daily peak congestion window</div>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Recommended Action</div>
            <div className="text-xl font-bold text-white">Redistribute Flow</div>
            <div className="text-sm text-cyan-400 mt-1">Redirect to Sector A (69% capacity)</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
