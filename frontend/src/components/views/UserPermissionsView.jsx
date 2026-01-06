import React, { useState, useEffect } from 'react';
import { Users, UserPlus, Edit2, Trash2, Shield, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import api from '../../services/api';

const ROLES = [
  { value: 'LIVE_MANAGEMENT', label: 'Live Management', color: 'bg-purple-500' },
  { value: 'RFID_REGISTRY', label: 'RFID Registry', color: 'bg-blue-500' },
  { value: 'ALERTS_EMERGENCY', label: 'Alerts & Emergency', color: 'bg-red-500' },
  { value: 'POLICE_DASHBOARD', label: 'Police Dashboard', color: 'bg-indigo-500' },
  { value: 'MEDICAL_DASHBOARD', label: 'Medical Dashboard', color: 'bg-green-500' },
  { value: 'OPERATOR_STAFF', label: 'Operator / Staff Dashboard', color: 'bg-yellow-500' },
  { value: 'PUBLIC_PILGRIM', label: 'Public / Pilgrim Dashboard', color: 'bg-gray-500' }
];

// Mock Users Data
const MOCK_USERS = [
  {
    _id: '1',
    name: 'Rajesh Kumar',
    phoneNumber: '+91 9876543210',
    role: 'LIVE_MANAGEMENT',
    createdAt: '2026-01-01T10:30:00Z'
  },
  {
    _id: '2',
    name: 'Priya Sharma',
    phoneNumber: '+91 9876543211',
    role: 'RFID_REGISTRY',
    createdAt: '2026-01-02T11:45:00Z'
  },
  {
    _id: '3',
    name: 'Inspector Singh',
    phoneNumber: '+91 9876543212',
    role: 'POLICE_DASHBOARD',
    createdAt: '2026-01-02T14:20:00Z'
  },
  {
    _id: '4',
    name: 'Dr. Anita Verma',
    phoneNumber: '+91 9876543213',
    role: 'MEDICAL_DASHBOARD',
    createdAt: '2026-01-03T09:15:00Z'
  },
  {
    _id: '5',
    name: 'Amit Patel',
    phoneNumber: '+91 9876543214',
    role: 'ALERTS_EMERGENCY',
    createdAt: '2026-01-03T15:30:00Z'
  },
  {
    _id: '6',
    name: 'Sunita Gupta',
    phoneNumber: '+91 9876543215',
    role: 'OPERATOR_STAFF',
    createdAt: '2026-01-04T08:00:00Z'
  },
  {
    _id: '7',
    name: 'Vikram Reddy',
    phoneNumber: '+91 9876543216',
    role: 'LIVE_MANAGEMENT',
    createdAt: '2026-01-04T10:30:00Z'
  },
  {
    _id: '8',
    name: 'Constable Rahul',
    phoneNumber: '+91 9876543217',
    role: 'POLICE_DASHBOARD',
    createdAt: '2026-01-04T12:15:00Z'
  },
  {
    _id: '9',
    name: 'Meera Desai',
    phoneNumber: '+91 9876543218',
    role: 'RFID_REGISTRY',
    createdAt: '2026-01-05T07:45:00Z'
  },
  {
    _id: '10',
    name: 'Dr. Suresh Nair',
    phoneNumber: '+91 9876543219',
    role: 'MEDICAL_DASHBOARD',
    createdAt: '2026-01-05T11:00:00Z'
  },
  {
    _id: '11',
    name: 'Karan Mehta',
    phoneNumber: '+91 9876543220',
    role: 'OPERATOR_STAFF',
    createdAt: '2026-01-05T13:30:00Z'
  },
  {
    _id: '12',
    name: 'Pooja Singh',
    phoneNumber: '+91 9876543221',
    role: 'ALERTS_EMERGENCY',
    createdAt: '2026-01-06T09:00:00Z'
  },
  {
    _id: '13',
    name: 'Ravi Joshi',
    phoneNumber: '+91 9876543222',
    role: 'OPERATOR_STAFF',
    createdAt: '2026-01-06T10:15:00Z'
  },
  {
    _id: '14',
    name: 'SI Deepak Kumar',
    phoneNumber: '+91 9876543223',
    role: 'POLICE_DASHBOARD',
    createdAt: '2026-01-06T11:45:00Z'
  },
  {
    _id: '15',
    name: 'Anjali Rao',
    phoneNumber: '+91 9876543224',
    role: 'LIVE_MANAGEMENT',
    createdAt: '2026-01-06T14:20:00Z'
  }
];

export default function UserPermissionsView() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    role: '',
    name: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/auth/users');
      // If API call succeeds, use real data; otherwise keep mock data
      setUsers(response.data.data || MOCK_USERS);
    } catch (error) {
      console.error('Error fetching users:', error);
      // Keep using mock data if API fails
      setUsers(MOCK_USERS);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Try API call first
      await api.post('/auth/create-user', formData);
      setShowCreateModal(false);
      setFormData({ phoneNumber: '', password: '', role: '', name: '' });
      fetchUsers();
      alert('User created successfully!');
    } catch (error) {
      // If API fails, add to mock data locally
      const newUser = {
        _id: String(users.length + 1),
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
        createdAt: new Date().toISOString()
      };
      setUsers([...users, newUser]);
      setShowCreateModal(false);
      setFormData({ phoneNumber: '', password: '', role: '', name: '' });
      alert('User created successfully (Mock Mode)!');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.delete(`/auth/users/${userId}`);
      fetchUsers();
      alert('User deleted successfully!');
    } catch (error) {
      // If API fails, delete from local state
      setUsers(users.filter(u => u._id !== userId));
      alert('User deleted successfully (Mock Mode)!');
    }
  };

  const getRoleInfo = (roleValue) => {
    return ROLES.find(r => r.value === roleValue) || { label: roleValue, color: 'bg-gray-500' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <Shield className="w-10 h-10 text-cyan-400" />
              User & Permissions
            </h1>
            <p className="text-gray-400">Manage user accounts and access control</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold flex items-center gap-2 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/30"
          >
            <UserPlus className="w-5 h-5" />
            Create New User
          </button>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => {
          const roleInfo = getRoleInfo(user.role);
          return (
            <div
              key={user._id}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 ${roleInfo.color} rounded-full flex items-center justify-center`}>
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">{user.name || 'User'}</h3>
                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {user.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className={`${roleInfo.color} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                  {roleInfo.label}
                </span>
              </div>

              <div className="text-gray-400 text-xs mb-4">
                Created: {new Date(user.createdAt).toLocaleDateString()}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {users.length === 0 && (
        <div className="text-center py-20">
          <Users className="w-20 h-20 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No users found. Create your first user to get started.</p>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-cyan-400" />
              Create New User
            </h2>

            <form onSubmit={handleCreateUser} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-semibold">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="Enter full name"
                  required
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-all"
                  placeholder="+91 XXXXXXXXXX"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-all"
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-semibold flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Role / Dashboard Access
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-all"
                  required
                >
                  <option value="" className="bg-gray-900">Select a role...</option>
                  {ROLES.map((role) => (
                    <option key={role.value} value={role.value} className="bg-gray-900">
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setFormData({ phoneNumber: '', password: '', role: '', name: '' });
                  }}
                  className="flex-1 px-4 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-all"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
