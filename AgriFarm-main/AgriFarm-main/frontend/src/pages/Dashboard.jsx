import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAgriContext } from '../context/AgriContext';
import { motion } from 'framer-motion';
import { User, Package, ShoppingCart, TrendingUp, LogOut, Calendar, Mail, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  const { user, logout, changeUserRole } = useAuth();
  const { availableCrops, purchasedCrops, farmerCrops } = useAgriContext();
  const navigate = useNavigate();
  const [changingRole, setChangingRole] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRoleChange = (newRole) => {
    if (user?.userType === newRole) return;
    
    setChangingRole(true);
    changeUserRole(newRole);
    setTimeout(() => {
      setChangingRole(false);
      // Refresh the page to update all role-dependent content
      window.location.reload();
    }, 500);
  };

  // Use farmerCrops from context (user's own crops) when in farmer role
  const userCrops = user?.userType === 'farmer' ? farmerCrops : [];

  const stats = [
    {
      name: user?.userType === 'farmer' ? 'My Crops Listed' : 'Total Available Crops',
      value: user?.userType === 'farmer' ? userCrops.length : availableCrops.length,
      icon: Package,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
    },
    {
      name: user?.userType === 'consumer' ? 'My Purchases' : 'Total Sales',
      value: user?.userType === 'consumer' ? purchasedCrops.length : 0,
      icon: ShoppingCart,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
    },
    {
      name: 'Account Type',
      value: user?.userType === 'farmer' ? '👨‍🌾 Farmer' : '🛒 Consumer',
      icon: User,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
    },
  ];

  return (
    <div className="min-h-screen relative">
      {/* Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/farm-hero.mp4" type="video/mp4" />
          <div className="w-full h-full bg-gradient-to-br from-green-100 via-green-300 to-green-500" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <div className="pt-24 pb-12 min-h-screen px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-dark rounded-2xl p-8 shadow-xl mb-8"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome, {user?.name}!
                  </h1>
                  <p className="text-white/70 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user?.email}
                  </p>
                  <p className="text-white/60 text-sm mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Member since {new Date(user?.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  {/* Role Switcher */}
                  <div className="bg-white/5 rounded-lg border border-white/10 p-2 flex items-center gap-2">
                    <span className="text-white/70 text-sm">Role:</span>
                    <button
                      onClick={() => handleRoleChange('farmer')}
                      disabled={changingRole || user?.userType === 'farmer'}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        user?.userType === 'farmer'
                          ? 'bg-agri-green text-white'
                          : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      👨‍🌾 Farmer
                    </button>
                    <button
                      onClick={() => handleRoleChange('consumer')}
                      disabled={changingRole || user?.userType === 'consumer'}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        user?.userType === 'consumer'
                          ? 'bg-agri-green text-white'
                          : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      🛒 Consumer
                    </button>
                    {changingRole && (
                      <RefreshCw className="w-4 h-4 text-agri-green animate-spin" />
                    )}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-lg border border-red-500/30 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${stat.bgColor} rounded-xl p-6 border border-white/10`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                    <p className="text-white/70 text-sm">{stat.name}</p>
                  </motion.div>
                ))}
              </div>

              {/* Farmer Section - My Crops */}
              {user?.userType === 'farmer' && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-white mb-4">My Listed Crops</h2>
                  {userCrops.length === 0 ? (
                    <div className="text-center py-8 text-white/70">
                      <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>You haven't listed any crops yet.</p>
                      <button
                        onClick={() => navigate('/farmer')}
                        className="mt-4 px-6 py-2 bg-agri-green hover:bg-agri-green-light text-white rounded-lg transition-colors"
                      >
                        List Your First Crop
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left py-3 px-4 text-white font-semibold">Crop</th>
                            <th className="text-left py-3 px-4 text-white font-semibold">Quantity (kg)</th>
                            <th className="text-left py-3 px-4 text-white font-semibold">Location</th>
                            <th className="text-left py-3 px-4 text-white font-semibold">Price (Rs)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userCrops.map((crop) => (
                            <tr key={crop.id} className="border-b border-white/10 hover:bg-white/5">
                              <td className="py-3 px-4 text-white">{crop.crop}</td>
                              <td className="py-3 px-4 text-white">{crop.quantity}</td>
                              <td className="py-3 px-4 text-white/80">{crop.location}</td>
                              <td className="py-3 px-4 text-agri-green-light font-bold">Rs {crop.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Consumer Section - My Purchases */}
              {user?.userType === 'consumer' && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-white mb-4">My Purchase History</h2>
                  {purchasedCrops.length === 0 ? (
                    <div className="text-center py-8 text-white/70">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>You haven't made any purchases yet.</p>
                      <button
                        onClick={() => navigate('/consumer')}
                        className="mt-4 px-6 py-2 bg-agri-green hover:bg-agri-green-light text-white rounded-lg transition-colors"
                      >
                        Browse Available Crops
                      </button>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/20">
                            <th className="text-left py-3 px-4 text-white font-semibold">Crop</th>
                            <th className="text-left py-3 px-4 text-white font-semibold">Farmer</th>
                            <th className="text-left py-3 px-4 text-white font-semibold">Location</th>
                            <th className="text-left py-3 px-4 text-white font-semibold">Price ($)</th>
                            <th className="text-left py-3 px-4 text-white font-semibold">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {purchasedCrops.map((purchase, index) => (
                            <tr key={purchase.purchaseId || index} className="border-b border-white/10 hover:bg-white/5">
                              <td className="py-3 px-4 text-white">{purchase.crop}</td>
                              <td className="py-3 px-4 text-white">{purchase.farmerName}</td>
                              <td className="py-3 px-4 text-white/80">{purchase.location}</td>
                              <td className="py-3 px-4 text-agri-green-light font-bold">${purchase.price}</td>
                              <td className="py-3 px-4 text-white/70 text-sm">
                                {purchase.purchaseDate 
                                  ? new Date(purchase.purchaseDate).toLocaleDateString()
                                  : 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                {user?.userType === 'farmer' ? (
                  <button
                    onClick={() => navigate('/farmer')}
                    className="px-6 py-4 bg-agri-green hover:bg-agri-green-light text-white rounded-lg transition-colors text-left flex items-center gap-3"
                  >
                    <TrendingUp className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">Register New Crop</div>
                      <div className="text-sm opacity-90">Add your crops to the marketplace</div>
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/consumer')}
                    className="px-6 py-4 bg-agri-green hover:bg-agri-green-light text-white rounded-lg transition-colors text-left flex items-center gap-3"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <div>
                      <div className="font-semibold">Browse Crops</div>
                      <div className="text-sm opacity-90">Find fresh produce from farmers</div>
                    </div>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;

