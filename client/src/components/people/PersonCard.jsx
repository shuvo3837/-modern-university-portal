import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export const PersonCard = ({ person }) => {
  if (!person) return null;

  const statusVariant = {
    Available: 'success',
    'In Class': 'accent',
    Busy: 'danger',
  }[person.availability] || 'neutral';

  const statusKey = {
    Available: 'available',
    'In Class': 'in_class',
    Busy: 'busy',
  }[person.availability] || 'available';

  return (
    <Card className="hover:border-slate-300 transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            <Avatar name={person.name} size="md" status={statusKey} />
            <div>
              <h4 className="font-semibold text-sm text-[#172033] tracking-tight">
                {person.name}
              </h4>
              <p className="text-xs text-[#5B6475]">{person.designation || person.role}</p>
            </div>
          </div>
          <Badge variant={statusVariant} size="xs">
            {person.availability || 'Available'}
          </Badge>
        </div>

        <div className="space-y-1 text-xs text-[#5B6475] my-2">
          <p className="font-medium text-[#172033]">{person.department}</p>
          <p className="text-[11px] text-[#5B6475]/90 truncate">{person.university}</p>
          {person.bio && (
            <p className="text-xs text-[#5B6475] mt-2 line-clamp-2 leading-relaxed">
              {person.bio}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[#E2E6EE] flex items-center justify-between text-xs">
        {person.email ? (
          <a
            href={`mailto:${person.email}`}
            className="text-[#5B6475] hover:text-[#172033] flex items-center gap-1 font-medium transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
        ) : (
          <span />
        )}

        <Link
          to={`/people/${person.id || person.username}`}
          className="text-xs font-semibold text-[#3157D5] hover:text-[#172033] inline-flex items-center gap-1 transition-colors"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </Card>
  );
};

export default PersonCard;
