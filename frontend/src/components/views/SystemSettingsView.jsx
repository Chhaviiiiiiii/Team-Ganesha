import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  MapPin,
  AlertTriangle,
  Users,
  Shield,
  Database,
  Eye,
  EyeOff,
  Save,
  Plus,
  Edit,
  Trash2,
  X,
  Lock,
  Unlock,
  Bell,
  Brain,
  Radio,
  Activity,
  Clock,
  FileText,
  CheckCircle
} from 'lucide-react';

// Initial zone data
const INITIAL_ZONES = [
  { id: 1, name: 'Gate 1 - Main Entry', type: 'gate', capacity: 500, currentLimit: 500, status: 'active' },
  { id: 2, name: 'Gate 2 - East Entry', type: 'gate', capacity: 400, currentLimit: 400, status: 'active' },
  { id: 3, name: 'Gate 3 - West Entry', type: 'gate', capacity: 350, currentLimit: 350, status: 'active' },
  { id: 4, name: 'Sangam Ghat', type: 'ghat', capacity: 800, currentLimit: 800, status: 'active' },
  { id: 5, name: 'Ram Ghat', type: 'ghat', capacity: 600, currentLimit: 600, status: 'active' },
  { id: 6, name: 'Hanuman Ghat', type: 'ghat', capacity: 500, currentLimit: 500, status: 'active' },
  { id: 7, name: 'Sector A - North', type: 'sector', capacity: 1000, currentLimit: 1000, status: 'active' },
  { id: 8, name: 'Sector B - Central', type: 'sector', capacity: 1200, currentLimit: 1200, status: 'active' },
  { id: 9, name: 'Sector C - South', type: 'sector', capacity: 900, currentLimit: 900, status: 'active' },
  { id: 10, name: 'Sector D - East', type: 'sector', capacity: 800, currentLimit: 800, status: 'active' },
  { id: 11, name: 'Sector E - West', type: 'sector', capacity: 700, currentLimit: 700, status: 'active' },
];

export default function SystemSettingsView() {
  const [activeTab, setActiveTab] = useState('zones');
  const [zones, setZones] = useState(INITIAL_ZONES);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  
  // Alert Thresholds
  const [thresholds, setThresholds] = useState({
    safe: 75,
    warning: 85,
    critical: 95
  });

  // Feature Toggles
  const [features, setFeatures] = useState({
    aiPredictions: true,
    sosAlerts: true,
    realTimeMonitoring: true,
    autoAlerts: true,
    crowdAnalytics: true,
    rfidTracking: true
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    dataRetention: 90,
    anonymizeAfter: 30,
    logRetention: 180,
    autoDelete: true
  });

  // Zone Modal Form
  const [zoneForm, setZoneForm] = useState({
    name: '',
    type: 'sector',
    capacity: 0,
    currentLimit: 0
  });

  const handleAddZone = () => {
    setEditingZone(null);
    setZoneForm({ name: '', type: 'sector', capacity: 0, currentLimit: 0 });
    setShowZoneModal(true);
  };

  const handleEditZone = (zone) => {
    setEditingZone(zone);
    setZoneForm({
      name: zone.name,
      type: zone.type,
      capacity: zone.capacity,
      currentLimit: zone.currentLimit
    });
    setShowZoneModal(true);
  };

  const handleSaveZone = () => {
    if (editingZone) {
      setZones(zones.map(z => z.id === editingZone.id ? {
        ...z,
        name: zoneForm.name,
        type: zoneForm.type,
        capacity: parseInt(zoneForm.capacity),
        currentLimit: parseInt(zoneForm.currentLimit)
      } : z));
    } else {
      const newZone = {
        id: zones.length + 1,
        name: zoneForm.name,
        type: zoneForm.type,
        capacity: parseInt(zoneForm.capacity),
        currentLimit: parseInt(zoneForm.currentLimit),
        status: 'active'
      };
      setZones([...zones, newZone]);
    }
    setShowZoneModal(false);
  };

  const handleDeleteZone = (id) => {
    if (confirm('Are you sure you want to delete this zone?')) {
      setZones(zones.filter(z => z.id !== id));
    }
  };

  const handleSaveSettings = () => {
    alert('System settings saved successfully!');
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Settings className="w-10 h-10 text-cyan-400" />
              System Settings
            </h1>
            <p className="text-gray-400">Configure and control the entire crowd management platform</p>
          </div>
          
          <button
            onClick={handleSaveSettings}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg flex items-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all font-semibold"
          >
            <Save className="w-5 h-5" />
            Save All Changes
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-2 overflow-x-auto">
        {[
          { id: 'zones', label: 'Zone Management', icon: MapPin },
          { id: 'thresholds', label: 'Alert Thresholds', icon: AlertTriangle },
          { id: 'users', label: 'User & Role Management', icon: Users },
          { id: 'features', label: 'Feature Controls', icon: Activity },
          { id: 'privacy', label: 'Privacy & Data', icon: Shield }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Zone Management Tab */}
      {activeTab === 'zones' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">Zone Management</h2>
            <button
              onClick={handleAddZone}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg flex items-center gap-2 hover:from-green-600 hover:to-emerald-600 transition-all"
            >
              <Plus className="w-5 h-5" />
              Add New Zone
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {zones.map((zone) => (
              <div
                key={zone.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`p-3 rounded-lg ${
                    zone.type === 'gate' ? 'bg-blue-500/20' :
                    zone.type === 'ghat' ? 'bg-green-500/20' :
                    'bg-purple-500/20'
                  }`}>
                    <MapPin className={`w-6 h-6 ${
                      zone.type === 'gate' ? 'text-blue-400' :
                      zone.type === 'ghat' ? 'text-green-400' :
                      'text-purple-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{zone.name}</h3>
                    <p className="text-sm text-gray-400 capitalize">{zone.type}</p>
                  </div>

                  <div className="text-center px-4">
                    <div className="text-xs text-gray-400 mb-1">Capacity</div>
                    <div className="text-white font-bold text-lg">{zone.capacity}</div>
                  </div>

                  <div className="text-center px-4">
                    <div className="text-xs text-gray-400 mb-1">Current Limit</div>
                    <div className="text-cyan-400 font-bold text-lg">{zone.currentLimit}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      zone.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {zone.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEditZone(zone)}
                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteZone(zone.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Alert Thresholds Tab */}
      {activeTab === 'thresholds' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">Alert Threshold Configuration</h2>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-green-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Safe Level</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Crowd density below this percentage is considered safe</p>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Threshold</span>
                  <span className="text-white font-bold">{thresholds.safe}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={thresholds.safe}
                  onChange={(e) => setThresholds({ ...thresholds, safe: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
                <div className="text-xs text-green-400 mb-1">Status</div>
                <div className="text-white font-semibold">Normal Operations</div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-yellow-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <h3 className="text-xl font-semibold text-white">Warning Level</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Moderate congestion requiring attention</p>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Threshold</span>
                  <span className="text-white font-bold">{thresholds.warning}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={thresholds.warning}
                  onChange={(e) => setThresholds({ ...thresholds, warning: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3">
                <div className="text-xs text-yellow-400 mb-1">Action</div>
                <div className="text-white font-semibold">Send Notifications</div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-red-500/30 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-6 h-6 text-red-400" />
                <h3 className="text-xl font-semibold text-white">Critical Level</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">High-risk situation requiring immediate action</p>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Threshold</span>
                  <span className="text-white font-bold">{thresholds.critical}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={thresholds.critical}
                  onChange={(e) => setThresholds({ ...thresholds, critical: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <div className="text-xs text-red-400 mb-1">Action</div>
                <div className="text-white font-semibold">Emergency Alerts</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Threshold Preview</h3>
            <div className="relative h-12 bg-white/10 rounded-full overflow-hidden">
              <div className="absolute inset-0 flex">
                <div
                  style={{ width: `${thresholds.safe}%` }}
                  className="bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-center text-white font-semibold text-sm"
                >
                  Safe: 0-{thresholds.safe}%
                </div>
                <div
                  style={{ width: `${thresholds.warning - thresholds.safe}%` }}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-400 flex items-center justify-center text-white font-semibold text-sm"
                >
                  Warning: {thresholds.safe}-{thresholds.warning}%
                </div>
                <div
                  style={{ width: `${100 - thresholds.warning}%` }}
                  className="bg-gradient-to-r from-red-500 to-red-400 flex items-center justify-center text-white font-semibold text-sm"
                >
                  Critical: {thresholds.warning}%+
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* User & Role Management Tab */}
      {activeTab === 'users' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">User & Role Management</h2>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">System Roles</h3>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg flex items-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all">
                <Plus className="w-4 h-4" />
                Add Role
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { role: 'Super Admin', users: 2, color: 'red', permissions: 'Full System Access' },
                { role: 'Live Management', users: 5, color: 'blue', permissions: 'Heatmap & Alerts' },
                { role: 'Police Dashboard', users: 12, color: 'purple', permissions: 'Emergency Response' },
                { role: 'Medical Dashboard', users: 8, color: 'green', permissions: 'Medical Alerts' },
                { role: 'RFID Registry', users: 3, color: 'cyan', permissions: 'RFID Management' },
                { role: 'Operator Staff', users: 20, color: 'orange', permissions: 'Basic Operations' }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Users className={`w-5 h-5 text-${item.color}-400`} />
                      <h4 className="text-white font-semibold">{item.role}</h4>
                    </div>
                    <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">{item.users} users</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{item.permissions}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-all">
                      Edit
                    </button>
                    <button className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Permission Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-400">Permission</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-400">Super Admin</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-400">Live Mgmt</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-400">Police</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-400">Medical</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    ['View Dashboard', true, true, true, true],
                    ['Manage Zones', true, false, false, false],
                    ['Send Alerts', true, true, true, true],
                    ['View Analytics', true, true, false, false],
                    ['RFID Management', true, true, false, false],
                    ['System Settings', true, false, false, false]
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="px-4 py-3 text-white">{row[0]}</td>
                      {row.slice(1).map((val, j) => (
                        <td key={j} className="px-4 py-3 text-center">
                          {val ? (
                            <CheckCircle className="w-5 h-5 text-green-400 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-gray-600 mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Feature Controls Tab */}
      {activeTab === 'features' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">Feature Controls</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'aiPredictions', label: 'AI Crowd Predictions', icon: Brain, description: 'Enable AI-powered crowd behavior predictions' },
              { id: 'sosAlerts', label: 'SOS Emergency Alerts', icon: Bell, description: 'Allow emergency SOS alerts from field staff' },
              { id: 'realTimeMonitoring', label: 'Real-Time Monitoring', icon: Activity, description: 'Live heatmap and crowd tracking' },
              { id: 'autoAlerts', label: 'Automatic Alerts', icon: AlertTriangle, description: 'Auto-trigger alerts on threshold breach' },
              { id: 'crowdAnalytics', label: 'Crowd Analytics', icon: TrendingUp, description: 'Historical data analysis and insights' },
              { id: 'rfidTracking', label: 'RFID Tracking', icon: Radio, description: 'Track visitors via RFID wristbands' }
            ].map((feature) => (
              <div
                key={feature.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${features[feature.id] ? 'bg-cyan-500/20' : 'bg-gray-500/20'}`}>
                      <feature.icon className={`w-6 h-6 ${features[feature.id] ? 'text-cyan-400' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{feature.label}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setFeatures({ ...features, [feature.id]: !features[feature.id] })}
                    className={`relative w-16 h-8 rounded-full transition-all ${
                      features[feature.id] ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                      features[feature.id] ? 'right-1' : 'left-1'
                    }`} />
                  </button>
                </div>
                
                <div className={`px-3 py-2 rounded-lg ${
                  features[feature.id] ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    {features[feature.id] ? (
                      <>
                        <Unlock className="w-4 h-4" />
                        Enabled
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Disabled
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Privacy & Data Tab */}
      {activeTab === 'privacy' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-white">Privacy & Data Controls</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-semibold text-white">Data Retention</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Active Data Retention</span>
                    <span className="text-white font-bold">{privacy.dataRetention} days</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="365"
                    value={privacy.dataRetention}
                    onChange={(e) => setPrivacy({ ...privacy, dataRetention: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-2">Raw data stored for {privacy.dataRetention} days before archival</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Anonymization Period</span>
                    <span className="text-white font-bold">{privacy.anonymizeAfter} days</span>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="90"
                    value={privacy.anonymizeAfter}
                    onChange={(e) => setPrivacy({ ...privacy, anonymizeAfter: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-2">Personal data anonymized after {privacy.anonymizeAfter} days</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Log Retention</span>
                    <span className="text-white font-bold">{privacy.logRetention} days</span>
                  </div>
                  <input
                    type="range"
                    min="90"
                    max="730"
                    value={privacy.logRetention}
                    onChange={(e) => setPrivacy({ ...privacy, logRetention: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-2">System logs retained for {privacy.logRetention} days</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-green-400" />
                <h3 className="text-xl font-semibold text-white">Privacy Rules</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-semibold mb-1">Auto-Delete Old Data</div>
                    <div className="text-sm text-gray-400">Automatically delete data after retention period</div>
                  </div>
                  <button
                    onClick={() => setPrivacy({ ...privacy, autoDelete: !privacy.autoDelete })}
                    className={`relative w-16 h-8 rounded-full transition-all ${
                      privacy.autoDelete ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                      privacy.autoDelete ? 'right-1' : 'left-1'
                    }`} />
                  </button>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2">
                    <FileText className="w-5 h-5" />
                    Compliance Status
                  </div>
                  <div className="text-sm text-gray-300">
                    System is configured to comply with data protection regulations
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center gap-2 text-yellow-400 font-semibold mb-2">
                    <Clock className="w-5 h-5" />
                    Next Cleanup
                  </div>
                  <div className="text-sm text-gray-300">
                    Scheduled for January 15, 2026 at 02:00 AM
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-red-500/30 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h3 className="text-xl font-semibold text-white">Data Management Actions</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <button className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg font-semibold transition-all">
                Export All Data
              </button>
              <button className="px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg font-semibold transition-all">
                Anonymize Now
              </button>
              <button className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-semibold transition-all">
                Purge Old Data
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Zone Modal */}
      <AnimatePresence>
        {showZoneModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowZoneModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editingZone ? 'Edit Zone' : 'Add New Zone'}
                </h3>
                <button
                  onClick={() => setShowZoneModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Zone Name</label>
                  <input
                    type="text"
                    value={zoneForm.name}
                    onChange={(e) => setZoneForm({ ...zoneForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    placeholder="e.g., Gate 1 - Main Entry"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Zone Type</label>
                  <select
                    value={zoneForm.type}
                    onChange={(e) => setZoneForm({ ...zoneForm, type: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="gate">Gate</option>
                    <option value="ghat">Ghat</option>
                    <option value="sector">Sector</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Maximum Capacity</label>
                  <input
                    type="number"
                    value={zoneForm.capacity}
                    onChange={(e) => setZoneForm({ ...zoneForm, capacity: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    placeholder="e.g., 500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Current Limit</label>
                  <input
                    type="number"
                    value={zoneForm.currentLimit}
                    onChange={(e) => setZoneForm({ ...zoneForm, currentLimit: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                    placeholder="e.g., 500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowZoneModal(false)}
                  className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveZone}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg font-semibold transition-all"
                >
                  {editingZone ? 'Update' : 'Create'} Zone
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
