import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../style/Navbar.css';
import 'remixicon/fonts/remixicon.css';

const Navbar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <header>
      <a href="/" className="logo">
        <i className="ri-home-heart-fill"></i> <span className="sudama">Task</span>{' '}
        <span className="Aush">MAN</span>
      </a>
      <ul className={expanded ? 'navbar open' : 'navbar'} onClick={toggleNavbar}>
        <li>
          <Link to="/">
            <a className={location.pathname === '/' ? 'active' : ''}>Tasks</a>
          </Link>
        </li>
      </ul>
      <ul className="main">
        <i className="ri-menu-line" id="menu-icon" onClick={toggleNavbar}></i>
      </ul>
    </header>
  );
};

export default Navbar;
