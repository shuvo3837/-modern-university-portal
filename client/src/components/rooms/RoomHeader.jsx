import React, { useState } from 'react';
import { Hash, Copy, Check, Shield, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RoomTypeBadge, RoomAccessBadge } from './RoomTypeBadge';
import { Button } from '../common/Button';

export const RoomHeader = ({ room, onBack }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (room?.code) {
      navigator.clipboard?.writeText(room.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!room) return null;

  return (
    <div className="bg-white rounded-lg border border-[#E2E6EE] p-5 sm:p-6 mb-6">
      {/* Back button */}
      <Link
        to="/rooms"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5B6475] hover:text-[#172033] mb-4 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to My Rooms</span>
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <RoomTypeBadge type={room.type} />
            <RoomAccessBadge accessType={room.accessType} />
            <div className="flex items-center gap-1 bg-[#F7F8FA] border border-[#E2E6EE] rounded px-2 py-0.5 text-xs font-mono font-semibold text-[#172033]">
              <Hash className="w-3 h-3 text-[#5B6475]" />
              <span>{room.code}</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="ml-1 text-[#5B6475] hover:text-[#172033] cursor-pointer"
                title="Copy Room Code"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
            {room.name}
          </h1>

          <p className="text-xs sm:text-sm text-[#5B6475] leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Admin and members quick summary */}
        <div className="flex md:flex-col items-center md:items-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
          <div className="text-left md:text-right text-xs">
            <span className="text-[10px] uppercase font-bold text-[#5B6475] block">Room Admin</span>
            <span className="font-semibold text-[#172033] flex items-center gap-1 md:justify-end">
              <Shield className="w-3 h-3 text-[#3157D5]" />
              {room.admin || 'Faculty Office'}
            </span>
          </div>

          <div className="text-left md:text-right text-xs">
            <span className="text-[10px] uppercase font-bold text-[#5B6475] block">Enrollment</span>
            <span className="font-semibold text-[#172033] flex items-center gap-1 md:justify-end">
              <Users className="w-3 h-3 text-slate-400" />
              {room.memberCount || 1} Scholars
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomHeader;
