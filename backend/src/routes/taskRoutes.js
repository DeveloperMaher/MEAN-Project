// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');

// router.get('/', taskController.getTasks);
// router.put('/status', taskController.updateTaskStatus);
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.getTasks);
router.get('/usertasks', protect, taskController.getUserTasks);
router.patch('/status', protect, taskController.updateTaskStatus);

// ARCHIVE task (soft delete)
router.put('/archive/:id', taskController.archiveTask);
router.get('/archived', taskController.getArchivedTasks);

// RESTORE task
router.patch('/restore/:id', taskController.restoreTask);

module.exports = router;