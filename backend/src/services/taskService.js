// src/services/taskService.js
const Task = require('../models/Task');

exports.createTask = async (taskData) => {
  const task = new Task(taskData);
  return await task.save();
};

exports.getAllTasks= async () => {
  return await Task.find({ isArchived: false })
    .populate('assignedTo', 'name email status')
    .sort({ createdAt: -1 });
}

exports.getArchivedTasks = async () => {
  return await Task.find({ isArchived: true })
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 });
};

exports.getTasksForUser = async (userId) => {
  return Task.find({ assignedTo: userId }).sort({ dueDate: 1 });
};

exports.updateTaskStatus = async (userId, taskId, status) => {
  const task = await Task.findOne({ _id: taskId, assignedTo: userId });
  if (!task) {
    throw new Error('Task nicht gefunden oder Zugriff verweigert');
  }
  task.status = status;
  await task.save();

  return task;
};


exports.archiveTask = async (taskId) => {
  const task = await Task.findByIdAndUpdate(
    taskId,
    { isArchived: true },
    { new: true }
  );

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
};


exports.restoreTask = async (taskId) => {
  const task = await Task.findByIdAndUpdate(
    taskId,
    { isArchived: false },
    { new: true }
  );

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
};