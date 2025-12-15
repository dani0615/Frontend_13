import { Routes, Route, useParams, NavLink } from 'react-router-dom'
import {Products} from './pages/GetCart'
import {ProductId} from "./pages/Get-idCart"
import {UjProduct} from "./pages/PostCart"
import React , { useState } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';

function App() {
  return (
    <>
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <i className="bi bi-basket2-fill me-2"></i>
            Admin
          </NavLink>

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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active fw-bold' : 'nav-link'
                  }
                  to="/"
                >
                  <i className="bi bi-house-door me-1"></i> Termékek
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? 'nav-link active fw-bold' : 'nav-link'
                  }
                  to="/new-product"
                >
                  <i className="bi bi-plus-circle me-1"></i> Új termék
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Tartalom */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/Termékek/:id" element={<ProductId />} />
          <Route path="/new-product" element={<UjProduct />} />
        </Routes>
      </div>
    </>
  );
}

export default App;