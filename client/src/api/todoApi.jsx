// Function to fetch all todos
export const fetchTodos = async () => {
    const response = await fetch('http://localhost:3000/api/todos');
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch tasks');
    }
    const data = await response.json();
    return data.data.map(todo => ({ ...todo, createdAt: new Date(todo.createdAt) }));
};

// Function to add a new todo
export const addTodo = async (title) => {
    const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add task');
    }
    const data = await response.json();
    return { ...data.data, createdAt: new Date(data.data.createdAt) };
};

// Function to mark a todo as completed
export const completeTodo = async (id) => {
    const response = await fetch(`http://localhost:3000/api/todos/${id}/complete`, { 
        method: 'PUT' 
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to complete task');
    }
    const data = await response.json();
    return { ...data.data, createdAt: new Date(data.data.createdAt) };
};

// Function to delete a todo
export const deleteTodo = async (id) => {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, { 
        method: 'DELETE' 
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete task');
    }
};

// Function to edit a todo
export const editTodo = async (id, newTitle) => {
    const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update task');
    }
    const data = await response.json();
    return { ...data.data, createdAt: new Date(data.data.createdAt) };
};
