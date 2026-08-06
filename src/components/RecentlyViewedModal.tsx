import React from 'react';
import { X, Clock, BookOpen, Code2, HelpCircle, Terminal, Trash2, ArrowRight, Layers } from 'lucide-react';
import { RecentlyViewedItem } from '../types';

interface RecentlyViewedModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: RecentlyViewedItem[];
  onClearHistory: () => void;
  onNavigate: (tab: string, slug?: string) => void;
  onNavigateToRunnerWithCode?: (code: string) => void;
  isDarkMode: boolean;
}

export const RecentlyViewedModal: React.FC<RecentlyViewedModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearHistory,
  onNavigate,
  onNavigateToRunnerWithCode,
  isDarkMode
}) => {
  if (!isOpen) return null;

  const formatRelativeTime = (timestamp: number) => {
    const diffMs = Date.now() - timestamp;
    const diffSecs = Math.floor(diffMs / 1000);
    if (diffSecs < 60) return 'Just now';
    const diffMins = Math.floor(diffSecs / 60);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const handleItemClick = (item: RecentlyViewedItem) => {
    if (item.type === 'tutorial' && item.slug) {
      onNavigate('tutorials', item.slug);
    } else if (item.type === 'program') {
      if (item.snippetPreview && onNavigateToRunnerWithCode) {
        onNavigateToRunnerWithCode(item.snippetPreview);
      } else {
        onNavigate('programs');
      }
    } else if (item.type === 'interview') {
      onNavigate('interviews');
    } else if (item.type === 'faq') {
      onNavigate('faqs');
    } else if (item.type === 'code-snippet') {
      if (item.snippetPreview && onNavigateToRunnerWithCode) {
        onNavigateToRunnerWithCode(item.snippetPreview);
      } else {
        onNavigate('playground');
      }
    }
    onClose();
  };

  const getItemIcon = (type: RecentlyViewedItem['type']) => {
    switch (type) {
      case 'tutorial':
        return <BookOpen className="w-4 h-4 text-[#E63946]" />;
      case 'program':
        return <Code2 className="w-4 h-4 text-amber-500" />;
      case 'interview':
        return <HelpCircle className="w-4 h-4 text-emerald-500" />;
      case 'faq':
        return <Layers className="w-4 h-4 text-rose-500" />;
      case 'code-snippet':
        return <Terminal className="w-4 h-4 text-sky-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[80vh] ${
        isDarkMode ? 'bg-[#12141D] border-slate-800 text-slate-100' : 'bg-white border-black/5 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E63946]/10 text-[#E63946] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif font-black text-xl leading-none">
                Recently Viewed ({items.length})
              </h2>
              <p className="text-[11px] font-sans text-slate-400 mt-1 uppercase tracking-wider font-bold">
                Last 10 inspected articles & code snippets
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition uppercase tracking-wider"
                title="Clear Recently Viewed History"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content List */}
        <div className="overflow-y-auto p-6 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Clock className="w-10 h-10 text-slate-400 mx-auto opacity-40" />
              <p className="text-sm font-semibold text-slate-400">
                No recently viewed items yet.
              </p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore tutorials, run Java code snippets, or study interview questions and they will appear here automatically!
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id + '_' + item.viewedAt}
                onClick={() => handleItemClick(item)}
                className={`group p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                  isDarkMode 
                    ? 'bg-slate-900/60 border-slate-800 hover:border-[#E63946]/50 hover:bg-slate-900' 
                    : 'bg-[#FAFAFA] border-black/5 hover:border-[#E63946]/50 hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    {getItemIcon(item.type)}
                  </div>
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E63946]/10 text-[#E63946]">
                        {item.type}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-[#E63946] transition">
                      {item.title}
                    </h3>
                    {item.snippetPreview && (
                      <p className="text-[11px] font-mono text-slate-400 truncate max-w-md">
                        {item.snippetPreview}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] font-medium text-slate-400">
                    {formatRelativeTime(item.viewedAt)}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-200/50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#E63946] group-hover:text-white transition">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex justify-between font-sans">
          <span>Local browser storage session</span>
          <span>Click any card to jump directly to content</span>
        </div>

      </div>
    </div>
  );
};
