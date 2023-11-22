const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// CRUD routes for tasks
router.post('/createTask', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTaskById);
router.delete('/:id', taskController.deleteTaskById);

module.exports = router;
