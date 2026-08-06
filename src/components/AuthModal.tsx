import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, LogIn, UserPlus, LogOut, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { User } from '../types';
import { loginUser, registerUser, logoutUser } from '../utils/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onAuthChange: (user: User | null) => void;
  isDarkMode: boolean;
  savedBookmarksCount?: number;
  recentlyViewedCount?: number;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onAuthChange,
  isDarkMode,
  savedBookmarksCount = 0,
  recentlyViewedCount = 0,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        const user = await registerUser(email, password, fullName);
        onAuthChange(user);
        setSuccessMsg('Account created successfully! Welcome to JavaCodePoint.');
        setTimeout(() => onClose(), 1200);
      } else {
        const user = await loginUser(email, password);
        onAuthChange(user);
        setSuccessMsg('Welcome back!');
        setTimeout(() => onClose(), 1000);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail('developer@javacodepoint.com');
    setPassword('Java21#Developer');
    setFullName('Java Core Engineer');
    setError(null);
  };

  const handleLogout = () => {
    logoutUser();
    onAuthChange(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`w-full max-w-md rounded-3xl border shadow-2xl overflow-hidden ${
        isDarkMode ? 'bg-[#12141D] border-slate-800 text-slate-100' : 'bg-white border-black/5 text-slate-900'
      }`}>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E63946] flex items-center justify-center text-white font-bold">
              &#123; &#125;
            </div>
            <div>
              <h2 className="font-serif font-black text-xl leading-none">
                {currentUser ? 'Developer Profile' : mode === 'login' ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-[11px] font-sans text-slate-400 mt-1 uppercase tracking-wider font-bold">
                JavaCodePoint Member Portal
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">

          {currentUser ? (
            /* Logged In View */
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <img 
                  src={currentUser.avatarUrl || `https://api.dicebear.com/7.x/identicon/svg?seed=${currentUser.email}`} 
                  alt={currentUser.fullName}
                  className="w-14 h-14 rounded-full border-2 border-[#E63946] p-0.5"
                />
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg leading-tight text-slate-900 dark:text-white">
                    {currentUser.fullName}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">{currentUser.email}</p>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#E63946] bg-[#E63946]/10 px-2 py-0.5 rounded">
                    <ShieldCheck className="w-3 h-3 text-[#E63946]" />
                    <span>{currentUser.role || 'Pro Member'}</span>
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-center">
                  <div className="text-2xl font-serif font-black text-[#E63946]">{savedBookmarksCount}</div>
                  <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mt-0.5">Saved Items</div>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-center">
                  <div className="text-2xl font-serif font-black text-[#E63946]">{recentlyViewedCount}</div>
                  <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mt-0.5">Recently Viewed</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider transition border border-rose-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Account</span>
                </button>
              </div>
            </div>
          ) : (
            /* Sign In / Sign Up Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Tab Selector */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(null); }}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition ${
                    mode === 'login' 
                      ? 'bg-[#E63946] text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setError(null); }}
                  className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition ${
                    mode === 'signup' 
                      ? 'bg-[#E63946] text-white shadow-sm' 
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-medium">
                  {error}
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{successMsg}</span>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. James Gosling"
                      className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#E63946] ${
                        isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@javacodepoint.com"
                    className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#E63946] ${
                      isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border focus:outline-none focus:border-[#E63946] ${
                      isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Password credentials are hashed locally with SHA-256 before storage.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#E63946] hover:bg-[#d62839] text-white font-bold text-xs uppercase tracking-wider transition shadow-md disabled:opacity-50 mt-2"
              >
                {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Sign In to Account' : 'Create Free Account'}</span>
              </button>

              <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E63946] hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Fill Demo Account Details</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
