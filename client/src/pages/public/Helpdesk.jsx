import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, HelpCircle, Mail, BookOpen } from 'lucide-react';
import { Card } from '../../components/common/Card';
import { SearchInput } from '../../components/common/SearchInput';
import { helpdeskFaqs } from '../../data/helpdeskFaqs';

export const Helpdesk = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSection, setSelectedSection] = useState('All');
  const [expandedIndex, setExpandedIndex] = useState(0); // first item open by default

  const sections = [
    'All',
    'Getting Started',
    'Account',
    'Rooms',
    'Joining Rooms',
    'Profiles',
    'Schedule',
    'Notifications',
  ];

  const filteredFaqs = helpdeskFaqs.filter((faq) => {
    const matchesSection = selectedSection === 'All' || faq.category === selectedSection;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSection && matchesSearch;
  });

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? -1 : idx);
  };

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 sm:py-14 space-y-8">
      {/* Title & Search Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-[#E2E6EE] text-[11px] font-semibold text-[#172033] uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-[#3157D5]" />
          <span>Support & Academic Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#172033] tracking-tight">
          University Helpdesk
        </h1>
        <p className="text-xs sm:text-sm text-[#5B6475] max-w-lg mx-auto leading-relaxed">
          Frequently asked questions, guides on managing academic spaces, and technical support.
        </p>

        <div className="max-w-md mx-auto pt-2">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search FAQs, room codes, scheduling..."
          />
        </div>
      </div>

      {/* Sections Filter Pills */}
      <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {sections.map((sec) => (
          <button
            key={sec}
            type="button"
            onClick={() => setSelectedSection(sec)}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedSection === sec
                ? 'bg-[#172033] text-white shadow-2xs'
                : 'bg-white border border-[#E2E6EE] text-[#5B6475] hover:text-[#172033] hover:border-slate-300'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>

      {/* Expandable FAQ Cards */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-lg border border-[#E2E6EE] text-xs text-[#5B6475]">
            No answers matched your search. Please reach out to <span className="font-semibold text-[#172033]">support@metropolitan.edu</span>.
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-lg border border-[#E2E6EE] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#F7F8FA]/60 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-[#3157D5] tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="text-sm font-semibold text-[#172033] tracking-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="text-[#5B6475] shrink-0 p-1 rounded">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-[#5B6475] leading-relaxed border-t border-slate-100 bg-[#F7F8FA]/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Direct Contact Footer Box */}
      <div className="p-6 rounded-lg bg-white border border-[#E2E6EE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-[#172033]">Still need assistance?</h4>
          <p className="text-xs text-[#5B6475]">
            The Metropolitan University registrar and IT helpdesk respond within 1 business day.
          </p>
        </div>
        <a
          href="mailto:support@metropolitan.edu"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#172033] text-white text-xs font-semibold hover:bg-[#232F48] transition-colors shrink-0"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Email Support</span>
        </a>
      </div>
    </div>
  );
};

export default Helpdesk;
