// src/controllers/userController.js
const User = require('../models/User');
const UserService = require('../services/userService');

exports.getUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('getUsers error', error);
    res.status(500).json({ message: error.message });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const userFound = await User.findById(id).select('-password -__v');

    if (!userFound) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(userFound);

  } catch (err) {
        console.error('Error in getUserById:', err);
        return res.status(500).json({ error: err.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Current and new password are required'
      });
    }

    const result = await UserService.changePassword(
      req.user._id,
      currentPassword,
      newPassword
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete the Account

exports.deleteAccount = async (req, res) => {
  try {
    const result = await UserService.deleteUserWithTasks(req.user._id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};