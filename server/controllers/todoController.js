const todos = []; // Array to store to-do items

// Helper to find a todo by ID
const findTodoIndexById = (id) => todos.findIndex((todo) => todo.id === id);

// Get all todos
const getTodos = (req, res) => {
  res.json({ status: 'success', data: todos });
};

// Add a new todo
const addTodo = (req, res) => {
  try {
    const { title } = req.body;
    if (!title) throw new Error('Title is required');

    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date(),
    };

    todos.push(newTodo);
    res.status(201).json({ status: 'success', data: newTodo });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

// Mark a todo as completed
const completeTodo = (req, res) => {
  try {
    const { id } = req.params;
    const index = findTodoIndexById(Number(id));
  
    if (index === -1) return res.status(404).json({ status: 'fail', error: 'Todo not found' });
  
    todos[index].completed = !todos[index].completed;
    res.json({ status: 'success', data: todos[index] });
  } catch (error) {
    res.status(404).json({ status: 'fail', error: error.message });
  }
};

// Update a todo title
const updateTodo = (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const index = findTodoIndexById(Number(id));
  
    if (index === -1) return res.status(404).json({ status: 'fail', error: 'Todo not found' });
    if (!title) throw new Error('Title is required');
  
    todos[index].title = title;
    res.json({ status: 'success', data: todos[index] });
  } catch (error) {
    res.status(400).json({ status: 'fail', error: error.message });
  }
};

// Delete a todo
const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;
    const index = findTodoIndexById(Number(id));
  
    if (index === -1) return res.status(404).json({ status: 'fail', error: 'Todo not found' });
  
    const [deletedTodo] = todos.splice(index, 1);
    res.json({ status: 'success', data: deletedTodo });
  } catch (error) {
    res.status(404).json({ status: 'fail', error: error.message });
  }
};

module.exports = {
  getTodos,
  addTodo,
  completeTodo,
  updateTodo,
  deleteTodo,
};