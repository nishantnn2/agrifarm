import API_BASE_URL from '../config/api.js';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    const errorWithStatus = new Error(error.message || `HTTP error! status: ${response.status}`);
    errorWithStatus.status = response.status;
    throw errorWithStatus;
  }

  return response.json();
};

// Crop API functions
export const cropAPI = {
  // Get all available crops
  getAllCrops: async () => {
    const data = await apiRequest('/crops');
    return data.data || [];
  },

  // Get single crop by ID
  getCropById: async (id) => {
    const data = await apiRequest(`/crops/${id}`);
    return data.data;
  },

  // Create new crop (requires auth)
  createCrop: async (cropData) => {
    const data = await apiRequest('/crops', {
      method: 'POST',
      body: JSON.stringify(cropData),
    });
    return data.data;
  },

  // Update crop (requires auth)
  updateCrop: async (id, cropData) => {
    const data = await apiRequest(`/crops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cropData),
    });
    return data.data;
  },

  // Delete crop (requires auth)
  deleteCrop: async (id) => {
    const data = await apiRequest(`/crops/${id}`, {
      method: 'DELETE',
    });
    return data;
  },

  // Get my crops (requires auth)
  getMyCrops: async () => {
    const data = await apiRequest('/crops/my-crops');
    return data.data || [];
  },
};

// Auth API functions
export const authAPI = {
  // Register new user
  register: async (userData) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return data;
  },

  // Login user
  login: async (credentials) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return data;
  },

  // Get current user (requires auth)
  getMe: async () => {
    const data = await apiRequest('/auth/me');
    return data.data;
  },

  // Update profile (requires auth)
  updateProfile: async (profileData) => {
    const data = await apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
    return data.data;
  },
};

// Cart API functions
export const cartAPI = {
  // Get cart items (requires auth)
  getCart: async () => {
    const data = await apiRequest('/cart');
    return data.data || [];
  },

  // Add item to cart (requires auth)
  addToCart: async (cropId, quantity = 1) => {
    const data = await apiRequest('/cart', {
      method: 'POST',
      body: JSON.stringify({ cropId, quantity }),
    });
    return data.data;
  },

  // Update cart item (requires auth)
  updateCartItem: async (itemId, quantity) => {
    const data = await apiRequest(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
    return data.data;
  },

  // Remove item from cart (requires auth)
  removeFromCart: async (itemId) => {
    const data = await apiRequest(`/cart/${itemId}`, {
      method: 'DELETE',
    });
    return data;
  },

  // Clear cart (requires auth)
  clearCart: async () => {
    const data = await apiRequest('/cart', {
      method: 'DELETE',
    });
    return data;
  },
};

// Order API functions
export const orderAPI = {
  // Get all orders (requires auth)
  getOrders: async () => {
    const data = await apiRequest('/orders');
    return data.data || [];
  },

  // Get single order (requires auth)
  getOrderById: async (id) => {
    const data = await apiRequest(`/orders/${id}`);
    return data.data;
  },

  // Create new order (requires auth)
  createOrder: async (orderData) => {
    const data = await apiRequest('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
    return data.data;
  },

  // Update order status (requires auth)
  updateOrderStatus: async (id, status) => {
    const data = await apiRequest(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
    return data.data;
  },
};

