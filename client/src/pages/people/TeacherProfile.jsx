import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  MapPin,
  Clock,
  Shield,
  BookOpen,
  Phone,
  Globe,
  AlertCircle,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Avatar } from '../../components/common/Avatar';
import profileService from '../../services/profileService';

export const TeacherProfile = () => {
  const { userId } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await profileService.getProfileByUsername(userId);
        const data = res.data || res;
        setPerson(data);
      } catch (err) {
        setError('Faculty or scholar profile not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="py-12 text-center text-xs text-[#5B6475]">
        Loading scholar profile...
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#172033]">Scholar Profile Not Found</h3>
        <p className="text-xs text-[#5B6475]">
          The requested profile could not be found or has been restricted by user privacy settings.
        </p>
        <Link to="/people">
          <Button variant="secondary" size="sm">
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  const displayName = person.fullName || person.name || person.username || 'Scholar';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        to="/people"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6475] hover:text-[#172033] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to People Directory</span>
      </Link>

      {/* Main Profile Header Card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-6 border-b border-[#E2E6EE]">
          <div className="flex items-center gap-4">
            <Avatar name={displayName} size="xl" status="available" />
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold text-[#172033] tracking-tight">
                  {displayName}
                </h1>
                <Badge variant="primary" size="xs">
                  {person.role || 'Scholar'}
                </Badge>
              </div>
              <p className="text-sm font-medium text-[#172033]">
                {person.designation || person.role}
              </p>
              <p className="text-xs text-[#5B6475]">
                {person.department || 'Academic Department'} • {person.university || 'University Workspace'}
              </p>
            </div>
          </div>

          {person.email && (
            <div className="flex items-center gap-2">
              <a href={`mailto:${person.email}`}>
                <Button variant="accent" size="sm" icon={Mail}>
                  Contact Scholar
                </Button>
              </a>
            </div>
          )}
        </div>

        {/* Bio Section */}
        {person.bio && (
          <div className="py-5 border-b border-[#E2E6EE]">
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-2">
              Academic Biography
            </h4>
            <p className="text-xs sm:text-sm text-[#5B6475] leading-relaxed">
              {person.bio}
            </p>
          </div>
        )}

        {/* Research Interests */}
        {person.researchInterests && person.researchInterests.length > 0 && (
          <div className="py-5 border-b border-[#E2E6EE]">
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-2.5">
              Research Interests
            </h4>
            <div className="flex items-center gap-1.5 flex-wrap">
              {person.researchInterests.map((interest) => (
                <span
                  key={interest}
                  className="px-2.5 py-1 rounded-md bg-[#F7F8FA] border border-[#E2E6EE] text-xs font-medium text-[#172033]"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Courses */}
        {person.courses && person.courses.length > 0 && (
          <div className="py-5 border-b border-[#E2E6EE]">
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-2.5">
              Courses
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {person.courses.map((course) => (
                <div
                  key={course}
                  className="p-3 rounded-md bg-[#F7F8FA] border border-[#E2E6EE] flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-[#172033] flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#3157D5]" />
                    {course}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Professional Links */}
        {person.linkedin && (
          <div className="py-5 border-b border-[#E2E6EE]">
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-2.5">
              Professional Links
            </h4>
            <div className="flex items-center gap-3 text-xs">
              <a
                href={person.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-[#3157D5] hover:underline font-medium"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
        )}

        {/* Contact info according to privacy */}
        <div className="pt-5">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
              Contact Details
            </h4>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              <span>Verified Directory</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5B6475]">
            {person.officeLocation && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Office: {person.officeLocation}</span>
              </div>
            )}
            {person.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Email: {person.email}</span>
              </div>
            )}
            {person.contact && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Contact: {person.contact}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Response: Active Campus Scholar</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeacherProfile;
