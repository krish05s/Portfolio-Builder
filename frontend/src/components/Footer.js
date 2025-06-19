import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {

  return (
    <>
     <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3 ">
        <li className="nav-item"><Link to="/" className="nav-links px-2 text-body-secondary text-decoration-none">Home</Link>
        </li>
        <li className="nav-item"><Link to="/about" className="nav-links px-2 text-body-secondary text-decoration-none">About</Link>
        </li>
        <li className="nav-item"><Link to="/about" className="nav-links px-2 text-body-secondary text-decoration-none">Terms & Conditions</Link>
        </li>
        <li className="nav-item"><Link to="/login" className="nav-links px-2 text-body-secondary text-decoration-none">Login</Link>
        </li>
        </ul> 
        <p className="text-center text-body-secondary">@ 2025, Portfolio-Builder</p>
  </footer> 
    </>
  )
}
