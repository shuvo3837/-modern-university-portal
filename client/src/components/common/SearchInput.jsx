import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchInput = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
  size = 'md',
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="w-4 h-4 absolute left-3 text-[#5B6475] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-md border border-[#E2E6EE] bg-white pl-9 pr-8 text-sm text-[#172033] placeholder:text-[#5B6475] transition-colors focus:border-[#3157D5] focus:outline-none focus:ring-1 focus:ring-[#3157D5] hover:border-slate-300 ${
          size === 'sm' ? 'py-1.5 text-xs' : 'py-2 text-sm'
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={() => (onClear ? onClear() : onChange(''))}
          className="absolute right-2.5 text-[#5B6475] hover:text-[#172033] p-0.5 rounded transition-colors"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
