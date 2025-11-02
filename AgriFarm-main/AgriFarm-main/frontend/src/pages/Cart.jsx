import { motion } from 'framer-motion';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAgriContext } from '../context/AgriContext';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
  const { cartItems, availableCrops, removeFromCart, updateCartQuantity, getCartTotal, clearCart, purchaseCartItems } = useAgriContext();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Get updated crop data with current availability
  const getUpdatedCartItems = () => {
    return cartItems.map(item => {
      const updatedCrop = availableCrops.find(c => c.id === item.crop.id);
      return {
        ...item,
        crop: updatedCrop || item.crop,
      };
    }).filter(item => item.crop && item.crop.quantity > 0);
  };

  const updatedCartItems = getUpdatedCartItems();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Please login to checkout');
      navigate('/login');
      return;
    }
    
    if (updatedCartItems.length === 0) {
      alert('Your cart is empty or items are out of stock!');
      if (cartItems.length > updatedCartItems.length) {
        // Clear items that are no longer available
        cartItems.forEach(item => {
          const updated = updatedCartItems.find(u => u.crop.id === item.crop.id);
          if (!updated) {
            removeFromCart(item.crop.id);
          }
        });
      }
      return;
    }

    purchaseCartItems();
    alert('Order placed successfully!');
    navigate('/dashboard');
  };

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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-dark rounded-2xl p-8 shadow-xl mb-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-8 h-8 text-agri-green-light" />
                  <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
                </div>
                <button
                  onClick={() => navigate('/consumer')}
                  className="flex items-center gap-2 px-4 py-2 text-white hover:text-agri-green-light transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </button>
              </div>

              {/* Cart Items */}
              {updatedCartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-white/30" />
                  <p className="text-white/70 text-xl mb-4">Your cart is empty</p>
                  <button
                    onClick={() => navigate('/consumer')}
                    className="px-6 py-3 bg-agri-green hover:bg-agri-green-light text-white rounded-lg transition-colors"
                  >
                    Browse Crops
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {updatedCartItems.map((item, index) => (
                    <motion.div
                      key={item.crop.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-lg p-6 border border-white/10 flex flex-col md:flex-row gap-4"
                    >
                      {/* Crop Info */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{item.crop.crop}</h3>
                        <p className="text-white/70 mb-1">Farmer: {item.crop.farmerName}</p>
                        <p className="text-white/70 mb-1">Location: {item.crop.location}</p>
                        <p className="text-agri-green-light font-bold text-lg mb-1">
                          Rs {item.crop.price} per kg
                        </p>
                        <p className="text-white/60 text-sm">
                          Available: {item.crop.quantity} kg
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateCartQuantity(item.crop.id, item.quantity - 1)}
                            className="bg-agri-green hover:bg-agri-green-light text-white p-2 rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-semibold text-lg min-w-[3rem] text-center">
                            {item.quantity} kg
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.crop.id, item.quantity + 1)}
                            disabled={item.quantity >= item.crop.quantity}
                            className="bg-agri-green hover:bg-agri-green-light text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Subtotal */}
                        <div className="text-right min-w-[120px]">
                          <p className="text-white/70 text-sm mb-1">Subtotal</p>
                          <p className="text-agri-green-light font-bold text-xl">
                            Rs {(item.crop.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.crop.id)}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Checkout Summary */}
            {updatedCartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-dark rounded-2xl p-8 shadow-xl"
              >
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-white">
                    <span className="text-lg">Items ({updatedCartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    <span className="font-semibold">Rs {getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white">
                    <span className="text-lg">Shipping</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="border-t border-white/20 pt-4 flex justify-between">
                    <span className="text-xl font-bold text-white">Total</span>
                    <span className="text-2xl font-bold text-agri-green-light">
                      Rs {getCartTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={clearCart}
                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="flex-1 px-6 py-3 bg-agri-green hover:bg-agri-green-light text-white rounded-lg glow-green-hover transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                  >
                    <CreditCard className="w-5 h-5" />
                    Checkout
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Cart;

