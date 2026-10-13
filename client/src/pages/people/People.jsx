import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { TeacherCard } from '../../components/people/TeacherCard';
import { PersonCard } from '../../components/people/PersonCard';
import { mockTeachers, mockCurrentUser } from '../../data/mockData';
import { USER_ROLES } from '../../utils/constants';

export const People = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');

  const allPeople = [...mockTeachers, mockCurrentUser];

  const filteredPeople = allPeople.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'ALL' || p.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">University Directory</h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore faculty members, department chairs, teaching assistants, and students.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search directory by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All Roles</option>
            {Object.values(USER_ROLES).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPeople.map((person) =>
          person.role === USER_ROLES.TEACHER || person.role === USER_ROLES.DEPARTMENT_HEAD ? (
            <TeacherCard key={person.id || person.username} teacher={person} />
          ) : (
            <PersonCard key={person.id || person.username} person={person} />
          )
        )}
      </div>
    </div>
  );
};

export default People;
