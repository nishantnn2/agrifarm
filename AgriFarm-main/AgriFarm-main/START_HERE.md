# 👋 Welcome to AgriFarm!

## 🎉 What You Have

A **complete, full-stack agricultural marketplace** ready to use!

- ✅ **Frontend**: Modern React app with beautiful UI
- ✅ **Backend**: Production-ready Node.js/Express API
- ✅ **Database**: MongoDB models for all entities
- ✅ **Authentication**: JWT-based secure auth
- ✅ **Image Storage**: Cloudinary integration
- ✅ **Documentation**: Complete setup guides

## 🚀 Quick Start

### Option 1: Frontend Only (Current Setup)
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

### Option 2: Full Stack (Recommended)
```bash
# Terminal 1 - Backend
cd backend
npm install
# Create .env file (see BACKEND_SETUP.md)
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
# Create .env file
npm run dev
```

## 📚 Documentation

Choose your path:

### 🆕 New User?
Start here: **[INSTALLATION_CHECKLIST.md](INSTALLATION_CHECKLIST.md)**

### 🔧 Backend Setup?
Read this: **[BACKEND_SETUP.md](BACKEND_SETUP.md)**

### 🔗 Integration?
Follow this: **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)**

### 📖 Complete Info?
Read this: **[README_BACKEND.md](README_BACKEND.md)**

### 🎯 Overview?
Check this: **[PROJECT_README.md](PROJECT_README.md)**

## ⚡ 5-Minute Setup

### Step 1: Install Backend
```bash
cd backend
npm install
```

### Step 2: Configure Backend
Create `backend/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=development
```

### Step 3: Start Backend
```bash
npm run dev
```

### Step 4: Configure Frontend
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001/api
```

### Step 5: Start Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🎯 What's Included

### Backend Features
- ✅ User registration & authentication
- ✅ JWT token management
- ✅ Crop CRUD operations
- ✅ Shopping cart functionality
- ✅ Order management
- ✅ Image upload to Cloudinary
- ✅ Search & filtering
- ✅ Protected routes
- ✅ Error handling

### Frontend Features
- ✅ Beautiful UI with animations
- ✅ Responsive design
- ✅ Authentication pages
- ✅ Dashboard
- ✅ Marketplace
- ✅ Shopping cart
- ✅ Order history
- ✅ Toast notifications

## 📦 Tech Stack

**Frontend**
- React 19
- Vite
- Tailwind CSS
- Framer Motion
- React Router

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- JWT
- Cloudinary
- bcryptjs

## 🔑 Key Endpoints

```
Backend: http://localhost:3001
Frontend: http://localhost:5173

API Base: http://localhost:3001/api
```

### Main Routes
- `/api/auth/*` - Authentication
- `/api/crops/*` - Crop management
- `/api/cart/*` - Shopping cart
- `/api/orders/*` - Order management

## 🎓 Learning Resources

### MongoDB Atlas Setup
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to `.env`

### Cloudinary Setup
1. Go to https://cloudinary.com
2. Sign up for free account
3. Get credentials
4. Add to `.env`

## 🧪 Test Your Setup

```bash
# Health check
curl http://localhost:3001/api/health

# Register user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123","userType":"farmer"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'
```

## ✅ Success Checklist

- [ ] Backend runs without errors
- [ ] MongoDB Atlas connected
- [ ] Frontend loads in browser
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Can view crops
- [ ] Can add to cart
- [ ] Can create orders

## 🐛 Having Issues?

1. Check [INSTALLATION_CHECKLIST.md](INSTALLATION_CHECKLIST.md)
2. Review error messages carefully
3. Verify environment variables
4. Check MongoDB connection
5. Test endpoints individually

## 🎊 Next Steps

Once running:

1. Explore the UI
2. Test all features
3. Customize design
4. Add new features
5. Deploy to production

## 📞 Need Help?

All the documentation you need is in this folder:
- Start with INSTALLATION_CHECKLIST.md
- Read BACKEND_SETUP.md for backend
- Follow INTEGRATION_GUIDE.md for integration
- Refer to README_BACKEND.md for API details

## 🚢 Ready to Deploy?

1. Configure production environment
2. Set up MongoDB Atlas security
3. Configure Cloudinary for production
4. Deploy backend to Heroku/Railway/Render
5. Deploy frontend to Vercel/Netlify
6. Enable HTTPS
7. Configure CORS

---

## 🎉 You're All Set!

**AgriFarm** is ready to use. Follow the guides above to get started!

**Happy coding! 🚀**

