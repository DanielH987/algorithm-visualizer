import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; {year} Daniel Hootini. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
