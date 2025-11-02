import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, X, Plus, Minus, ShoppingBag, Grid, List, Filter, ArrowUpDown } from 'lucide-react';
import { useAgriContext } from '../context/AgriContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import CropCard from './CropCard';

const EnhancedConsumerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name'); // 'name', 'price', 'quantity'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const { availableCrops, purchaseCrop, addToCart, loading, error, refreshCrops } = useAgriContext();
  const { isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  // Filter crops
  const filteredCrops = availableCrops.filter(
    (crop) =>
      crop.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort crops
  const sortedCrops = [...filteredCrops].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'price':
        comparison = a.price - b.price;
        break;
      case 'quantity':
        comparison = a.quantity - b.quantity;
        break;
      case 'name':
      default:
        comparison = a.crop.localeCompare(b.crop);
        break;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const openPurchaseModal = (crop) => {
    if (crop.quantity <= 0) {
      toast.error('Out of Stock', 'This crop is currently unavailable');
      return;
    }
    if (!isAuthenticated) {
      toast.warning('Login Required', 'Please login to purchase crops');
      navigate('/login');
      return;
    }
    setSelectedCrop(crop);
    setPurchaseQuantity(1);
  };

  const closePurchaseModal = () => {
    setSelectedCrop(null);
    setPurchaseQuantity(1);
  };

  const handleQuantityChange = (delta) => {
    if (selectedCrop) {
      const newQuantity = Math.max(1, Math.min(selectedCrop.quantity, purchaseQuantity + delta));
      setPurchaseQuantity(newQuantity);
    }
  };

  const handleAddToCart = (crop, quantity = 1) => {
    if (!isAuthenticated) {
      toast.warning('Login Required', 'Please login to add items to cart');
      navigate('/login');
      return;
    }
    if (crop.quantity <= 0) {
      toast.error('Out of Stock', 'This crop is currently unavailable');
      return;
    }
    addToCart(crop, quantity);
    toast.success('Added to Cart', `${crop.crop} added successfully!`);
  };

  const confirmPurchase = () => {
    if (!selectedCrop) return;
    
    for (let i = 0; i < purchaseQuantity; i++) {
      purchaseCrop(selectedCrop);
    }
    
    // Refresh crops to get updated quantities
    refreshCrops();
    
    toast.success('Purchase Successful', `Purchased ${purchaseQuantity} kg of ${selectedCrop.crop}`);
    closePurchaseModal();
  };

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-dark rounded-2xl p-8 shadow-xl"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-white">Available Crops</h2>
          
          {/* View Toggle and Sort */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-agri-green text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-agri-green text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-agri-green-light"
              >
                <option value="name" className="bg-gray-800">Sort by Name</option>
                <option value="price" className="bg-gray-800">Sort by Price</option>
                <option value="quantity" className="bg-gray-800">Sort by Quantity</option>
              </select>
              <button
                onClick={toggleSort}
                className="p-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                <ArrowUpDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search crops, farmers, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-agri-green-light"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-spin">🌾</div>
            <p className="text-white/70 text-xl">Loading crops...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-xl mb-4">Error loading crops: {error}</p>
            <button
              onClick={refreshCrops}
              className="px-6 py-2 bg-agri-green hover:bg-agri-green-light text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Crop Display */}
        {!loading && !error && sortedCrops.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌾</div>
            <p className="text-white/70 text-xl">No crops found matching your search.</p>
          </div>
        ) : !loading && !error && viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCrops.map((crop, index) => (
              <CropCard
                key={crop.id}
                crop={crop}
                onAddToCart={handleAddToCart}
                onBuyNow={openPurchaseModal}
                index={index}
              />
            ))}
          </div>
        ) : !loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 px-4 text-white font-semibold">Crop</th>
                  <th className="text-left py-4 px-4 text-white font-semibold">Farmer</th>
                  <th className="text-left py-4 px-4 text-white font-semibold">Quantity</th>
                  <th className="text-left py-4 px-4 text-white font-semibold">Location</th>
                  <th className="text-left py-4 px-4 text-white font-semibold">Price</th>
                  <th className="text-left py-4 px-4 text-white font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedCrops.map((crop, index) => (
                  <motion.tr
                    key={crop.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <span className="bg-agri-green text-white px-3 py-1 rounded-full text-sm font-medium">
                        {crop.crop}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white">{crop.farmerName}</td>
                    <td className="py-4 px-4 text-white">{crop.quantity} kg</td>
                    <td className="py-4 px-4 text-white/80">{crop.location}</td>
                    <td className="py-4 px-4">
                      <span className="text-agri-green-light font-bold">
                        {crop.price} Rs
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(crop)}
                          disabled={crop.quantity <= 0}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add
                        </button>
                        <button
                          onClick={() => openPurchaseModal(crop)}
                          disabled={crop.quantity <= 0}
                          className="bg-agri-green hover:bg-agri-green-light text-white font-medium px-4 py-2 rounded-lg glow-green-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Buy
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stats */}
        {!loading && !error && (
          <div className="mt-8 flex justify-center gap-8 text-center pt-8 border-t border-white/10">
            <div>
              <p className="text-2xl font-bold text-agri-green-light">{availableCrops.length}</p>
              <p className="text-white/70 text-sm">Total Crops</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-agri-green-light">{sortedCrops.length}</p>
              <p className="text-white/70 text-sm">Showing</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Purchase Modal */}
      <AnimatePresence>
        {selectedCrop && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-dark rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Purchase {selectedCrop.crop}</h3>
                <button
                  onClick={closePurchaseModal}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between text-white">
                  <span className="text-white/70">Farmer:</span>
                  <span className="font-medium">{selectedCrop.farmerName}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span className="text-white/70">Location:</span>
                  <span className="font-medium">{selectedCrop.location}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span className="text-white/70">Available:</span>
                  <span className="font-medium">{selectedCrop.quantity} kg</span>
                </div>
                <div className="flex justify-between text-white">
                  <span className="text-white/70">Price per kg:</span>
                  <span className="font-bold text-agri-green-light">{selectedCrop.price} Rs</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-white font-medium mb-3">Select Quantity (kg)</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="bg-agri-green hover:bg-agri-green-light text-white p-2 rounded-lg transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={selectedCrop.quantity}
                    value={purchaseQuantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      const clamped = Math.max(1, Math.min(selectedCrop.quantity, value));
                      setPurchaseQuantity(clamped);
                    }}
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white text-center font-semibold focus:outline-none focus:ring-2 focus:ring-agri-green-light"
                  />
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="bg-agri-green hover:bg-agri-green-light text-white p-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mb-6 p-4 bg-agri-green/20 border border-agri-green/30 rounded-lg">
                <div className="flex justify-between items-center text-white">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-2xl font-bold text-agri-green-light">
                    {(selectedCrop.price * purchaseQuantity).toFixed(2)} Rs
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={closePurchaseModal}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPurchase}
                  className="flex-1 px-4 py-3 rounded-lg bg-agri-green hover:bg-agri-green-light text-white font-semibold glow-green-hover transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Confirm Purchase
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedConsumerList;

