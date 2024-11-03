import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/animations.css'
import TodoList from './todo-app'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoList />
  </StrictMode>,
)
