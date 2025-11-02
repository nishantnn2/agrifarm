import express from 'express';
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  updatePaymentStatus,
  getOrderStats,
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All order routes require authentication

router.route('/')
  .get(getOrders)
  .post(createOrder);

router.route('/stats')
  .get(getOrderStats);

router.route('/:id')
  .get(getOrder);

router.route('/:id/status')
  .put(updateOrderStatus);

router.route('/:id/payment')
  .put(updatePaymentStatus);

export default router;

