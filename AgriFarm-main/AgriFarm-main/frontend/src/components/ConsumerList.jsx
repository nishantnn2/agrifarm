import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useAgriContext } from '../context/AgriContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const ConsumerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);
  const { availableCrops, purchaseCrop, addToCart } = useAgriContext();
  const { isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const filteredCrops = availableCrops.filter(
    (crop) =>
      crop.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    
    // Purchase the crop with the specified quantity
    for (let i = 0; i < purchaseQuantity; i++) {
      purchaseCrop(selectedCrop);
    }
    
    toast.success('Purchase Successful', `Purchased ${purchaseQuantity} kg of ${selectedCrop.crop}`);
    closePurchaseModal();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-dark rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Available Crops
        </h2>

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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-4 px-4 text-white font-semibold">Farmer Name</th>
                <th className="text-left py-4 px-4 text-white font-semibold">Crop</th>
                <th className="text-left py-4 px-4 text-white font-semibold">Quantity (kg)</th>
                <th className="text-left py-4 px-4 text-white font-semibold">Location</th>
                <th className="text-left py-4 px-4 text-white font-semibold">Price (Rs)</th>
                <th className="text-left py-4 px-4 text-white font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCrops.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-white/70">
                    No crops found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCrops.map((crop, index) => (
                  <motion.tr
                    key={crop.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-white">{crop.farmerName}</td>
                    <td className="py-4 px-4">
                      <span className="bg-agri-green text-white px-3 py-1 rounded-full text-sm font-medium">
                        {crop.crop}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-white">{crop.quantity}</td>
                    <td className="py-4 px-4 text-white/80">{crop.location}</td>
                    <td className="py-4 px-4">
                      <span className="text-agri-green-light font-bold">
                        {crop.price} Rs
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddToCart(crop, 1)}
                          disabled={crop.quantity <= 0}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-3 py-2 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
                          title="Add to Cart"
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
                          {crop.quantity <= 0 ? 'Out of Stock' : 'Buy Now'}
                      </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Stats */}
        <div className="mt-8 flex justify-center gap-8 text-center">
          <div>
            <p className="text-2xl font-bold text-agri-green-light">{availableCrops.length}</p>
            <p className="text-white/70 text-sm">Total Crops</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-agri-green-light">{filteredCrops.length}</p>
            <p className="text-white/70 text-sm">Showing</p>
          </div>
        </div>
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
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Purchase {selectedCrop.crop}</h3>
                <button
                  onClick={closePurchaseModal}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Crop Details */}
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

              {/* Quantity Selector */}
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

              {/* Total Price */}
              <div className="mb-6 p-4 bg-agri-green/20 border border-agri-green/30 rounded-lg">
                <div className="flex justify-between items-center text-white">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-2xl font-bold text-agri-green-light">
                    {(selectedCrop.price * purchaseQuantity).toFixed(2)} Rs
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
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

export default ConsumerList;
