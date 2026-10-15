import React from 'react';
import { Clock, MapPin, User, Lock, Eye } from 'lucide-react';
import { Badge } from '../common/Badge';

export const ScheduleEvent = ({ event, viewRole = 'Teacher', onClick }) => {
  if (!event) return null;

  // Schedule Privacy Masking logic
  // Teacher / Self sees: Private Meeting
  // Student sees: Busy
  // Authorized user sees: Meeting
  const isPrivate = event.type === 'Private' || event.visibility === 'Private';

  let displayTitle = event.title;
  let displaySubtitle = `${event.startTime} - ${event.endTime}`;
  let displayLocation = event.room;

  if (isPrivate) {
    if (viewRole === 'Student') {
      displayTitle = 'Busy (Reserved Slot)';
      displayLocation = 'Institutional Schedule';
    } else if (viewRole === 'Authorized') {
      displayTitle = 'Reserved Academic Meeting';
    }
  }

  // Visual treatments
  const typeStyles = {
    Class: 'bg-[#3157D5]/8 border-[#3157D5]/40 text-[#172033]',
    Meeting: 'bg-[#172033]/5 border-[#172033]/30 text-[#172033]',
    Consultation: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    Research: 'bg-purple-50 border-purple-200 text-purple-900',
    Available: 'bg-white border-dashed border-emerald-400 text-emerald-800 hover:bg-emerald-50/40',
    Private: 'bg-amber-50/80 border-amber-300 text-amber-950',
  };

  const badgeVariant = {
    Class: 'accent',
    Meeting: 'primary',
    Consultation: 'success',
    Research: 'neutral',
    Available: 'success',
    Private: 'warning',
  }[event.type] || 'neutral';

  return (
    <div
      onClick={onClick}
      className={`rounded-md border p-2.5 sm:p-3 transition-all cursor-pointer shadow-2xs ${
        typeStyles[event.type] || typeStyles.Class
      }`}
    >
      <div className="flex items-start justify-between gap-1.5 mb-1.5">
        <h4 className="text-xs font-bold leading-snug line-clamp-2">
          {displayTitle}
        </h4>
        <div className="shrink-0 flex items-center gap-1">
          {isPrivate && <Lock className="w-3 h-3 text-amber-600" title="Private Event" />}
          <Badge variant={badgeVariant} size="xs">
            {event.type}
          </Badge>
        </div>
      </div>

      <div className="space-y-0.5 text-[11px] text-[#5B6475] font-medium">
        <div className="flex items-center gap-1 font-mono text-[10px] text-[#172033]">
          <Clock className="w-3 h-3 text-[#5B6475] shrink-0" />
          <span>{displaySubtitle}</span>
        </div>

        {displayLocation && (
          <div className="flex items-center gap-1 text-[11px] truncate">
            <MapPin className="w-3 h-3 text-[#5B6475] shrink-0" />
            <span className="truncate">{displayLocation}</span>
          </div>
        )}

        {event.instructor && viewRole !== 'Student' && (
          <div className="flex items-center gap-1 text-[10px] text-[#5B6475] truncate">
            <User className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{event.instructor}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleEvent;
