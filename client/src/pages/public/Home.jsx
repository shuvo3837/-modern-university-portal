import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Users, Calendar, Shield } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Home = () => {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-6">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Next-Gen Academic Collaboration Platform</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          University Workspace
        </h1>
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          The all-in-one digital campus for students, faculty, department chairs, and administrators
          to collaborate, organize schedules, and manage course spaces.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/signup">
            <Button variant="primary" size="lg" icon={ArrowRight}>
              Get Started Free
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary" size="lg">
              Sign In to Campus
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl border border-slate-100 bg-slate-50/50">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Academic Rooms</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Create and join university, department, course, or personal study rooms with granular access control.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-100 bg-slate-50/50">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Schedule Sync</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Keep lectures, lab sessions, faculty office hours, and university deadlines neatly synchronized.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-slate-100 bg-slate-50/50">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Role-Based Access</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tailored workspaces for students, teachers, department heads, and campus administrators.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
