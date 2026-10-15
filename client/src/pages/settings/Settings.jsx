import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Bell,
  Lock,
  User,
  Eye,
  Calendar,
  Sun,
  Moon,
  LogOut,
  Save,
  CheckCircle,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { useAuth } from '../../hooks/useAuth';

export const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Active settings section
  const [activeSection, setActiveSection] = useState('Account');

  // Account State
  const [email, setEmail] = useState(user?.email || 'alex.morgan@metropolitan.edu');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Privacy State
  const [profileVisibility, setProfileVisibility] = useState('Campus (Metropolitan Univ)');
  const [contactVisibility, setContactVisibility] = useState('Verified Faculty & Students');
  const [scheduleVisibility, setScheduleVisibility] = useState('Department Members');

  // Notifications State
  const [roomNotifications, setRoomNotifications] = useState(true);
  const [scheduleReminders, setScheduleReminders] = useState(true);

  // Appearance State
  const [appearanceTheme, setAppearanceTheme] = useState('Light');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const sections = ['Account', 'Privacy', 'Notifications', 'Schedule', 'Appearance'];

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E6EE]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
            Settings & Preferences
          </h1>
          <p className="text-xs text-[#5B6475] mt-0.5">
            Manage your credentials, visibility settings, notifications, and campus appearance.
          </p>
        </div>

        <Button
          variant="danger"
          size="sm"
          icon={LogOut}
          onClick={handleLogout}
        >
          Sign Out
        </Button>
      </div>

      {/* Navigation tabs for settings */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-[#E2E6EE]">
        {sections.map((sec) => (
          <button
            key={sec}
            type="button"
            onClick={() => setActiveSection(sec)}
            className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider border-b-2 -mb-px transition-colors cursor-pointer ${
              activeSection === sec
                ? 'border-[#3157D5] text-[#3157D5]'
                : 'border-transparent text-[#5B6475] hover:text-[#172033]'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SECTION: ACCOUNT */}
        {activeSection === 'Account' && (
          <Card title="Account Credentials" subtitle="Manage your login email and security password">
            <div className="space-y-4 max-w-lg">
              <Input
                label="Institutional Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Current Password"
                id="currPass"
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                showPasswordToggle
              />

              <Input
                label="New Password"
                id="newPass"
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                showPasswordToggle
                helperText="Must be at least 8 characters with numbers and symbols."
              />
            </div>
          </Card>
        )}

        {/* SECTION: PRIVACY */}
        {activeSection === 'Privacy' && (
          <Card title="Privacy & Discovery" subtitle="Configure who can view your profile, contact, and schedules">
            <div className="space-y-4 max-w-lg">
              <Select
                label="Profile Visibility"
                id="profVis"
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
                options={[
                  'Campus (Metropolitan Univ)',
                  'Department Only',
                  'Instructors & Advisors',
                  'Private',
                ]}
              />

              <Select
                label="Contact Visibility"
                id="contVis"
                value={contactVisibility}
                onChange={(e) => setContactVisibility(e.target.value)}
                options={[
                  'Verified Faculty & Students',
                  'Department Members Only',
                  'Enrolled Courses Only',
                  'Hidden',
                ]}
              />

              <Select
                label="Schedule Visibility"
                id="schedVis"
                value={scheduleVisibility}
                onChange={(e) => setScheduleVisibility(e.target.value)}
                options={[
                  'Department Members',
                  'Campus Community',
                  'Enrolled Course Scholars',
                  'Private (Masked as Busy)',
                ]}
              />
            </div>
          </Card>
        )}

        {/* SECTION: NOTIFICATIONS */}
        {activeSection === 'Notifications' && (
          <Card title="Notifications & Alerts" subtitle="Control delivery channels and notification triggers">
            <div className="space-y-4 max-w-lg">
              <label className="flex items-start justify-between gap-4 p-3 rounded-md border border-[#E2E6EE] bg-[#F7F8FA] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#172033] block">Room Notifications</span>
                  <span className="text-[11px] text-[#5B6475] leading-normal block mt-0.5">
                    Receive announcements, lecture slides, and discussion replies in enrolled spaces.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={roomNotifications}
                  onChange={(e) => setRoomNotifications(e.target.checked)}
                  className="rounded border-[#E2E6EE] text-[#3157D5] focus:ring-[#3157D5] w-4 h-4 mt-1"
                />
              </label>

              <label className="flex items-start justify-between gap-4 p-3 rounded-md border border-[#E2E6EE] bg-[#F7F8FA] cursor-pointer">
                <div>
                  <span className="text-xs font-bold text-[#172033] block">Schedule Reminders</span>
                  <span className="text-[11px] text-[#5B6475] leading-normal block mt-0.5">
                    Get reminders 15 minutes before lectures, lab sessions, and consultation hours.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={scheduleReminders}
                  onChange={(e) => setScheduleReminders(e.target.checked)}
                  className="rounded border-[#E2E6EE] text-[#3157D5] focus:ring-[#3157D5] w-4 h-4 mt-1"
                />
              </label>
            </div>
          </Card>
        )}

        {/* SECTION: SCHEDULE */}
        {activeSection === 'Schedule' && (
          <Card title="Calendar & Academic Timetable Preferences" subtitle="Default calendar layout and slot duration">
            <div className="space-y-4 max-w-lg">
              <Select
                label="Default Timetable View"
                id="defaultView"
                value="Week (Monday - Friday)"
                onChange={() => {}}
                options={['Week (Monday - Friday)', 'Full Week (7 Days)', 'Day View']}
              />

              <Select
                label="Academic Timezone"
                id="tz"
                value="GMT+6 (Dhaka Standard Time)"
                onChange={() => {}}
                options={[
                  'GMT+6 (Dhaka Standard Time)',
                  'UTC (Coordinated Universal Time)',
                  'EST (Eastern Standard Time)',
                ]}
              />
            </div>
          </Card>
        )}

        {/* SECTION: APPEARANCE */}
        {activeSection === 'Appearance' && (
          <Card title="Workspace Appearance" subtitle="Select your preferred academic interface styling">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <button
                type="button"
                onClick={() => setAppearanceTheme('Light')}
                className={`p-4 rounded-md border text-left transition-all cursor-pointer ${
                  appearanceTheme === 'Light'
                    ? 'border-[#3157D5] ring-2 ring-[#3157D5]/20 bg-white'
                    : 'border-[#E2E6EE] bg-[#F7F8FA]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Sun className="w-4 h-4 text-[#3157D5]" />
                  {appearanceTheme === 'Light' && (
                    <span className="text-[10px] font-bold text-[#3157D5] uppercase">Active</span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-[#172033]">Light (Academic Minimal)</h4>
                <p className="text-[11px] text-[#5B6475] mt-1">
                  Standard crisp background with high contrast readability.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setAppearanceTheme('Dark')}
                className={`p-4 rounded-md border text-left transition-all cursor-pointer ${
                  appearanceTheme === 'Dark'
                    ? 'border-[#3157D5] ring-2 ring-[#3157D5]/20 bg-white'
                    : 'border-[#E2E6EE] bg-[#F7F8FA]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Moon className="w-4 h-4 text-[#172033]" />
                  {appearanceTheme === 'Dark' && (
                    <span className="text-[10px] font-bold text-[#3157D5] uppercase">Active</span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-[#172033]">Dark (Midnight Scholar)</h4>
                <p className="text-[11px] text-[#5B6475] mt-1">
                  Low light mode optimized for night study sessions.
                </p>
              </button>
            </div>
          </Card>
        )}

        {/* Save button and status */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <CheckCircle className="w-4 h-4" />
              <span>Preferences saved successfully!</span>
            </div>
          ) : (
            <span />
          )}

          <Button variant="accent" size="sm" type="submit" icon={Save}>
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
