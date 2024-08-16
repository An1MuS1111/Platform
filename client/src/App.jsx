import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Landing from './pages/Landing'
import CreateProduct from './pages/CreateProduct';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/createproduct" element={<CreateProduct />} />


      </Routes>
    </Router>
  )
}

export default App
