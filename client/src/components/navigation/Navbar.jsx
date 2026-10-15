import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-white border-b border-[#E2E6EE] sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-md bg-[#172033] text-white flex items-center justify-center font-bold text-sm shadow-2xs">
            <GraduationCap className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-[#172033] text-base tracking-tight group-hover:text-[#3157D5] transition-colors">
              University Workspace
            </span>
          </div>
        </Link>

        {/* Right side navigation */}
        <div className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/helpdesk"
            className={({ isActive }) =>
              `text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded transition-colors ${
                isActive ? 'text-[#3157D5] bg-[#3157D5]/5' : 'text-[#5B6475] hover:text-[#172033]'
              }`
            }
          >
            Helpdesk
          </NavLink>

          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button variant="primary" size="sm">
                Enter Workspace
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="accent" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
