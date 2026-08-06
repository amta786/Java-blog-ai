import React, { useState } from 'react';
import { Code2, Play, Copy, Check, Sparkles } from 'lucide-react';

interface PatternGeneratorToolProps {
  onNavigateToRunner: (code: string) => void;
  isDarkMode: boolean;
}

export const PatternGeneratorTool: React.FC<PatternGeneratorToolProps> = ({
  onNavigateToRunner,
  isDarkMode
}) => {
  const [patternType, setPatternType] = useState<string>('pyramid');
  const [rows, setRows] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);

  // Generate ASCII Pattern Preview
  const generateAsciiPattern = (): string => {
    let output = '';
    const r = Math.min(Math.max(rows, 1), 10);

    if (patternType === 'pyramid') {
      for (let i = 1; i <= r; i++) {
        output += ' '.repeat(r - i) + '*'.repeat(2 * i - 1) + '\n';
      }
    } else if (patternType === 'right-triangle') {
      for (let i = 1; i <= r; i++) {
        output += '*'.repeat(i) + '\n';
      }
    } else if (patternType === 'inverted-triangle') {
      for (let i = r; i >= 1; i--) {
        output += '*'.repeat(i) + '\n';
      }
    } else if (patternType === 'number-pyramid') {
      for (let i = 1; i <= r; i++) {
        output += ' '.repeat(r - i);
        for (let j = 1; j <= i; j++) {
          output += j + ' ';
        }
        output += '\n';
      }
    } else if (patternType === 'floyd-triangle') {
      let num = 1;
      for (let i = 1; i <= r; i++) {
        for (let j = 1; j <= i; j++) {
          output += num++ + ' ';
        }
        output += '\n';
      }
    }
    return output;
  };

  // Generate complete runnable Java code
  const generateJavaCode = (): string => {
    return `public class JavaPatternGenerator {
    public static void main(String[] args) {
        int rows = ${rows};
        System.out.println("Generated Pattern: ${patternType.toUpperCase()} (${rows} rows)\\n");

        ${patternType === 'pyramid' ? `
        for (int i = 1; i <= rows; i++) {
            for (int j = i; j < rows; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= (2 * i - 1); k++) {
                System.out.print("*");
            }
            System.out.println();
        }` : patternType === 'right-triangle' ? `
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }` : patternType === 'inverted-triangle' ? `
        for (int i = rows; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("*");
            }
            System.out.println();
        }` : `
        int val = 1;
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(val++ + " ");
            }
            System.out.println();
        }`}
    }
}`;
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateJavaCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-6 h-6 text-indigo-500" />
          <span>Interactive Java Pattern Generator</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Select pattern style and row count to generate live Java source code and ASCII output.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pattern Controls Panel */}
        <div className={`p-6 rounded-2xl border space-y-4 shadow-sm ${
          isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <h2 className="font-bold text-sm text-slate-900 dark:text-white">
            Pattern Settings
          </h2>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Pattern Style:
            </label>
            <select
              value={patternType}
              onChange={(e) => setPatternType(e.target.value)}
              className={`w-full p-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-indigo-500 ${
                isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
            >
              <option value="pyramid">Pyramid Star Pattern</option>
              <option value="right-triangle">Right Angle Triangle (*)</option>
              <option value="inverted-triangle">Inverted Triangle (*)</option>
              <option value="number-pyramid">Number Pyramid (1 2 3)</option>
              <option value="floyd-triangle">Floyd's Triangle (1 / 2 3 / 4 5 6)</option>
            </select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
              <span>Row Count:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{rows} Rows</span>
            </div>
            <input 
              type="range"
              min={2}
              max={10}
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-2">
            <button
              onClick={() => onNavigateToRunner(generateJavaCode())}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow transition"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Test in Java Runner</span>
            </button>
          </div>
        </div>

        {/* ASCII Output Preview */}
        <div className={`p-6 rounded-2xl border space-y-4 shadow-sm lg:col-span-2 ${
          isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-sm text-slate-900 dark:text-white">
              Generated Java Source Code
            </h2>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Java Code'}</span>
            </button>
          </div>

          {/* Code block */}
          <div className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800">
            <pre>{generateJavaCode()}</pre>
          </div>

          {/* ASCII visual result */}
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Console Visual Preview:
            </div>
            <div className="p-3 rounded-xl bg-slate-900 text-amber-400 font-mono text-xs border border-slate-800">
              <pre>{generateAsciiPattern()}</pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
