import React from 'react';
import { Heart, Github, Globe, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  isDarkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, isDarkMode }) => {
  return (
    <footer className={`border-t transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0A0B0E] border-slate-800 text-slate-400' : 'bg-[#15161C] border-slate-800 text-slate-300'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E63946] flex items-center justify-center text-white font-bold">
                &#123; &#125;
              </div>
              <span className="font-serif font-black text-2xl text-white tracking-tight">JavaCodePoint</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 font-sans">
              An editorial developer publication & interactive CS portal. In-depth guides for Java 21, Spring Boot, Microservices, Algorithms, and Interview Preparation.
            </p>
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#E63946]">
              Trusted by 2,000,000+ developers globally.
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-sans border-b border-slate-800 pb-2">
              Editorial Guides
            </h3>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <button onClick={() => onNavigate('tutorials')} className="hover:text-[#E63946] transition">Core Java 21 Records</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tutorials')} className="hover:text-[#E63946] transition">Spring Boot 3 Microservices</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tutorials')} className="hover:text-[#E63946] transition">HTML5 & Web Architecture</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tutorials')} className="hover:text-[#E63946] transition">Apache POI Excel Processing</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tutorials')} className="hover:text-[#E63946] transition">Apache Kafka Streams</button>
              </li>
            </ul>
          </div>

          {/* Practice & Tools */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-sans border-b border-slate-800 pb-2">
              Interactive Tools
            </h3>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <button onClick={() => onNavigate('playground')} className="hover:text-[#E63946] transition">Online Java Runner</button>
              </li>
              <li>
                <button onClick={() => onNavigate('programs')} className="hover:text-[#E63946] transition">Logical Java Programs</button>
              </li>
              <li>
                <button onClick={() => onNavigate('interviews')} className="hover:text-[#E63946] transition">Interview Questions</button>
              </li>
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-[#E63946] transition">Java Full Stack FAQs</button>
              </li>
              <li>
                <button onClick={() => onNavigate('mcqs')} className="hover:text-[#E63946] transition">MCQs & Online Quizzes</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tool-csv')} className="hover:text-[#E63946] transition">CSV to HTML Table Converter</button>
              </li>
              <li>
                <button onClick={() => onNavigate('tool-json')} className="hover:text-[#E63946] transition">JSON Formatter</button>
              </li>
            </ul>
          </div>

          {/* Contact & Digest */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4 font-sans border-b border-slate-800 pb-2">
              Developer Digest
            </h3>
            <p className="text-xs text-slate-400 mb-4 font-sans leading-relaxed">
              Subscribe to JavaCodePoint's weekly technical newsletter for editorial code breakdowns & practice questions.
            </p>
            <div className="flex gap-2 mb-4">
              <input 
                type="email" 
                placeholder="developer@javacodepoint.com" 
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-[#E63946]"
              />
              <button className="px-4 py-2 text-xs font-bold rounded-xl bg-[#E63946] text-white hover:bg-[#d62839] uppercase tracking-wider transition">
                Join
              </button>
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="https://javacodepoint.com" target="_blank" rel="noreferrer" className="hover:text-[#E63946] transition"><Globe className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#E63946] transition"><Github className="w-4 h-4" /></a>
              <a href="#" className="hover:text-[#E63946] transition"><Mail className="w-4 h-4" /></a>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-sans">
          <div>
            © {new Date().getFullYear()} JavaCodePoint.com — Editorial CS & Interactive Java Learning Portal.
          </div>
          <div className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#E63946] inline fill-[#E63946]" /> for Java & Web Engineers
          </div>
        </div>
      </div>
    </footer>
  );
};

