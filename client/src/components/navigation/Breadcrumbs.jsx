import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  if (pathnames.length === 0 || location.pathname === '/dashboard') return null;

  return (
    <nav className="flex items-center text-xs text-[#5B6475] mb-5 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
      <Link
        to="/dashboard"
        className="flex items-center gap-1.5 hover:text-[#172033] transition-colors font-medium"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Workspace</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <React.Fragment key={routeTo}>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 shrink-0" />
            {isLast ? (
              <span className="font-semibold text-[#172033]">{formattedName}</span>
            ) : (
              <Link to={routeTo} className="hover:text-[#172033] transition-colors font-medium">
                {formattedName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
