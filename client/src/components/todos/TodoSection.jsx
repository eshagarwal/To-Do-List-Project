import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Functional component for displaying a section of todos (open or completed)
const TodoSection = ({ title, count, children, isOpen, onToggle }) => (

    <div className="mb-4">
      {/* Button to toggle the visibility of the todo section */}
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 
                   rounded-lg mb-3 group hover:bg-gray-100 transition-colors duration-200"
      >

        <div className="flex items-center gap-2">
          {/* Section title with task count */}
          <h2 className="text-sm font-medium text-gray-700">{title}</h2>
          <span className="px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-200 rounded-full">
            {count} {/* Display number of tasks in this section */}
          </span>
        </div>

        {/* Icon to indicate section open/closed state */}
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        )}
      </button>
      
      {/* Container for the todo items, shown/hidden based on isOpen state */}
      <div className={`space-y-2 transition-all duration-300 ease-in-out
                      ${isOpen ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        {children} {/* Render the todo items passed as children */}
      </div>
    </div>
);
  
export default TodoSection;
