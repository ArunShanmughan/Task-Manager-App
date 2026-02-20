const express = require('express');
const { body, param } = require('express-validator');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController.js');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTasks);

router.post(
  '/',
  [
    body('taskName').notEmpty().withMessage('Task name is required'),
    body('dueDate').isISO8601().withMessage('A valid due date is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
  ],
  validationMiddleware,
  createTask
);

router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Task id must be a valid MongoDB id'),
    body('taskName').notEmpty().withMessage('Task name is required'),
    body('dueDate').isISO8601().withMessage('A valid due date is required'),
    body('description').optional().isString().withMessage('Description must be a string'),
  ],
  validationMiddleware,
  updateTask
);

router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Task id must be a valid MongoDB id')],
  validationMiddleware,
  deleteTask
);

module.exports = router;
