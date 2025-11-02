import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sprout } from 'lucide-react';

const AnimatedLogo = ({ className = '', size = 'md' }) => {
  const letters = 'AgriFarm'.split('');

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    initial: {
      y: -20,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  };

  const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-xl';

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <motion.div
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: 0.3,
        }}
        whileHover={{ 
          rotate: 360, 
          scale: 1.2,
          transition: { duration: 0.6 }
        }}
      >
        <Sprout className={`${iconSize} text-agri-green-light`} />
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="flex items-center"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            whileHover="hover"
            className={`font-bold ${textSize} ${
              index < 4 ? 'text-agri-green' : 'text-agri-green-light'
            }`}
            style={{
              textShadow: '0 0 10px rgba(67, 160, 71, 0.5)',
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.div>
    </Link>
  );
};

export default AnimatedLogo;

