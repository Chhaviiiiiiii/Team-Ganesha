import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: 'No authentication token provided' 
      })
    }

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'default-secret-change-this'
    )
    
    req.userId = decoded.userId
    req.userRole = decoded.role
    
    next()
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      error: 'Invalid authentication token' 
    })
  }
}

export const roleCheck = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ 
        success: false, 
        error: 'Insufficient permissions' 
      })
    }
    next()
  }
}

export default { authMiddleware, roleCheck }
