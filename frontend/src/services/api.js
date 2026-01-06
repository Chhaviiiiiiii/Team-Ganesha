import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Dashboard API
export const dashboardAPI = {
  getSummary: () => api.get('/dashboard'),
  getWidgetData: (widgetId) => api.get(`/dashboard/widgets/${widgetId}`),
  saveLayout: (layout) => api.post('/dashboard/layout', { layout })
}

// Analytics API
export const analyticsAPI = {
  getSummary: () => api.get('/analytics/summary'),
  getTrends: (days = 7) => api.get(`/analytics/trends?days=${days}`),
  getZones: () => api.get('/analytics/zones'),
  getHourly: () => api.get('/analytics/hourly'),
  getDemographics: () => api.get('/analytics/demographics')
}

// Alerts API
export const alertsAPI = {
  getAll: (filters = {}) => api.get('/alerts', { params: filters }),
  create: (alertData) => api.post('/alerts', alertData),
  acknowledge: (id, userId) => api.patch(`/alerts/${id}/acknowledge`, { userId }),
  resolve: (id) => api.patch(`/alerts/${id}/resolve`),
  getStats: () => api.get('/alerts/stats')
}

// RFID API
export const rfidAPI = {
  getEvents: (filters = {}) => api.get('/rfid/events', { params: filters }),
  createEvent: (eventData) => api.post('/rfid/events', eventData),
  getCheckpointStats: () => api.get('/rfid/checkpoints/stats'),
  getVisitorJourney: (tagId) => api.get(`/rfid/visitor/${tagId}/journey`)
}

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me')
}

// Notifications API
export const notificationsAPI = {
  getAll: (userId) => api.get('/notifications', { params: { userId } }),
  create: (notificationData) => api.post('/notifications', notificationData),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: (userId) => api.patch('/notifications/read-all', { userId }),
  delete: (id) => api.delete(`/notifications/${id}`)
}

// Public API (No authentication required)
export const publicAPI = {
  getZonesStatus: () => api.get('/public/zones-status'),
  getSafetyAlerts: () => api.get('/public/safety-alerts'),
  getHelpline: () => api.get('/public/helpline'),
  getCrowdSummary: () => api.get('/public/crowd-summary'),
  getHourlyDistribution: () => api.get('/public/hourly-distribution')
}

export default api
