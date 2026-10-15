import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Building,
  GraduationCap,
  Phone,
  Globe,
  BookOpen,
  Edit3,
  Shield,
  Save,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Avatar } from '../../components/common/Avatar';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';

export const MyProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.fullName || user?.name || user?.username || '',
    username: user?.username || '',
    email: user?.email || '',
    contact: user?.contact || '',
    university: user?.university || '',
    department: user?.department || '',
    role: user?.role || 'Student',
    designation: user?.designation || '',
    bio: user?.bio || '',
    office: user?.office || user?.officeLocation || '',
    linkedIn: user?.linkedin || user?.linkedIn || '',
    researchInterests: user?.researchInterests || [],
    courses: user?.courses || [],
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    updateUser(formData);
    try {
      const { profileService } = await import('../../services/profileService');
      await profileService.updateProfile({
        fullName: formData.name,
        contact: formData.contact,
        university: formData.university,
        department: formData.department,
        designation: formData.designation,
        bio: formData.bio,
        officeLocation: formData.office,
        linkedin: formData.linkedIn,
        researchInterests: formData.researchInterests,
        courses: formData.courses,
      });
    } catch (err) {
      // local update already in state
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsEditing(false);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-[#E2E6EE]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
            Academic Profile
          </h1>
          <p className="text-xs text-[#5B6475] mt-0.5">
            Your verified institutional identity, bio, course affiliations, and office details.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Edit3}
          onClick={() => setIsEditing(true)}
        >
          Edit Profile
        </Button>
      </div>

      {/* Main Profile Identity Card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6 border-b border-[#E2E6EE]">
          <div className="flex items-center gap-4">
            <Avatar name={formData.name} size="xl" status="available" />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-bold text-[#172033] tracking-tight">
                  {formData.name}
                </h2>
                <Badge variant="primary" size="xs">
                  {formData.role}
                </Badge>
              </div>
              <p className="text-sm font-semibold text-[#172033]">{formData.designation}</p>
              <p className="text-xs text-[#5B6475] font-mono">@{formData.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Verified Scholar</span>
          </div>
        </div>

        {/* Institutional Affiliation & Contact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 border-b border-[#E2E6EE] text-xs text-[#5B6475]">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-[#3157D5] shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5B6475] block">University</span>
              <span className="font-semibold text-[#172033]">{formData.university}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Building className="w-4 h-4 text-[#3157D5] shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5B6475] block">Department</span>
              <span className="font-semibold text-[#172033]">{formData.department}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5B6475] block">Institutional Email</span>
              <span className="font-semibold text-[#172033]">{formData.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-slate-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-[#5B6475] block">Contact Phone</span>
              <span className="font-semibold text-[#172033]">{formData.contact}</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="py-5 border-b border-[#E2E6EE]">
          <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-2">
            Biography
          </h4>
          <p className="text-xs sm:text-sm text-[#5B6475] leading-relaxed">
            {formData.bio}
          </p>
        </div>

        {/* Professional Section */}
        <div className="pt-5 space-y-4">
          <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
            Professional Information
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-md bg-[#F7F8FA] border border-[#E2E6EE] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#5B6475] block">Office Location</span>
              <p className="font-semibold text-[#172033] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{formData.office}</span>
              </p>
            </div>

            <div className="p-3.5 rounded-md bg-[#F7F8FA] border border-[#E2E6EE] space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#5B6475] block">Professional Profile</span>
              <a
                href={formData.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#3157D5] flex items-center gap-1.5 hover:underline"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{formData.linkedIn}</span>
              </a>
            </div>
          </div>

          {/* Research Interests */}
          <div>
            <span className="text-[11px] font-bold text-[#5B6475] uppercase tracking-wider block mb-2">
              Research Interests
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {formData.researchInterests.map((interest) => (
                <span
                  key={interest}
                  className="px-2.5 py-1 rounded bg-[#F7F8FA] border border-[#E2E6EE] text-xs font-medium text-[#172033]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Enrolled Courses */}
          <div>
            <span className="text-[11px] font-bold text-[#5B6475] uppercase tracking-wider block mb-2">
              Enrolled Academic Courses
            </span>
            <div className="space-y-1.5">
              {formData.courses.map((course) => (
                <div
                  key={course}
                  className="p-2.5 rounded-md bg-[#F7F8FA] border border-[#E2E6EE] text-xs font-semibold text-[#172033] flex items-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#3157D5]" />
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Academic Profile">
        {savedSuccess ? (
          <div className="py-6 text-center space-y-2">
            <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-[#172033]">Profile Updated</h4>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Designation / Title"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Office / Location"
                value={formData.office}
                onChange={(e) => setFormData({ ...formData, office: e.target.value })}
              />
              <Input
                label="Contact Phone"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              />
            </div>

            <Input
              label="Professional Profile URL"
              value={formData.linkedIn}
              onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
            />

            <div>
              <label className="block text-xs font-semibold text-[#172033] mb-1.5 uppercase tracking-wider">
                Biography
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full rounded-md border border-[#E2E6EE] p-2.5 text-xs sm:text-sm text-[#172033] focus:outline-none focus:border-[#3157D5] focus:ring-1 focus:ring-[#3157D5]"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
              <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button variant="accent" size="sm" type="submit" icon={Save}>
                Save Profile
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default MyProfile;
