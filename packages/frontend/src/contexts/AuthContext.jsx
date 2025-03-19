import React, { createContext, useState, useEffect } from 'react';



// Create the Auth Context
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
  loading: true
});

/**
 * Auth Provider Component
 * Provides authentication context to the app
 */
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on component mount
  useEffect(() => {
    // For development purposes, we'll just simulate an auth check
    const checkAuth = () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        // In a real app, you'd validate the token here
        setIsAuthenticated(true);
        setUser({
          id: '1',
          name: 'Demo User',
          email: 'demo@example.com',
          role: 'admin'
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);


// Add this useEffect to your AuthContext's AuthProvider component:

// Auto-authenticate in development environment
useEffect(() => {
  if (process.env.NODE_ENV === 'development' && !isAuthenticated && !loading) {
    // Only auto-login in development to make testing easier
    console.log('Development mode: Auto-authentication enabled');

    // Set a fake token
    localStorage.setItem('auth_token', 'dev-auto-token');

    // Update state
    setIsAuthenticated(true);
    setUser({
      id: '999',
      name: 'Dev Auto User',
      email: 'dev@example.com',
      role: 'admin'
    });
  }
}, [isAuthenticated, loading]);

  // Login function
  const login = (credentials) => {
    // In a real app, you'd call an API here
    console.log('Login with:', credentials);

    // Simulate successful login
    localStorage.setItem('auth_token', 'demo-token');
    setIsAuthenticated(true);
    setUser({
      id: '1',
      name: 'Demo User',
      email: 'demo@example.com',
      role: 'admin'
    });

    return Promise.resolve({ success: true });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Provide auth context to children
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;