import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  // ✅ FIX 1: Load auth state on app start
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('authUser')

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // ✅ FIX 2: Login + persist session
  const login = (userData, fakeToken) => {
    setUser(userData)
    setToken(fakeToken)

    localStorage.setItem('authToken', fakeToken)
    localStorage.setItem('authUser', JSON.stringify(userData))

    console.log('✅ User logged in:', userData.email)
  }

  // ✅ FIX 3: Logout + clear storage
  const logout = () => {
    setUser(null)
    setToken(null)

    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')

    console.log('🚪 User logged out')
  }

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}