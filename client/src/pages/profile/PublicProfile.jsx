import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Building, GraduationCap, Shield, AlertCircle } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Avatar } from '../../components/common/Avatar';
import { Button } from '../../components/common/Button';
import profileService from '../../services/profileService';

export const PublicProfile = () => {
  const { username } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await profileService.getProfileByUsername(username);
        const data = res.data || res;
        setPerson(data);
      } catch (err) {
        setError('Scholar profile not found or set to private.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="py-12 text-center text-xs text-[#5B6475]">
        Loading profile details...
      </div>
    );
  }

  if (error || !person) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-[#5B6475] flex items-center justify-center mx-auto border border-[#E2E6EE]">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#172033]">Scholar Profile Not Found</h3>
        <p className="text-xs text-[#5B6475]">
          The profile "@{username}" does not exist or has been set to private.
        </p>
        <Link to="/people">
          <Button variant="secondary" size="sm">
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  const displayName = person.fullName || person.name || person.username || username;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link
        to="/people"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6475] hover:text-[#172033] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to People Directory</span>
      </Link>

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
              <p className="text-sm font-semibold text-[#172033]">
                {person.designation || person.role}
              </p>
              <p className="text-xs text-[#5B6475]">
                {person.department || 'Department Affiliate'} • {person.university || 'University Workspace'}
              </p>
            </div>
          </div>

          {person.email && (
            <a href={`mailto:${person.email}`}>
              <Button variant="accent" size="sm" icon={Mail}>
                Contact Scholar
              </Button>
            </a>
          )}
        </div>

        {person.bio && (
          <div className="py-5 border-b border-[#E2E6EE]">
            <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider mb-2">
              About
            </h4>
            <p className="text-xs sm:text-sm text-[#5B6475] leading-relaxed">
              {person.bio}
            </p>
          </div>
        )}

        <div className="pt-5 space-y-3">
          <h4 className="text-xs font-bold text-[#172033] uppercase tracking-wider">
            Academic Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5B6475]">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-400" />
              <span>Department: {person.department || 'Not specified'}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-slate-400" />
              <span>Campus: {person.university || 'University Workspace'}</span>
            </div>
            {person.officeLocation && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Office: {person.officeLocation}</span>
              </div>
            )}
            {person.contact && (
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-400" />
                <span>Contact: {person.contact}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PublicProfile;
