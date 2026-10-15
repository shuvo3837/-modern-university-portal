import React, { useState, useEffect } from 'react';
import { SearchInput } from '../../components/common/SearchInput';
import { TeacherCard } from '../../components/people/TeacherCard';
import { PersonCard } from '../../components/people/PersonCard';
import { EmptyState } from '../../components/common/EmptyState';
import profileService from '../../services/profileService';

export const People = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('All');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);

  const roleFilters = ['All', 'Teachers', 'Students', 'Faculty'];
  const deptFilters = ['All', 'CSE', 'EEE', 'BBA'];

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await profileService.getUsers({
          search: searchQuery,
          role: selectedRoleFilter !== 'All' ? selectedRoleFilter.toLowerCase() : undefined,
          department: selectedDeptFilter !== 'All' ? selectedDeptFilter : undefined,
        });
        const list = res.data || res || [];
        setPeople(Array.isArray(list) ? list : []);
      } catch (err) {
        setPeople([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchUsers, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedRoleFilter, selectedDeptFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-[#E2E6EE]">
        <h1 className="text-xl sm:text-2xl font-bold text-[#172033] tracking-tight">
          People
        </h1>
        <p className="text-xs text-[#5B6475] mt-0.5">
          Campus faculty directory, teaching assistants, department heads, and scholars.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="w-full sm:max-w-xs">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search people by name or department..."
              size="sm"
            />
          </div>

          {/* Department Filter buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[11px] font-bold text-[#5B6475] uppercase tracking-wider mr-1">
              Dept:
            </span>
            {deptFilters.map((dept) => (
              <button
                key={dept}
                type="button"
                onClick={() => setSelectedDeptFilter(dept)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  selectedDeptFilter === dept
                    ? 'bg-[#172033] text-white shadow-2xs'
                    : 'bg-white border border-[#E2E6EE] text-[#5B6475] hover:text-[#172033]'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-[#5B6475] uppercase tracking-wider mr-1">
            Role:
          </span>
          {roleFilters.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRoleFilter(role)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                selectedRoleFilter === role
                  ? 'bg-[#3157D5] text-white shadow-2xs'
                  : 'bg-white border border-[#E2E6EE] text-[#5B6475] hover:text-[#172033]'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Directory Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs text-[#5B6475]">Loading campus scholars...</div>
      ) : people.length === 0 ? (
        <EmptyState
          title="No scholars or faculty found"
          description="Registered campus members will appear here. Try adjusting your search query or role filters."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {people.map((person) =>
            person.role === 'teacher' || person.role === 'department_head' ? (
              <TeacherCard key={person.id || person.username} teacher={person} />
            ) : (
              <PersonCard key={person.id || person.username} person={person} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default People;
