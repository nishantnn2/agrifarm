import { motion } from 'framer-motion';
import { useAgriContext } from '../context/AgriContext';

const StatsSection = () => {
  const { availableCrops } = useAgriContext();

  const stats = [
    { label: 'Active Farmers', value: '500+', suffix: '', icon: '👨‍🌾' },
    { label: 'Crops Available', value: availableCrops.length, suffix: '+', icon: '🌾' },
    { label: 'Happy Customers', value: '10K+', suffix: '', icon: '😊' },
    { label: 'Orders Delivered', value: '50K+', suffix: '', icon: '📦' },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-agri-green/20 via-agri-green-light/20 to-agri-green/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

