import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { AuditSelect } from '../../components/common/AuditSelect';
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
        <h1 className="page-title">University Directory</h1>
        <p className="type-14">
          Explore faculty members, department chairs, teaching assistants, and students.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="filter-row">
        <div className="search-wrap">
          <Search />
          <input
            type="text"
            placeholder="Search directory by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-field"
          />
        </div>
        <AuditSelect
          name="role"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          options={[
            { value: 'ALL', label: 'All Roles' },
            ...Object.values(USER_ROLES).map((role) => ({ value: role, label: role })),
          ]}
        />
      </div>

      {/* Directory Grid */}
      <div className="people-board">
        <div className="people-grid">
        {filteredPeople.map((person) =>
          person.role === USER_ROLES.TEACHER || person.role === USER_ROLES.DEPARTMENT_HEAD ? (
            <TeacherCard key={person.id || person.username} teacher={person} />
          ) : (
            <PersonCard key={person.id || person.username} person={person} />
          )
        )}
        </div>
      </div>
    </div>
  );
};

export default People;
