import express from 'express';
import {
  getCrops,
  getCrop,
  createCrop,
  updateCrop,
  deleteCrop,
  getMyCrops,
  uploadCropImage,
  deleteCropImage,
} from '../controllers/cropController.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.route('/')
  .get(getCrops)
  .post(protect, createCrop);

router.route('/my-crops')
  .get(protect, getMyCrops);

router.route('/:id')
  .get(getCrop)
  .put(protect, updateCrop)
  .delete(protect, deleteCrop);

router.route('/:id/images')
  .post(protect, upload.array('images', 5), uploadCropImage);

router.route('/:id/images/:imageIndex')
  .delete(protect, deleteCropImage);

export default router;

