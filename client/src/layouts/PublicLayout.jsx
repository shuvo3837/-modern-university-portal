import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navigation/Navbar';
import { Footer } from '../components/layout/Footer';

export const PublicLayout = () => {
  return (
    <div className="ink min-h-screen flex flex-col bg-[var(--bg)]">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
