import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [rfidId, setRfidId] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedRfid = localStorage.getItem('rfidId')
    const token = localStorage.getItem('authToken')

    if (storedUser && storedRfid && token) {
      setUser(JSON.parse(storedUser))
      setRfidId(storedRfid)
    }
    setLoading(false)
  }, [])

  // Generate unique RFID ID
  const generateRfidId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let rfid = 'RFID-'
    for (let i = 0; i < 6; i++) {
      rfid += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return rfid
  }

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true)

      // Mock authentication (replace with actual API call)
      // Example: const response = await authAPI.login(credentials)
      
      // For demo purposes, accept any credentials
      const mockUser = {
        id: Date.now(),
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: 'pilgrim'
      }

      const generatedRfid = generateRfidId()

      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('rfidId', generatedRfid)
      localStorage.setItem('authToken', 'mock-token-' + Date.now())

      // Update state
      setUser(mockUser)
      setRfidId(generatedRfid)

      setLoading(false)
      return { success: true, rfidId: generatedRfid }
    } catch (error) {
      setLoading(false)
      return { success: false, error: error.message }
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('rfidId')
    localStorage.removeItem('authToken')
    setUser(null)
    setRfidId(null)
    navigate('/login')
  }

  const value = {
    user,
    rfidId,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
