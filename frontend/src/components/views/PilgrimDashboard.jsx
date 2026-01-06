import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Phone, MapPin, Users, Heart, Globe, LogOut, CreditCard } from 'lucide-react'
import { publicAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const PilgrimDashboard = () => {
  const { user, rfidId, logout } = useAuth()
  const [language, setLanguage] = useState('en')
  const [zoneStatus, setZoneStatus] = useState([])
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)

  const translations = {
    en: {
      title: 'Kumbh Mela Safety Dashboard',
      subtitle: 'Real-time Safety Information',
      zones: 'Zone Status',
      alerts: 'Safety Alerts',
      helpline: 'Helpline Numbers',
      crowdStatus: 'Crowd Status',
      safe: 'Safe',
      moderate: 'Moderate',
      crowded: 'Crowded',
      emergency: 'Emergency',
      safe_desc: 'Safe for entry',
      moderate_desc: 'Manageable crowd',
      crowded_desc: 'Entry restricted',
      emergency_desc: 'Do not enter',
      visitor_count: 'Visitors',
      checkpoint: 'Checkpoint',
      first_aid: 'First Aid',
      lost_and_found: 'Lost & Found',
      information: 'Information Desk',
      police_emergency: 'Police Emergency',
      medical_emergency: 'Medical Emergency'
    },
    hi: {
      title: 'कुंभ मेला सुरक्षा डैशबोर्ड',
      subtitle: 'रीयल-टाइम सुरक्षा जानकारी',
      zones: 'जोन की स्थिति',
      alerts: 'सुरक्षा सतर्कता',
      helpline: 'हेल्पलाइन नंबर',
      crowdStatus: 'भीड़ की स्थिति',
      safe: 'सुरक्षित',
      moderate: 'मध्यम',
      crowded: 'भीड़ भरा',
      emergency: 'आपातकालीन',
      safe_desc: 'प्रवेश के लिए सुरक्षित',
      moderate_desc: 'प्रबंधनीय भीड़',
      crowded_desc: 'प्रवेश प्रतिबंधित',
      emergency_desc: 'प्रवेश न करें',
      visitor_count: 'आगंतुक',
      checkpoint: 'चेकपॉइंट',
      first_aid: 'प्राथमिक चिकित्सा',
      lost_and_found: 'खोया-पाया',
      information: 'सूचना डेस्क',
      police_emergency: 'पुलिस आपातकाल',
      medical_emergency: 'चिकित्सा आपातकाल'
    },
    gu: {
      title: 'કુંભ મેળો સલામતી ડેશબોર્ડ',
      subtitle: 'રીયલ-ટાઇમ સલામતી માહિતી',
      zones: 'ઝોન સ્થિતિ',
      alerts: 'સલામતી ચેતવણી',
      helpline: 'હેલ્પલાઇન નંબરો',
      crowdStatus: 'ભીડ સ્થિતિ',
      safe: 'સુરક્ષિત',
      moderate: 'મધ્યમ',
      crowded: 'ભીડી',
      emergency: 'કટોકટી',
      safe_desc: 'પ્રવેશ માટે સુરક્ષિત',
      moderate_desc: 'સંચાલનક્ષમ ભીડ',
      crowded_desc: 'પ્રવેશ પ્રતિબંધિત',
      emergency_desc: 'પ્રવેશ કરશો નહીં',
      visitor_count: 'મુલાકાતી',
      checkpoint: 'ચેકપોઇન્ટ',
      first_aid: 'પ્રથમ સહાય',
      lost_and_found: 'ખોવાયું અને મળ્યું',
      information: 'સમાચાર ડેસ્ક',
      police_emergency: 'પોલીસ કટોકટી',
      medical_emergency: 'તબીબી કટોકટી'
    }
  }

  const t = translations[language] || translations.en

  const helplineNumbers = [
    { name: t.police_emergency, number: '100', icon: '🚔' },
    { name: t.medical_emergency, number: '102', icon: '🚑' },
    { name: t.first_aid, number: '1298', icon: '⚕️' },
    { name: t.lost_and_found, number: '1076', icon: '🔍' },
    { name: t.information, number: '1077', icon: 'ℹ️' }
  ]

  useEffect(() => {
    fetchZoneStatus()
  }, [])

  const fetchZoneStatus = async () => {
    try {
      setLoading(true)
      // Fetch zone stats from public API
      const response = await publicAPI.getZonesStatus()
      setZoneStatus(response.data?.data || [])

      // Fetch alerts from public API
      const alertResponse = await publicAPI.getSafetyAlerts()
      setAlerts(alertResponse.data?.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      // Set mock data for demo
      setZoneStatus([
        { _id: 'Zone A', totalScans: 1200, checkpointCount: 3, status: 'safe' },
        { _id: 'Zone B', totalScans: 3400, checkpointCount: 4, status: 'moderate' },
        { _id: 'Zone C', totalScans: 5800, checkpointCount: 5, status: 'crowded' }
      ])
      setAlerts([
        { _id: '1', message: 'High crowd density in Zone C', type: 'warning', priority: 'high' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      safe: 'bg-green-500/20 border-green-500 text-green-400',
      moderate: 'bg-amber-500/20 border-amber-500 text-amber-300',
      crowded: 'bg-orange-500/20 border-orange-500 text-orange-300',
      emergency: 'bg-red-500/20 border-red-500 text-red-400'
    }
    return colors[status] || colors.moderate
  }

  const getStatusLabel = (count) => {
    if (count < 1000) return { status: 'safe', label: t.safe }
    if (count < 3000) return { status: 'moderate', label: t.moderate }
    if (count < 5000) return { status: 'crowded', label: t.crowded }
    return { status: 'emergency', label: t.emergency }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-4">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      {/* Language Selector */}
      <div className="flex justify-end gap-2 mb-6 relative z-10">
        {['en', 'hi', 'gu'].map((lang) => (
          <motion.button
            key={lang}
            onClick={() => setLanguage(lang)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              language === lang
                ? 'bg-cyan-500 text-white border border-cyan-400'
                : 'bg-white/10 hover:bg-cyan-500/20 text-cyan-200 border border-cyan-500/30'
            }`}
          >
            {lang.toUpperCase()}
          </motion.button>
        ))}
      </div>

      {/* Header with RFID and Logout */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 relative z-10"
      >
        {/* Welcome Card with RFID */}
        {user && rfidId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-xl border border-cyan-500/50 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/30 rounded-full">
                  <CreditCard className="text-cyan-300" size={32} />
                </div>
                <div>
                  <p className="text-sm text-gray-300">Welcome, {user.name || user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">Your RFID:</span>
                    <span className="text-xl font-mono font-bold text-cyan-400 tracking-wider">
                      {rfidId}
                    </span>
                  </div>
                </div>
              </div>
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-300 transition-all"
              >
                <LogOut size={18} />
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
            {t.title}
          </h1>
          <p className="text-cyan-300 text-lg">{t.subtitle}</p>
        </div>
      </motion.div>

      {/* Zone Status Grid */}
      <div className="mb-8 relative z-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-cyan-400">
          <MapPin className="text-cyan-400" size={28} />
          {t.zones}
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zoneStatus.map((zone, idx) => {
              const { status, label } = getStatusLabel(zone.totalScans)
              return (
                <motion.div
                  key={zone._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-6 rounded-xl border-2 backdrop-blur-xl ${getStatusColor(status)}`}
                >
                  <h3 className="text-xl font-bold mb-2">{zone._id}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{t.crowdStatus}:</span>
                      <span className="font-bold">{label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.visitor_count}:</span>
                      <span className="font-bold">{zone.totalScans.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t.checkpoint}:</span>
                      <span className="font-bold">{zone.checkpointCount}</span>
                    </div>
                  </div>

                  {/* Visual indicator */}
                  <div className="mt-4 w-full bg-black/30 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((zone.totalScans / 6000) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                      className={`h-full ${
                        status === 'safe'
                          ? 'bg-green-500'
                          : status === 'moderate'
                          ? 'bg-yellow-500'
                          : status === 'crowded'
                          ? 'bg-orange-500'
                          : 'bg-red-500'
                      }`}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>

      {/* Safety Alerts */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 p-6 rounded-xl bg-red-500/10 border-2 border-red-500/50 backdrop-blur-xl relative z-10"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-red-400">
            <AlertCircle size={28} />
            {t.alerts}
          </h2>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <motion.div
                key={alert._id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="p-4 bg-black/30 rounded-lg border-l-4 border-red-500"
              >
                <p className="text-red-200">{alert.message}</p>
                {alert.location && (
                  <p className="text-xs text-red-300 mt-1">📍 {alert.location}</p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Helpline Numbers */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-cyan-400">
          <Phone className="text-cyan-400" size={28} />
          {t.helpline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {helplineNumbers.map((helpline, idx) => (
            <motion.div
              key={helpline.number}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-6 rounded-xl bg-blue-500/10 hover:bg-cyan-500/20 border-2 border-cyan-500/50 backdrop-blur-xl cursor-pointer transition-all"
              onClick={() => {
                if (window.confirm(`Call ${helpline.number}?`)) {
                  window.location.href = `tel:${helpline.number}`
                }
              }}
            >
              <div className="text-4xl mb-2">{helpline.icon}</div>
              <h3 className="font-bold text-lg text-cyan-300 mb-2">{helpline.name}</h3>
              <p className="text-3xl font-bold text-cyan-400">{helpline.number}</p>
              <p className="text-xs text-gray-400 mt-2">Tap to call</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center text-sm text-gray-400 border-t border-cyan-500/20 pt-6 relative z-10"
      >
        <p>🙏 {t.title}</p>
        <p className="mt-2">Data updates every 30 seconds</p>
      </motion.div>
    </div>
  )
}

export default PilgrimDashboard
