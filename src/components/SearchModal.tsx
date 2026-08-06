import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Code2, HelpCircle, ArrowRight, Layers } from 'lucide-react';
import { Tutorial, LogicalProgram, InterviewQuestion, RecentlyViewedItem } from '../types';
import { JAVA_FULLSTACK_FAQS_DATA } from '../data/faqsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutorials: Tutorial[];
  programs: LogicalProgram[];
  interviews: InterviewQuestion[];
  onNavigate: (tab: string, slug?: string) => void;
  onAddRecentlyViewed?: (item: Omit<RecentlyViewedItem, 'viewedAt'>) => void;
  isDarkMode: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  tutorials,
  programs,
  interviews,
  onNavigate,
  onAddRecentlyViewed,
  isDarkMode
}) => {

  const [query, setQuery] = useState('');

  // Keyboard shortcut Cmd+K or Ctrl+K to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const matchedTutorials = query ? tutorials.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.summary.toLowerCase().includes(query.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  ) : tutorials.slice(0, 3);

  const matchedPrograms = query ? programs.filter(p => 
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  ) : programs.slice(0, 3);

  const matchedInterviews = query ? interviews.filter(i => 
    i.question.toLowerCase().includes(query.toLowerCase()) ||
    i.answer.toLowerCase().includes(query.toLowerCase())
  ) : interviews.slice(0, 2);

  const matchedFaqs = query ? JAVA_FULLSTACK_FAQS_DATA.filter(f => 
    f.question.toLowerCase().includes(query.toLowerCase()) ||
    f.answer.toLowerCase().includes(query.toLowerCase()) ||
    f.source.toLowerCase().includes(query.toLowerCase()) ||
    f.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  ) : JAVA_FULLSTACK_FAQS_DATA.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden flex flex-col ${
        isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-indigo-500 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder="Search Java topics, spring boot, patterns, interview questions..."
            className="w-full bg-transparent text-sm focus:outline-none placeholder:text-slate-400 font-medium"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[420px] overflow-y-auto p-4 space-y-6">
          
          {/* Tutorials */}
          {matchedTutorials.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span>Tutorials & Guides ({matchedTutorials.length})</span>
              </div>
              <div className="space-y-1">
                {matchedTutorials.map((tut) => (
                  <div
                    key={tut.id}
                    onClick={() => {
                      if (onAddRecentlyViewed) {
                        onAddRecentlyViewed({
                          id: tut.id,
                          title: tut.title,
                          type: 'tutorial',
                          slug: tut.slug,
                          category: tut.categoryLabel,
                          readTime: tut.readTime
                        });
                      }
                      onNavigate('tutorials', tut.slug); 
                      onClose(); 
                    }}
                    className="p-3 rounded-xl hover:bg-indigo-500/10 cursor-pointer flex items-center justify-between transition group"
                  >
                    <div>
                      <div className="font-semibold text-xs group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {tut.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{tut.summary}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Programs */}
          {matchedPrograms.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Logical & Pattern Programs ({matchedPrograms.length})</span>
              </div>
              <div className="space-y-1">
                {matchedPrograms.map((prog) => (
                  <div
                    key={prog.id}
                    onClick={() => {
                      if (onAddRecentlyViewed) {
                        onAddRecentlyViewed({
                          id: prog.id,
                          title: prog.title,
                          type: 'program',
                          slug: prog.slug,
                          category: prog.category,
                          snippetPreview: prog.javaCode.slice(0, 80) + '...'
                        });
                      }
                      onNavigate('programs'); 
                      onClose(); 
                    }}
                    className="p-3 rounded-xl hover:bg-amber-500/10 cursor-pointer flex items-center justify-between transition group"
                  >
                    <div>
                      <div className="font-semibold text-xs group-hover:text-amber-500">
                        {prog.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{prog.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interview Questions */}
          {matchedInterviews.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>Interview Q&A ({matchedInterviews.length})</span>
              </div>
              <div className="space-y-1">
                {matchedInterviews.map((iq) => (
                  <div
                    key={iq.id}
                    onClick={() => {
                      if (onAddRecentlyViewed) {
                        onAddRecentlyViewed({
                          id: iq.id,
                          title: iq.question,
                          type: 'interview',
                          category: iq.category,
                          snippetPreview: iq.answer.slice(0, 80) + '...'
                        });
                      }
                      onNavigate('interviews'); 
                      onClose(); 
                    }}
                    className="p-3 rounded-xl hover:bg-emerald-500/10 cursor-pointer flex items-center justify-between transition group"
                  >
                    <div>
                      <div className="font-semibold text-xs group-hover:text-emerald-500">
                        {iq.question}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">{iq.category} • {iq.level}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Stack FAQs */}
          {matchedFaqs.length > 0 && (
            <div className="space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#E63946]" />
                <span>Full Stack FAQs ({matchedFaqs.length})</span>
              </div>
              <div className="space-y-1">
                {matchedFaqs.map((faq) => (
                  <div
                    key={faq.id}
                    onClick={() => {
                      if (onAddRecentlyViewed) {
                        onAddRecentlyViewed({
                          id: faq.id,
                          title: faq.question,
                          type: 'faq',
                          category: faq.category,
                          snippetPreview: faq.answer.slice(0, 80) + '...'
                        });
                      }
                      onNavigate('faqs'); 
                      onClose(); 
                    }}
                    className="p-3 rounded-xl hover:bg-[#E63946]/10 cursor-pointer flex items-center justify-between transition group"
                  >
                    <div>
                      <div className="font-semibold text-xs group-hover:text-[#E63946]">
                        {faq.question}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">{faq.category} • Source: {faq.source}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="px-4 py-2.5 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex justify-between">
          <span>Search JavaCodePoint Portal</span>
          <span>Press ESC to close</span>
        </div>

      </div>
    </div>
  );
};
