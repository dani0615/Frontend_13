import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { HangszerList } from './HangszerList.jsx'
import { HangszerSingle } from './HangszerSingle.jsx'
import { HangszerCreate } from './HangszerCreate.jsx'
import { HangszerUpdate } from './HangszerUpdate.jsx'
import { HangszerDelete } from './HangszerDelete.jsx'
import './App.css'

export const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            <i className="bi bi-music-note-beamed me-2"></i>HangszerBolt
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Hangszerek</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link btn btn-outline-primary ms-lg-3 text-white px-3" to="/uj-hangszer">Új hangszer</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<HangszerList />} />
          <Route path="/instruments/:id" element={<HangszerSingle />} />
          <Route path="/uj-hangszer" element={<HangszerCreate />} />
          <Route path="/modosit-hangszer/:id" element={<HangszerUpdate />} />
          <Route path="/torol-hangszer/:id" element={<HangszerDelete />} />
        </Routes>
      </div>
    </Router>
  )
}