import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GraduationCap, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-600 text-white shadow-xs">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
              University Workspace
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                isActive ? 'text-indigo-600 bg-indigo-50/60' : 'text-slate-600 hover:text-slate-900'
              }`
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="/helpdesk"
            className={({ isActive }) =>
              `text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                isActive ? 'text-indigo-600 bg-indigo-50/60' : 'text-slate-600 hover:text-slate-900'
              }`
            }
          >
            Helpdesk
          </NavLink>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="ml-2 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-xs transition-colors"
            >
              Go to Workspace
            </Link>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In</span>
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
