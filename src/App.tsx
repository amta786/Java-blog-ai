import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { TutorialViewer } from './components/TutorialViewer';
import { TutorialsList } from './components/TutorialsList';
import { LogicalProgramsList } from './components/LogicalProgramsList';
import { CodeRunner } from './components/CodeRunner';
import { InterviewHub } from './components/InterviewHub';
import { FaqHub } from './components/FaqHub';
import { QuizEngine } from './components/QuizEngine';
import { CsvToTableTool } from './components/CsvToTableTool';
import { JsonFormatterTool } from './components/JsonFormatterTool';
import { PatternGeneratorTool } from './components/PatternGeneratorTool';
import { SearchModal } from './components/SearchModal';
import { AiAssistantModal } from './components/AiAssistantModal';
import { BookmarksModal } from './components/BookmarksModal';
import { AuthModal } from './components/AuthModal';
import { RecentlyViewedModal } from './components/RecentlyViewedModal';

import { TUTORIALS_DATA } from './data/tutorialsData';
import { LOGICAL_PROGRAMS_DATA } from './data/programsData';
import { QUIZ_CATEGORIES } from './data/quizzesData';
import { INTERVIEW_QUESTIONS_DATA } from './data/interviewData';
import { BookmarkItem, RecentlyViewedItem, User } from './types';
import { getCurrentSessionUser } from './utils/auth';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedTutorialSlug, setSelectedTutorialSlug] = useState<string | null>(null);
  const [runnerCode, setRunnerCode] = useState<string | undefined>(undefined);

  // Modals
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [aiModalOpen, setAiModalOpen] = useState<boolean>(false);
  const [aiModalCode, setAiModalCode] = useState<string | undefined>(undefined);
  const [bookmarksOpen, setBookmarksOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [recentlyViewedOpen, setRecentlyViewedOpen] = useState<boolean>(false);

  // User Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(() => getCurrentSessionUser());

  // Dark / Light Theme
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem('jcp_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Recently Viewed State
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>(() => {
    try {
      const saved = localStorage.getItem('jcp_recently_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('jcp_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('jcp_recently_viewed', JSON.stringify(recentlyViewed));
    } catch (e) {
      console.error(e);
    }
  }, [recentlyViewed]);

  const handleAddRecentlyViewed = useCallback((item: Omit<RecentlyViewedItem, 'viewedAt'>) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(r => r.id !== item.id);
      const newItem: RecentlyViewedItem = { ...item, viewedAt: Date.now() };
      return [newItem, ...filtered].slice(0, 10);
    });
  }, []);

  const handleClearRecentlyViewed = () => {
    setRecentlyViewed([]);
    localStorage.removeItem('jcp_recently_viewed');
  };

  // Handle Cmd+K search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab: string, itemSlug?: string) => {
    if (tab === 'tutorials' && itemSlug) {
      setSelectedTutorialSlug(itemSlug);
      setCurrentTab('tutorial-detail');
    } else {
      setSelectedTutorialSlug(null);
      setCurrentTab(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRunnerWithCode = (code: string) => {
    setRunnerCode(code);
    setCurrentTab('playground');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAiModalWithCode = (code: string) => {
    setAiModalCode(code);
    setAiModalOpen(true);
  };

  const handleToggleBookmark = (item: BookmarkItem) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.id === item.id);
      if (exists) {
        return prev.filter(b => b.id !== item.id);
      } else {
        return [item, ...prev];
      }
    });
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  const isBookmarked = (id: string) => bookmarks.some(b => b.id === id);

  const selectedTutorial = TUTORIALS_DATA.find(t => t.slug === selectedTutorialSlug) || TUTORIALS_DATA[0];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Sticky Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAiModal={() => { setAiModalCode(undefined); setAiModalOpen(true); }}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        savedCount={bookmarks.length}
        onOpenRecentlyViewed={() => setRecentlyViewedOpen(true)}
        recentlyViewedCount={recentlyViewed.length}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        currentUser={currentUser}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {currentTab === 'home' && (
          <Hero
            onNavigate={handleNavigate}
            featuredTutorials={TUTORIALS_DATA}
            popularPrograms={LOGICAL_PROGRAMS_DATA}
            recentlyViewedItems={recentlyViewed}
            onOpenRecentlyViewedModal={() => setRecentlyViewedOpen(true)}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            isDarkMode={isDarkMode}
          />
        )}

        {currentTab === 'tutorials' && (
          <TutorialsList
            tutorials={TUTORIALS_DATA}
            onSelectTutorial={(slug) => handleNavigate('tutorials', slug)}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            isDarkMode={isDarkMode}
          />
        )}

        {currentTab === 'tutorial-detail' && (
          <TutorialViewer
            tutorial={selectedTutorial}
            onBack={() => handleNavigate('tutorials')}
            onNavigateToRunner={handleNavigateToRunnerWithCode}
            onToggleBookmark={handleToggleBookmark}
            onAddRecentlyViewed={handleAddRecentlyViewed}
            isBookmarked={isBookmarked(selectedTutorial.id)}
            isDarkMode={isDarkMode}
          />
        )}

        {currentTab === 'programs' && (
          <LogicalProgramsList
            programs={LOGICAL_PROGRAMS_DATA}
            onNavigateToRunner={handleNavigateToRunnerWithCode}
            isDarkMode={isDarkMode}
          />
        )}

        {currentTab === 'playground' && (
          <CodeRunner
            initialCode={runnerCode}
            onOpenAiModalWithCode={handleOpenAiModalWithCode}
            isDarkMode={isDarkMode}
          />
        )}

        {currentTab === 'interviews' && (
          <InterviewHub
            questions={INTERVIEW_QUESTIONS_DATA}
            onNavigateToRunner={handleNavigateToRunnerWithCode}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            isDarkMode={isDarkMode}
          />
        )}

        {currentTab === 'faqs' && (
          <FaqHub
            onOpenAiModalWithPrompt={(promptText) => {
              setAiModalCode(promptText);
              setAiModalOpen(true);
            }}
            onToggleBookmark={handleToggleBookmark}
            isBookmarked={isBookmarked}
            onAddRecentlyViewed={handleAddRecentlyViewed}
            isDarkMode={isDarkMode}
          />
        )}

        {currentTab === 'mcqs' && (
          <QuizEngine
            categories={QUIZ_CATEGORIES}
            isDarkMode={isDarkMode}
          />
        )}

        {currentTab === 'tool-csv' && (
          <CsvToTableTool isDarkMode={isDarkMode} />
        )}

        {currentTab === 'tool-json' && (
          <JsonFormatterTool isDarkMode={isDarkMode} />
        )}

        {currentTab === 'tool-pattern' && (
          <PatternGeneratorTool
            onNavigateToRunner={handleNavigateToRunnerWithCode}
            isDarkMode={isDarkMode}
          />
        )}

      </main>

      {/* Modals & Drawers */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        tutorials={TUTORIALS_DATA}
        programs={LOGICAL_PROGRAMS_DATA}
        interviews={INTERVIEW_QUESTIONS_DATA}
        onNavigate={handleNavigate}
        onAddRecentlyViewed={handleAddRecentlyViewed}
        isDarkMode={isDarkMode}
      />

      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialCode={aiModalCode}
        isDarkMode={isDarkMode}
      />

      <BookmarksModal
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onAuthChange={(user) => setCurrentUser(user)}
        isDarkMode={isDarkMode}
        savedBookmarksCount={bookmarks.length}
        recentlyViewedCount={recentlyViewed.length}
      />

      <RecentlyViewedModal
        isOpen={recentlyViewedOpen}
        onClose={() => setRecentlyViewedOpen(false)}
        items={recentlyViewed}
        onClearHistory={handleClearRecentlyViewed}
        onNavigate={handleNavigate}
        onNavigateToRunnerWithCode={handleNavigateToRunnerWithCode}
        isDarkMode={isDarkMode}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} isDarkMode={isDarkMode} />

    </div>
  );
}
