import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 px-4 md:px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} University Workspace. Modern Digital Campus Platform.</p>
        <div className="flex items-center gap-6">
          <a href="/helpdesk" className="hover:text-indigo-600 transition-colors">
            Helpdesk & Support
          </a>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400">Academic Integrity & Privacy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
