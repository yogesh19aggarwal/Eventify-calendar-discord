import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Routes } from 'react-router-dom'
import './index.css'

createRoot(document.getElementById('root')).render(
  <Routes>
    <App />
  </Routes>
)
