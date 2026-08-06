import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Play, 
  BookOpen, 
  Share2, 
  Bookmark, 
  Clock, 
  User, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { Tutorial, RecentlyViewedItem } from '../types';

interface TutorialViewerProps {
  tutorial: Tutorial;
  onBack: () => void;
  onNavigateToRunner: (initialCode?: string) => void;
  onToggleBookmark: (item: any) => void;
  onAddRecentlyViewed?: (item: Omit<RecentlyViewedItem, 'viewedAt'>) => void;
  isBookmarked: boolean;
  isDarkMode: boolean;
}

export const TutorialViewer: React.FC<TutorialViewerProps> = ({
  tutorial,
  onBack,
  onNavigateToRunner,
  onToggleBookmark,
  onAddRecentlyViewed,
  isBookmarked,
  isDarkMode
}) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);

  useEffect(() => {
    if (tutorial && onAddRecentlyViewed) {
      onAddRecentlyViewed({
        id: tutorial.id,
        title: tutorial.title,
        type: 'tutorial',
        slug: tutorial.slug,
        category: tutorial.categoryLabel,
        readTime: tutorial.readTime
      });
    }
  }, [tutorial?.id]);


  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      
      {/* Top Breadcrumb & Back navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Tutorials</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Tutorials</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-indigo-600 dark:text-indigo-400 font-medium">{tutorial.categoryLabel}</span>
        </div>
      </div>

      {/* Main Article Header */}
      <div className={`p-8 rounded-3xl border space-y-4 shadow-sm ${
        isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
            {tutorial.categoryLabel}
          </span>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              {tutorial.readTime}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              {tutorial.author}
            </span>
            <span>• {tutorial.date}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
          {tutorial.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {tutorial.summary}
        </p>

        {/* Action toolbar */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {tutorial.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark({
                id: tutorial.id,
                title: tutorial.title,
                type: 'tutorial',
                slug: tutorial.slug,
                category: tutorial.categoryLabel,
                timestamp: Date.now()
              })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                isBookmarked 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400' 
                  : isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-700' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{isBookmarked ? 'Bookmarked' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Table of Contents Sidebar + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left TOC Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className={`p-4 rounded-2xl border sticky top-24 ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
              <span>Table of Contents</span>
            </h3>
            <nav className="space-y-1">
              {tutorial.contentSections.map((sec, idx) => (
                <a
                  key={idx}
                  href={`#section-${idx}`}
                  onClick={() => setActiveSection(idx)}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium transition ${
                    activeSection === idx 
                      ? 'bg-indigo-600 text-white font-semibold' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {idx + 1}. {sec.heading}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Right Content Sections */}
        <div className="lg:col-span-3 space-y-8">
          {tutorial.contentSections.map((sec, idx) => (
            <div 
              key={idx} 
              id={`section-${idx}`}
              className={`p-6 sm:p-8 rounded-2xl border space-y-6 shadow-sm ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
              }`}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span>{sec.heading}</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {sec.body}
              </p>

              {sec.keyTakeaway && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold uppercase tracking-wider text-[11px] block text-amber-600 dark:text-amber-400">
                      Key Takeaway:
                    </span>
                    <span>{sec.keyTakeaway}</span>
                  </div>
                </div>
              )}

              {/* Code Snippet Box */}
              {sec.codeSnippet && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-4 py-2.5 rounded-t-xl bg-slate-900 border-x border-t border-slate-800 text-slate-300 text-xs">
                    <span className="font-mono font-semibold text-amber-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      {sec.codeSnippet.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(sec.codeSnippet!.code, idx)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
                        title="Copy code"
                      >
                        {copiedCodeIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[11px] text-emerald-400 font-semibold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>

                      {sec.codeSnippet.language === 'java' && (
                        <button
                          onClick={() => onNavigateToRunner(sec.codeSnippet!.code)}
                          className="flex items-center gap-1 px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span className="text-[11px]">Run Code Live</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-b-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto">
                    <pre className="leading-relaxed">{sec.codeSnippet.code}</pre>
                  </div>

                  {sec.codeSnippet.output && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                      <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-wider">
                        Program Output Console:
                      </div>
                      <pre className="font-mono text-emerald-400 whitespace-pre-wrap">
                        {sec.codeSnippet.output}
                      </pre>
                    </div>
                  )}
                </div>
              )}

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
