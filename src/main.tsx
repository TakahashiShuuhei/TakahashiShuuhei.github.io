import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import DemoApp from './pages/DemoApp.tsx'
import PianoPracticeApp from './pages/PianoPracticeApp.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/apps/demo-app" element={<DemoApp />} />
        <Route path="/apps/piano-practice" element={<PianoPracticeApp />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)