import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GraduationCap, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="site-header">
      <div className="site-nav">
        <Link to="/" className="site-brand">
          <span className="icon-circle-ink">
            <GraduationCap className="w-5 h-5" />
          </span>
          <span className="type-18">University Workspace</span>
        </Link>

        <nav className="site-links" aria-label="Public">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-pill ${isActive ? 'nav-pill-active-main' : ''}`}
          >
            Overview
          </NavLink>
          <NavLink
            to="/helpdesk"
            className={({ isActive }) => `nav-pill ${isActive ? 'nav-pill-active-main' : ''}`}
          >
            Helpdesk
          </NavLink>

          {isAuthenticated ? (
            <Link to="/dashboard" className="go-pill">
              Workspace
            </Link>
          ) : (
            <>
              <Link to="/login" className="nav-pill">
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </Link>
              <Link to="/signup" className="go-pill">
                <UserPlus className="w-4 h-4" />
                <span>Get Started</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
