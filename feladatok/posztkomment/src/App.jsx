import { Routes, Route, NavLink } from "react-router-dom"
import { Posztok } from "./pages/Posztok"
import { Kommentek } from './pages/Kommentek'
import { Egykomment } from './pages/Egykomment'


import './App.css'

export const App = () => {

  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
       <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">PizzaApp</NavLink>

    {/* Hamburger gomb */}
    <button 
      className="navbar-toggler" 
      type="button" 
      data-bs-toggle="collapse" 
      data-bs-target="#navbarNav" 
      aria-controls="navbarNav" 
      aria-expanded="false" 
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to={'/'} className={({isActive}) => 
            "nav-link" + (isActive ? "active" : "")}>
            <span className="nav-link"><i className="bi bi-safe2"></i>Kommentek</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={'/posztok'} className={({isActive}) => 
            "nav-link" + (isActive ? "active" : "")}>
            <span className="nav-link"><i className="bi bi-pencil-square"></i>Posztok</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to={"/ujKomment"} className={({isActive}) =>
            "nav-link" + (isActive ? "active" : "")}>
            <span className="nav-link"><i className="bi bi-pencil-square"></i>Új komment</span>
            </NavLink>
          </li>
        </ul>
      </div>
      </div>
    </nav>
      <h1>React Router Példa</h1>
      
        <Routes>

          <Route path="/" element={<Kommentek/>} /> 
          <Route path="/posztok" element={<Posztok/>} />
          <Route path="/kommentek/:commentId" element={<Egykomment/>} />
          <Route path="*" element={<h2>404Nincs ilyen oldal</h2>} />
          
        </Routes>


        
    </>
  )
}

export default App