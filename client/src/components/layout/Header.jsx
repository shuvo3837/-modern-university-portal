import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, Search, User, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Header = ({ menuOpen = false, onToggleMenu }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const onSearch = (event) => {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    navigate(`/rooms?q=${encodeURIComponent(term)}`);
  };

  return (
    <header className="shell-toolbar">
      <p className="display-brand shell-brand truncate">University Workspace</p>
      <div className="shell-tools">
        <button
          type="button"
          className="shell-menu icon-circle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={onToggleMenu}
        >
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
        <form className="shell-search-wrap" onSubmit={onSearch}>
          <Search />
          <input
            className="shell-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search campus"
            aria-label="Search campus"
          />
        </form>
        <Link to="/notifications" className="icon-circle" aria-label="Notifications">
          <Bell className="w-4 h-4" />
        </Link>
        <Link to="/profile" className="icon-circle" aria-label={user?.name || 'Account'}>
          <User className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
