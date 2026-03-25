// src/services/adminService.js
const Task = require('../models/Task');

const { addJobToQueue } = require('../workers/taskWorker');
 
exports.createTask = async ({ title, description, assignedTo, dueDate }) => {

  // Task erstellen
  const task = await Task.create({
    title,
    description,
    assignedTo,
    dueDate,
    status: 'pending'
  });
 
  // Task in Worker Queue für Benachrichtigung / Background Job
//   addJobToQueue(task);

  return task;
};
 