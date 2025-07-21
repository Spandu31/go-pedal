import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/gopedal-logo.png'; // relative path from Navbar.js to assets folder
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img
            src={logo}
            alt="Go Pedal Logo"
            className="logo-img"
          />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/admin">Admin Panel</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
