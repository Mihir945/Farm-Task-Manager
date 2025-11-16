import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskContextProvider from './context/TaskContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <TaskContextProvider>
    <ToastContainer/>
    <App />
  </TaskContextProvider>,
)