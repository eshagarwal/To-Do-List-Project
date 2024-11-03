import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import '../../styles/todo.css'; 

// Functional component for displaying a section of todos (open or completed)
const TodoSection = ({ title, count, children, isOpen, onToggle }) => (

    <div className="todo-section-container">
      {/* Button to toggle the visibility of the todo section */}
      <button 
        onClick={onToggle}
        className="todo-section-button group"
      >

        <div className="flex items-center gap-2">
          {/* Section title with task count */}
          <h2 className="todo-section-title">{title}</h2>
          <span className="todo-section-count">{count}</span>
        </div>

        {/* Icon to indicate section open/closed state */}
        {isOpen ? (
          <ChevronUp className="todo-section-chevron" />
        ) : (
          <ChevronDown className="todo-section-chevron" />
        )}
      </button>

      {/* Container for the todo items, shown/hidden based on isOpen state */}
      <div className={`todo-section-children ${isOpen ? 'todo-section-children-open' : 'todo-section-children-closed'}`}>
        {children} {/* Render the todo items passed as children */}
      </div>
    </div>
);
  
export default TodoSection;
