import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, Plus, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { Dropdown } from '../common/Dropdown';

export const Header = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const { unreadCount, openAddRoomModal } = useApp();
  const navigate = useNavigate();

  const userMenuItems = [
    {
      label: 'My Profile',
      icon: UserIcon,
      onClick: () => navigate('/profile'),
    },
    {
      label: 'Security & Settings',
      icon: Shield,
      onClick: () => navigate('/settings'),
    },
    { divider: true },
    {
      label: 'Sign Out',
      icon: LogOut,
      danger: true,
      onClick: () => {
        logout();
        navigate('/');
      },
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-[#E2E6EE] sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Campus Affiliation */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-1.5 rounded-md text-[#5B6475] hover:text-[#172033] hover:bg-[#F7F8FA] lg:hidden transition-colors"
          aria-label="Toggle navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs">
          <span className="font-semibold text-[#172033]">
            {user?.university || 'Metropolitan University'}
          </span>
          <span className="text-[#E2E6EE]">•</span>
          <span className="text-[#5B6475] font-medium">
            {user?.department || 'Department of CSE'}
          </span>
        </div>
      </div>

      {/* Right: Quick Action, Notifications, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Add / Join Room Button */}
        <Button
          variant="secondary"
          size="sm"
          icon={Plus}
          onClick={() => openAddRoomModal('create')}
          className="hidden md:inline-flex"
        >
          Add / Join Room
        </Button>

        {/* Notifications Icon Link */}
        <Link
          to="/notifications"
          className="relative p-2 rounded-md text-[#5B6475] hover:text-[#172033] hover:bg-[#F7F8FA] transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#3157D5] ring-2 ring-white" />
          )}
        </Link>

        {/* User Profile Dropdown */}
        {user && (
          <Dropdown
            align="right"
            trigger={
              <div className="flex items-center gap-2.5 pl-2 py-1 rounded-md hover:bg-[#F7F8FA] transition-colors cursor-pointer select-none">
                <Avatar name={user.name} size="sm" status="available" />
                <div className="hidden sm:block text-left">
                  <span className="block text-xs font-semibold text-[#172033] leading-tight">
                    {user.name}
                  </span>
                  <span className="block text-[10px] text-[#5B6475] leading-none mt-0.5">
                    {user.role}
                  </span>
                </div>
              </div>
            }
            items={userMenuItems}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
