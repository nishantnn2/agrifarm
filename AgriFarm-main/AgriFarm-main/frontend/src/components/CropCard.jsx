import { motion } from 'framer-motion';
import { ShoppingBag, ShoppingCart, MapPin, Package } from 'lucide-react';

const CropCard = ({ crop, onAddToCart, onBuyNow, index }) => {
  const getCropIcon = (cropName) => {
    const name = cropName.toLowerCase();
    if (name.includes('wheat') || name.includes('corn') || name.includes('rice')) return '🌾';
    if (name.includes('tomato') || name.includes('vegetable')) return '🍅';
    if (name.includes('fruit') || name.includes('apple') || name.includes('orange')) return '🍎';
    return '🌱';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-dark rounded-xl p-6 border border-white/10 hover:border-agri-green/50 transition-all duration-300 group"
    >
      {/* Crop Icon and Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-5xl">{getCropIcon(crop.crop)}</div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          crop.quantity > 100 
            ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
            : crop.quantity > 0 
            ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
            : 'bg-red-500/20 text-red-300 border border-red-500/30'
        }`}>
          {crop.quantity > 0 ? `${crop.quantity} kg` : 'Out of Stock'}
        </span>
      </div>

      {/* Crop Name */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-agri-green-light transition-colors">
        {crop.crop}
      </h3>

      {/* Farmer Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <span className="font-semibold text-white/90">👨‍🌾</span>
          <span>{crop.farmerName}</span>
        </div>
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <MapPin className="w-4 h-4 text-agri-green" />
          <span>{crop.location}</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-agri-green-light">
            ₹{crop.price}
          </span>
          <span className="text-white/60 text-sm">/kg</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onAddToCart(crop)}
          disabled={crop.quantity <= 0}
          className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
        >
          <ShoppingBag className="w-4 h-4" />
          Add
        </button>
        <button
          onClick={() => onBuyNow(crop)}
          disabled={crop.quantity <= 0}
          className="flex-1 px-4 py-2 bg-agri-green hover:bg-agri-green-light text-white rounded-lg glow-green-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm font-medium"
        >
          <ShoppingCart className="w-4 h-4" />
          Buy
        </button>
      </div>
    </motion.div>
  );
};

export default CropCard;

