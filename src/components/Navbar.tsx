import React, { useState } from 'react';
import { 
  Search, 
  Code2, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Wrench, 
  Sparkles, 
  Bookmark, 
  Clock,
  User as UserIcon,
  LogIn,
  Sun, 
  Moon, 
  Menu, 
  X,
  Table,
  CheckSquare,
  Terminal,
  Layers
} from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, itemSlug?: string) => void;
  onOpenSearch: () => void;
  onOpenAiModal: () => void;
  onOpenBookmarks: () => void;
  savedCount: number;
  onOpenRecentlyViewed: () => void;
  recentlyViewedCount: number;
  onOpenAuthModal: () => void;
  currentUser: User | null;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  onOpenAiModal,
  onOpenBookmarks,
  savedCount,
  onOpenRecentlyViewed,
  recentlyViewedCount,
  onOpenAuthModal,
  currentUser,
  isDarkMode,
  onToggleDarkMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'tutorials', label: 'TUTORIALS', icon: BookOpen },
    { id: 'programs', label: 'LOGICAL PROGRAMS', icon: Code2 },
    { id: 'playground', label: 'JAVA RUNNER', icon: Terminal, badge: 'LIVE' },
    { id: 'interviews', label: 'INTERVIEW Q&A', icon: HelpCircle },
    { id: 'faqs', label: 'FULL STACK FAQs', icon: Layers },
    { id: 'mcqs', label: 'QUIZZES & MCQs', icon: CheckSquare },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-[#0F1015]/95 border-slate-800/80 text-slate-100' 
        : 'bg-white/95 border-black/5 text-[#1A1A1A]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3.5 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-[#E63946] flex items-center justify-center text-white font-bold text-lg rounded-xl shadow-sm group-hover:scale-105 transition-transform">
              &#123; &#125;
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-serif font-black text-2xl tracking-tight leading-none">
                <span className={isDarkMode ? 'text-white' : 'text-[#1A1A1A]'}>Java</span>
                <span className="text-[#E63946]">CodePoint</span>
              </div>
              <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-400 mt-1">
                Editorial Developer Hub
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                    isActive
                      ? isDarkMode
                        ? 'text-[#E63946] bg-[#E63946]/10 border-b-2 border-[#E63946]'
                        : 'text-[#E63946] bg-[#E63946]/5 border-b-2 border-[#E63946]'
                      : isDarkMode
                        ? 'text-slate-300 hover:text-[#E63946] hover:bg-slate-800/60'
                        : 'text-[#1A1A1A] hover:text-[#E63946] hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#E63946] text-white font-extrabold uppercase tracking-widest ml-1">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Dev Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 200)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all ${
                  ['tool-csv', 'tool-json', 'tool-pattern'].includes(currentTab)
                    ? 'text-[#E63946] bg-[#E63946]/10 border-b-2 border-[#E63946]'
                    : isDarkMode ? 'text-slate-300 hover:text-[#E63946] hover:bg-slate-800/60' : 'text-[#1A1A1A] hover:text-[#E63946] hover:bg-slate-100/80'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>DEV TOOLS</span>
              </button>

              {toolsDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-60 rounded-2xl shadow-xl border p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                  isDarkMode ? 'bg-[#161822] border-slate-700 text-slate-100' : 'bg-white border-black/10 text-slate-900'
                }`}>
                  <button
                    onClick={() => { onNavigate('tool-csv'); setToolsDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 hover:bg-[#E63946]/10 transition group"
                  >
                    <Table className="w-4 h-4 text-[#E63946]" />
                    <div>
                      <div className="font-bold text-xs group-hover:text-[#E63946]">CSV to HTML Table</div>
                      <div className="text-[11px] text-slate-400">Transform raw CSV to formatted grid</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { onNavigate('tool-json'); setToolsDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 hover:bg-[#E63946]/10 transition group"
                  >
                    <FileText className="w-4 h-4 text-[#E63946]" />
                    <div>
                      <div className="font-bold text-xs group-hover:text-[#E63946]">JSON Formatter</div>
                      <div className="text-[11px] text-slate-400">Validate & format JSON payloads</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { onNavigate('tool-pattern'); setToolsDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-2.5 hover:bg-[#E63946]/10 transition group"
                  >
                    <Code2 className="w-4 h-4 text-[#E63946]" />
                    <div>
                      <div className="font-bold text-xs group-hover:text-[#E63946]">Pattern Generator</div>
                      <div className="text-[11px] text-slate-400">Java pattern logic builder</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Right Toolbar */}
          <div className="flex items-center gap-2">
            {/* Quick Search */}
            <div
              onClick={onOpenSearch}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-full border text-xs font-medium cursor-pointer transition-all ${
                isDarkMode 
                  ? 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-[#E63946]/50' 
                  : 'bg-[#F3F4F6] border-black/5 text-slate-600 hover:border-[#E63946]/30'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-[#E63946]" />
              <span className="hidden sm:inline text-xs font-medium text-slate-500">Search code & topics...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded bg-slate-200 dark:bg-slate-800 font-mono text-slate-500 dark:text-slate-400">
                ⌘K
              </kbd>
            </div>

            {/* Ask AI */}
            <button
              onClick={onOpenAiModal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold bg-[#E63946] hover:bg-[#d62839] text-white shadow-sm transition tracking-wider uppercase"
              title="Ask AI Code Explainer"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">ASK AI</span>
            </button>

            {/* Recently Viewed */}
            <button
              onClick={onOpenRecentlyViewed}
              className={`relative p-2 rounded-full border transition ${
                isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-black/10 text-slate-700 hover:bg-slate-100'
              }`}
              title="Recently Viewed (Last 10 items)"
            >
              <Clock className="w-4 h-4" />
              {recentlyViewedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {recentlyViewedCount}
                </span>
              )}
            </button>

            {/* Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className={`relative p-2 rounded-full border transition ${
                isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-black/10 text-slate-700 hover:bg-slate-100'
              }`}
              title="Saved Items"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E63946] text-white text-[10px] font-bold flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* User Auth Profile Trigger */}
            <button
              onClick={onOpenAuthModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition text-xs font-bold ${
                currentUser 
                  ? 'border-[#E63946]/40 bg-[#E63946]/10 text-[#E63946]' 
                  : isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-black/10 text-slate-700 hover:bg-slate-100'
              }`}
              title={currentUser ? `Logged in as ${currentUser.fullName}` : 'Sign In or Register'}
            >
              {currentUser ? (
                <>
                  <img 
                    src={currentUser.avatarUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${currentUser.email}`} 
                    alt={currentUser.fullName}
                    className="w-4 h-4 rounded-full border border-[#E63946]"
                  />
                  <span className="hidden sm:inline truncate max-w-[80px] text-[11px]">{currentUser.fullName.split(' ')[0]}</span>
                </>
              ) : (
                <>
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline uppercase text-[10px] tracking-wider">LOGIN</span>
                </>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-full border transition ${
                isDarkMode ? 'border-slate-700 text-amber-400 hover:bg-slate-800' : 'border-black/10 text-slate-700 hover:bg-slate-100'
              }`}
              title={isDarkMode ? 'Switch to Editorial Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 py-4 space-y-2 ${
          isDarkMode ? 'bg-[#0F1015] border-slate-800 text-slate-100' : 'bg-white border-black/5 text-[#1A1A1A]'
        }`}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => { onNavigate(link.id); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  currentTab === link.id ? 'bg-[#E63946] text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-1">
            Dev Tools
          </div>
          <button
            onClick={() => { onNavigate('tool-csv'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Table className="w-4 h-4 text-[#E63946]" />
            <span>CSV to HTML Table</span>
          </button>
          <button
            onClick={() => { onNavigate('tool-json'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <FileText className="w-4 h-4 text-[#E63946]" />
            <span>JSON Formatter</span>
          </button>
          <button
            onClick={() => { onNavigate('tool-pattern'); setMobileMenuOpen(false); }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Code2 className="w-4 h-4 text-[#E63946]" />
            <span>Pattern Generator</span>
          </button>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <button
              onClick={() => { onOpenRecentlyViewed(); setMobileMenuOpen(false); }}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
            >
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>History ({recentlyViewedCount})</span>
            </button>
            <button
              onClick={() => { onOpenAuthModal(); setMobileMenuOpen(false); }}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-[#E63946] text-white text-xs font-bold uppercase tracking-wider"
            >
              <UserIcon className="w-4 h-4" />
              <span>{currentUser ? 'Account' : 'Login'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


