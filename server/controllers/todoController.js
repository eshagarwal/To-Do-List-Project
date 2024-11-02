const todos = []; // Array to store to-do items

// Helper to find a todo by ID
const findTodoIndexById = (id) => todos.findIndex((todo) => todo.id === id);

// Get all todos
const getTodos = (req, res) => {
  res.json({ status: 'success', data: todos });
};

// Add a new todo
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

// Mark a todo as completed
const completeTodo = (req, res) => {
  const { id } = req.params;
  const index = findTodoIndexById(Number(id));

  if (index === -1) return res.status(404).json({ status: 'fail', error: 'Todo not found' });

  todos[index].completed = !todos[index].completed;
  res.json({ status: 'success', data: todos[index] });
};

// Update a todo title
const updateTodo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = findTodoIndexById(Number(id));

  if (index === -1) return res.status(404).json({ status: 'fail', error: 'Todo not found' });

  todos[index].title = title;
  res.json({ status: 'success', data: todos[index] });
};

// Delete a todo
const deleteTodo = (req, res) => {
  const { id } = req.params;
  const index = findTodoIndexById(Number(id));

  if (index === -1) return res.status(404).json({ status: 'fail', error: 'Todo not found' });

  const [deletedTodo] = todos.splice(index, 1);
  res.json({ status: 'success', data: deletedTodo });
};

module.exports = {
  getTodos,
  addTodo,
  completeTodo,
  updateTodo,
  deleteTodo,
};