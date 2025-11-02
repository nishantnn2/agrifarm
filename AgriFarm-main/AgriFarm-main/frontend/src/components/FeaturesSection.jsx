import { motion } from 'framer-motion';
import { Users, TrendingUp, Shield, Zap, Heart, Globe } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Direct Connection',
      description: 'Connect directly with farmers, no middlemen involved',
      color: 'text-blue-400',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Fair Pricing',
      description: 'Get competitive prices with transparent market rates',
      color: 'text-green-400',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Verified Farmers',
      description: 'All farmers are verified for quality and authenticity',
      color: 'text-purple-400',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Quick and efficient delivery system for fresh produce',
      color: 'text-yellow-400',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Community Support',
      description: 'Support local farmers and strengthen communities',
      color: 'text-red-400',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Wide Selection',
      description: 'Browse through diverse crops from different regions',
      color: 'text-cyan-400',
    },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose <span className="text-agri-green-light">AgriFarm</span>?
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Experience the future of agriculture with our innovative platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-dark rounded-2xl p-8 border border-white/10 hover:border-agri-green/50 transition-all duration-300 group"
            >
              <div className={`inline-flex p-4 rounded-xl bg-white/5 mb-4 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-agri-green-light transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

