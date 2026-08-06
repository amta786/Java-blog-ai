import React, { useState } from 'react';
import { Code2, Search, Play, Copy, Check, Terminal } from 'lucide-react';
import { LogicalProgram } from '../types';

interface LogicalProgramsListProps {
  programs: LogicalProgram[];
  onNavigateToRunner: (code: string) => void;
  isDarkMode: boolean;
}

export const LogicalProgramsList: React.FC<LogicalProgramsListProps> = ({
  programs,
  onNavigateToRunner,
  isDarkMode
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'patterns', label: 'Pattern Printing' },
    { id: 'strings', label: 'String Programs' },
    { id: 'arrays', label: 'Array Manipulations' },
    { id: 'recursion', label: 'Recursion & Math' },
  ];

  const filtered = programs.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-6 h-6 text-amber-500" />
          <span>Java Logical & Pattern Programs</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Top logical Java coding programs frequently asked in technical interviews.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className={`p-4 rounded-2xl border space-y-4 shadow-sm ${
        isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search programs e.g. pyramid, reverse string, anagram..."
            className={`w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border focus:outline-none focus:border-indigo-500 ${
              isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-700/60">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : isDarkMode ? 'bg-slate-900 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Programs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((prog) => (
          <div
            key={prog.id}
            className={`p-6 rounded-2xl border space-y-4 shadow-sm flex flex-col justify-between ${
              isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                  {prog.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Time: {prog.timeComplexity}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {prog.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {prog.description}
                </p>
              </div>

              {/* Code Box */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-mono">
                  <span>Java Source:</span>
                  <button
                    onClick={() => handleCopyCode(prog.javaCode, prog.id)}
                    className="flex items-center gap-1 hover:text-amber-400 transition"
                  >
                    {copiedId === prog.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === prog.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono overflow-x-auto max-h-48">
                  <pre>{prog.javaCode}</pre>
                </div>
              </div>

              {/* Expected Output */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Expected Console Output:
                </div>
                <pre className="text-emerald-400 whitespace-pre-wrap">{prog.expectedOutput}</pre>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {prog.tags.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => onNavigateToRunner(prog.javaCode)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow transition"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Run in Sandbox</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
