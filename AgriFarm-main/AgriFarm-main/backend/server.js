import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Import database
import { connectDB } from './config/database.js';

// Import routes
import authRoutes from './routes/auth.js';
import cropRoutes from './routes/crops.js';
import orderRoutes from './routes/orders.js';
import cartRoutes from './routes/cart.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'AgriFarm API is running',
    timestamp: new Date().toISOString()
  });
});

// Connect to database and start server
connectDB();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

