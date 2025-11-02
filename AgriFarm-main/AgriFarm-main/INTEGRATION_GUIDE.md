# 🔗 Backend Integration Guide

This guide explains how to integrate the backend API with the existing AgriFarm frontend.

## 📋 Prerequisites

1. **MongoDB Atlas Account**: Set up a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Cloudinary Account**: Sign up for a free account at [Cloudinary](https://cloudinary.com/)
3. **Node.js**: Ensure Node.js v14+ is installed

## 🚀 Backend Setup

### Step 1: Install Backend Dependencies

```bash
cd AgriFarm-main/backend
npm install
```

### Step 2: Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agrifarm?retryWrites=true&w=majority

# JWT Secret (use a random strong string)
JWT_SECRET=your_super_secret_jwt_key_change_this_to_a_random_string

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Node Environment
NODE_ENV=development
```

**Important**: Replace all placeholder values with your actual credentials!

### Step 3: Start the Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The backend will start on `http://localhost:5000`

## 🔧 Frontend Configuration

### Step 1: Add Environment Variable

Create a `.env` file in the frontend root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 2: Update Frontend Contexts

The `AuthContext.jsx` has already been updated to use the backend API. 

For `AgriContext.jsx`, you can either:

**Option A**: Keep using localStorage (current setup - faster for development)

**Option B**: Integrate fully with backend API (recommended for production)

## 📡 API Integration Examples

### Authentication Example

The frontend automatically handles authentication:

```javascript
// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
const { token, user } = await response.json();

// Use token in subsequent requests
fetch('http://localhost:5000/api/crops', {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### Crop Management Example

```javascript
// Get all crops
const response = await fetch('http://localhost:5000/api/crops');

// Add crop
const response = await fetch('http://localhost:5000/api/crops', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    crop: 'Wheat',
    quantity: 500,
    location: 'Iowa, USA',
    price: 300,
    category: 'grain'
  })
});
```

### Cart Management Example

```javascript
// Add to cart
const response = await fetch('http://localhost:5000/api/cart', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    cropId: 'crop_id_here',
    quantity: 2
  })
});
```

### Image Upload Example

```javascript
const formData = new FormData();
formData.append('images', fileInput.files[0]);

const response = await fetch('http://localhost:5000/api/crops/crop_id/images', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

## 🔑 Key Features

### Backend Routes

- **Authentication**: `/api/auth/*`
  - POST `/api/auth/register` - Register new user
  - POST `/api/auth/login` - Login user
  - GET `/api/auth/me` - Get current user
  - PUT `/api/auth/profile` - Update profile

- **Crops**: `/api/crops/*`
  - GET `/api/crops` - List all crops (with filters)
  - GET `/api/crops/:id` - Get single crop
  - POST `/api/crops` - Create crop (Protected)
  - PUT `/api/crops/:id` - Update crop (Protected)
  - DELETE `/api/crops/:id` - Delete crop (Protected)
  - GET `/api/crops/my-crops` - Get my crops (Protected)
  - POST `/api/crops/:id/images` - Upload images (Protected)

- **Cart**: `/api/cart/*`
  - GET `/api/cart` - Get cart (Protected)
  - POST `/api/cart` - Add to cart (Protected)
  - PUT `/api/cart/:itemId` - Update item (Protected)
  - DELETE `/api/cart/:itemId` - Remove item (Protected)

- **Orders**: `/api/orders/*`
  - GET `/api/orders` - Get orders (Protected)
  - POST `/api/orders` - Create order (Protected)
  - GET `/api/orders/:id` - Get single order (Protected)

### Security Features

- Passwords are hashed using bcryptjs
- JWT tokens expire after 30 days
- Protected routes require authentication
- Role-based access control (farmer/consumer)
- Input validation on all endpoints

### Image Upload

- Images are stored in Cloudinary
- Automatic image optimization
- Support for multiple image uploads
- Automatic cleanup on deletion

## 🧪 Testing the Backend

### Using curl

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","userType":"farmer"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get crops (requires token)
curl -X GET http://localhost:5000/api/crops \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Import the Postman collection (if provided)
2. Set environment variables
3. Run requests in sequence

## 🔍 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
- Check your connection string
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify network access is not restricted

**2. Cloudinary Upload Fails**
- Verify API credentials are correct
- Check Cloudinary dashboard for errors
- Ensure file format is supported

**3. JWT Token Expired**
- User needs to login again
- Tokens expire after 30 days
- Check system clock is synchronized

**4. CORS Errors**
- Backend CORS is configured for all origins
- Check browser console for specific errors
- Verify backend is running

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [JWT Documentation](https://jwt.io/)

## 🎯 Next Steps

1. Set up MongoDB Atlas cluster
2. Configure Cloudinary account
3. Add environment variables
4. Start backend server
5. Test API endpoints
6. Update frontend to use API
7. Deploy to production

## 🚢 Deployment

For production deployment:

1. **Backend**: Deploy to platforms like Heroku, Vercel, or AWS
2. **Database**: MongoDB Atlas (already cloud-hosted)
3. **Storage**: Cloudinary (already cloud-hosted)
4. **Frontend**: Deploy to Vercel, Netlify, or similar

Remember to:
- Use strong JWT secrets in production
- Set NODE_ENV to 'production'
- Configure CORS for your domain
- Set up environment variables on your host
- Enable HTTPS
- Set up monitoring and logging

## 💡 Tips

1. Start with the development setup
2. Test all endpoints thoroughly
3. Use Postman or similar tools for testing
4. Monitor console logs for errors
5. Check MongoDB Atlas for data persistence
6. Verify Cloudinary uploads work correctly

---

For questions or issues, check the backend README or open an issue.

