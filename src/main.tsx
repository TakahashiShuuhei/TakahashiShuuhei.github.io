import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import PianoPracticeApp from './pages/PianoPracticeApp.tsx'
import PianoFigApp from './pages/PianoFigApp.tsx'
import CableOccupancyApp from './pages/CableOccupancyApp.tsx'
import RailsProjApp from './pages/RailsProjApp.tsx'
import MpApp from './pages/MpApp.tsx'
import ReadableApp from './pages/ReadableApp.tsx'
import ChpathApp from './pages/ChpathApp.tsx'
import { RouteTracker } from './RouteTracker.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <RouteTracker />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/apps/piano-practice" element={<PianoPracticeApp />} />
        <Route path="/apps/piano-fig" element={<PianoFigApp />} />
        <Route path="/apps/cable" element={<CableOccupancyApp />} />
        <Route path="/apps/rails-proj" element={<RailsProjApp />} />
        <Route path="/apps/mp" element={<MpApp />} />
        <Route path="/apps/readable" element={<ReadableApp />} />
        <Route path="/apps/chpath" element={<ChpathApp />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)