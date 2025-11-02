import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { cropAPI } from '../services/api.js';

const AgriContext = createContext();

export const useAgriContext = () => {
  const context = useContext(AgriContext);
  if (!context) {
    throw new Error('useAgriContext must be used within AgriProvider');
  }
  return context;
};

export const AgriProvider = ({ children, user }) => {
  const [registeredFarmers, setRegisteredFarmers] = useState([]);
  const [availableCrops, setAvailableCrops] = useState([]);
  const [farmerCrops, setFarmerCrops] = useState([]); // User's listed crops (when in farmer role)
  const [cartItems, setCartItems] = useState([]); // Cart items with quantity
  const [purchasedCrops, setPurchasedCrops] = useState([]); // User's purchase history
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all available crops from API
  const fetchCrops = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const crops = await cropAPI.getAllCrops();
      setAvailableCrops(crops);
    } catch (err) {
      console.error('Error fetching crops:', err);
      setError(err.message);
      setAvailableCrops([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch farmer's own crops from API
  const fetchMyCrops = useCallback(async () => {
    if (!user) {
      setFarmerCrops([]);
      return;
    }

    try {
      const crops = await cropAPI.getMyCrops();
      setFarmerCrops(crops);
    } catch (err) {
      console.error('Error fetching my crops:', err);
      setFarmerCrops([]);
    }
  }, [user]);

  // Initial load - fetch crops on mount
  useEffect(() => {
    fetchCrops();
  }, [fetchCrops]);

  // Fetch farmer's crops when user changes
  useEffect(() => {
    if (user) {
      fetchMyCrops();
      // Load purchased crops for this user from localStorage (can be migrated to API later)
      const userPurchases = JSON.parse(localStorage.getItem(`agrifarm_purchases_${user.id}`) || '[]');
      setPurchasedCrops(userPurchases);

      // Load cart for this user from localStorage (can be migrated to API later)
      const userCart = JSON.parse(localStorage.getItem(`agrifarm_cart_${user.id}`) || '[]');
      setCartItems(userCart);
    } else {
      // Clear user-specific data when logged out
      setPurchasedCrops([]);
      setFarmerCrops([]);
      setCartItems([]);
    }
  }, [user, fetchMyCrops]);

  // Save purchased crops to localStorage (temporary until order API is fully integrated)
  useEffect(() => {
    if (user && purchasedCrops.length >= 0) {
      localStorage.setItem(`agrifarm_purchases_${user.id}`, JSON.stringify(purchasedCrops));
    }
  }, [purchasedCrops, user]);

  // Save cart to localStorage (temporary until cart API is fully integrated)
  useEffect(() => {
    if (user && cartItems.length >= 0) {
      localStorage.setItem(`agrifarm_cart_${user.id}`, JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  // Add new crop via API
  const addFarmerCrop = async (cropData) => {
    try {
      // Prepare crop data for API
      const apiCropData = {
        crop: cropData.crop,
        quantity: cropData.quantity,
        location: cropData.location,
        price: cropData.price,
        description: cropData.description || '',
        category: cropData.category || 'other',
      };

      // Create crop via API
      const newCrop = await cropAPI.createCrop(apiCropData);
      
      // Refresh crops list to include the new crop
      await fetchCrops();
      
      // Refresh farmer's crops if user is logged in
      if (user) {
        await fetchMyCrops();
      }
      
      setRegisteredFarmers([...registeredFarmers, cropData]);
      
      return newCrop;
    } catch (err) {
      console.error('Error adding crop:', err);
      throw err; // Re-throw so caller can handle error
    }
  };

  // Cart functions
  const addToCart = (crop, quantity = 1) => {
    const existingItem = cartItems.find(item => item.crop.id === crop.id);
    
    if (existingItem) {
      // If item exists, update quantity
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity <= crop.quantity) {
        setCartItems(cartItems.map(item =>
          item.crop.id === crop.id
            ? { ...item, quantity: newQuantity }
            : item
        ));
      }
    } else {
      // Add new item to cart
      if (quantity <= crop.quantity) {
        setCartItems([...cartItems, { crop, quantity }]);
      }
    }
  };

  const removeFromCart = (cropId) => {
    setCartItems(cartItems.filter(item => item.crop.id !== cropId));
  };

  const updateCartQuantity = (cropId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cropId);
      return;
    }
    const cartItem = cartItems.find(item => item.crop.id === cropId);
    if (cartItem && newQuantity <= cartItem.crop.quantity) {
      setCartItems(cartItems.map(item =>
        item.crop.id === cropId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.crop.price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const purchaseCrop = (crop) => {
    // Add to user's purchased crops
    const purchaseRecord = {
      ...crop,
      purchaseDate: new Date().toISOString(),
      purchaseId: Date.now(),
    };
    setPurchasedCrops([...purchasedCrops, purchaseRecord]);
    
    // Update available quantity in marketplace
    setAvailableCrops(availableCrops.map(c => 
      c.id === crop.id ? { ...c, quantity: c.quantity - 1 } : c
    ).filter(c => c.quantity > 0));
    
    // Also update in farmer crops if it's a user's own crop
    if (user && farmerCrops.some(fc => fc.id === crop.id)) {
      setFarmerCrops(farmerCrops.map(c => 
        c.id === crop.id ? { ...c, quantity: c.quantity - 1 } : c
      ).filter(c => c.quantity > 0));
    }
  };

  const purchaseCartItems = () => {
    // Purchase all items in cart and update available quantities properly
    cartItems.forEach(item => {
      const cropInStore = availableCrops.find(c => c.id === item.crop.id);
      if (cropInStore) {
        const quantityToPurchase = Math.min(item.quantity, cropInStore.quantity);
        for (let i = 0; i < quantityToPurchase; i++) {
          purchaseCrop(cropInStore);
        }
      }
    });
    clearCart();
    // Refresh crops to get updated quantities
    fetchCrops();
  };

  // Refresh crops function (can be called from components)
  const refreshCrops = useCallback(() => {
    fetchCrops();
    if (user) {
      fetchMyCrops();
    }
  }, [fetchCrops, fetchMyCrops, user]);

  const value = {
    registeredFarmers,
    availableCrops,
    purchasedCrops,
    farmerCrops, // User's own listed crops (when farmer)
    cartItems,
    loading,
    error,
    addFarmerCrop,
    purchaseCrop,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
    purchaseCartItems,
    refreshCrops, // Expose refresh function
  };

  return <AgriContext.Provider value={value}>{children}</AgriContext.Provider>;
};

