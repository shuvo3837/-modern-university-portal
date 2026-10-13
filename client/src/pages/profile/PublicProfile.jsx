import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProfileCard } from '../../components/profile/ProfileCard';
import { mockCurrentUser } from '../../data/mockData';

export const PublicProfile = () => {
  const { username } = useParams();

  // In this initial scaffold, construct profile object from username param
  const profileUser = {
    ...mockCurrentUser,
    username: username || 'scholar',
    name: username ? username.replace(/_/g, ' ').toUpperCase() : 'Campus Scholar',
  };

  return (
    <div className="space-y-6">
      <Link
        to="/people"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Directory</span>
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Academic Profile</h1>
        <p className="text-sm text-slate-500">Public campus directory profile</p>
      </div>

      <ProfileCard user={profileUser} />
    </div>
  );
};

export default PublicProfile;
