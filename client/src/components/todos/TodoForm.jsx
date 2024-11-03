import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import '../../styles/todo.css'; 

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
        className="input-field"
        placeholder="Add a new task..."
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="add-task-btn"
      >
        <PlusCircle className={`w-4 h-4 ${isSubmitting ? 'animate-spin' : ''}`} />
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
