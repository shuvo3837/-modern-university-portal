import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Clock, ArrowRight, Hash } from 'lucide-react';
import { Card } from '../common/Card';
import { RoomTypeBadge } from './RoomTypeBadge';

export const RoomCard = ({ room }) => {
  if (!room) return null;

  return (
    <Card className="hover:border-slate-300 transition-all flex flex-col justify-between group">
      <div>
        {/* Top meta */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <RoomTypeBadge type={room.type} />
          <span className="font-mono text-[11px] font-semibold text-[#5B6475] bg-[#F7F8FA] px-2 py-0.5 rounded border border-[#E2E6EE] flex items-center gap-1">
            <Hash className="w-3 h-3 text-slate-400" />
            {room.code}
          </span>
        </div>

        {/* Room Title */}
        <Link to={`/rooms/${room.id || room.code}`}>
          <h3 className="font-semibold text-[#172033] text-sm sm:text-base group-hover:text-[#3157D5] transition-colors leading-snug line-clamp-1">
            {room.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-xs text-[#5B6475] mt-1.5 leading-relaxed line-clamp-2">
          {room.description || 'Academic room workspace.'}
        </p>
      </div>

      {/* Footer Meta: Member Count & Last Activity */}
      <div className="mt-4 pt-3 border-t border-[#E2E6EE] flex items-center justify-between text-xs text-[#5B6475]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>{room.memberCount || 1} scholars</span>
          </span>
          {room.lastActivity && (
            <span className="hidden sm:flex items-center gap-1 text-[11px] text-[#5B6475]/80">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{room.lastActivity}</span>
            </span>
          )}
        </div>

        <Link
          to={`/rooms/${room.id || room.code}`}
          className="text-xs font-semibold text-[#3157D5] hover:text-[#172033] inline-flex items-center gap-1 transition-colors"
        >
          <span>Open</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </Card>
  );
};

export default RoomCard;
