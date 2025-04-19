import React from 'react';
import './css/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copy">
          © {new Date().getFullYear()} My Company. All rights reserved.
        </p>
        <ul className="footer__links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
