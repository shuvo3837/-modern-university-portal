import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export const TeacherCard = ({ teacher }) => {
  if (!teacher) return null;

  const statusVariant = {
    Available: 'success',
    'In Class': 'accent',
    Busy: 'danger',
  }[teacher.availability] || 'neutral';

  const statusKey = {
    Available: 'available',
    'In Class': 'in_class',
    Busy: 'busy',
  }[teacher.availability] || 'available';

  return (
    <Card className="hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        {/* Header: Avatar, Name, Designation, Availability */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            <Avatar name={teacher.name} size="md" status={statusKey} />
            <div>
              <h4 className="font-semibold text-sm text-[#172033] tracking-tight">
                {teacher.name}
              </h4>
              <p className="text-xs text-[#5B6475]">{teacher.designation || 'Faculty Member'}</p>
            </div>
          </div>
          <Badge variant={statusVariant} size="xs">
            {teacher.availability || 'Available'}
          </Badge>
        </div>

        {/* Academic Details */}
        <div className="space-y-1.5 text-xs text-[#5B6475] my-2 bg-[#F7F8FA] p-2.5 rounded-md border border-[#E2E6EE]">
          <p className="font-semibold text-[#172033]">{teacher.department}</p>
          {teacher.office && (
            <p className="flex items-center gap-1.5 text-[11px]">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{teacher.office}</span>
            </p>
          )}
          {teacher.officeHours && (
            <p className="flex items-center gap-1.5 text-[11px]">
              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
              <span>Office Hours: {teacher.officeHours}</span>
            </p>
          )}
        </div>

        {/* Courses preview */}
        {teacher.courses && teacher.courses.length > 0 && (
          <div className="mt-2 text-[11px] text-[#5B6475]">
            <span className="font-semibold text-[#172033]">Courses: </span>
            <span>{teacher.courses.slice(0, 2).join(', ')}</span>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3 border-t border-[#E2E6EE] flex items-center justify-between text-xs">
        {teacher.email ? (
          <a
            href={`mailto:${teacher.email}`}
            className="text-[#5B6475] hover:text-[#172033] flex items-center gap-1 font-medium transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        ) : (
          <span />
        )}

        <Link
          to={`/people/${teacher.id || teacher.username}`}
          className="text-xs font-semibold text-[#3157D5] hover:text-[#172033] inline-flex items-center gap-1 transition-colors"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </Card>
  );
};

export default TeacherCard;
