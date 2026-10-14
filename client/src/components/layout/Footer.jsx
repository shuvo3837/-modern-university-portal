import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="site-footer-row">
        <p className="type-14">© {new Date().getFullYear()} University Workspace</p>
        <Link to="/helpdesk" className="text-link">
          Helpdesk & Support
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
