import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoSection from './TodoSection';
import TodoItem from './TodoItem';
import Alert from '../alerts/Alert';
import AlertDescription from '../alerts/AlertDescription';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
    const [showOpenTasks, setShowOpenTasks] = useState(true);
    const [showCompletedTasks, setShowCompletedTasks] = useState(true);
  
    const showAlert = (message, type = 'success') => {
      setAlert({ show: true, message, type });
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    };
  
    // Fetch todos from the backend when the component mounts
    useEffect(() => {
      const fetchTodos = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/todos');
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch tasks');
          }
          const data = await response.json();
          const todos = data.data;
    
          // Ensure `createdAt` is a Date object
          const todosWithDate = todos.map((todo) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
          }));
    
          setTodos(todosWithDate);
        } catch (error) {
          console.error('Error fetching tasks:', error);
          showAlert(error.message, 'error');
        }
      };
    
      fetchTodos();
    }, []);
    
    const addTodo = async (title) => {
      try {
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
        const newTodo = data.data;
        setTodos([newTodo, ...todos]);
        showAlert('✨ Task added successfully!');
      } catch (error) {
        console.error('Error adding task:', error);
        showAlert(error.message, 'error');
      }
    };
    
    const toggleTodo = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/todos/${id}/complete`, {
          method: 'PUT',
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to complete task');
        }
      
        const data = await response.json();
  
        const updatedTodo = {
          ...data.data,
          createdAt: new Date(data.data.createdAt), // Ensure it's a Date object
        };
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
      } catch (error) {
        console.error('Error completing task:', error);
        showAlert(error.message, 'error');
      }
    };
    
    const deleteTodo = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
          method: 'DELETE',
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete task');
        }
    
        setTodos(todos.filter((todo) => todo.id !== id));
        showAlert('🗑️ Task deleted successfully!');
      } catch (error) {
        console.error('Error deleting task:', error);
        showAlert(error.message, 'error');
      }
    };
    
    const editTodo = async (id, newTitle) => {
      try {
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
        const updatedTodo = data.data;
        setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
        showAlert('✏️ Task updated successfully!');
      } catch (error) {
        console.error('Error updating task:', error);
        showAlert(error.message, 'error');
      }
    };
    
  
  
    // Separate and sort todos
    const openTodos = todos
    .filter(todo => !todo.completed)
    .map(todo => ({
      ...todo,
      createdAt: todo.createdAt instanceof Date ? todo.createdAt : new Date(todo.createdAt),
    }))
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  
  const completedTodos = todos
    .filter(todo => todo.completed)
    .map(todo => ({
      ...todo,
      createdAt: todo.createdAt instanceof Date ? todo.createdAt : new Date(todo.createdAt),
    }))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 mb-2">
            My Tasks
          </h1>
          <p className="text-gray-600">Stay organized, stay productive</p>
        </div>
        
        {alert.show && (
          <Alert className={`mb-4 animate-slideIn ${
            alert.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
          }`}>
            <AlertDescription className="text-sm">{alert.message}</AlertDescription>
          </Alert>
        )}
  
        <TodoForm onAdd={addTodo} />
  
        {todos.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="mb-2">📝</div>
            <p className="text-gray-600 font-medium">No tasks yet</p>
            <p className="text-sm text-gray-500">Add a new task to get started!</p>
          </div>
        ) : (
          <div>
            <TodoSection 
              title="Open Tasks" 
              count={openTodos.length}
              isOpen={showOpenTasks}
              onToggle={() => setShowOpenTasks(!showOpenTasks)}
            >
              {openTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </TodoSection>
  
            <TodoSection 
              title="Completed Tasks" 
              count={completedTodos.length}
              isOpen={showCompletedTasks}
              onToggle={() => setShowCompletedTasks(!showCompletedTasks)}
            >
              {completedTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </TodoSection>
          </div>
        )}
  
        <div className="mt-8 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100
                        text-sm text-gray-600 flex justify-between items-center">
          <span>Total tasks: {todos.length}</span>
          <span>Completed: {completedTodos.length}</span>
        </div>
      </div>
    );
  };
  

export default TodoList;