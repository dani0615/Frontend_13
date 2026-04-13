import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ShipList } from './Pages/ShipList.jsx';
import { ShipSingle } from './Pages/ShipSingle.jsx';
import { DenmarkStrait } from './Pages/DenmarkStrait.jsx';
import './App.css';

export const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow">
        <div className="container">
          <NavLink className="navbar-brand fw-bold" to="/">
            <i className="bi bi-water me-2"></i>Csatahajók
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Csatahajók</NavLink>
              </li>
              <li className="nav-item ps-lg-3">
                <NavLink className="nav-link btn btn-outline-primary text-white px-3" to="/denmark-strait">A Denmark Strait csata</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<ShipList />} />
          <Route path="/ship/:name" element={<ShipSingle />} />
          <Route path="/denmark-strait" element={<DenmarkStrait />} />
        </Routes>
      </div>
    </Router>
  );
};
