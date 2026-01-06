import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio,
  Search,
  Filter,
  Eye,
  EyeOff,
  Ban,
  CheckCircle,
  AlertTriangle,
  X,
  RefreshCw,
  MapPin,
  Clock,
  UserPlus,
  Shield,
  Download,
  ChevronDown,
  Activity,
  User,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';

// Generate RFID data from zones
const generateRFIDFromZones = () => {
  const zones = [
    { name: 'Gate 1 - Main Entry', capacity: 500, current: 460 },
    { name: 'Gate 2 - East Entry', capacity: 400, current: 320 },
    { name: 'Gate 3 - West Entry', capacity: 350, current: 241 },
    { name: 'Sangam Ghat', capacity: 800, current: 672 },
    { name: 'Ram Ghat', capacity: 600, current: 534 },
    { name: 'Hanuman Ghat', capacity: 500, current: 400 },
    { name: 'Sector A - North', capacity: 1000, current: 690 },
    { name: 'Sector B - Central', capacity: 1200, current: 1008 },
    { name: 'Sector C - South', capacity: 900, current: 684 },
    { name: 'Sector D - East', capacity: 800, current: 520 },
    { name: 'Sector E - West', capacity: 700, current: 546 }
  ];

  const names = [
    'Rajesh Kumar', 'Priya Sharma', 'Amit Verma', 'Sunita Devi', 'Vikram Singh',
    'Anjali Patel', 'Rahul Gupta', 'Deepika Reddy', 'Suresh Yadav', 'Kavita Singh',
    'Manoj Tiwari', 'Neha Mishra', 'Arun Kumar', 'Pooja Agarwal', 'Sanjay Pandey'
  ];

  const rfidData = [];
  let id = 1;

  zones.forEach((zone, zoneIndex) => {
    const numPeople = Math.floor(Math.random() * 3) + 2; // 2-4 people per zone
    
    for (let i = 0; i < numPeople; i++) {
      const uid = `RFID-2026-${String(id).padStart(3, '0')}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
      const maskedUid = `RFID-****-***${uid.slice(-3)}`;
      const randomName = names[Math.floor(Math.random() * names.length)];
      const isFlagged = Math.random() > 0.85;
      const status = isFlagged && Math.random() > 0.7 ? 'blocked' : Math.random() > 0.9 ? 'inactive' : 'active';
      
      const scanHistory = [];
      const numScans = Math.floor(Math.random() * 5) + 2;
      
      for (let j = 0; j < numScans; j++) {
        const randomZone = zones[Math.floor(Math.random() * zones.length)];
        scanHistory.push({
          zone: randomZone.name,
          timestamp: `${Math.floor(Math.random() * 60) + 1} mins ago`,
          type: j === 0 ? 'entry' : 'movement',
          flagged: isFlagged && j === 0
        });
      }

      rfidData.push({
        id,
        uid,
        maskedUid,
        status,
        assignedTo: randomName,
        phoneNumber: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        email: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
        age: Math.floor(Math.random() * 50) + 20,
        address: `Delhi, India`,
        lastZone: zone.name,
        lastScan: new Date(Date.now() - Math.random() * 3600000).toLocaleString(),
        registeredDate: new Date(2026, 0, Math.floor(Math.random() * 6) + 1).toLocaleDateString(),
        totalScans: Math.floor(Math.random() * 200) + 50,
        flagged: isFlagged,
        flagReason: isFlagged ? (Math.random() > 0.5 ? 'Duplicate scans detected' : 'Suspicious movement pattern') : null,
        scanHistory
      });
      
      id++;
    }
  });

  return rfidData;
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'text-green-400 bg-green-500/20';
    case 'inactive': return 'text-gray-400 bg-gray-500/20';
    case 'blocked': return 'text-red-400 bg-red-500/20';
    default: return 'text-gray-400 bg-gray-500/20';
  }
};

export default function RFIDRegistryView() {
  const [rfidList, setRfidList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedRFID, setSelectedRFID] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showMasked, setShowMasked] = useState(true);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('rfid'); // 'rfid' or 'users'

  // Generate live data on mount and refresh every 30 seconds
  useEffect(() => {
    const updateData = () => {
      const liveData = generateRFIDFromZones();
      setRfidList(liveData);
    };

    updateData();
    const interval = setInterval(updateData, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Filter RFIDs based on search and status
  useEffect(() => {
    let filtered = rfidList;

    if (searchQuery) {
      filtered = filtered.filter(rfid =>
        rfid.uid.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rfid.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(rfid => rfid.status === statusFilter);
    }

    setFilteredList(filtered);
  }, [searchQuery, statusFilter, rfidList]);

  const handleDisable = (rfidId) => {
    setRfidList(rfidList.map(rfid =>
      rfid.id === rfidId ? { ...rfid, status: 'blocked' } : rfid
    ));
    alert(`RFID ${rfidId} has been disabled`);
  };

  const handleEnable = (rfidId) => {
    setRfidList(rfidList.map(rfid =>
      rfid.id === rfidId ? { ...rfid, status: 'active' } : rfid
    ));
    alert(`RFID ${rfidId} has been enabled`);
  };

  const handleMarkSuspicious = (rfidId) => {
    setRfidList(rfidList.map(rfid =>
      rfid.id === rfidId ? { ...rfid, flagged: true, flagReason: 'Marked by Super Admin' } : rfid
    ));
    alert(`RFID ${rfidId} marked as suspicious`);
  };

  const handleReassign = (rfidId) => {
    const newName = prompt('Enter new assignee name:');
    if (newName) {
      setRfidList(rfidList.map(rfid =>
        rfid.id === rfidId ? { ...rfid, assignedTo: newName } : rfid
      ));
      alert(`RFID ${rfidId} reassigned to ${newName}`);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 overflow-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Radio className="w-10 h-10 text-cyan-400" />
              RFID Registry
            </h1>
            <p className="text-gray-400">Live data from Heatmap zones • Updated in real-time</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center gap-2 transition-all">
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg flex items-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all">
              <UserPlus className="w-4 h-4" />
              Register New RFID
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setActiveTab('rfid')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'rfid'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <Radio className="w-5 h-5" />
          RFID Tracking
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
              : 'bg-white/5 text-gray-400 hover:bg-white/10'
          }`}
        >
          <User className="w-5 h-5" />
          Registered Users
        </button>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 backdrop-blur-xl border border-green-500/30 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-1">Active RFIDs</div>
          <div className="text-3xl font-bold text-green-400">
            {rfidList.filter(r => r.status === 'active').length}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-gray-500/30 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-1">Inactive RFIDs</div>
          <div className="text-3xl font-bold text-gray-400">
            {rfidList.filter(r => r.status === 'inactive').length}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-red-500/30 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-1">Blocked RFIDs</div>
          <div className="text-3xl font-bold text-red-400">
            {rfidList.filter(r => r.status === 'blocked').length}
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-yellow-500/30 rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-1">Flagged RFIDs</div>
          <div className="text-3xl font-bold text-yellow-400">
            {rfidList.filter(r => r.flagged).length}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by RFID UID or assignee name..."
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white flex items-center gap-2 transition-all"
            >
              <Filter className="w-5 h-5" />
              Filter: {statusFilter === 'all' ? 'All' : statusFilter}
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-white/20 rounded-lg shadow-2xl z-50">
                {['all', 'active', 'inactive', 'blocked'].map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setShowFilterMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-white/10 transition-colors capitalize ${
                      statusFilter === status ? 'text-cyan-400 bg-white/5' : 'text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Show/Hide UIDs */}
          <button
            onClick={() => setShowMasked(!showMasked)}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white flex items-center gap-2 transition-all"
          >
            {showMasked ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            {showMasked ? 'Show' : 'Hide'} UIDs
          </button>
        </div>
      </div>

      {/* RFID Tracking Table */}
      {activeTab === 'rfid' && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">RFID UID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Assigned To</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Last Zone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Last Scan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Total Scans</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredList.map((rfid) => (
                <motion.tr
                  key={rfid.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-white/5 transition-all cursor-pointer"
                  onClick={() => setSelectedRFID(rfid)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-cyan-400 font-mono text-sm">
                        {showMasked ? rfid.maskedUid : rfid.uid}
                      </code>
                      {rfid.flagged && (
                        <AlertTriangle className="w-4 h-4 text-yellow-400" title={rfid.flagReason} />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(rfid.status)}`}>
                      {rfid.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{rfid.assignedTo}</td>
                  <td className="px-6 py-4 text-gray-400">{rfid.lastZone}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{rfid.lastScan}</td>
                  <td className="px-6 py-4 text-white font-semibold">{rfid.totalScans}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRFID(rfid);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View Details →
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredList.length === 0 && (
            <div className="text-center py-12">
              <Radio className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No RFID records found</p>
            </div>
          )}
        </div>
      )}

      {/* Registered Users Table */}
      {activeTab === 'users' && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">User Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">RFID UID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Current Location</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Registered</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredList.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-white/5 transition-all cursor-pointer"
                  onClick={() => setSelectedUser(user)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                        {user.assignedTo.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{user.assignedTo}</div>
                        <div className="text-xs text-gray-400">Age: {user.age}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-300 flex items-center gap-2 mb-1">
                        <Phone className="w-3 h-3" />
                        {user.phoneNumber}
                      </div>
                      <div className="text-gray-400 flex items-center gap-2 text-xs">
                        <Mail className="w-3 h-3" />
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-cyan-400 font-mono text-sm">
                      {showMasked ? user.maskedUid : user.uid}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="w-4 h-4 text-cyan-400" />
                      {user.lastZone}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{user.registeredDate}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedUser(user);
                      }}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      View Profile →
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filteredList.length === 0 && (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No registered users found</p>
            </div>
          )}
        </div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {selectedRFID && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedRFID(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Radio className="w-8 h-8 text-cyan-400" />
                    <h2 className="text-2xl font-bold text-white">
                      {showMasked ? selectedRFID.maskedUid : selectedRFID.uid}
                    </h2>
                    {selectedRFID.flagged && (
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Flagged
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400">Registered: {selectedRFID.registeredDate}</p>
                </div>
                <button
                  onClick={() => setSelectedRFID(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* RFID Info Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Status</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedRFID.status)}`}>
                    {selectedRFID.status}
                  </span>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Assigned To</div>
                  <div className="text-white font-semibold">{selectedRFID.assignedTo}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-1">Total Scans</div>
                  <div className="text-white font-semibold text-xl">{selectedRFID.totalScans}</div>
                </div>
              </div>

              {selectedRFID.flagged && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-yellow-400 font-semibold mb-2">
                    <AlertTriangle className="w-5 h-5" />
                    Flagged Reason
                  </div>
                  <p className="text-yellow-300">{selectedRFID.flagReason}</p>
                </div>
              )}

              {/* Scan History */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Scan History & Movement Timeline
                </h3>
                <div className="space-y-3">
                  {selectedRFID.scanHistory.map((scan, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        scan.flagged ? 'bg-red-500/10 border border-red-500/30' : 'bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-5 h-5 ${scan.flagged ? 'text-red-400' : 'text-cyan-400'}`} />

      {/* User Profile Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* User Profile Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                    {selectedUser.assignedTo.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">{selectedUser.assignedTo}</h2>
                    <p className="text-gray-400">Age: {selectedUser.age} • {selectedUser.address}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status}
                      </span>
                      {selectedUser.flagged && (
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Flagged
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* User Information Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </div>
                  <div className="text-white font-semibold">{selectedUser.phoneNumber}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                  <div className="text-white font-semibold text-sm">{selectedUser.email}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <Radio className="w-4 h-4" />
                    RFID UID
                  </div>
                  <code className="text-cyan-400 font-mono text-sm">
                    {showMasked ? selectedUser.maskedUid : selectedUser.uid}
                  </code>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Registered Date
                  </div>
                  <div className="text-white font-semibold">{selectedUser.registeredDate}</div>
                </div>
              </div>

              {/* Current Location */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  Current Location
                </h3>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white font-semibold">{selectedUser.lastZone}</div>
                    <div className="text-xs text-gray-400">Last scanned: {selectedUser.lastScan}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 text-xs">Total Scans</div>
                    <div className="text-white font-bold text-xl">{selectedUser.totalScans}</div>
                  </div>
                </div>
              </div>

              {/* Movement History */}
              <div className="bg-white/5 rounded-lg p-4 mb-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  Movement History
                </h3>
                <div className="space-y-3">
                  {selectedUser.scanHistory.map((scan, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        scan.flagged ? 'bg-red-500/10 border border-red-500/30' : 'bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-5 h-5 ${scan.flagged ? 'text-red-400' : 'text-cyan-400'}`} />
                        <div>
                          <div className="text-white font-semibold">{scan.zone}</div>
                          <div className="text-xs text-gray-400 capitalize">{scan.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{scan.timestamp}</span>
                        {scan.flagged && (
                          <AlertTriangle className="w-4 h-4 text-red-400 ml-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Actions */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  User Management Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      handleReassign(selectedUser.id);
                      setSelectedUser(null);
                    }}
                    className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reassign RFID
                  </button>
                  
                  {selectedUser.status !== 'blocked' ? (
                    <button
                      onClick={() => {
                        handleDisable(selectedUser.id);
                        setSelectedUser(null);
                      }}
                      className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <Ban className="w-5 h-5" />
                      Block User
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleEnable(selectedUser.id);
                        setSelectedUser(null);
                      }}
                      className="px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Unblock User
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedUser(null)}
                    className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all col-span-2"
                  >
                    Close Profile
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
                        <div>
                          <div className="text-white font-semibold">{scan.zone}</div>
                          <div className="text-xs text-gray-400 capitalize">{scan.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{scan.timestamp}</span>
                        {scan.flagged && (
                          <AlertTriangle className="w-4 h-4 text-red-400 ml-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Actions */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-yellow-400" />
                  Super Admin Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedRFID.status !== 'blocked' ? (
                    <button
                      onClick={() => {
                        handleDisable(selectedRFID.id);
                        setSelectedRFID(null);
                      }}
                      className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <Ban className="w-5 h-5" />
                      Disable RFID
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleEnable(selectedRFID.id);
                        setSelectedRFID(null);
                      }}
                      className="px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Enable RFID
                    </button>
                  )}
                  
                  <button
                    onClick={() => {
                      handleReassign(selectedRFID.id);
                      setSelectedRFID(null);
                    }}
                    className="px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Reassign RFID
                  </button>
                  
                  {!selectedRFID.flagged && (
                    <button
                      onClick={() => {
                        handleMarkSuspicious(selectedRFID.id);
                        setSelectedRFID(null);
                      }}
                      className="px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                    >
                      <AlertTriangle className="w-5 h-5" />
                      Mark Suspicious
                    </button>
                  )}
                  
                  <button
                    onClick={() => setSelectedRFID(null)}
                    className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Audit Trail */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-gray-500">
                  🔒 All Super Admin actions are logged and audited for security compliance
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
