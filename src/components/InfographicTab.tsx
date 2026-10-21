import React, { useState } from 'react';
import { Download, Copy, Check, Sparkles, Layers, Palette, Terminal, CheckCircle2 } from 'lucide-react';
import { PYTHON_PIL_STITCHER_CODE } from '../data/vacanciesData';
import { downloadTextFile, triggerConfetti } from '../utils/downloadHelpers';

interface Props {
  stats: {
    totalVacancies: number;
    overallAvgSalary: number;
    topHiringLang: string;
    topSkill: string;
    languageDistribution: Array<{ language: string; count: number; percent: number }>;
    salaryByLanguage: Array<{ language: string; avgSalary: number; vacancyCount: number }>;
    top10Skills: Array<{ skill: string; count: number; percent: number }>;
  };
}

export const InfographicTab: React.FC<Props> = ({ stats }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [generatingPng, setGeneratingPng] = useState(false);

  const handleCopyPilCode = () => {
    navigator.clipboard.writeText(PYTHON_PIL_STITCHER_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadPilScript = () => {
    downloadTextFile('combine_infographic.py', PYTHON_PIL_STITCHER_CODE, 'text/x-python');
  };

  // Generate combined high-resolution infographic in the browser!
  const handleExportCombinedInfographic = () => {
    setGeneratingPng(true);

    setTimeout(() => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1400;
        canvas.height = 2400;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Background dark gradient
        const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGrad.addColorStop(0, '#0F172A');
        bgGrad.addColorStop(1, '#020617');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Header Banner
        ctx.fillStyle = '#1E293B';
        ctx.fillRect(40, 40, canvas.width - 80, 200);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 40, canvas.width - 80, 200);

        // Header Text
        ctx.fillStyle = '#6366F1';
        ctx.font = 'bold 20px system-ui, sans-serif';
        ctx.fillText('DATA ANALYTICS PORTFOLIO REPORT', 80, 95);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 44px system-ui, sans-serif';
        ctx.fillText('Tech Job Market & Compensation Study', 80, 150);

        ctx.fillStyle = '#94A3B8';
        ctx.font = '22px system-ui, sans-serif';
        ctx.fillText(`Analysis of ${stats.totalVacancies} tech openings: Language demand, salary benchmarks & skill gaps`, 80, 195);

        // KPI Summary Cards
        const cardY = 270;
        const cardW = 300;
        const cardH = 110;
        const cards = [
          { label: 'Total Analyzed', val: `${stats.totalVacancies} Jobs`, color: '#818CF8' },
          { label: 'Average Salary', val: `$${stats.overallAvgSalary.toLocaleString()}`, color: '#34D399' },
          { label: 'Most Demanded', val: stats.topHiringLang, color: '#60A5FA' },
          { label: '#1 Core Skill', val: stats.topSkill, color: '#FBBF24' },
        ];

        cards.forEach((c, idx) => {
          const cx = 40 + idx * (cardW + 33);
          ctx.fillStyle = '#1E293B';
          ctx.fillRect(cx, cardY, cardW, cardH);
          ctx.strokeStyle = '#334155';
          ctx.strokeRect(cx, cardY, cardW, cardH);

          ctx.fillStyle = '#94A3B8';
          ctx.font = '16px system-ui, sans-serif';
          ctx.fillText(c.label, cx + 24, cardY + 40);

          ctx.fillStyle = c.color;
          ctx.font = 'bold 28px system-ui, sans-serif';
          ctx.fillText(c.val, cx + 24, cardY + 82);
        });

        // Section 1: Chart A (Language counts)
        let currY = 420;
        ctx.fillStyle = '#1E293B';
        ctx.fillRect(40, currY, canvas.width - 80, 560);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(40, currY, canvas.width - 80, 560);

        ctx.fillStyle = '#F8FAFC';
        ctx.font = 'bold 28px system-ui, sans-serif';
        ctx.fillText('01. Job Openings by Programming Language', 80, currY + 60);

        // Chart A bars
        const maxLang = Math.max(...stats.languageDistribution.map(d => d.count));
        const barStartX = 110;
        const barWidth = 100;
        const barSpacing = (canvas.width - 240) / stats.languageDistribution.length;
        const chartABaseY = currY + 460;

        stats.languageDistribution.forEach((item, idx) => {
          const x = barStartX + idx * barSpacing;
          const h = (item.count / maxLang) * 310;
          const y = chartABaseY - h;

          ctx.fillStyle = '#4F46E5';
          ctx.fillRect(x, y, barWidth, h);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 22px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(item.count.toString(), x + barWidth / 2, y - 10);

          ctx.fillStyle = '#CBD5E1';
          ctx.font = 'bold 20px system-ui, sans-serif';
          ctx.fillText(item.language, x + barWidth / 2, chartABaseY + 35);
          ctx.textAlign = 'left';
        });

        // Section 2: Chart B (Salaries)
        currY += 600;
        ctx.fillStyle = '#1E293B';
        ctx.fillRect(40, currY, canvas.width - 80, 560);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(40, currY, canvas.width - 80, 560);

        ctx.fillStyle = '#F8FAFC';
        ctx.font = 'bold 28px system-ui, sans-serif';
        ctx.fillText('02. Average Tech Salary by Language (USD)', 80, currY + 60);

        const maxSal = Math.max(...stats.salaryByLanguage.map(d => d.avgSalary));
        const chartBBaseY = currY + 460;

        stats.salaryByLanguage.forEach((item, idx) => {
          const x = barStartX + idx * barSpacing;
          const h = (item.avgSalary / maxSal) * 310;
          const y = chartBBaseY - h;

          ctx.fillStyle = '#059669';
          ctx.fillRect(x, y, barWidth, h);

          ctx.fillStyle = '#6EE7B7';
          ctx.font = 'bold 20px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(`$${Math.round(item.avgSalary / 1000)}k`, x + barWidth / 2, y - 10);

          ctx.fillStyle = '#CBD5E1';
          ctx.font = 'bold 20px system-ui, sans-serif';
          ctx.fillText(item.language, x + barWidth / 2, chartBBaseY + 35);
          ctx.textAlign = 'left';
        });

        // Section 3: Chart C (Top 10 skills)
        currY += 600;
        ctx.fillStyle = '#1E293B';
        ctx.fillRect(40, currY, canvas.width - 80, 640);
        ctx.strokeStyle = '#334155';
        ctx.strokeRect(40, currY, canvas.width - 80, 640);

        ctx.fillStyle = '#F8FAFC';
        ctx.font = 'bold 28px system-ui, sans-serif';
        ctx.fillText('03. Top 10 Most In-Demand Tech Skills', 80, currY + 55);

        const maxSkill = Math.max(...stats.top10Skills.map(d => d.count));
        stats.top10Skills.forEach((item, idx) => {
          const sy = currY + 100 + idx * 50;
          const sw = (item.count / maxSkill) * 750;

          ctx.fillStyle = '#E2E8F0';
          ctx.font = 'bold 20px system-ui, sans-serif';
          ctx.textAlign = 'right';
          ctx.fillText(item.skill, 300, sy + 24);
          ctx.textAlign = 'left';

          ctx.fillStyle = '#D97706';
          ctx.fillRect(330, sy, sw, 32);

          ctx.fillStyle = '#FDE68A';
          ctx.font = 'bold 18px system-ui, sans-serif';
          ctx.fillText(`${item.count} mentions (${item.percent}%)`, 345 + sw, sy + 23);
        });

        // Footer
        ctx.fillStyle = '#64748B';
        ctx.font = '18px system-ui, sans-serif';
        ctx.fillText('Automated Python Data Analytics Pipeline • Built with Pandas, Matplotlib & Pillow • Ready for Upwork Portfolio', 80, canvas.height - 40);

        // Download PNG
        const url = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = url;
        a.download = 'job_market_full_infographic.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        triggerConfetti();
      } finally {
        setGeneratingPng(false);
      }
    }, 200);
  };

  return (
    <div className="space-y-8">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Infographic Assembly Guide & Automated Builder
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              From 3 PNG Charts to a High-Impact Portfolio Infographic
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Compare the 3 easiest approaches: Automated Python Pillow, Canva, and Figma.
            </p>
          </div>

          <button
            onClick={handleExportCombinedInfographic}
            disabled={generatingPng}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-xl shadow-indigo-600/30 transition active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{generatingPng ? 'Rendering...' : 'Download Full Infographic PNG'}</span>
          </button>
        </div>
      </div>

      {/* Comparison Grid: PIL vs Canva vs Figma */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Method 1: Python PIL */}
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3">
              ★ Recommended for Developers
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-indigo-400" />
              1. Python (Pillow / PIL)
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              <strong>100% automated:</strong> stitches the 3 charts in ~0.2 seconds into one image with header and styling. You can add it directly to your GitHub script as a single command!
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero manual design work</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Looks impressive in portfolio code</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Command: <code className="text-indigo-300 font-mono">pip install pillow</code></span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={handleCopyPilCode}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
              <span>Copy PIL Script</span>
            </button>
            <button
              onClick={handleDownloadPilScript}
              className="p-2 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 transition"
              title="Download combine_infographic.py"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Method 2: Canva */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold mb-3">
              Fastest Visual Editor
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-cyan-400" />
              2. Canva (Web App)
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Ideal if you want pre-made graphic templates, icons, modern fonts, and easy drag-and-drop without coding.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Create design: <strong>800 × 2000 px (Infographic)</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Upload 3 PNG files from your Python output</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Add dark background & metric badges</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-500 font-mono block text-center">
              Time to assemble: 3–5 minutes
            </span>
          </div>
        </div>

        {/* Method 3: Figma */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-3">
              Pixel-Perfect Design
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-rose-400" />
              3. Figma
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Best choice if you already use Figma or want to present the project as a sleek product case study on Behance or Dribbble.
            </p>

            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Frame: 1440 × 2400 (Auto-layout stack)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Rounded corners (16px) & subtle dropshadows</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Export 2x PNG for crisp Retina display</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-500 font-mono block text-center">
              Time to assemble: 5–10 minutes
            </span>
          </div>
        </div>
      </div>

      {/* Pillow Code Preview */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs text-slate-300 font-medium">combine_infographic.py (Pillow Stitcher)</span>
          </div>
          <button
            onClick={handleCopyPilCode}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1"
          >
            {copiedCode ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-x-auto text-sm font-mono leading-relaxed max-h-[400px] overflow-y-auto">
          <pre className="text-slate-300">
            {PYTHON_PIL_STITCHER_CODE.split('\n').map((line, idx) => (
              <div key={idx} className="table-row hover:bg-slate-900/60 px-2 py-0.5 rounded">
                <span className="table-cell select-none text-right pr-6 text-slate-600 text-xs w-10">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {line.startsWith('#') || line.startsWith('"""') || line.endsWith('"""') ? (
                    <span className="text-slate-500 italic">{line}</span>
                  ) : line.includes('import ') ? (
                    <span className="text-violet-400">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};
