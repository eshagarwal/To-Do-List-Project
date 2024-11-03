import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const TodoSection = ({ title, count, children, isOpen, onToggle }) => (
    <div className="mb-4">
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 
                   rounded-lg mb-3 group hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-gray-700">{title}</h2>
          <span className="px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-200 rounded-full">
            {count}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
        )}
      </button>
      <div className={`space-y-2 transition-all duration-300 ease-in-out
                      ${isOpen ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
        {children}
      </div>
    </div>
  );
  
  export default TodoSection;
  