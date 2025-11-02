import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/farm-hero.mp4" type="video/mp4" />
          {/* Fallback gradient if video doesn't load */}
          <div className="w-full h-full bg-gradient-to-br from-green-100 via-green-300 to-green-500" />
        </video>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          Connecting Farmers and
          <br />
          <span className="text-agri-green-light">Consumers Directly</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl text-white/90 mb-10 max-w-3xl mx-auto"
        >
          Eliminating middlemen, promoting fair pricing, and building stronger
          communities through direct connections.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/farmer')}
            className="glass px-8 py-4 rounded-full text-white text-lg font-semibold flex items-center gap-2 glow-green-hover hover:bg-white/20 transition-all duration-300"
          >
            Register Crops
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          {!isAuthenticated && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="glass px-8 py-4 rounded-full text-white text-lg font-semibold flex items-center gap-2 glow-green-hover hover:bg-white/20 transition-all duration-300"
            >
              <LogIn className="w-5 h-5" />
              Login / Sign Up
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;

