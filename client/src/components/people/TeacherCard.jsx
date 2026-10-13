import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Clock, BookOpen } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const TeacherCard = ({ teacher }) => {
  if (!teacher) return null;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-base">
            {teacher.name ? teacher.name.slice(0, 2).toUpperCase() : 'T'}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 text-sm">{teacher.name}</h4>
            <p className="text-xs text-slate-500">{teacher.title || teacher.role}</p>
          </div>
        </div>
        <Badge variant="indigo">Faculty</Badge>
      </div>

      <div className="space-y-2 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-lg">
        {teacher.office && (
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{teacher.office}</span>
          </div>
        )}
        {teacher.officeHours && (
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{teacher.officeHours}</span>
          </div>
        )}
        {teacher.coursesTaught && teacher.coursesTaught.length > 0 && (
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">Courses: {teacher.coursesTaught.join(', ')}</span>
          </div>
        )}
      </div>

      <div className="pt-2 flex items-center justify-between">
        <a
          href={`mailto:${teacher.email}`}
          className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1"
        >
          <Mail className="w-3 h-3" />
          <span>Contact</span>
        </a>
        <Link
          to={`/people/${teacher.id || teacher._id}`}
          className="text-xs font-medium text-indigo-600 hover:underline"
        >
          View Full Profile
        </Link>
      </div>
    </Card>
  );
};

export default TeacherCard;
