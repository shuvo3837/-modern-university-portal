import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, BottomBar, MobileNav } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';

export const DashboardLayout = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
        <MobileNav open={menuOpen} />
        <main className="overview-body w-full min-w-0">
          <Breadcrumbs />
          <Outlet />
        </main>
        <BottomBar />
      </div>
    </div>
  );
};

export default DashboardLayout;
