// src/config/taskWorker.js
const Queue = require('bull');
const redisConfig = require('../config/redis');
const taskQueue = new Queue('taskQueue', { redis: redisConfig });
 
exports.addJobToQueue = (task) => {
  taskQueue.add({ taskId: task._id, title: task.title, assignedTo: task.assignedTo });
};
 
taskQueue.process(async (job) => {
  console.log('Processing task:', job.data);
  // Beispiel: Benachrichtigung an User senden
});
 
