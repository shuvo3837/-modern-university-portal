import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  DoorOpen,
  Users,
  Calendar,
  Bell,
  HelpCircle,
  User,
  Settings,
  GraduationCap,
  X,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { unreadCount } = useApp();

  const mainNavItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Rooms', path: '/rooms', icon: DoorOpen },
    { label: 'People', path: '/people', icon: Users },
    { label: 'Schedule', path: '/schedule', icon: Calendar },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : null,
    },
    { label: 'Helpdesk', path: '/helpdesk', icon: HelpCircle },
  ];

  const bottomNavItems = [
    { label: 'Profile', path: '/profile', icon: User },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#172033]/40 backdrop-blur-2xs z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-[#E2E6EE] flex flex-col z-50 transition-transform duration-200 ease-in-out shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand / Institution Header */}
        <div className="h-16 px-5 border-b border-[#E2E6EE] flex items-center justify-between">
          <NavLink
            to="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-md bg-[#172033] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-2xs">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#172033] tracking-tight block leading-tight group-hover:text-[#3157D5] transition-colors">
                University Workspace
              </span>
              <span className="text-[10px] text-[#5B6475] uppercase tracking-wider font-semibold block">
                Academic Campus
              </span>
            </div>
          </NavLink>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-[#5B6475] hover:text-[#172033] hover:bg-[#F7F8FA] lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Navigation */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold text-[#5B6475] uppercase tracking-wider">
            Workspace
          </div>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#172033] text-white shadow-2xs'
                      : 'text-[#5B6475] hover:text-[#172033] hover:bg-[#F7F8FA]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none ${
                      item.badge
                        ? 'bg-[#3157D5] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Divider & Secondary Navigation */}
        <div className="p-3 border-t border-[#E2E6EE] space-y-1 bg-white">
          <div className="px-3 pb-1 text-[10px] font-bold text-[#5B6475] uppercase tracking-wider">
            Preferences
          </div>
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#172033] text-white shadow-2xs'
                      : 'text-[#5B6475] hover:text-[#172033] hover:bg-[#F7F8FA]'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          {/* Metropolitan University institution info */}
          <div className="mt-3 pt-3 border-t border-slate-100 px-3 flex items-center justify-between text-[11px] text-[#5B6475]">
            <span className="truncate font-medium">Metropolitan Univ</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
