import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E2E6EE] py-8 px-4 sm:px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5B6475]">
        <div>
          <p>© {new Date().getFullYear()} University Workspace. All rights reserved.</p>
          <p className="text-[11px] text-[#5B6475]/80 mt-0.5">
            Metropolitan University Academic Computing Division
          </p>
        </div>

        <div className="flex items-center gap-6 font-medium">
          <a
            href="mailto:support@metropolitan.edu"
            className="hover:text-[#172033] transition-colors"
          >
            support@metropolitan.edu
          </a>
          <span className="text-slate-300">•</span>
          <Link to="/helpdesk" className="hover:text-[#172033] transition-colors">
            Helpdesk
          </Link>
          <span className="text-slate-300">•</span>
          <span className="text-[#5B6475]">Contact Us</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
