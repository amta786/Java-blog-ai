import React, { useState } from 'react';
import { BookOpen, Search, Clock, ArrowRight, Bookmark } from 'lucide-react';
import { Tutorial } from '../types';

interface TutorialsListProps {
  tutorials: Tutorial[];
  onSelectTutorial: (slug: string) => void;
  onToggleBookmark: (item: any) => void;
  isBookmarked: (id: string) => boolean;
  isDarkMode: boolean;
}

export const TutorialsList: React.FC<TutorialsListProps> = ({
  tutorials,
  onSelectTutorial,
  onToggleBookmark,
  isBookmarked,
  isDarkMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Tutorials' },
    { id: 'java', label: 'Core Java 21' },
    { id: 'spring-boot', label: 'Spring Boot 3' },
    { id: 'web-dev', label: 'Web Dev (HTML/CSS/JS)' },
    { id: 'java-libraries', label: 'Java Libraries (Apache POI)' },
    { id: 'cloud-devops', label: 'Cloud & DevOps (Kafka)' },
  ];

  const filteredTutorials = tutorials.filter(t => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <span className="text-[#E63946] font-bold text-xs tracking-widest uppercase">
          Curated Knowledge Base
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 dark:text-white mt-1">
          Java & Web Development Tutorials
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
          In-depth technical tutorials with step-by-step code samples, architectural diagrams, and runnable examples.
        </p>
      </div>

      {/* Category Pills & Search Bar */}
      <div className={`p-5 rounded-2xl border space-y-4 shadow-sm ${
        isDarkMode ? 'bg-[#12141D] border-slate-800' : 'bg-white border-black/5'
      }`}>
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#E63946]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tutorials by title, keyword, or tag..."
            className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:border-[#E63946] ${
              isDarkMode ? 'bg-slate-900/90 border-slate-700 text-slate-100' : 'bg-[#FAFAFA] border-slate-200 text-slate-800'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-[#E63946] text-white shadow-sm'
                  : isDarkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTutorials.map((tut) => {
          const bookmarked = isBookmarked(tut.id);
          return (
            <div
              key={tut.id}
              className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md ${
                isDarkMode ? 'bg-[#12141D] border-slate-800' : 'bg-white border-black/5'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#E63946]/10 text-[#E63946]">
                    {tut.categoryLabel}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium text-[11px]">{tut.readTime}</span>
                    <button
                      onClick={() => onToggleBookmark({
                        id: tut.id,
                        title: tut.title,
                        type: 'tutorial',
                        slug: tut.slug,
                        category: tut.categoryLabel,
                        timestamp: Date.now()
                      })}
                      className={`p-1 rounded transition ${
                        bookmarked ? 'text-[#E63946] fill-[#E63946]' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 
                  onClick={() => onSelectTutorial(tut.slug)}
                  className="font-serif font-bold text-xl text-slate-900 dark:text-white leading-snug hover:text-[#E63946] dark:hover:text-[#E63946] cursor-pointer transition line-clamp-2"
                >
                  {tut.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {tut.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                  tut.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                  tut.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                  'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                }`}>
                  {tut.difficulty}
                </span>

                <button
                  onClick={() => onSelectTutorial(tut.slug)}
                  className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#E63946] hover:underline"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
