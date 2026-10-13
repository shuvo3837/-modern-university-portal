import React from 'react';
import { Camera, Edit3 } from 'lucide-react';
import { Button } from '../common/Button';

export const ProfileHeader = ({ title = 'Academic Profile', subtitle, onEdit }) => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      {onEdit && (
        <Button variant="secondary" size="sm" icon={Edit3} onClick={onEdit}>
          Edit Profile
        </Button>
      )}
    </div>
  );
};

export default ProfileHeader;
