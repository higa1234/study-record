import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StudyLog } from './StudyLog.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudyLog />
  </StrictMode>
)
