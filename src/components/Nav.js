import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleNav}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={isOpen ? 'show' : ''}>
        <li><Link to="/" onClick={toggleNav}>Home</Link></li>
        <li><Link to="/qhp" onClick={toggleNav}>QHP</Link></li>
        <li><Link to="/qqp" onClick={toggleNav}>QQP</Link></li>
        <li><Link to="/qbst" onClick={toggleNav}>QBST</Link></li>
        <li><Link to="/qlcs" onClick={toggleNav}>QLCS</Link></li>
        <li><Link to="/qhuf" onClick={toggleNav}>QHUF</Link></li>
        <li><Link to="/qmst" onClick={toggleNav}>QMST</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
