import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing token on app load
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken')
    if (savedToken) {
      if (isTokenValid(savedToken)) {
        setToken(savedToken)
        setUser(getUserFromToken(savedToken))
      } else {
        // Token expired, remove it
        localStorage.removeItem('authToken')
      }
    }
    setLoading(false)
  }, [])

  // Decode JWT payload without verification (frontend can read this)
  const getUserFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return {
        role: payload.role,
        exp: payload.exp,
        iat: payload.iat
      }
    } catch {
      return null
    }
  }

  // Check if token is valid (not expired)
  const isTokenValid = (token) => {
    if (!token) return false
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp > currentTime
    } catch {
      return false
    }
  }

  // Login function - will be called from login component
  const login = (newToken) => {
    if (isTokenValid(newToken)) {
      setToken(newToken)
      setUser(getUserFromToken(newToken))
      localStorage.setItem('authToken', newToken)
      return true
    }
    return false
  }

  // Logout function
  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('authToken')
  }

  // Check if user is authenticated
  const isAuthenticated = () => {
    return token && isTokenValid(token)
  }

  // Check if user is admin
  const isAdmin = () => {
    return user && user.role === 'admin'
  }

  const value = {
    token,
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    getUserFromToken,
    isTokenValid
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}