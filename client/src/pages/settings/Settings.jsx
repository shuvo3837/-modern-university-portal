import React, { useState } from 'react';
import { Shield, Bell, Moon, Lock, Save } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

export const Settings = () => {
  const { user } = useAuth();
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [scheduleReminders, setScheduleReminders] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account & Workspace Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure security credentials, notification preferences, and workspace behaviors.
        </p>
      </div>

      <Card title="Academic Account & Security" subtitle="Credentials and session control">
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="text-sm font-medium text-slate-900">Email Address</p>
              <p className="text-xs text-slate-500">{user?.email || 'user@university.edu'}</p>
            </div>
            <Button variant="secondary" size="sm">
              Change
            </Button>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <p className="text-sm font-medium text-slate-900">Password</p>
              <p className="text-xs text-slate-500">Last changed 3 months ago</p>
            </div>
            <Button variant="secondary" size="sm">
              Update Password
            </Button>
          </div>
        </div>
      </Card>

      <Card title="Notification Preferences" subtitle="Control which alerts reach your device">
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-medium text-slate-900">Email Notifications</p>
              <p className="text-xs text-slate-500">Receive room announcements via email</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <p className="text-sm font-medium text-slate-900">Class & Schedule Reminders</p>
              <p className="text-xs text-slate-500">Get 15-minute prior reminders for upcoming lectures</p>
            </div>
            <input
              type="checkbox"
              checked={scheduleReminders}
              onChange={(e) => setScheduleReminders(e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
          </label>
        </div>
      </Card>

      <div className="flex items-center justify-end gap-3">
        {saved && <span className="text-xs font-medium text-emerald-600">Settings saved successfully!</span>}
        <Button variant="primary" icon={Save} onClick={handleSave}>
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

export default Settings;
