// src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

const { protect, restrictTo } = require('../middlewares/authMiddleware');
 
router.post('/tasks', protect, restrictTo('admin'), adminController.createTask);
 
module.exports = router;
