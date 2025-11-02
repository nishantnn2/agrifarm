# 🚀 Backend Setup Instructions

## Quick Start

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
Create a `.env` file in the `backend` directory with the following content:

```env
# Server Configuration
PORT=5000

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agrifarm?retryWrites=true&w=majority

# JWT Secret (IMPORTANT: Use a strong random string in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this_to_random_string

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Node Environment
NODE_ENV=development
```

**⚠️ CRITICAL**: Replace all placeholder values with your actual credentials!

### 4. Start Backend Server
```bash
# Development mode (auto-restarts on file changes)
npm run dev

# OR Production mode
npm start
```

The backend will be running on `http://localhost:5000`

### 5. Frontend Configuration
Create a `.env` file in the frontend root with:
```env
VITE_API_URL=http://localhost:5000/api
```

## 📋 MongoDB Atlas Setup

1. **Sign up**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create Cluster**: Choose free tier
3. **Add User**: Create database user with username and password
4. **Whitelist IP**: Add `0.0.0.0/0` for testing (restrict in production)
5. **Get Connection String**: Copy connection string from Atlas dashboard
6. **Update .env**: Replace `username` and `password` in MONGODB_URI

### Connection String Format:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/agrifarm?retryWrites=true&w=majority
```

## ☁️ Cloudinary Setup

1. **Sign up**: Go to [Cloudinary](https://cloudinary.com/)
2. **Get Credentials**: From dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret
3. **Update .env**: Add credentials to your `.env` file

### Example:
```env
CLOUDINARY_CLOUD_NAME=demo_cloud
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

## 🔐 Generate JWT Secret

For production, generate a strong random secret:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use online tool
# Visit: https://www.uuidgenerator.net/
```

## ✅ Verify Installation

1. Start backend: `npm run dev`
2. Check console for: `MongoDB Connected: ...`
3. Test health endpoint: Visit `http://localhost:5000/api/health`
4. You should see: `{"status":"OK","message":"AgriFarm API is running"}`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Crops
- `GET /api/crops` - List all crops
- `GET /api/crops/:id` - Get crop details
- `POST /api/crops` - Add crop (Protected)
- `PUT /api/crops/:id` - Update crop (Protected)
- `DELETE /api/crops/:id` - Delete crop (Protected)

### Cart
- `GET /api/cart` - Get cart (Protected)
- `POST /api/cart` - Add to cart (Protected)
- `DELETE /api/cart/:itemId` - Remove from cart (Protected)

### Orders
- `GET /api/orders` - Get orders (Protected)
- `POST /api/orders` - Create order (Protected)

## 🔧 Troubleshooting

### MongoDB Connection Error
- Verify connection string is correct
- Check IP whitelist in Atlas
- Ensure network access is not blocked
- Try connection from MongoDB Compass

### Cloudinary Upload Error
- Verify API credentials
- Check Cloudinary dashboard for errors
- Ensure image format is supported (jpg, png, webp)
- Check file size limits

### Port Already in Use
```bash
# Kill process on port 5000
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

### Module Not Found
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📖 Testing

### Using curl
```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123","userType":"farmer"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

## 🎯 Next Steps

1. ✅ Backend running
2. ✅ MongoDB connected
3. ✅ Cloudinary configured
4. ⏭️ Test API endpoints
5. ⏭️ Integrate with frontend
6. ⏭️ Deploy to production

## 📞 Need Help?

- Check backend logs for errors
- Verify all environment variables
- Test API endpoints with Postman
- Review MongoDB Atlas logs
- Check Cloudinary console

---

For detailed integration instructions, see `INTEGRATION_GUIDE.md`

