import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  DoorOpen,
  Calendar,
  Users,
  Bell,
  User,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const campusItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Rooms & Spaces', path: '/rooms', icon: DoorOpen },
  { label: 'Schedule', path: '/schedule', icon: Calendar },
  { label: 'People & Teachers', path: '/people', icon: Users },
];

const accountItems = [
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'My Profile', path: '/profile', icon: User },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export const bottomItems = [
  { label: 'Home', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Rooms', path: '/rooms', icon: DoorOpen },
  { label: 'Schedule', path: '/schedule', icon: Calendar },
  { label: 'People', path: '/people', icon: Users },
];

const RailLink = ({ item }) => {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={item.path === '/dashboard'}
      className={({ isActive }) => `nav-pill ${isActive ? 'nav-pill-active' : ''}`}
    >
      {({ isActive }) => (
        <>
          <Icon className="w-4 h-4 shrink-0" />
          <span className="min-w-0 truncate">{item.label}</span>
          {isActive && (
            <span className="nav-go" aria-hidden="true">
              <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

export const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="shell-aside">
      <div className="shell-col">
        <p className="display-brand truncate">University Workspace</p>
        <div className="flex flex-col gap-4">
          <p className="nav-label">Campus</p>
          <div className="nav-stack">
            {campusItems.map((item) => (
              <RailLink key={item.path} item={item} />
            ))}
          </div>
          <p className="nav-label">Account</p>
          <div className="nav-stack">
            {accountItems.map((item) => (
              <RailLink key={item.path} item={item} />
            ))}
          </div>
        </div>
        <div className="shell-account">
          <div className="user-card">
            <div className="icon-circle-ink sm" aria-hidden="true">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'U'}
            </div>
            <div className="min-w-0">
              <p className="type-16 truncate">{user?.name || 'Scholar'}</p>
              <p className="type-14 truncate">{user?.role || 'Member'}</p>
            </div>
          </div>
          <button type="button" className="signout-pill" onClick={logout}>
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
};

export const MobileNav = ({ open }) => {
  const { user, logout } = useAuth();

  if (!open) return null;

  return (
    <div className="mobile-nav" role="navigation" aria-label="Campus menu">
      <p className="nav-label">Campus</p>
      <div className="nav-stack">
        {campusItems.map((item) => (
          <RailLink key={item.path} item={item} />
        ))}
      </div>
      <p className="nav-label">Account</p>
      <div className="nav-stack">
        {accountItems.map((item) => (
          <RailLink key={item.path} item={item} />
        ))}
      </div>
      <div className="user-card">
        <div className="icon-circle-ink sm" aria-hidden="true">
          {user?.name ? user.name.slice(0, 2).toUpperCase() : 'U'}
        </div>
        <div className="min-w-0">
          <p className="type-16 truncate">{user?.name || 'Scholar'}</p>
          <p className="type-14 truncate">{user?.role || 'Member'}</p>
        </div>
      </div>
      <button type="button" className="signout-pill" onClick={logout}>
        Sign out
      </button>
    </div>
  );
};

export const BottomBar = () => {
  return (
    <nav className="bottombar" aria-label="Campus">
      {bottomItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink key={item.path} to={item.path} end={item.path === '/dashboard'}>
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Sidebar;
