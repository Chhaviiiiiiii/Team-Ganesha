import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Navigate } from 'react-router-dom'
import { Phone, Lock, LogIn, AlertCircle, Loader, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  
  const [isCreateMode, setIsCreateMode] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/pilgrim" replace />
  }

  // Validate phone number
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phone.replace(/[^\d]/g, ''))
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number (10 digits required)'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    setLoginError('')
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoginError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      if (isCreateMode) {
        // Register new account
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formData.phone,
            phone: formData.phone,
            password: formData.password,
            email: `${formData.phone}@kumbh-sava.local`
          })
        })

        const data = await response.json()

        if (data.success) {
          // Store token and redirect
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('user', JSON.stringify(data.data.user))
          setTimeout(() => {
            navigate('/pilgrim')
          }, 500)
        } else {
          setLoginError(data.error || 'Registration failed. Please try again.')
          setLoading(false)
        }
      } else {
        // Login with phone number
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: `${formData.phone}@kumbh-sava.local`,
            password: formData.password
          })
        })

        const data = await response.json()

        if (data.success) {
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('user', JSON.stringify(data.data.user))
          setTimeout(() => {
            navigate('/pilgrim')
          }, 500)
        } else {
          setLoginError(data.error || 'Login failed. Please try again.')
          setLoading(false)
        }
      }
    } catch (error) {
      setLoginError('An unexpected error occurred')
      setLoading(false)
    }
  }

  // Demo credentials
  const fillDemoCredentials = () => {
    setFormData({
      phone: '9876543210',
      password: 'demo123'
    })
  }

  // Toggle mode
  const toggleMode = () => {
    setIsCreateMode(!isCreateMode)
    setFormData({
      phone: '',
      password: ''
    })
    setErrors({})
    setLoginError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Login Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-block p-4 bg-cyan-500/20 rounded-full mb-4"
            >
              <LogIn className="text-cyan-400" size={40} />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
              Kumbh Sava
            </h1>
            <p className="text-gray-400">
              {isCreateMode ? 'Create your account' : 'Sign in to your account'}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10-digit phone number"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-cyan-500/30 focus:ring-cyan-500/50 focus:border-cyan-500'
                  } text-white placeholder-gray-500`}
                />
              </div>
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-400 flex items-center gap-1"
                >
                  <AlertCircle size={14} />
                  {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-11 pr-4 py-3 bg-slate-800/50 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500/50'
                      : 'border-cyan-500/30 focus:ring-cyan-500/50 focus:border-cyan-500'
                  } text-white placeholder-gray-500`}
                />
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-400 flex items-center gap-1"
                >
                  <AlertCircle size={14} />
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Login Error */}
            {loginError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg"
              >
                <p className="text-sm text-red-400 flex items-center gap-2">
                  <AlertCircle size={16} />
                  {loginError}
                </p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                loading
                  ? 'bg-cyan-500/50 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
              } text-white`}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  {isCreateMode ? 'Creating account...' : 'Signing in...'}
                </>
              ) : (
                <>
                  <ArrowRight size={20} />
                  {isCreateMode ? 'Create Account' : 'Sign In'}
                </>
              )}
            </motion.button>

            {/* Demo Button */}
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full py-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Use Demo Credentials
            </button>

            {/* Toggle Mode Button */}
            <button
              type="button"
              onClick={toggleMode}
              className="w-full py-2 text-sm border border-cyan-500/30 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 rounded-lg transition-all"
            >
              {isCreateMode ? 'Already have an account? Sign In' : "Don't have an account? Create One"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Kumbh Mela Safety Dashboard</p>
            <p className="mt-1">Secure pilgrim access system</p>
          </div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl backdrop-blur-xl"
        >
          <p className="text-sm text-cyan-300 text-center">
            🔐 Secure RFID generation upon successful login
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default LoginPage
