import React from 'react';
import { Bookmark, X, Trash2, ArrowRight } from 'lucide-react';
import { BookmarkItem } from '../types';

interface BookmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkItem[];
  onRemoveBookmark: (id: string) => void;
  onNavigate: (tab: string, slug?: string) => void;
  isDarkMode: boolean;
}

export const BookmarksModal: React.FC<BookmarksModalProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onNavigate,
  isDarkMode
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[80vh] ${
        isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="font-bold text-base">Saved Bookmarks ({bookmarks.length})</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {bookmarks.length === 0 ? (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <Bookmark className="w-8 h-8 opacity-30 mx-auto text-amber-500" />
              <p className="text-xs">No saved bookmarks yet. Click the bookmark icon on any tutorial or interview question to save it!</p>
            </div>
          ) : (
            bookmarks.map((b) => (
              <div
                key={b.id}
                className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
                  isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => {
                    if (b.type === 'tutorial') onNavigate('tutorials', b.slug);
                    else if (b.type === 'program') onNavigate('programs');
                    else if (b.type === 'faq') onNavigate('faqs');
                    else onNavigate('interviews');
                    onClose();
                  }}
                >
                  <span className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    {b.category}
                  </span>
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white mt-1 hover:text-indigo-500 line-clamp-1">
                    {b.title}
                  </h4>
                </div>

                <button
                  onClick={() => onRemoveBookmark(b.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
