import React, { useState, useMemo } from 'react';
import { 
  HelpCircle, 
  Search, 
  Sparkles, 
  Bookmark, 
  Copy, 
  Check, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  Layers, 
  Tag, 
  CheckCircle2, 
  Share2,
  Filter
} from 'lucide-react';
import { FaqItem, RecentlyViewedItem } from '../types';
import { JAVA_FULLSTACK_FAQS_DATA } from '../data/faqsData';

interface FaqHubProps {
  onOpenAiModalWithPrompt: (promptText: string) => void;
  onToggleBookmark: (item: any) => void;
  isBookmarked: (id: string) => boolean;
  onAddRecentlyViewed?: (item: Omit<RecentlyViewedItem, 'viewedAt'>) => void;
  isDarkMode: boolean;
}

export const FaqHub: React.FC<FaqHubProps> = ({
  onOpenAiModalWithPrompt,
  onToggleBookmark,
  isBookmarked,
  onAddRecentlyViewed,
  isDarkMode
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(JAVA_FULLSTACK_FAQS_DATA[0]?.id || null);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const categories = [
    'All',
    'Core Java',
    'Spring Boot',
    'Frontend & Web',
    'Databases & Persistence',
    'DevOps & Cloud',
    'System Architecture'
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter FAQs
  const filteredFaqs = useMemo(() => {
    return JAVA_FULLSTACK_FAQS_DATA.filter(faq => {
      const matchesSearch = 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCat = selectedCategory === 'All' || faq.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || faq.level === selectedLevel;

      return matchesSearch && matchesCat && matchesLevel;
    });
  }, [searchTerm, selectedCategory, selectedLevel]);

  const handleToggleExpand = (faq: FaqItem) => {
    if (expandedId === faq.id) {
      setExpandedId(null);
    } else {
      setExpandedId(faq.id);
      if (onAddRecentlyViewed) {
        onAddRecentlyViewed({
          id: faq.id,
          title: faq.question,
          type: 'faq',
          category: faq.category,
          snippetPreview: faq.answer.slice(0, 100) + '...'
        });
      }
    }
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-200">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[#E63946] font-bold text-xs tracking-widest uppercase mb-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>Curated Developer Knowledge Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 dark:text-white">
            Java Full Stack FAQs & Expert Answers
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Multi-source technical repository answering critical Java 21, Spring Boot 3, Microservices, React Integration, and Cloud DevOps architecture questions.
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 shrink-0">
          <div className={`px-4 py-2.5 rounded-2xl border text-center ${
            isDarkMode ? 'bg-[#12141D] border-slate-800' : 'bg-white border-black/5'
          }`}>
            <span className="block font-serif font-black text-lg text-[#E63946]">
              {JAVA_FULLSTACK_FAQS_DATA.length}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Verified FAQs
            </span>
          </div>
          <div className={`px-4 py-2.5 rounded-2xl border text-center ${
            isDarkMode ? 'bg-[#12141D] border-slate-800' : 'bg-white border-black/5'
          }`}>
            <span className="block font-serif font-black text-lg text-indigo-500">
              6
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Tech Domains
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className={`p-5 rounded-2xl border space-y-4 shadow-sm ${
        isDarkMode ? 'bg-[#12141D] border-slate-800' : 'bg-white border-black/5'
      }`}>
        
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#E63946]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search FAQs by question, tag, OR source (e.g. JEP 444, CORS, Kafka)..."
              className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:border-[#E63946] ${
                isDarkMode ? 'bg-slate-900/90 border-slate-700 text-slate-100' : 'bg-[#FAFAFA] border-slate-200 text-slate-800'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 shrink-0">Level:</span>
            <div className="flex gap-1 overflow-x-auto py-1">
              {levels.map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition ${
                    selectedLevel === level
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                      : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-slate-100 dark:border-slate-800 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#E63946] text-white shadow-sm'
                  : isDarkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto opacity-50 mb-3" />
            <h3 className="font-serif font-bold text-lg text-slate-700 dark:text-slate-300">
              No matching FAQs found
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Try adjusting your search keywords or switching category filters to discover more Java Full Stack solutions.
            </p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            const bookmarked = isBookmarked(faq.id);

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm ${
                  isDarkMode 
                    ? 'bg-[#12141D] border-slate-800 hover:border-slate-700' 
                    : 'bg-white border-black/5 hover:border-black/10'
                }`}
              >
                {/* Accordion Header */}
                <div
                  onClick={() => handleToggleExpand(faq)}
                  className="p-5 sm:p-6 cursor-pointer flex items-start justify-between gap-4 select-none"
                >
                  <div className="space-y-2 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest bg-[#E63946]/10 text-[#E63946]">
                        {faq.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        faq.level === 'Beginner' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                        faq.level === 'Intermediate' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                        'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                      }`}>
                        {faq.level}
                      </span>
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        <span>Source: {faq.source}</span>
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900 dark:text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark({
                          id: faq.id,
                          title: faq.question,
                          type: 'faq',
                          slug: faq.id,
                          category: faq.category,
                          timestamp: Date.now()
                        });
                      }}
                      className={`p-2 rounded-xl transition ${
                        bookmarked ? 'text-[#E63946] bg-[#E63946]/10' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={bookmarked ? 'Remove Bookmark' : 'Bookmark FAQ'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Answer Content */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-5 animate-in fade-in duration-200">
                    
                    {/* Source Link if Available */}
                    {faq.sourceUrl && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                        <ExternalLink className="w-3.5 h-3.5" />
                        <a href={faq.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Verified Reference: {faq.source}
                        </a>
                      </div>
                    )}

                    {/* Answer Text */}
                    <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-sans space-y-2">
                      {faq.answer}
                    </div>

                    {/* Key Takeaways Callout */}
                    {faq.keyTakeaways && faq.keyTakeaways.length > 0 && (
                      <div className={`p-4 rounded-xl border space-y-2 ${
                        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="text-xs font-bold uppercase tracking-wider text-[#E63946] flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Key Architectural Takeaways</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                          {faq.keyTakeaways.map((takeaway, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#E63946] font-bold">•</span>
                              <span>{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Code Example if present */}
                    {faq.codeExample && (
                      <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0D0E15]">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-slate-300 text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            <span className="uppercase font-bold text-[#E63946]">{faq.codeExample.language} Example</span>
                            {faq.codeExample.description && (
                              <span className="text-slate-400 hidden sm:inline">— {faq.codeExample.description}</span>
                            )}
                          </div>
                          <button
                            onClick={() => handleCopyCode(faq.codeExample!.code, faq.id)}
                            className="flex items-center gap-1 text-[11px] font-bold uppercase text-slate-400 hover:text-white transition"
                          >
                            {copiedCodeId === faq.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
                          <code>{faq.codeExample.code}</code>
                        </pre>
                      </div>
                    )}

                    {/* Tags & Action Toolbar */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-slate-400" />
                        {faq.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-medium text-slate-600 dark:text-slate-400">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          const prompt = `Can you explain the following Java Full Stack FAQ in deeper technical detail with additional real-world code examples?\n\nQuestion: ${faq.question}\n\nCategory: ${faq.category}\nContext: ${faq.answer}`;
                          onOpenAiModalWithPrompt(prompt);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#E63946] hover:bg-[#d62839] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Deep Dive with AI Assistant</span>
                      </button>
                    </div>

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
