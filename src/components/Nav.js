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
        <li><Link to="/build-max-heap" onClick={toggleNav}>QHP</Link></li>
        <li><Link to="/partition" onClick={toggleNav}>QQP</Link></li>
        <li><Link to="/binary-search-tree" onClick={toggleNav}>QBST</Link></li>
        <li><Link to="/longest-common-subsequence" onClick={toggleNav}>QLCS</Link></li>
        <li><Link to="/huffman-encoding" onClick={toggleNav}>QHUF</Link></li>
        <li><Link to="/minimum-spanning-tree" onClick={toggleNav}>QMST</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;
