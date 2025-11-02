import { pool } from '../config/database.js';

// @desc    Get all crops
// @route   GET /api/crops
// @access  Public
export const getCrops = async (req, res) => {
  try {
    const [crops] = await pool.query('SELECT * FROM crops WHERE available = TRUE');
    
    res.status(200).json({
      success: true,
      count: crops.length,
      data: crops,
    });
  } catch (error) {
    console.error('Get crops error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single crop
// @route   GET /api/crops/:id
// @access  Public
export const getCrop = async (req, res) => {
  try {
    const [crops] = await pool.query('SELECT * FROM crops WHERE id = ?', [req.params.id]);
    
    if (crops.length === 0) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    res.status(200).json({
      success: true,
      data: crops[0],
    });
  } catch (error) {
    console.error('Get crop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new crop
// @route   POST /api/crops
// @access  Private
export const createCrop = async (req, res) => {
  try {
    const { crop, quantity, location, price, description, category } = req.body;

    if (!crop || !quantity || !location || !price) {
      return res.status(400).json({ 
        message: 'Please provide crop, quantity, location, and price' 
      });
    }

    const [users] = await pool.query('SELECT name FROM users WHERE id = ?', [req.user.id]);
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const [result] = await pool.query(
      'INSERT INTO crops (farmerName, userId, crop, quantity, location, price, description, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [users[0].name, req.user.id, crop, quantity, location, price, description || '', category || 'other']
    );

    const [newCrops] = await pool.query('SELECT * FROM crops WHERE id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'Crop added successfully',
      data: newCrops[0],
    });
  } catch (error) {
    console.error('Create crop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update crop
// @route   PUT /api/crops/:id
// @access  Private
export const updateCrop = async (req, res) => {
  try {
    const [crops] = await pool.query('SELECT * FROM crops WHERE id = ?', [req.params.id]);
    
    if (crops.length === 0) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    if (crops[0].userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this crop' });
    }

    const fields = Object.keys(req.body).filter(key => key !== 'id');
    const values = fields.map(field => req.body[field]);
    values.push(req.params.id);

    await pool.query(
      `UPDATE crops SET ${fields.map(f => `${f} = ?`).join(', ')} WHERE id = ?`,
      values
    );

    const [updated] = await pool.query('SELECT * FROM crops WHERE id = ?', [req.params.id]);

    res.status(200).json({
      success: true,
      message: 'Crop updated successfully',
      data: updated[0],
    });
  } catch (error) {
    console.error('Update crop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete crop
// @route   DELETE /api/crops/:id
// @access  Private
export const deleteCrop = async (req, res) => {
  try {
    const [crops] = await pool.query('SELECT * FROM crops WHERE id = ?', [req.params.id]);
    
    if (crops.length === 0) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    if (crops[0].userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this crop' });
    }

    await pool.query('DELETE FROM crops WHERE id = ?', [req.params.id]);

    res.status(200).json({
      success: true,
      message: 'Crop deleted successfully',
    });
  } catch (error) {
    console.error('Delete crop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get crops by farmer
// @route   GET /api/crops/my-crops
// @access  Private
export const getMyCrops = async (req, res) => {
  try {
    const [crops] = await pool.query('SELECT * FROM crops WHERE userId = ?', [req.user.id]);

    res.status(200).json({
      success: true,
      count: crops.length,
      data: crops,
    });
  } catch (error) {
    console.error('Get my crops error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Stub methods for now
export const uploadCropImage = async (req, res) => {
  res.status(200).json({ message: 'Image upload not implemented yet' });
};

export const deleteCropImage = async (req, res) => {
  res.status(200).json({ message: 'Image delete not implemented yet' });
};
