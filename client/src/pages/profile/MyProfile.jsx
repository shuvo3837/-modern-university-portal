import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ProfileHeader } from '../../components/profile/ProfileHeader';
import { ProfileCard } from '../../components/profile/ProfileCard';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

export const MyProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    department: user?.department || '',
    university: user?.university || '',
  });

  const handleSave = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <ProfileHeader
        title="My Academic Profile"
        subtitle="Manage your public university profile details, bio, and affiliations."
        onEdit={() => setIsEditing(true)}
      />

      <ProfileCard user={user} />

      {/* Profile Edit Modal */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Profile Details">
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            required
          />
          <Input
            label="Department"
            value={formData.department}
            onChange={(e) => setFormData((prev) => ({ ...prev, department: e.target.value }))}
          />
          <Input
            label="University"
            value={formData.university}
            onChange={(e) => setFormData((prev) => ({ ...prev, university: e.target.value }))}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Academic Bio</label>
            <textarea
              rows={3}
              className="block w-full rounded-lg border border-slate-300 p-2 text-sm text-slate-900 focus:outline-none focus:border-indigo-500"
              value={formData.bio}
              onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MyProfile;
