import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Play, 
  Building2, 
  Bookmark, 
  Search,
  CheckCircle
} from 'lucide-react';
import { InterviewQuestion } from '../types';

interface InterviewHubProps {
  questions: InterviewQuestion[];
  onNavigateToRunner: (code: string) => void;
  onToggleBookmark: (item: any) => void;
  isBookmarked: (id: string) => boolean;
  isDarkMode: boolean;
}

export const InterviewHub: React.FC<InterviewHubProps> = ({
  questions,
  onNavigateToRunner,
  onToggleBookmark,
  isBookmarked,
  isDarkMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(questions[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Core Java & Collections', 'Spring Boot', 'Multithreading', 'System Design & OOP'];
  const levels = ['All', 'Fresher', 'Mid-Level', 'Senior/Lead'];

  const filteredQuestions = questions.filter(q => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || q.level === selectedLevel;
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  const handleCopyCode = (code: string, qId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(qId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-emerald-500" />
          <span>Java & Web Development Interview Preparation Hub</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Handpicked top interview questions with comprehensive answers, code snippets, and company target tags.
        </p>
      </div>

      {/* Filters Toolbar */}
      <div className={`p-4 rounded-2xl border space-y-4 shadow-sm ${
        isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search interview topics..."
              className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:border-indigo-500 ${
                isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            />
          </div>

          {/* Level Filter Pill */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-xs font-semibold text-slate-500">Level:</span>
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedLevel === lvl 
                    ? 'bg-indigo-600 text-white' 
                    : isDarkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-700/60">
          <span className="text-xs font-semibold text-slate-500 shrink-0">Topic:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition border ${
                selectedCategory === cat
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold'
                  : isDarkMode ? 'border-slate-700 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-2">
            <HelpCircle className="w-8 h-8 opacity-30 mx-auto" />
            <p>No interview questions matched your search criteria.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            const bookmarked = isBookmarked(q.id);

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition shadow-sm ${
                  isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
                }`}
              >
                {/* Accordion Question Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-500/5 rounded-2xl transition"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {q.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-medium ${
                        q.level === 'Fresher' ? 'bg-emerald-500/10 text-emerald-600' :
                        q.level === 'Mid-Level' ? 'bg-amber-500/10 text-amber-600' :
                        'bg-purple-500/10 text-purple-600'
                      }`}>
                        {q.level}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                      {q.question}
                    </h3>

                    {q.popularInCompanies && q.popularInCompanies.length > 0 && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
                        <Building2 className="w-3 h-3 text-amber-500" />
                        <span>Asked in: {q.popularInCompanies.join(', ')}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark({
                          id: q.id,
                          title: q.question,
                          type: 'interview',
                          slug: q.id,
                          category: q.category,
                          timestamp: Date.now()
                        });
                      }}
                      className={`p-1.5 rounded-lg border transition ${
                        bookmarked ? 'border-amber-500/40 text-amber-500 fill-amber-500' : 'border-slate-200 dark:border-slate-700 text-slate-400'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Answer Content Panel */}
                {isExpanded && (
                  <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-700/60 mt-2 space-y-4">
                    <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line pt-4">
                      {q.answer}
                    </div>

                    {q.codeSnippet && (
                      <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between px-3 py-2 rounded-t-xl bg-slate-900 border-x border-t border-slate-800 text-slate-300 text-xs font-mono">
                          <span className="text-amber-400">Java Solution Code:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopyCode(q.codeSnippet!, q.id)}
                              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                            >
                              {copiedId === q.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedId === q.id ? 'Copied' : 'Copy'}</span>
                            </button>
                            <button
                              onClick={() => onNavigateToRunner(q.codeSnippet!)}
                              className="flex items-center gap-1 px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
                            >
                              <Play className="w-3 h-3 fill-white" />
                              <span>Run Code Live</span>
                            </button>
                          </div>
                        </div>

                        <div className="p-4 rounded-b-xl bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto border border-slate-800">
                          <pre>{q.codeSnippet}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
