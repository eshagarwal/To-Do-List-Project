const express = require('express');
const router = express.Router();
const {
  getTodos,
  addTodo,
  completeTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

// GET all todos
router.get('/', getTodos);

// POST a new todo
router.post('/', addTodo);

// PUT complete a todo's status
router.put('/:id/complete', completeTodo);

// PUT update a todo's title
router.put('/:id', updateTodo);

// DELETE a todo
router.delete('/:id', deleteTodo);

module.exports = router;
