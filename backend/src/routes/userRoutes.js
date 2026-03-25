// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// GET /api/users
router.get('/users', userController.getUsers);
router.patch('/change-password', protect, userController.changePassword);
router.delete('/delete-account', protect, userController.deleteAccount);

module.exports = router;