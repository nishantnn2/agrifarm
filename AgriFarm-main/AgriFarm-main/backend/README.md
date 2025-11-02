# 🌾 AgriFarm Backend API

Backend API for AgriFarm platform built with Node.js, Express, and MongoDB Atlas.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)

## ✨ Features

- **User Authentication**: Register, login, and JWT-based authentication
- **Crop Management**: CRUD operations for crops with image upload
- **Shopping Cart**: Add, update, remove items from cart
- **Order Management**: Create orders, track status, payment management
- **Cloudinary Integration**: Image upload and storage
- **MongoDB Atlas**: Cloud database storage
- **Role-based Access**: Different permissions for farmers and consumers

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Cloudinary, Multer
- **Security**: bcryptjs for password hashing

## 📦 Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Configure your `.env` file with your MongoDB Atlas and Cloudinary credentials.

5. Start the development server:
```bash
npm run dev
```

Or start the production server:
```bash
npm start
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend root directory with the following variables:

```env
# Server Configuration
PORT=5000

# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agrifarm

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Node Environment
NODE_ENV=development
```

### MongoDB Atlas Setup

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add your IP address to the whitelist
5. Replace username and password in the connection string

### Cloudinary Setup

1. Create an account at [Cloudinary](https://cloudinary.com/)
2. Get your cloud name, API key, and API secret from the dashboard
3. Add them to your `.env` file

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `PUT /api/auth/profile` - Update user profile (Protected)

### Crops
- `GET /api/crops` - Get all crops (with filters)
- `GET /api/crops/:id` - Get single crop
- `POST /api/crops` - Create new crop (Protected)
- `PUT /api/crops/:id` - Update crop (Protected)
- `DELETE /api/crops/:id` - Delete crop (Protected)
- `GET /api/crops/my-crops` - Get my crops (Protected)
- `POST /api/crops/:id/images` - Upload crop images (Protected)
- `DELETE /api/crops/:id/images/:imageIndex` - Delete crop image (Protected)

### Cart
- `GET /api/cart` - Get cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:itemId` - Update cart item (Protected)
- `DELETE /api/cart/:itemId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)
- `GET /api/cart/summary` - Get cart summary (Protected)

### Orders
- `GET /api/orders` - Get all orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `POST /api/orders` - Create new order (Protected)
- `PUT /api/orders/:id/status` - Update order status (Protected)
- `PUT /api/orders/:id/payment` - Update payment status (Protected)
- `GET /api/orders/stats` - Get order statistics (Protected)

## 🔐 Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Roles

- **consumer**: Can browse, purchase crops, manage cart
- **farmer**: Can create, update, delete crops, manage orders

## 📁 Project Structure

```
backend/
├── config/
│   └── cloudinary.js      # Cloudinary configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── cropController.js  # Crop management logic
│   ├── cartController.js  # Cart management logic
│   └── orderController.js # Order management logic
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── User.js            # User model
│   ├── Crop.js            # Crop model
│   ├── Cart.js            # Cart model
│   └── Order.js           # Order model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── crops.js           # Crop routes
│   ├── cart.js            # Cart routes
│   └── orders.js          # Order routes
├── uploads/               # Local upload storage
├── .env                   # Environment variables
├── .gitignore
├── package.json
├── server.js              # Main server file
└── README.md
```

## 🚀 Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## 📝 Notes

- Password is hashed using bcryptjs before storage
- JWT tokens expire after 30 days
- Images are stored in Cloudinary
- Crop images are automatically resized and optimized

## 🤝 Contributing

This is a backend API for the AgriFarm platform. Feel free to enhance and extend as needed!

