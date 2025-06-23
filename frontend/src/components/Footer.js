import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {

  return (
    <>
     <footer className="bg-light text-center text-muted py-3 border-top">
      <div className="container">
        <ul className="nav justify-content-center flex-wrap border-bottom pb-2 mb-2">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-secondary">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link px-2 text-secondary">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/terms" className="nav-link px-2 text-secondary">Terms & Conditions</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link px-2 text-secondary">Login</Link>
          </li>
        </ul>
        <p className="mb-0">&copy; 2025, Portfolio-Builder</p>
      </div>
    </footer>
    </>
  )
}
