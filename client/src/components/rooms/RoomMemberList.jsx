import React from 'react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Mail } from 'lucide-react';

export const RoomMemberList = ({ members = [] }) => {
  if (!members || members.length === 0) {
    return <p className="text-xs text-[#5B6475] italic">No members listed in this room.</p>;
  }

  return (
    <div className="divide-y divide-[#E2E6EE] border border-[#E2E6EE] rounded-lg bg-white overflow-hidden">
      {members.map((member, idx) => (
        <div
          key={member.id || idx}
          className="p-3.5 flex items-center justify-between gap-3 hover:bg-[#F7F8FA] transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Avatar name={member.name} size="sm" status={member.status || 'available'} />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#172033] truncate">
                  {member.name}
                </span>
                {member.isLeader && <Badge variant="primary" size="xs">Admin</Badge>}
              </div>
              <p className="text-[11px] text-[#5B6475] truncate">
                {member.role || 'Member'} • {member.department || 'Department of CSE'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="p-1.5 rounded text-[#5B6475] hover:text-[#172033] hover:bg-slate-100 transition-colors"
                title={`Email ${member.name}`}
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            )}
            <Badge variant="neutral" size="xs">{member.designation || 'Active'}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomMemberList;
