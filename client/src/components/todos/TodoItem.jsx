import React, { useState } from 'react';
import { Trash2, CheckCircle, Circle, Edit2, X } from 'lucide-react';
import '../../styles/todo.css';

// TodoItem component represents an individual todo item with functionality for editing, and deleting the item
const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.title);
    const [isDeleting, setIsDeleting] = useState(false);
  
    // Function to handle editing the todo item
    const handleEdit = async () => {
      if (editValue.trim() !== '') {
        await onEdit(todo.id, editValue);
        setIsEditing(false);
      }
    };
  
    // Function to handle the deletion of the todo item.
    const handleDelete = async () => {
      setIsDeleting(true);
      await onDelete(todo.id);
    };
  
    return (
      // Main container for the todo item, includes animation for deletion
      <div className={`todo-item-container ${isDeleting ? 'todo-item-deleting' : 'todo-item-active'}`}>

        {/* Container for the todo item content */}
        <div className={`todo-item group animate-fadeIn ${todo.completed ? 'todo-item-completed' : 'todo-item-incomplete'}`}>
          {isEditing ? (
            // Editing state of the todo item
            <div className="editing-container">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="edit-input"
                autoFocus
              />

              {/* Button to confirm editing of the todo item */}
              <button onClick={handleEdit} className="check-button check-button-completed">
                <CheckCircle className="w-5 h-5" />
              </button>

              {/* Button to cancel editing */}
              <button onClick={() => setIsEditing(false)} className="check-button delete-button">
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (

            // Non-editing state of the todo item
            <>
              <div className="flex items-center gap-3 flex-1">

                {/* Button to toggle completion of the todo item */}
                <button
                  onClick={() => onToggle(todo.id)}
                  className={`check-button ${todo.completed ? 'check-button-completed' : 'check-button-incomplete'}`}
                >
                  {todo.completed ? (
                    <CheckCircle className="w-5 h-5 animate-checkmark" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                {/* Display title and creation date of the todo item */}
                <div className="flex flex-col">
                  <span className={`todo-title ${todo.completed ? 'todo-title-completed' : 'todo-title-incomplete'}`}>
                    {todo.title}
                  </span>
                  <span className="todo-date">
                    Created {new Date(todo.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Edit and delete buttons that appear on hover */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {!todo.completed && (
                  <button onClick={() => setIsEditing(true)} className="edit-button">
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
                <button onClick={handleDelete} className="delete-button">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
    
  };


  export default TodoItem;
  