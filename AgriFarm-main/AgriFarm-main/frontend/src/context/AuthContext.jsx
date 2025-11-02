import { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('agrifarm_user');
    
    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Set user immediately from localStorage to prevent logout on refresh
        setUser(userData);
        
        // Verify token is still valid by fetching user from API in background
        // Only clear auth if we get 401/403 (unauthorized), not on network errors
        authAPI.getMe()
          .then(currentUser => {
            // Update user data if API call succeeds
            setUser(currentUser);
            localStorage.setItem('agrifarm_user', JSON.stringify(currentUser));
          })
          .catch((error) => {
            // Only clear auth if it's an authentication error (401/403)
            // Network errors or backend being down shouldn't log users out
            const status = error.status;
            const isAuthError = status === 401 || status === 403 ||
              (error.message && (
                error.message.includes('401') || 
                error.message.includes('403') ||
                error.message.includes('Unauthorized') ||
                error.message.includes('Forbidden')
              ));

            if (isAuthError) {
              // Token is invalid, clear auth
              console.log('Token invalid, logging out');
              localStorage.removeItem('token');
              localStorage.removeItem('agrifarm_user');
              setUser(null);
            } else {
              // Network error or backend unavailable - keep user logged in
              // User data is already set from localStorage above
              console.warn('Could not verify token, but keeping user logged in:', error.message);
            }
          });
      } catch (err) {
        console.error('Error loading user from localStorage:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('agrifarm_user');
        setUser(null);
      }
    }

    setLoading(false);
  }, []);

  // Register new user
  const register = async (userData) => {
    try {
      const { email, password, name, userType } = userData;
      
      const response = await authAPI.register({
        name,
        email,
        password,
        userType: userType || 'consumer',
      });

      // Store token and user
      localStorage.setItem('token', response.token);
      localStorage.setItem('agrifarm_user', JSON.stringify(response.user));

      setUser(response.user);
      return response.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });

      // Store token and user
      localStorage.setItem('token', response.token);
      localStorage.setItem('agrifarm_user', JSON.stringify(response.user));

      setUser(response.user);
      return response.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    if (user) {
      // Clear user-specific data from localStorage on logout
      localStorage.removeItem(`agrifarm_purchases_${user.id}`);
      localStorage.removeItem(`agrifarm_farmerCrops_${user.id}`);
      localStorage.removeItem(`agrifarm_cart_${user.id}`);
    }
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('agrifarm_user');
  };

  // Change user role
  const changeUserRole = async (newRole) => {
    if (!user) return;

    try {
      // Update user role via API
      const updatedUser = await authAPI.updateProfile({ userType: newRole });
      
      setUser(updatedUser);
      localStorage.setItem('agrifarm_user', JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error('Error updating user role:', error);
      // Fallback to local update if API fails
      const updatedUser = {
        ...user,
        userType: newRole,
      };
      setUser(updatedUser);
      localStorage.setItem('agrifarm_user', JSON.stringify(updatedUser));
      return updatedUser;
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    changeUserRole,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

