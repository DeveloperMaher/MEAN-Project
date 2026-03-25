// src/controllers/taskController.js
const User = require('../models/User');
const TaskService = require('../services/taskService');
const NotificationService = require('../services/notificationService');
 
exports.createTask = async (req, res) => {
  try {
    const task = await TaskService.createTask(req.body);

    await NotificationService.createNotification(
      task.assignedTo,
      `New task assigned: ${task.title}`,
      task._id
    );

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getTasksForUser(req.user.id);
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
 
exports.getTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('getTasks error', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getArchivedTasks = async (req, res) => {
  try {
    const tasks = await TaskService.getArchivedTasks();

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;
    const allowedStatuses = ['pending', 'in-progress', 'done'];
    if (!taskId || !status) {
      return res.status(400).json({
        success: false,
        error: 'taskId and status are required'
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value'
      });
    }

    const task = await TaskService.updateTaskStatus(req.user._id, taskId, status);

    // send Notification
    if (status === "done") {
      const admin = await User.findOne({ role: "admin" });
 
      await NotificationService.createNotification(
        admin._id,
        `${req.user.name} has completed the Task: ${task.title}`,
        task._id
      );
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


exports.archiveTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskService.archiveTask(id);

    res.status(200).json({
      success: true,
      message: 'Task archived successfully',
      data: task
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};




// ---------------------
exports.restoreTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskService.restoreTask(id);

    res.json({
      success: true,
      data: task
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};