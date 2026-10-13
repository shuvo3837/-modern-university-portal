import React from 'react';
import { Mail, GraduationCap, Building, Calendar, ShieldCheck } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <Card className="max-w-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
          {user.name ? user.name.slice(0, 2).toUpperCase() : 'U'}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
            <Badge variant="indigo">{user.role}</Badge>
          </div>
          <p className="text-sm text-slate-500 font-mono">@{user.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-b border-slate-100 text-sm">
        <div className="flex items-center gap-3 text-slate-600">
          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{user.university || 'University not specified'}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <Building className="w-4 h-4 text-slate-400 shrink-0" />
          <span>{user.department || 'Department not specified'}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Verified Academic Member</span>
        </div>
      </div>

      {user.bio && (
        <div className="pt-6">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">About</h4>
          <p className="text-sm text-slate-600 leading-relaxed">{user.bio}</p>
        </div>
      )}
    </Card>
  );
};

export default ProfileCard;
