import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Users, Calendar, Shield } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Home = () => {
  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="hero">
        <p className="hero-kicker">
          <GraduationCap className="w-4 h-4 shrink-0" />
          <span>Next-Gen Academic Collaboration Platform</span>
        </p>
        <h1 className="page-title">University Workspace</h1>
        <p className="type-18 mx-auto mt-4 max-w-2xl">
          The all-in-one digital campus for students, faculty, department chairs, and administrators
          to collaborate, organize schedules, and manage course spaces.
        </p>

        <div className="hero-actions">
          <Link to="/signup">
            <Button variant="primary" icon={ArrowRight}>
              Get Started Free
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="secondary">
              Sign In to Campus
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="feature-band">
        <div className="overview-stats mx-auto max-w-6xl">
          <div className="stat-card">
            <div className="icon-circle-ink mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="type-18">Academic Rooms</h3>
            <p className="type-14">
              Create and join university, department, course, or personal study rooms with granular access control.
            </p>
          </div>

          <div className="stat-card">
            <div className="icon-circle-ink mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="type-18">Schedule Sync</h3>
            <p className="type-14">
              Keep lectures, lab sessions, faculty office hours, and university deadlines neatly synchronized.
            </p>
          </div>

          <div className="stat-card">
            <div className="icon-circle-ink mb-4">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="type-18">Role-Based Access</h3>
            <p className="type-14">
              Tailored workspaces for students, teachers, department heads, and campus administrators.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
