import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAgriContext } from '../context/AgriContext';
import { User, LogOut, Menu, X, ShoppingCart } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { getCartItemCount } = useAgriContext();
  const navigate = useNavigate();
  const cartItemCount = getCartItemCount();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <AnimatedLogo />

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium transition-colors relative group ${
                  isActive ? 'text-agri-green' : 'text-white hover:text-agri-green'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-agri-green transition-all ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/farmer"
              className={({ isActive }) =>
                `font-medium transition-colors relative group ${
                  isActive ? 'text-agri-green' : 'text-white hover:text-agri-green'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Farmer
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-agri-green transition-all ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/consumer"
              className={({ isActive }) =>
                `font-medium transition-colors relative group ${
                  isActive ? 'text-agri-green' : 'text-white hover:text-agri-green'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Consumer
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-agri-green transition-all ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </>
              )}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `font-medium transition-colors relative group ${
                  isActive ? 'text-agri-green' : 'text-white hover:text-agri-green'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  About
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-agri-green transition-all ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </>
              )}
            </NavLink>

            {/* Cart Icon */}
            <button
              onClick={() => navigate('/cart')}
              className="relative px-3 py-2 text-white hover:text-agri-green transition-colors"
              title="View Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `font-medium transition-colors relative group ${
                      isActive ? 'text-agri-green' : 'text-white hover:text-agri-green'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Dashboard
                      </span>
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-agri-green transition-all ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </>
                  )}
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg border border-red-500/30 flex items-center gap-2 transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-white hover:text-agri-green transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-agri-green hover:bg-agri-green-light text-white rounded-lg transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-agri-green transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-t border-white/10"
          >
            <div className="px-4 py-4 space-y-3">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 font-medium transition-colors ${
                    isActive ? 'text-agri-green' : 'text-white hover:text-agri-green'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/farmer"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 font-medium transition-colors ${
                    isActive ? 'text-agri-green' : 'text-white hover:text-agri-green'
                  }`
                }
              >
                Farmer
              </NavLink>
              <NavLink
                to="/consumer"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 font-medium transition-colors ${
                    isActive ? 'text-agri-green' : 'text-white hover:text-agri-green'
                  }`
                }
              >
                Consumer
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 font-medium transition-colors ${
                    isActive ? 'text-agri-green' : 'text-white hover:text-agri-green'
                  }`
                }
              >
                About
              </NavLink>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate('/cart');
                }}
                className="relative w-full py-2 px-4 text-white hover:text-agri-green transition-colors font-medium flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                </span>
                {cartItemCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </button>
              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 font-medium transition-colors ${
                        isActive ? 'text-agri-green' : 'text-white hover:text-agri-green'
                      }`
                    }
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Dashboard
                    </span>
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg border border-red-500/30 flex items-center justify-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-white hover:text-agri-green transition-colors font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-4 bg-agri-green hover:bg-agri-green-light text-white rounded-lg transition-colors font-medium text-center"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
