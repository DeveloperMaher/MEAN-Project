// src/controllers/adminController.js
const AdminService = require('../services/adminService');
 
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;
    const task = await AdminService.createTask({
      title,
      description,
      assignedTo,
      dueDate
    });
 
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }

};