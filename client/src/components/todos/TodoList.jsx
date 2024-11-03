import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoSection from './TodoSection';
import TodoItem from './TodoItem';
import Alert from '../alerts/Alert';
import AlertDescription from '../alerts/AlertDescription';
import { fetchTodos, addTodo, completeTodo, deleteTodo, editTodo } from '../../api/todoApi';
import '../../styles/todo.css';

const TodoList = () => {
  // State to hold todos, alert messages, and visibility of task sections
    const [todos, setTodos] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: '', type: 'success' });
    const [showOpenTasks, setShowOpenTasks] = useState(true);
    const [showCompletedTasks, setShowCompletedTasks] = useState(true);

    // Function to show alert messages for feedback
    const showAlert = (message, type = 'success') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 3000);
    };

    // Fetch todos from the API on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const todos = await fetchTodos();
                setTodos(todos);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                showAlert(error.message, 'error');
            }
        };
        fetchData();
    }, []);

    // Function to handle adding a new todo
    const handleAddTodo = async (title) => {
        try {
            const newTodo = await addTodo(title);
            setTodos([newTodo, ...todos]);
            showAlert('✨ Task added successfully!');
        } catch (error) {
            console.error('Error adding task:', error);
            showAlert(error.message, 'error');
        }
    };

    // Function to handle marking a todo as completed
    const handleCompleteTodo = async (id) => {
        try {
            const updatedTodo = await completeTodo(id);
            setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
        } catch (error) {
            console.error('Error completing task:', error);
            showAlert(error.message, 'error');
        }
    };

    // Function to handle deleting a todo
    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
            showAlert('🗑️ Task deleted successfully!');
        } catch (error) {
            console.error('Error deleting task:', error);
            showAlert(error.message, 'error');
        }
    };

    // Function to handle editing a todo's title
    const handleEditTodo = async (id, newTitle) => {
        try {
            const updatedTodo = await editTodo(id, newTitle);
            setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
            showAlert('✏️ Task updated successfully!');
        } catch (error) {
            console.error('Error updating task:', error);
            showAlert(error.message, 'error');
        }
    };

    // Separate and sort open todos by creation date
    const openTodos = todos
    .filter(todo => !todo.completed)
    .map(todo => ({
      ...todo,
      createdAt: todo.createdAt instanceof Date ? todo.createdAt : new Date(todo.createdAt),
    }))
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  
    // Separate and sort completed todos by creation date in reverse order
    const completedTodos = todos
      .filter(todo => todo.completed)
      .map(todo => ({
        ...todo,
        createdAt: todo.createdAt instanceof Date ? todo.createdAt : new Date(todo.createdAt),
      }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
    return (
      <div className="todo-list-container">
        
        {/* Header Section */}
        <div className="header-section">
          <h1 className="header-title">My Tasks</h1>
          <p className="header-subtitle">Stay organized, stay productive</p>
        </div>
 
        {/* Alert Message Display */}
        {alert.show && (
          <Alert className={`alert-message animate-slideIn ${
            alert.type === 'success' ? 'alert-success' : 'alert-error'
          }`}>
            <AlertDescription className="alert-description">{alert.message}</AlertDescription>
          </Alert>
        )}
  
        <TodoForm onAdd={handleAddTodo} />
  
        {/* Conditional Rendering for No Tasks */}
        {todos.length === 0 ? (
          <div className="no-tasks-container">
            <div className="no-tasks-icon">📝</div>
            <p className="no-tasks-title">No tasks yet</p>
            <p className="no-tasks-subtitle">Add a new task to get started!</p>
          </div>
        ) : (
          <div>

          {/* Open Tasks Section */}
          <TodoSection 
              title="Open Tasks" 
              count={openTodos.length}
              isOpen={showOpenTasks}
              onComplete={() => setShowOpenTasks(!showOpenTasks)}
          >
              {openTodos.map((todo) => (
                  <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={handleCompleteTodo}
                      onDelete={handleDeleteTodo}
                      onEdit={handleEditTodo}
                  />
              ))}
          </TodoSection>

          {/* Completed Tasks Section */}
          <TodoSection 
              title="Completed Tasks" 
              count={completedTodos.length}
              isOpen={showCompletedTasks}
              onComplete={() => setShowCompletedTasks(!showCompletedTasks)}
          >
              {completedTodos.map((todo) => (
                  <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={handleCompleteTodo}
                      onDelete={handleDeleteTodo}
                      onEdit={handleEditTodo}
                  />
              ))}
          </TodoSection>
          </div>
        )}
  
        {/* Summary of Total Tasks */}
        <div className="task-summary">
          <span>Total tasks: {todos.length}</span>
          <span>Completed: {completedTodos.length}</span>
        </div>
      </div>
    );
  };
  

export default TodoList;