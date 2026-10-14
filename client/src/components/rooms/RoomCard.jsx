import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Hash, Shield, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const RoomCard = ({ room }) => {
  if (!room) return null;

  const typeBadgeVariant = {
    University: 'emerald',
    Department: 'indigo',
    Course: 'purple',
    Personal: 'slate',
    Custom: 'amber',
  }[room.type] || 'slate';

  return (
    <Card variant="meeting" className="h-full justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <Badge variant={typeBadgeVariant}>{room.type}</Badge>
          <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            <Hash className="w-3 h-3 text-slate-400" />
            {room.code}
          </span>
        </div>

        <h3 className="meeting-name line-clamp-1">{room.name}</h3>
        <p className="type-14 line-clamp-2">
          {room.description || 'No description provided.'}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span>{room.memberCount || 1} members</span>
        </div>

        <Link
          to={`/rooms/${room.id || room._id}`}
          className="open-pill"
        >
          <span>Open Room</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </Card>
  );
};

export default RoomCard;
