import React, { useState } from 'react';
import { Download, Check, Sparkles } from 'lucide-react';
import { triggerConfetti } from '../utils/downloadHelpers';

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

export const ChartsSection: React.FC<Props> = ({ stats }) => {
  const [downloadedMap, setDownloadedMap] = useState<Record<string, boolean>>({});

  const handleDownloadChart = (chartId: string, filename: string, title: string, renderType: 'lang' | 'salary' | 'skills') => {
    const canvas = document.createElement('canvas');
    canvas.width = 1800; // 2x high-res
    canvas.height = 1000;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.5;
    for (let y = 180; y <= 850; y += 130) {
      ctx.beginPath();
      ctx.moveTo(140, y);
      ctx.lineTo(1700, y);
      ctx.stroke();
    }

    // Title & subtitle
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, canvas.width / 2, 80);

    ctx.fillStyle = '#64748B';
    ctx.font = '22px system-ui, -apple-system, sans-serif';
    ctx.fillText(`Sample Size: ${stats.totalVacancies} Vacancies • Python Data Analytics Portfolio`, canvas.width / 2, 120);

    if (renderType === 'lang') {
      const data = stats.languageDistribution;
      const maxVal = Math.max(...data.map(d => d.count), 1);
      const startX = 200;
      const endX = 1650;
      const barWidth = 110;
      const step = (endX - startX) / (data.length - 1 || 1);
      const baseY = 850;

      data.forEach((item, idx) => {
        const x = startX + idx * step - barWidth / 2;
        const barHeight = (item.count / maxVal) * 580;
        const y = baseY - barHeight;

        // Bar
        ctx.fillStyle = '#4F46E5';
        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.strokeStyle = '#3730A3';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);

        // Value on top
        ctx.fillStyle = '#1E1B4B';
        ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.count.toString(), x + barWidth / 2, y - 12);

        // Language label below
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
        ctx.fillText(item.language, x + barWidth / 2, baseY + 36);

        // Percentage label
        ctx.fillStyle = '#64748B';
        ctx.font = '18px system-ui, -apple-system, sans-serif';
        ctx.fillText(`${item.percent}%`, x + barWidth / 2, baseY + 66);
      });

      // Axis label
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Programming Language', canvas.width / 2, 960);
    } else if (renderType === 'salary') {
      const data = stats.salaryByLanguage;
      const maxVal = Math.max(...data.map(d => d.avgSalary), 1);
      const startX = 200;
      const endX = 1650;
      const barWidth = 110;
      const step = (endX - startX) / (data.length - 1 || 1);
      const baseY = 850;

      data.forEach((item, idx) => {
        const x = startX + idx * step - barWidth / 2;
        const barHeight = (item.avgSalary / maxVal) * 580;
        const y = baseY - barHeight;

        // Bar
        ctx.fillStyle = '#059669';
        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.strokeStyle = '#047857';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);

        // Value on top
        ctx.fillStyle = '#064E3B';
        ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`$${Math.round(item.avgSalary / 1000)}k`, x + barWidth / 2, y - 12);

        // Language label below
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
        ctx.fillText(item.language, x + barWidth / 2, baseY + 36);
      });

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Average Annual Salary (USD)', canvas.width / 2, 960);
    } else if (renderType === 'skills') {
      const data = stats.top10Skills;
      const maxVal = Math.max(...data.map(d => d.count), 1);
      const startY = 170;
      const rowHeight = 70;
      const barStartX = 340;
      const maxBarWidth = 1250;

      data.forEach((item, idx) => {
        const y = startY + idx * rowHeight;
        const barW = (item.count / maxVal) * maxBarWidth;

        // Skill label
        ctx.fillStyle = '#1E293B';
        ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(item.skill, barStartX - 25, y + 26);

        // Horizontal bar
        ctx.fillStyle = '#D97706';
        ctx.fillRect(barStartX, y, barW, 36);
        ctx.strokeStyle = '#B45309';
        ctx.lineWidth = 2;
        ctx.strokeRect(barStartX, y, barW, 36);

        // Count label inside or beside
        ctx.fillStyle = '#78350F';
        ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${item.count} mentions (${item.percent}%)`, barStartX + barW + 16, y + 26);
      });

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Frequency Across Job Listings', canvas.width / 2, 940);
    }

    // Trigger download
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloadedMap(prev => ({ ...prev, [chartId]: true }));
    triggerConfetti();
    setTimeout(() => {
      setDownloadedMap(prev => ({ ...prev, [chartId]: false }));
    }, 2500);
  };

  const maxLangCount = Math.max(...stats.languageDistribution.map(d => d.count), 1);
  const maxSalary = Math.max(...stats.salaryByLanguage.map(d => d.avgSalary), 1);
  const maxSkillCount = Math.max(...stats.top10Skills.map(d => d.count), 1);

  return (
    <div className="space-y-8">
      {/* Chart A: Vacancies by Language */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              Chart A • Market Volume
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Job Openings by Programming Language
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">
              Distribution of {stats.totalVacancies} tech vacancies by primary language
            </p>
          </div>
          <button
            onClick={() => handleDownloadChart('chart-a', '01_vacancies_by_language.png', 'Job Openings by Programming Language', 'lang')}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-xl transition shadow-sm active:scale-95"
          >
            {downloadedMap['chart-a'] ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Saved PNG</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Export 01_vacancies_by_language.png</span>
              </>
            )}
          </button>
        </div>

        {/* Chart A Bars Visual */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 items-end pt-6 pb-2 min-h-[260px]">
          {stats.languageDistribution.map((item) => {
            const heightPercent = Math.max(15, Math.round((item.count / maxLangCount) * 100));
            return (
              <div key={item.language} className="flex flex-col items-center group">
                <div className="text-xs font-mono font-semibold text-indigo-300 mb-2 group-hover:scale-110 transition-transform">
                  {item.count}
                </div>
                <div className="w-full max-w-[64px] h-[170px] bg-slate-950/60 rounded-xl flex items-end p-1.5 border border-slate-800">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full rounded-lg bg-gradient-to-t from-indigo-700 to-indigo-500 group-hover:from-indigo-600 group-hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-indigo-950/50 flex items-center justify-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-2 text-center truncate max-w-full">
                  {item.language}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {item.percent}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart B: Average Salary by Language */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Chart B • Compensation Benchmarks
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Average Tech Salary by Language (USD)
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">
              Calculated as mean of (salary_min + salary_max) / 2 per language group
            </p>
          </div>
          <button
            onClick={() => handleDownloadChart('chart-b', '02_salary_by_language.png', 'Average Tech Salary by Language (USD)', 'salary')}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-xl transition shadow-sm active:scale-95"
          >
            {downloadedMap['chart-b'] ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Saved PNG</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export 02_salary_by_language.png</span>
              </>
            )}
          </button>
        </div>

        {/* Chart B Bars Visual */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 items-end pt-6 pb-2 min-h-[260px]">
          {stats.salaryByLanguage.map((item) => {
            const heightPercent = Math.max(25, Math.round((item.avgSalary / maxSalary) * 100));
            return (
              <div key={item.language} className="flex flex-col items-center group">
                <div className="text-xs font-mono font-bold text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
                  ${Math.round(item.avgSalary / 1000)}k
                </div>
                <div className="w-full max-w-[64px] h-[170px] bg-slate-950/60 rounded-xl flex items-end p-1.5 border border-slate-800">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full rounded-lg bg-gradient-to-t from-emerald-700 to-emerald-500 group-hover:from-emerald-600 group-hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-950/50 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-200 mt-2 text-center truncate max-w-full">
                  {item.language}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {item.vacancyCount} jobs
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chart C: Top 10 In-Demand Skills */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Chart C • Skill Intelligence
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Top 10 Most In-Demand Tech Skills
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">
              Extracted and counted across all vacancy descriptions
            </p>
          </div>
          <button
            onClick={() => handleDownloadChart('chart-c', '03_top_skills.png', 'Top 10 Most In-Demand Tech Skills', 'skills')}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 rounded-xl transition shadow-sm active:scale-95"
          >
            {downloadedMap['chart-c'] ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Saved PNG</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-amber-400" />
                <span>Export 03_top_skills.png</span>
              </>
            )}
          </button>
        </div>

        {/* Chart C Horizontal Bars */}
        <div className="space-y-3 pt-2">
          {stats.top10Skills.map((item, idx) => {
            const widthPercent = Math.max(10, Math.round((item.count / maxSkillCount) * 100));
            return (
              <div key={item.skill} className="flex items-center gap-3 group">
                <div className="w-6 text-right font-mono text-xs text-slate-500 font-semibold">
                  #{idx + 1}
                </div>
                <div className="w-28 sm:w-36 text-right font-semibold text-sm text-slate-200 truncate">
                  {item.skill}
                </div>
                <div className="flex-1 bg-slate-950/60 rounded-xl h-8 p-1 flex items-center border border-slate-800 relative">
                  <div
                    style={{ width: `${widthPercent}%` }}
                    className="h-full rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 group-hover:from-amber-500 group-hover:to-amber-400 transition-all duration-300 shadow-md shadow-amber-950/40 relative overflow-hidden flex items-center justify-end px-3"
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="text-xs font-mono font-bold text-amber-950 hidden sm:inline">
                      {item.count}
                    </span>
                  </div>
                  <span className="ml-3 text-xs font-mono text-slate-400 font-medium">
                    {item.count} mentions ({item.percent}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
