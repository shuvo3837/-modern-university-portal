import React from 'react';
import { Camera, Edit3 } from 'lucide-react';
import { Button } from '../common/Button';

export const ProfileHeader = ({ title = 'Academic Profile', subtitle, onEdit }) => {
  return (
    <div className="page-head mb-6">
      <div>
        <h1 className="page-title">{title}</h1>
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
