import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Clock, BookOpen, GraduationCap } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { mockTeachers } from '../../data/mockData';

export const TeacherProfile = () => {
  const { userId } = useParams();

  const teacher =
    mockTeachers.find((t) => t.id === userId || t.username === userId) || mockTeachers[0];

  return (
    <div className="space-y-6 max-w-4xl">
      <Link
        to="/people"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to People</span>
      </Link>

      <Card>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-xl shadow-xs">
            {teacher.name ? teacher.name.slice(0, 2).toUpperCase() : 'T'}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="page-title">{teacher.name}</h1>
              <Badge variant="indigo">{teacher.role}</Badge>
            </div>
            <p className="text-sm text-slate-500 mt-0.5">{teacher.title}</p>
          </div>
          <a href={`mailto:${teacher.email}`}>
            <Button variant="primary" size="sm" icon={Mail}>
              Send Email
            </Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 border-b border-slate-100 text-sm">
          <div className="flex items-center gap-3 text-slate-600">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{teacher.office || 'Office TBA'}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span>{teacher.officeHours || 'By appointment'}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Department: {teacher.department}</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600">
            <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Courses: {teacher.coursesTaught?.join(', ') || 'N/A'}</span>
          </div>
        </div>

        <div className="pt-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-2">Office Hours & Mentorship</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Students are invited to drop in during open office hours or reserve a slot via their
            academic room. For urgent course questions, please post directly in the course room forum.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default TeacherProfile;
