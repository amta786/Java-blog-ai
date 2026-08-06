import React, { useState } from 'react';
import { Table, Copy, Check, Download, RefreshCw, FileText } from 'lucide-react';

interface CsvToTableToolProps {
  isDarkMode: boolean;
}

const SAMPLE_CSV = `Employee_ID, Name, Department, Role, Salary
1001, Alex Rivers, Engineering, Senior Java Developer, $120000
1002, Priya Sharma, Product, Product Manager, $115000
1003, David Kim, DevOps, Site Reliability Engineer, $110000
1004, Sarah Connor, Security, Lead Architect, $135000`;

export const CsvToTableTool: React.FC<CsvToTableToolProps> = ({ isDarkMode }) => {
  const [csvText, setCsvText] = useState<string>(SAMPLE_CSV);
  const [hasHeader, setHasHeader] = useState<boolean>(true);
  const [isStriped, setIsStriped] = useState<boolean>(true);
  const [isBordered, setIsBordered] = useState<boolean>(true);
  const [isHoverable, setIsHoverable] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Parse CSV rows into 2D array
  const parseCsv = (text: string): string[][] => {
    return text
      .trim()
      .split('\n')
      .map(row => row.split(',').map(cell => cell.trim()));
  };

  const parsedData = parseCsv(csvText);
  const headers = hasHeader && parsedData.length > 0 ? parsedData[0] : [];
  const rows = hasHeader && parsedData.length > 0 ? parsedData.slice(1) : parsedData;

  // Generate clean HTML Table code snippet
  const generateHtmlCode = (): string => {
    let html = `<table class="custom-table${isBordered ? ' table-bordered' : ''}${isStriped ? ' table-striped' : ''}${isHoverable ? ' table-hover' : ''}">\n`;

    if (hasHeader && headers.length > 0) {
      html += `  <thead>\n    <tr>\n`;
      headers.forEach(h => {
        html += `      <th>${h}</th>\n`;
      });
      html += `    </tr>\n  </thead>\n`;
    }

    html += `  <tbody>\n`;
    rows.forEach(row => {
      html += `    <tr>\n`;
      row.forEach(cell => {
        html += `      <td>${cell}</td>\n`;
      });
      html += `    </tr>\n`;
    });
    html += `  </tbody>\n</table>`;

    return html;
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(generateHtmlCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      
      {/* Tool Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Table className="w-6 h-6 text-emerald-500" />
          <span>CSV to HTML Table Converter Tool</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Paste your CSV data to instantly generate a responsive, styled HTML table with customizable CSS themes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Panel */}
        <div className={`p-6 rounded-2xl border space-y-4 shadow-sm ${
          isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span>Input CSV Text</span>
            </h2>
            <button
              onClick={() => setCsvText(SAMPLE_CSV)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Load Sample CSV
            </button>
          </div>

          <textarea
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            rows={10}
            className="w-full p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-800"
            placeholder="Paste CSV here e.g. Name, Age, Role..."
          />

          {/* Options checkboxes */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-medium text-slate-700 dark:text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={hasHeader} 
                onChange={(e) => setHasHeader(e.target.checked)} 
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>First row as Header</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isStriped} 
                onChange={(e) => setIsStriped(e.target.checked)} 
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Zebra Striping</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isBordered} 
                onChange={(e) => setIsBordered(e.target.checked)} 
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Cell Borders</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isHoverable} 
                onChange={(e) => setIsHoverable(e.target.checked)} 
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span>Row Hover Effect</span>
            </label>
          </div>
        </div>

        {/* Live Table Preview */}
        <div className={`p-6 rounded-2xl border space-y-4 shadow-sm ${
          isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-slate-900 dark:text-white">
              Live Table Render
            </h2>
            <span className="text-xs text-slate-400">
              {rows.length} rows, {headers.length || (parsedData[0]?.length || 0)} cols
            </span>
          </div>

          <div className="overflow-x-auto max-h-[300px] border border-slate-200 dark:border-slate-700 rounded-xl">
            <table className={`w-full text-xs text-left ${
              isBordered ? 'divide-y divide-x border border-slate-200 dark:border-slate-700' : ''
            }`}>
              {hasHeader && headers.length > 0 && (
                <thead className="bg-indigo-600 text-white font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} className="px-3 py-2 border-r border-indigo-500/30">{h}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {rows.map((row, rIdx) => (
                  <tr 
                    key={rIdx} 
                    className={`transition ${
                      isStriped && rIdx % 2 === 1 
                        ? isDarkMode ? 'bg-slate-900/40' : 'bg-slate-50' 
                        : ''
                    } ${isHoverable ? 'hover:bg-indigo-500/10' : ''}`}
                  >
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3 py-2 text-slate-700 dark:text-slate-300">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Output HTML Code Box */}
      <div className={`p-6 rounded-2xl border space-y-4 shadow-sm ${
        isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-900 dark:text-white">
            Generated HTML Code Snippet
          </h2>
          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied HTML!' : 'Copy HTML Code'}</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-xs overflow-x-auto max-h-60 border border-slate-800">
          <pre>{generateHtmlCode()}</pre>
        </div>
      </div>

    </div>
  );
};
