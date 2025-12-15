import React, { useState } from 'react';
import { Routes , Route , NavLink} from 'react-router-dom'
import  ItemsList from './pages/ItemList'
import ItemDetails from './pages/ItemDetails'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Papír-írószer</h1>
    <nav className="d-flex gap-4 p-3 fs-3"> 
      <NavLink to="/" className="nav-link">
      <i className='bi bi-house-door-fill me-2'></i>
      Lista</NavLink>
    </nav>
    <Routes>
      <Route path="/" element={<ItemsList />} />
      <Route path="/items/:itemId" element={<ItemDetails />} />
    </Routes>
    
    </>
  )
}

export default App
