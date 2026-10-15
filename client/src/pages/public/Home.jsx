import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Building, ShieldCheck, DoorOpen } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Home = () => {
  return (
    <div className="flex-1 flex flex-col justify-center py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* Subtle Institutional Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2E6EE] text-[#172033] text-xs font-semibold tracking-wide shadow-2xs">
          <GraduationCap className="w-3.5 h-3.5 text-[#3157D5]" />
          <span>Metropolitan University Academic Portal</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172033] tracking-tight leading-tight">
          One Workspace for Your University
        </h1>

        {/* Supporting Text */}
        <p className="text-base sm:text-lg text-[#5B6475] font-normal max-w-xl mx-auto leading-relaxed">
          Connect. Organize. Collaborate.
        </p>

        {/* Primary Action Button */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <Link to="/signup">
            <Button variant="accent" size="lg" icon={ArrowRight}>
              Get Started
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Minimal academic summary pillars */}
        <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="p-4 rounded-lg bg-white border border-[#E2E6EE] space-y-1">
            <div className="w-7 h-7 rounded bg-[#F7F8FA] border border-[#E2E6EE] text-[#172033] flex items-center justify-center font-bold text-xs mb-2">
              <Building className="w-3.5 h-3.5 text-[#3157D5]" />
            </div>
            <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
              Department Spaces
            </h3>
            <p className="text-xs text-[#5B6475] leading-relaxed">
              Unified portals for academic divisions, syllabus archives, and announcements.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-[#E2E6EE] space-y-1">
            <div className="w-7 h-7 rounded bg-[#F7F8FA] border border-[#E2E6EE] text-[#172033] flex items-center justify-center font-bold text-xs mb-2">
              <DoorOpen className="w-3.5 h-3.5 text-[#3157D5]" />
            </div>
            <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
              Course Rooms
            </h3>
            <p className="text-xs text-[#5B6475] leading-relaxed">
              Course discussion, lab sections, and group study spaces with secure access codes.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-white border border-[#E2E6EE] space-y-1">
            <div className="w-7 h-7 rounded bg-[#F7F8FA] border border-[#E2E6EE] text-[#172033] flex items-center justify-center font-bold text-xs mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3157D5]" />
            </div>
            <h3 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
              Schedule Sync
            </h3>
            <p className="text-xs text-[#5B6475] leading-relaxed">
              Clear faculty office hours, lecture timetables, and granular schedule privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
