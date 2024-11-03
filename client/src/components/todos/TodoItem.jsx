import React, { useState } from 'react';
import { Trash2, CheckCircle, Circle, Edit2, X } from 'lucide-react';
import '../../styles/todo.css';

// TodoItem component represents an individual todo item with functionality for toggling completion status, editing, and deleting the item
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
      // Container for the todo item, with animation based on deleting state
      <div className={`transform transition-all duration-300 ease-in-out
                      ${isDeleting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className={`flex items-center justify-between p-4 mb-3 
                         rounded-xl border transition-all duration-200
                         group animate-fadeIn
                         ${todo.completed ? 
                           'bg-gray-50 border-gray-100' : 
                           'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md'}`}>
          {isEditing ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           transition-all duration-200"
                autoFocus
              />
              <button
                onClick={handleEdit}
                className="p-1.5 text-green-600 hover:text-green-700
                           rounded-lg hover:bg-green-50
                           transition-colors duration-200"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 text-red-600 hover:text-red-700
                           rounded-lg hover:bg-red-50
                           transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => onToggle(todo.id)}
                  className={`p-1.5 rounded-lg transition-colors duration-200
                             ${todo.completed ? 
                               'text-green-600 hover:bg-green-50' : 
                               'text-gray-400 hover:bg-gray-50'}`}
                >
                  {todo.completed ? (
                    <CheckCircle className="w-5 h-5 animate-checkmark" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <div className="flex flex-col">
                  <span
                    className={`text-sm transition-all duration-200
                               ${todo.completed ? 
                                 'line-through text-gray-400' : 
                                 'text-gray-700'}`}
                  >
                    {todo.title}
                  </span>
                  <span className="text-xs text-gray-400">
                    Created {new Date(todo.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {!todo.completed && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1.5 text-gray-600 hover:text-blue-600
                               rounded-lg hover:bg-blue-50
                               transition-all duration-200"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleDelete}
                  className="p-1.5 text-gray-600 hover:text-red-600
                             rounded-lg hover:bg-red-50
                             transition-all duration-200"
                >
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
