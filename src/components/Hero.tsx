import React from 'react';
import { 
  Code2, 
  Sparkles, 
  Play, 
  BookOpen, 
  HelpCircle, 
  CheckSquare, 
  Table, 
  ArrowRight, 
  Terminal,
  Zap,
  Star,
  Bookmark,
  ChevronRight,
  Clock,
  Layers
} from 'lucide-react';
import { Tutorial, LogicalProgram, RecentlyViewedItem } from '../types';
import { JAVA_FULLSTACK_FAQS_DATA } from '../data/faqsData';

interface HeroProps {
  onNavigate: (tab: string, itemSlug?: string) => void;
  featuredTutorials: Tutorial[];
  popularPrograms: LogicalProgram[];
  recentlyViewedItems?: RecentlyViewedItem[];
  onOpenRecentlyViewedModal?: () => void;
  onToggleBookmark: (item: any) => void;
  isBookmarked: (id: string) => boolean;
  isDarkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  featuredTutorials,
  popularPrograms,
  recentlyViewedItems = [],
  onOpenRecentlyViewedModal,
  onToggleBookmark,
  isBookmarked,
  isDarkMode
}) => {

  return (
    <div className="space-y-16 pb-16">
      
      {/* Editorial Main Hero Section */}
      <section className={`rounded-3xl p-8 sm:p-12 border shadow-sm transition-all ${
        isDarkMode 
          ? 'bg-[#12141D] border-slate-800 text-slate-100' 
          : 'bg-white border-black/5 text-[#1A1A1A]'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E63946]/10 text-[#E63946] text-xs font-extrabold uppercase tracking-widest border border-[#E63946]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#E63946]" />
              <span>Java 21 Records & Spring Boot 3 Edition</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              Mastering Modern <span className="text-[#E63946]">Java</span> & Web Development
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              An editorial developer journal featuring in-depth tutorials, runnable code snippets, pattern algorithms, and interview masterclasses for engineers.
            </p>

            {/* Quick Stats Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5 bg-[#FAFAFA] dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-black/5 dark:border-slate-800">
                <Zap className="w-3.5 h-3.5 text-[#E63946]" />
                <span>2M+ Global Developers</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAFAFA] dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-black/5 dark:border-slate-800">
                <Code2 className="w-3.5 h-3.5 text-[#E63946]" />
                <span>1000+ Runnable Snippets</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#FAFAFA] dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-black/5 dark:border-slate-800">
                <Star className="w-3.5 h-3.5 text-[#E63946]" />
                <span>500+ Interview Q&As</span>
              </div>
            </div>

            {/* Action Launcher Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigate('playground')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#E63946] hover:bg-[#d62839] text-white font-bold text-xs uppercase tracking-wider transition shadow-md"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Open Java Code Runner</span>
              </button>
              <button
                onClick={() => onNavigate('tutorials')}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider border transition ${
                  isDarkMode 
                    ? 'bg-slate-900 border-slate-700 text-white hover:bg-slate-800' 
                    : 'bg-slate-100 border-black/5 text-[#1A1A1A] hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#E63946]" />
                <span>Explore Tutorials</span>
              </button>
            </div>
          </div>

          {/* Right Dark Code Editor Banner */}
          <div className="lg:col-span-5 bg-[#1A1A1A] rounded-2xl p-6 font-mono text-xs text-[#F8F8F2] relative shadow-xl border border-slate-800 overflow-hidden space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-slate-400 text-[11px]">SealedHierarchyExample.java</span>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
            </div>

            <div className="space-y-1 text-[12px] leading-relaxed">
              <p className="text-slate-500">// Java 21 Sealed Interface Pattern</p>
              <p><span className="text-[#66D9EF]">public sealed interface</span> <span className="text-[#A6E22E]">Shape</span></p>
              <p className="pl-4"><span className="text-[#66D9EF]">permits</span> Circle, Rectangle &#123;</p>
              <p className="pl-8"><span className="text-[#66D9EF]">double</span> <span className="text-[#A6E22E]">area</span>();</p>
              <p className="pl-4">&#125;</p>
              <p className="pt-2"><span className="text-[#66D9EF]">public record</span> <span className="text-[#A6E22E]">Circle</span>(<span className="text-[#66D9EF]">double</span> radius)</p>
              <p className="pl-4"><span className="text-[#66D9EF]">implements</span> Shape &#123;</p>
              <p className="pl-8"><span className="text-[#66D9EF]">public double</span> <span className="text-[#A6E22E]">area</span>() &#123;</p>
              <p className="pl-12"><span className="text-[#66D9EF]">return</span> Math.PI * radius * radius;</p>
              <p className="pl-8">&#125;</p>
              <p className="pl-4">&#125;</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-sans font-bold">
                ● Live Compiled Java 21
              </span>
              <button
                onClick={() => onNavigate('playground')}
                className="text-[10px] text-[#E63946] font-sans font-extrabold uppercase hover:underline flex items-center gap-1"
              >
                <span>Run in Sandbox</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Quick Access Portal Feature Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div 
          onClick={() => onNavigate('playground')}
          className={`group p-6 rounded-2xl border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
            isDarkMode 
              ? 'bg-[#12141D] border-slate-800 hover:border-[#E63946]/50' 
              : 'bg-white border-black/5 hover:border-[#E63946]/50'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-[#E63946]/10 text-[#E63946] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Terminal className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E63946]">Interactive</span>
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mt-1 mb-1 group-hover:text-[#E63946] transition">
            Java Code Runner
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            Run, edit, and test Java snippets live in browser with real-time console logs.
          </p>
          <div className="flex items-center text-xs font-bold text-[#E63946] uppercase tracking-wider gap-1 group-hover:translate-x-1 transition-transform">
            <span>Launch Sandbox</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('programs')}
          className={`group p-6 rounded-2xl border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
            isDarkMode 
              ? 'bg-[#12141D] border-slate-800 hover:border-[#E63946]/50' 
              : 'bg-white border-black/5 hover:border-[#E63946]/50'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-[#E63946]/10 text-[#E63946] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Code2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E63946]">Algorithms</span>
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mt-1 mb-1 group-hover:text-[#E63946] transition">
            Logical & Patterns
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            Master pyramids, string manipulation, matrix math, recursion, and sorting.
          </p>
          <div className="flex items-center text-xs font-bold text-[#E63946] uppercase tracking-wider gap-1 group-hover:translate-x-1 transition-transform">
            <span>Browse Programs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('interviews')}
          className={`group p-6 rounded-2xl border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
            isDarkMode 
              ? 'bg-[#12141D] border-slate-800 hover:border-[#E63946]/50' 
              : 'bg-white border-black/5 hover:border-[#E63946]/50'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-[#E63946]/10 text-[#E63946] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <HelpCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E63946]">Career</span>
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mt-1 mb-1 group-hover:text-[#E63946] transition">
            Interview Q&A Hub
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            Top tech questions with full explanations, code solutions, and target company tags.
          </p>
          <div className="flex items-center text-xs font-bold text-[#E63946] uppercase tracking-wider gap-1 group-hover:translate-x-1 transition-transform">
            <span>Prepare Solutions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div 
          onClick={() => onNavigate('tool-csv')}
          className={`group p-6 rounded-2xl border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
            isDarkMode 
              ? 'bg-[#12141D] border-slate-800 hover:border-[#E63946]/50' 
              : 'bg-white border-black/5 hover:border-[#E63946]/50'
          }`}
        >
          <div className="w-12 h-12 rounded-xl bg-[#E63946]/10 text-[#E63946] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Table className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E63946]">Utilities</span>
          <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mt-1 mb-1 group-hover:text-[#E63946] transition">
            CSV to HTML Converter
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
            Utility to transform raw CSV datasets into customizable HTML data tables.
          </p>
          <div className="flex items-center text-xs font-bold text-[#E63946] uppercase tracking-wider gap-1 group-hover:translate-x-1 transition-transform">
            <span>Open Tool</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </section>

      {/* Recently Viewed Strip (if user has viewed items) */}
      {recentlyViewedItems.length > 0 && (
        <section className="space-y-4 animate-in fade-in duration-200">
          <div className="flex items-end justify-between border-b border-black/5 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E63946]" />
              <span className="text-[#E63946] font-bold text-xs tracking-widest uppercase">
                Recently Viewed ({recentlyViewedItems.length})
              </span>
            </div>
            {onOpenRecentlyViewedModal && (
              <button
                onClick={onOpenRecentlyViewedModal}
                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#E63946] transition"
              >
                <span>View Full History</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {recentlyViewedItems.slice(0, 4).map((item) => (
              <div
                key={'rv_hero_' + item.id + '_' + item.viewedAt}
                onClick={() => {
                  if (item.type === 'tutorial' && item.slug) onNavigate('tutorials', item.slug);
                  else if (item.type === 'program') onNavigate('programs');
                  else if (item.type === 'interview') onNavigate('interviews');
                  else onNavigate('playground');
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all hover:scale-[1.02] shadow-sm ${
                  isDarkMode 
                    ? 'bg-[#12141D] border-slate-800 hover:border-[#E63946]' 
                    : 'bg-white border-black/5 hover:border-[#E63946]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  <span className="text-[#E63946]">{item.type}</span>
                  <span>{item.category}</span>
                </div>
                <h4 className="font-serif font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Tutorials Grid */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-black/5 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[#E63946] font-bold text-xs tracking-widest uppercase">
              Curated Articles
            </span>
            <h2 className="text-3xl font-serif font-black tracking-tight text-slate-900 dark:text-white mt-1">
              Featured Editorial Guides
            </h2>
          </div>
          <button
            onClick={() => onNavigate('tutorials')}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E63946] hover:underline"
          >
            <span>View All Tutorials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTutorials.map((tutorial) => {
            const bookmarked = isBookmarked(tutorial.id);
            return (
              <div
                key={tutorial.id}
                className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md ${
                  isDarkMode ? 'bg-[#12141D] border-slate-800' : 'bg-white border-black/5'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#E63946]/10 text-[#E63946]">
                      {tutorial.categoryLabel}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-medium text-[11px]">{tutorial.readTime}</span>
                      <button
                        onClick={() => onToggleBookmark({
                          id: tutorial.id,
                          title: tutorial.title,
                          type: 'tutorial',
                          slug: tutorial.slug,
                          category: tutorial.categoryLabel,
                          timestamp: Date.now()
                        })}
                        className={`p-1 rounded transition ${
                          bookmarked ? 'text-[#E63946] fill-[#E63946]' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                        }`}
                        title={bookmarked ? 'Remove Bookmark' : 'Save Tutorial'}
                      >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 
                    onClick={() => onNavigate('tutorials', tutorial.slug)}
                    className="font-serif font-bold text-xl text-slate-900 dark:text-white leading-snug hover:text-[#E63946] dark:hover:text-[#E63946] cursor-pointer transition line-clamp-2"
                  >
                    {tutorial.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {tutorial.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                    tutorial.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                    tutorial.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  }`}>
                    {tutorial.difficulty}
                  </span>

                  <button
                    onClick={() => onNavigate('tutorials', tutorial.slug)}
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
      </section>

      {/* Featured Java Full Stack FAQs Spotlight */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/5 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-[#E63946] font-bold text-xs tracking-widest uppercase mb-1">
              <Layers className="w-4 h-4" />
              <span>Multi-Source Answers</span>
            </div>
            <h2 className="text-3xl font-serif font-black tracking-tight text-slate-900 dark:text-white">
              Java Full Stack FAQs Spotlight
            </h2>
          </div>
          <button
            onClick={() => onNavigate('faqs')}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E63946] hover:underline"
          >
            <span>Explore All Full Stack FAQs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JAVA_FULLSTACK_FAQS_DATA.slice(0, 3).map((faq) => (
            <div
              key={faq.id}
              onClick={() => onNavigate('faqs')}
              className={`p-6 rounded-2xl border cursor-pointer transition-all hover:scale-[1.01] shadow-sm flex flex-col justify-between space-y-4 ${
                isDarkMode ? 'bg-[#12141D] border-slate-800 hover:border-[#E63946]' : 'bg-white border-black/5 hover:border-[#E63946]'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest">
                  <span className="px-2 py-0.5 rounded bg-[#E63946]/10 text-[#E63946]">
                    {faq.category}
                  </span>
                  <span className="text-slate-400">
                    Source: {faq.source.split('&')[0]}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white leading-snug line-clamp-2">
                  {faq.question}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {faq.answer}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-bold text-[#E63946] uppercase tracking-wider">
                <span>View Full Solution & Code</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Java Practice Programs Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b border-black/5 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[#E63946] font-bold text-xs tracking-widest uppercase">
              Coding Practice
            </span>
            <h2 className="text-3xl font-serif font-black tracking-tight text-slate-900 dark:text-white mt-1">
              Popular Logical Programs
            </h2>
          </div>
          <button
            onClick={() => onNavigate('programs')}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E63946] hover:underline"
          >
            <span>Explore All Programs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularPrograms.slice(0, 4).map((prog) => (
            <div
              key={prog.id}
              className={`p-6 rounded-2xl border space-y-4 shadow-sm ${
                isDarkMode ? 'bg-[#12141D] border-slate-800' : 'bg-white border-black/5'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#E63946]/10 text-[#E63946] uppercase tracking-wider">
                  {prog.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Time: {prog.timeComplexity}
                </span>
              </div>

              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  {prog.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {prog.description}
                </p>
              </div>

              {/* Code snippet preview */}
              <div className="rounded-xl bg-[#1A1A1A] p-4 border border-slate-800 text-slate-200 text-xs font-mono overflow-x-auto relative">
                <pre className="text-slate-300">{prog.javaCode.slice(0, 240)}...</pre>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-wrap gap-1">
                  {prog.tags.slice(0, 3).map((tag, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      #{tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onNavigate('playground')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E63946] hover:bg-[#d62839] text-white text-xs font-bold uppercase tracking-wider transition"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Run Live</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

