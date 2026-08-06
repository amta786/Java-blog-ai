import React, { useState } from 'react';
import { FileText, Copy, Check, AlertCircle, CheckCircle } from 'lucide-react';

interface JsonFormatterToolProps {
  isDarkMode: boolean;
}

const SAMPLE_JSON = `{
  "portal": "JavaCodePoint.com",
  "founder": "Developer Team",
  "activeUsers": 2000000,
  "features": [
    "Core Java 21 Guides",
    "Spring Boot REST APIs",
    "Online Code Runner",
    "Logical Program Library",
    "MCQs & Interview Hub"
  ],
  "isFreeResource": true
}`;

export const JsonFormatterTool: React.FC<JsonFormatterToolProps> = ({ isDarkMode }) => {
  const [inputJson, setInputJson] = useState<string>(SAMPLE_JSON);
  const [formattedJson, setFormattedJson] = useState<string>(SAMPLE_JSON);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const formatJson = (indent: number) => {
    try {
      const parsed = JSON.parse(inputJson);
      const output = JSON.stringify(parsed, null, indent);
      setFormattedJson(output);
      setErrorMsg(null);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid JSON syntax');
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(inputJson);
      setFormattedJson(JSON.stringify(parsed));
      setErrorMsg(null);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid JSON syntax');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-amber-500" />
          <span>JSON Formatter & Validator Tool</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Beautify, validate, and minify your JSON payloads with real-time error diagnostics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Textarea */}
        <div className={`p-6 rounded-2xl border space-y-4 shadow-sm ${
          isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-slate-900 dark:text-white">
              Raw JSON Input
            </h2>
            <button
              onClick={() => setInputJson(SAMPLE_JSON)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Reset Sample
            </button>
          </div>

          <textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            rows={12}
            className="w-full p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-800"
            placeholder="Paste raw JSON here..."
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => formatJson(2)}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow transition"
            >
              Format (2 spaces)
            </button>
            <button
              onClick={() => formatJson(4)}
              className="px-4 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold text-xs transition"
            >
              Format (4 spaces)
            </button>
            <button
              onClick={minifyJson}
              className="px-4 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition"
            >
              Minify JSON
            </button>
          </div>
        </div>

        {/* Formatted Output */}
        <div className={`p-6 rounded-2xl border space-y-4 shadow-sm ${
          isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Formatted Output</span>
              {errorMsg ? (
                <span className="flex items-center gap-1 text-xs text-rose-500 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" /> Invalid
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-emerald-500 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" /> Valid JSON
                </span>
              )}
            </h2>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-mono">
              <strong>Error:</strong> {errorMsg}
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto min-h-[280px] max-h-[380px] border border-slate-800">
            <pre>{formattedJson}</pre>
          </div>
        </div>

      </div>
    </div>
  );
};
