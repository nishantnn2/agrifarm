# 🌾 AgriFarm - Complete Project

A full-stack agricultural marketplace connecting farmers directly with consumers.

## 📁 Project Structure

```
AgriFarm-main/
├── backend/              # Node.js/Express Backend API
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── server.js        # Main server file
│   └── package.json     # Backend dependencies
│
├── frontend/            # React Frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Context providers
│   │   ├── pages/       # Page components
│   │   └── config/      # Configuration
│   ├── public/          # Static assets
│   └── package.json     # Frontend dependencies
│
├── BACKEND_SETUP.md     # Backend setup instructions
├── INTEGRATION_GUIDE.md # Complete integration guide
└── PROJECT_README.md    # This file
```

## 🚀 Quick Start

### Frontend Only (Development)
```bash
cd frontend
npm install
npm run dev
```

### Full Stack (With Backend)
```bash
# Backend
cd backend
npm install
# Configure .env file
npm run dev

# Frontend (new terminal)
cd frontend
npm install
# Configure .env file
npm run dev
```

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Context API** - State management

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image storage
- **Multer** - File upload

## 📚 Documentation

### Setup Guides
- `BACKEND_SETUP.md` - Backend installation and configuration
- `INTEGRATION_GUIDE.md` - Complete integration walkthrough

### Key Features

#### Authentication
- User registration and login
- JWT-based authentication
- Role-based access (farmer/consumer)
- Secure password hashing

#### Crop Management
- Add, edit, delete crops
- Image upload to Cloudinary
- Search and filter crops
- Category-based organization

#### Shopping Cart
- Add/remove items
- Update quantities
- Real-time stock checking
- Persistent cart storage

#### Orders
- Create orders from cart
- Track order status
- Payment status management
- Order history

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ Role-based access control
- ✅ Input validation
- ✅ CORS configuration
- ✅ Secure file uploads

## 🌐 API Endpoints

### Base URL
`http://localhost:5000/api`

### Authentication
```
POST   /auth/register       Register new user
POST   /auth/login          Login user
GET    /auth/me             Get current user
PUT    /auth/profile        Update profile
```

### Crops
```
GET    /crops               List all crops
GET    /crops/:id           Get crop details
POST   /crops               Create crop (Protected)
PUT    /crops/:id           Update crop (Protected)
DELETE /crops/:id           Delete crop (Protected)
GET    /crops/my-crops      Get my crops (Protected)
POST   /crops/:id/images    Upload images (Protected)
```

### Cart
```
GET    /cart                Get cart (Protected)
POST   /cart                Add to cart (Protected)
PUT    /cart/:itemId        Update item (Protected)
DELETE /cart/:itemId        Remove item (Protected)
```

### Orders
```
GET    /orders              Get orders (Protected)
GET    /orders/:id          Get order (Protected)
POST   /orders              Create order (Protected)
PUT    /orders/:id/status   Update status (Protected)
```

## 🔧 Configuration

### Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
NODE_ENV=development
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

## 📦 Installation

### Prerequisites
- Node.js v14+
- MongoDB Atlas account
- Cloudinary account
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
# Create .env file
# Add MongoDB and Cloudinary credentials
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
# Create .env file
# Add API URL
npm run dev
```

## 🧪 Testing

### Manual Testing
- Use Postman for API testing
- Browser DevTools for frontend
- MongoDB Compass for database

### Test Credentials
After first run, you can register users or use the demo accounts if provided.

## 🚢 Deployment

### Recommended Platforms
- **Frontend**: Vercel, Netlify
- **Backend**: Heroku, Railway, Render
- **Database**: MongoDB Atlas (cloud)
- **Storage**: Cloudinary (cloud)

### Production Checklist
- [ ] Use strong JWT secret
- [ ] Configure CORS for domain
- [ ] Set NODE_ENV to production
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Configure logging
- [ ] Backup database
- [ ] Set up CI/CD

## 📈 Features Roadmap

### Completed ✅
- User authentication
- Crop CRUD operations
- Shopping cart
- Order management
- Image uploads
- Search and filtering

### Planned 🔄
- Payment integration
- Email notifications
- Reviews and ratings
- Analytics dashboard
- Real-time chat
- Mobile app

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - feel free to use for learning and projects

## 🙏 Acknowledgments

- React team for amazing framework
- MongoDB for Atlas platform
- Cloudinary for image services
- All open-source contributors

---

**Built with ❤️ for farmers and consumers**

