import React from 'react';

export const Tabs = ({ tabs = [], activeTab, onChange, className = '' }) => {
  return (
    <div className={`border-b border-[#E2E6EE] flex items-center gap-1 sm:gap-2 overflow-x-auto ${className}`}>
      {tabs.map((tab) => {
        const id = tab.id ?? tab;
        const label = tab.label ?? tab;
        const count = tab.count;
        const isActive = activeTab === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex items-center gap-2 py-3 px-3 sm:px-4 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors relative border-b-2 -mb-px ${
              isActive
                ? 'border-[#3157D5] text-[#3157D5]'
                : 'border-transparent text-[#5B6475] hover:text-[#172033] hover:border-slate-300'
            }`}
          >
            {tab.icon && <tab.icon className="w-3.5 h-3.5 shrink-0" />}
            <span>{label}</span>
            {count !== undefined && (
              <span
                className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none ${
                  isActive ? 'bg-[#3157D5]/10 text-[#3157D5]' : 'bg-slate-100 text-[#5B6475]'
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
