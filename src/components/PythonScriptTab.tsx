import React, { useState } from 'react';
import { Copy, Check, Download, Terminal, FileCode2, CheckCircle2 } from 'lucide-react';
import { PYTHON_ANALYZER_CODE } from '../data/vacanciesData';
import { downloadTextFile } from '../utils/downloadHelpers';

export const PythonScriptTab: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_ANALYZER_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadTextFile('analyze_jobs.py', PYTHON_ANALYZER_CODE, 'text/x-python');
  };

  const lineCount = PYTHON_ANALYZER_CODE.trim().split('\n').length;

  return (
    <div className="space-y-6">
      {/* Top Banner Info */}
      <div className="bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/40 border border-indigo-900/40 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2">
              <FileCode2 className="w-3.5 h-3.5" />
              Clean Python Standard • {lineCount} Lines (Target: 30–70)
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              analyze_jobs.py — Production-Grade Parser & Visualizer
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Zero boilerplate, vectorized pandas metrics, professional matplotlib themes, and automatic bar labels.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow-sm transition active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-indigo-400" />
                  <span>Copy Python Code</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download analyze_jobs.py</span>
            </button>
          </div>
        </div>

        {/* Quick Shell Run Box */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-300 bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-500">$</span>
            <span className="text-emerald-400">pip install pandas matplotlib</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300 bg-slate-950/80 px-3.5 py-2 rounded-xl border border-slate-800">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="text-slate-500">$</span>
            <span className="text-cyan-400">python analyze_jobs.py</span>
          </div>
        </div>
      </div>

      {/* Code Viewer with Line Numbers */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 font-mono text-xs text-slate-400 font-medium">analyze_jobs.py</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Python 3.9+ • Pandas 2.0+</span>
        </div>

        <div className="p-4 sm:p-6 overflow-x-auto text-sm font-mono leading-relaxed max-h-[620px] overflow-y-auto">
          <pre className="text-slate-300">
            {PYTHON_ANALYZER_CODE.split('\n').map((line, idx) => (
              <div key={idx} className="table-row hover:bg-slate-900/60 px-2 py-0.5 rounded">
                <span className="table-cell select-none text-right pr-6 text-slate-600 text-xs w-10">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {line.startsWith('#') || line.startsWith('"""') || line.endsWith('"""') ? (
                    <span className="text-slate-500 italic">{line}</span>
                  ) : line.includes('import ') ? (
                    <span className="text-violet-400">{line}</span>
                  ) : line.includes('plt.') || line.includes('df') ? (
                    <span className="text-indigo-300">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>

      {/* Architectural Breakdown for Job Interviews / Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center gap-2.5 text-indigo-400 font-semibold text-sm mb-2">
            <CheckCircle2 className="w-4 h-4" />
            1. Vectorized Aggregations
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Uses <code className="text-indigo-300 bg-slate-950 px-1.5 py-0.5 rounded">value_counts()</code> and vectorized salary midpoints <code className="text-indigo-300 bg-slate-950 px-1.5 py-0.5 rounded">(min + max) / 2</code> instead of slow Python loops.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm mb-2">
            <CheckCircle2 className="w-4 h-4" />
            2. Skill Explosion Technique
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unpacks comma-separated skill tags seamlessly with <code className="text-emerald-300 bg-slate-950 px-1.5 py-0.5 rounded">.str.split(',').explode().str.strip()</code> for accurate frequency distribution.
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="flex items-center gap-2.5 text-amber-400 font-semibold text-sm mb-2">
            <CheckCircle2 className="w-4 h-4" />
            3. Publication-Ready Charts
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Generates 300 DPI PNG outputs with automatic value tags using <code className="text-amber-300 bg-slate-950 px-1.5 py-0.5 rounded">plt.bar_label()</code> and currency formatting for clean infographics.
          </p>
        </div>
      </div>
    </div>
  );
};
