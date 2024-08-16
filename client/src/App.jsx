import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from './pages/Landing'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />

      </Routes>
    </Router>
  )
}

export default App
