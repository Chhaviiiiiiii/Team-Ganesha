import React, { useState, useEffect } from 'react';
import { 
  Radio, MapPin, AlertTriangle, Wifi, WifiOff, Clock,
  CheckCircle, User, Bell, LogOut, RefreshCw
} from 'lucide-react';

const StaffDashboard = ({ onLogout }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [selectedZone, setSelectedZone] = useState('Gate 1');
  const [lastScanned, setLastScanned] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [notification, setNotification] = useState(null);

  const zones = [
    'Gate 1',
    'Gate 2', 
    'Gate 3',
    'Main Pavilion',
    'Temple Area',
    'Food Court',
    'Medical Tent',
    'Parking Area A',
    'Parking Area B'
  ];

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleScan = () => {
    setIsScanning(true);

    // Simulate RFID scan
    setTimeout(() => {
      const mockRFID = `RFID-${Math.floor(Math.random() * 90000) + 10000}`;
      const scanData = {
        rfid: mockRFID,
        zone: selectedZone,
        timestamp: new Date().toISOString(),
        status: 'success'
      };

      setLastScanned(scanData);
      setScanHistory(prev => [scanData, ...prev].slice(0, 10));
      setIsScanning(false);
      showNotification(`Scanned: ${mockRFID}`, 'success');
    }, 1500);
  };

  const handleEmergencyReport = () => {
    const confirmed = window.confirm('Report an emergency at this location?\n\nZone: ' + selectedZone);
    if (confirmed) {
      showNotification('Emergency reported successfully!', 'warning');
      // Here you would send to backend
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 overflow-auto">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Radio className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Staff Portal</h1>
                <p className="text-sm text-indigo-300">RFID Operations</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Online/Offline Indicator */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                isOnline 
                  ? 'bg-green-500/20 border-green-500/30 text-green-400'
                  : 'bg-red-500/20 border-red-500/30 text-red-400'
              }`}>
                {isOnline ? (
                  <>
                    <Wifi className="w-4 h-4" />
                    <span className="text-sm font-semibold hidden sm:inline">Online</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="w-4 h-4" />
                    <span className="text-sm font-semibold hidden sm:inline">Offline</span>
                  </>
                )}
              </div>

              <button
                onClick={onLogout}
                className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Zone Selector */}
        <div className="mb-8">
          <label className="block text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-indigo-400" />
            Select Zone
          </label>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="w-full px-6 py-4 text-xl bg-white/10 border border-white/20 rounded-2xl text-white font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all backdrop-blur-xl"
          >
            {zones.map(zone => (
              <option key={zone} value={zone} className="bg-slate-900">
                {zone}
              </option>
            ))}
          </select>
        </div>

        {/* Large Scan Button */}
        <div className="mb-8">
          <button
            onClick={handleScan}
            disabled={isScanning || !isOnline}
            className={`w-full py-16 rounded-3xl font-bold text-3xl shadow-2xl transform transition-all duration-200 ${
              isScanning
                ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400 scale-95'
                : isOnline
                ? 'bg-gradient-to-br from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white hover:scale-[1.02] border-2 border-indigo-400/50'
                : 'bg-gray-600/20 border-gray-500/40 text-gray-400 cursor-not-allowed'
            } border-4 backdrop-blur-xl`}
          >
            {isScanning ? (
              <div className="flex flex-col items-center gap-4">
                <RefreshCw className="w-16 h-16 animate-spin" />
                <span>Scanning...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Radio className="w-20 h-20" />
                <span>TAP TO SCAN</span>
              </div>
            )}
          </button>
        </div>

        {/* Last Scanned Display */}
        <div className="mb-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            Last Scanned
          </h2>
          {lastScanned ? (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-indigo-500/20 border border-indigo-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-indigo-300">RFID</span>
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-2xl font-bold text-white font-mono">{lastScanned.rfid}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-gray-400 block mb-1">Zone</span>
                  <p className="text-white font-semibold">{lastScanned.zone}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-xs text-gray-400 block mb-1">Time</span>
                  <p className="text-white font-semibold">
                    {new Date(lastScanned.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <User className="w-16 h-16 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No scans yet</p>
              <p className="text-sm text-gray-500 mt-1">Tap the scan button to start</p>
            </div>
          )}
        </div>

        {/* Emergency Report Button */}
        <button
          onClick={handleEmergencyReport}
          disabled={!isOnline}
          className="w-full py-6 rounded-2xl bg-red-500/20 hover:bg-red-500/30 text-red-400 border-2 border-red-500/40 font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-xl flex items-center justify-center gap-3"
        >
          <AlertTriangle className="w-7 h-7" />
          REPORT EMERGENCY
        </button>

        {/* Recent Scans */}
        {scanHistory.length > 0 && (
          <div className="mt-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Scans</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {scanHistory.map((scan, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-mono font-semibold">{scan.rfid}</p>
                      <p className="text-xs text-gray-400">{scan.zone}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(scan.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <div className={`backdrop-blur-xl rounded-xl border p-4 shadow-lg flex items-center gap-3 ${
            notification.type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-400' :
            notification.type === 'warning' ? 'bg-orange-500/20 border-orange-500/30 text-orange-400' :
            'bg-blue-500/20 border-blue-500/30 text-blue-400'
          }`}>
            {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
            {notification.type === 'info' && <Bell className="w-5 h-5" />}
            <span className="font-medium">{notification.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
