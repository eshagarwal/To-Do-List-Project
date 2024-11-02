const todos = []; // Array to store to-do items

// Helper to find a todo by ID
const findTodoIndexById = (id) => todos.findIndex((todo) => todo.id === id);

// Get all todos
const getTodos = (req, res) => {
  res.json({ status: 'success', data: todos });
};

const addTodo = (req, res) => {
  const { title } = req.body;
  const newTodo = {
    id: Date.now(),
    title,
    completed: false,
    createdAt: new Date(),
  };
  todos.push(newTodo);
  res.status(201).json({ status: 'success', data: newTodo });
};






module.exports = {
  getTodos,
};