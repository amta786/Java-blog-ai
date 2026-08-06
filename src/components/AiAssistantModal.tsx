import React, { useState, useEffect } from 'react';
import { Sparkles, X, Send, Bot, Loader2, Code2, CheckCircle2 } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
  isDarkMode: boolean;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  initialCode,
  isDarkMode
}) => {
  const [prompt, setPrompt] = useState('');
  const [codeContext, setCodeContext] = useState(initialCode || '');
  const [requestType, setRequestType] = useState<'explain' | 'debug' | 'ask'>('explain');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  useEffect(() => {
    if (initialCode) setCodeContext(initialCode);
  }, [initialCode]);

  if (!isOpen) return null;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt || 'Explain this Java code and list best practices.',
          code: codeContext,
          type: requestType
        })
      });

      const data = await res.json();
      setAiResponse(data.text || 'No response returned.');
    } catch (err: any) {
      setAiResponse(`Failed to query AI assistant: ${err?.message || 'Network error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${
        isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-900/30 via-amber-900/20 to-slate-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>JavaCodePoint AI Assistant</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-semibold border border-indigo-500/30">
                  Gemini 2.5 Flash
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ask Java questions, debug exceptions, or explain complex code structures.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* Action type tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setRequestType('explain')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                requestType === 'explain' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Code Explanation
            </button>
            <button
              onClick={() => setRequestType('debug')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                requestType === 'debug' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Debug & Fix Error
            </button>
            <button
              onClick={() => setRequestType('ask')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                requestType === 'ask' 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Ask Java Question
            </button>
          </div>

          {/* Prompt input */}
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">
              Your Question / Prompt:
            </label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. How do Java 21 Virtual Threads prevent thread pool starvation?"
              className={`w-full px-3 py-2 text-xs rounded-xl border focus:outline-none focus:border-indigo-500 ${
                isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          {/* Code context input */}
          <div>
            <label className="text-xs font-semibold text-slate-500 block mb-1">
              Java Code Snippet (Optional):
            </label>
            <textarea
              value={codeContext}
              onChange={(e) => setCodeContext(e.target.value)}
              rows={4}
              placeholder="Paste Java snippet here..."
              className="w-full p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs focus:outline-none border border-slate-800"
            />
          </div>

          <button
            onClick={() => handleSubmit()}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-amber-600 text-white text-xs font-bold shadow-md hover:opacity-95 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Generating AI Analysis...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit to AI Assistant</span>
              </>
            )}
          </button>

          {/* AI Output Response */}
          {aiResponse && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 space-y-2 text-xs font-sans">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <Bot className="w-4 h-4 text-indigo-400" />
                <span>AI Response:</span>
              </div>
              <div className="whitespace-pre-line leading-relaxed font-mono text-[11px] text-slate-300">
                {aiResponse}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
