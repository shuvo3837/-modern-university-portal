import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Building } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const PersonCard = ({ person }) => {
  if (!person) return null;

  return (
    <Card variant="people">
      <div className="flex items-center gap-3 mb-3">
        <div className="icon-circle-ink sm">
          {person.name ? person.name.slice(0, 2).toUpperCase() : 'U'}
        </div>
        <div className="overflow-hidden">
          <h4 className="person-name truncate">{person.name}</h4>
          <p className="text-xs text-slate-500 font-mono">@{person.username}</p>
        </div>
      </div>

      <div className="space-y-1.5 text-xs text-slate-600 mb-4">
        <div className="flex items-center gap-2">
          <Badge variant="slate">{person.role}</Badge>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 truncate">
          <Building className="w-3.5 h-3.5 shrink-0" />
          <span>{person.department || 'General'}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <a
          href={`mailto:${person.email}`}
          className="text-xs text-slate-500 hover:text-indigo-600 flex items-center gap-1"
        >
          <Mail className="w-3 h-3" />
          <span>Email</span>
        </a>
        <Link
          to={`/people/${person.id || person._id || person.username}`}
          className="text-link"
        >
          View Profile
        </Link>
      </div>
    </Card>
  );
};

export default PersonCard;
