import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const TodoForm = ({ onAdd }) => {
  const [input, setInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setIsSubmitting(true);
      await onAdd(input);
      setInput('');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8 group">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 px-4 py-3 text-sm border rounded-xl bg-white shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-all duration-200 ease-in-out
                   hover:shadow-md"
        placeholder="Add a new task..."
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white
                   bg-gradient-to-r from-blue-600 to-blue-700
                   rounded-xl hover:from-blue-700 hover:to-blue-800
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   transition-all duration-200 ease-in-out
                   hover:shadow-lg hover:scale-105 active:scale-95
                   disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <PlusCircle className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
