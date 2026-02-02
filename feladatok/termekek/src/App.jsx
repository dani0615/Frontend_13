import { Routes, Route, NavLink } from "react-router-dom"
import { Termekek } from "./pages/Termekek"
import { EgyTermek } from "./pages/EgyTermek"
import { UjTermek } from "./pages/UjTermek"
import { ModTermek } from "./pages/ModTermek"
import { DelTermek } from "./pages/DelTermek"

import './App.css'
// hello
export const App = () => {

  return (
    <>
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
       <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Menü</NavLink>

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
            "nav-link" + (isActive ? " active" : "")}>
            <span className="nav-link"><i className="bi bi-text-paragraph"></i>Termékek</span>
            </NavLink>
          </li>
                    <li className="nav-item">
            <NavLink to={'/ujtermek'} className={({isActive}) => 
            "nav-link" + (isActive ? " active" : "")}>
            <span className="nav-link"><i className="bi bi-pencil-square"></i>Új termék</span>
            </NavLink>
          </li>
        </ul>
      </div>
      </div>
    </nav>
      <h1>Termékek - feladat</h1>
      
        <Routes>
          <Route path="/" element={<Termekek />} />
          <Route path="/ujtermek" element={<UjTermek />} />
          <Route path="/termekek/:termekId" element={<EgyTermek />} />
          <Route path="/modtermek/:termekId" element={<ModTermek />} />
          <Route path="/deltermek/:termekId" element={<DelTermek />} />
          <Route path="*" element={<h2>404 - Nincs ilyen oldal!</h2>} />
        </Routes>
    </>
  )
}

export default App