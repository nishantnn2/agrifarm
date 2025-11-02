import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAgriContext } from '../context/AgriContext';
import { useNavigate } from 'react-router-dom';

const FarmerForm = () => {
  const { user } = useAuth();
  const { addFarmerCrop } = useAgriContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    cropName: '',
    quantity: '',
    location: '',
    price: '',
  });
  const [isListening, setIsListening] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const [success, setSuccess] = useState(false);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setFormData((prev) => ({
          ...prev,
          cropName: prev.cropName + ' ' + transcript,
        }));
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Voice recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  // Update name when user changes
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
      }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If user is not logged in, redirect to login
    if (!user) {
      navigate('/login');
      return;
    }

    const cropData = {
      farmerName: formData.name || user.name,
      crop: formData.cropName,
      quantity: parseInt(formData.quantity),
      location: formData.location,
      price: formData.price ? parseFloat(formData.price) : Math.floor(Math.random() * 500) + 100, // Default price if not provided
      userId: user.id,
      description: formData.description || '',
      category: formData.category || 'other',
    };

    try {
      // Add crop via API (this will automatically refresh the crops list)
      const newCrop = await addFarmerCrop(cropData);
      setSubmittedData({
        ...cropData,
        id: newCrop.id,
      });
      setSuccess(true);

      // Reset form
      setFormData({
        name: user.name,
        cropName: '',
        quantity: '',
        location: '',
        price: '',
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
        setSubmittedData(null);
      }, 5000);
    } catch (error) {
      console.error('Error submitting crop:', error);
      alert(`Failed to add crop: ${error.message || 'Please try again'}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-dark rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Register Your Crop
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Farmer Name */}
          <div>
            <label className="block text-white font-medium mb-2">
              Farmer Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={!!user}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-agri-green-light disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your name"
            />
            {user && (
              <p className="text-white/60 text-sm mt-1">
                Using your account name. Logout to use a different name.
              </p>
            )}
          </div>

          {/* Crop Name with Voice Input */}
          <div>
            <label className="block text-white font-medium mb-2">
              Crop Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="cropName"
                value={formData.cropName}
                onChange={handleInputChange}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-agri-green-light"
                placeholder="Enter crop name or use voice input"
              />
              <button
                type="button"
                onClick={handleVoiceInput}
                className={`px-4 py-3 rounded-lg transition-all ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 glow-green'
                    : 'bg-agri-green hover:bg-agri-green-light glow-green-hover'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5 text-white animate-pulse" />
                ) : (
                  <Mic className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
            {isListening && (
              <p className="text-red-400 text-sm mt-2 animate-pulse">
                Listening...
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-white font-medium mb-2">
              Quantity (kg)
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-agri-green-light"
              placeholder="Enter quantity"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-white font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-agri-green-light"
              placeholder="Enter your location"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-white font-medium mb-2">
              Price per kg ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-agri-green-light"
              placeholder="Enter price per kg (optional)"
            />
            <p className="text-white/60 text-sm mt-1">
              Leave empty for auto-generated price
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-agri-green hover:bg-agri-green-light text-white font-semibold py-3 px-6 rounded-lg glow-green-hover transition-all duration-300"
          >
            Submit Crop Details
          </button>
        </form>

        {/* Success Message */}
        {success && submittedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-green-500/20 rounded-lg border border-green-500/30"
          >
            <h3 className="text-xl font-bold text-white mb-4">
              ✓ Crop Registered Successfully!
            </h3>
            <div className="space-y-2 text-white">
              <p><span className="font-semibold">Farmer:</span> {submittedData.farmerName}</p>
              <p><span className="font-semibold">Crop:</span> {submittedData.crop}</p>
              <p><span className="font-semibold">Quantity:</span> {submittedData.quantity} kg</p>
              <p><span className="font-semibold">Location:</span> {submittedData.location}</p>
              <p><span className="font-semibold">Price:</span> ${submittedData.price} per kg</p>
            </div>
            <button
              onClick={() => navigate('/consumer')}
              className="mt-4 px-4 py-2 bg-agri-green hover:bg-agri-green-light text-white rounded-lg transition-colors"
            >
              View in Marketplace
            </button>
          </motion.div>
        )}

        {/* Login Prompt */}
        {!user && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-yellow-500/20 rounded-lg border border-yellow-500/30"
          >
            <p className="text-white mb-4">
              💡 <strong>Tip:</strong> Log in to automatically link your crops to your account and track them in your dashboard.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-agri-green hover:bg-agri-green-light text-white rounded-lg transition-colors"
            >
              Login or Sign Up
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default FarmerForm;

