/**
 * AppContext
 * Global application UI context (sidebar status, active workspace, global toast/alerts)
 */

import React, { createContext, useState } from 'react';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeUniversity, setActiveUniversity] = useState('Stanford University');
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(2);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const value = {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    activeUniversity,
    setActiveUniversity,
    unreadNotificationsCount,
    setUnreadNotificationsCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
