// src/services/userService.js
const User = require('../models/User');
const Task = require('../models/Task');
const Notification = require('../models/Notification');
const bcrypt = require('bcrypt');

async function getAllUsers() {
  return await User.find({ role: 'user' }).select('name email role isVerified createdAt'); // pick fields you need
}


const changePassword = async (userId, currentPassword, newPassword) => {

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    throw new Error('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  return { message: 'Password updated successfully' };
};

const deleteUserWithTasks = async (userId) => {

  await Task.deleteMany({ assignedTo: userId });
  await Notification.deleteMany({ userId: userId });
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new Error('User not found');
  }

  return { message: 'User and all tasks deleted successfully' };
};


module.exports = { getAllUsers , changePassword, deleteUserWithTasks};