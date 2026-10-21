import React, { useState, useMemo } from 'react';
import {
  BarChart3,
  FileCode2,
  FileSpreadsheet,
  Layers,
  Briefcase,
  Download,
  Terminal,
  TrendingUp,
  DollarSign,
  Cpu,
  Flame,
  Award,
} from 'lucide-react';
import { ALL_VACANCIES, computeDatasetStats, toCSV, PYTHON_ANALYZER_CODE } from './data/vacanciesData';
import { ChartsSection } from './components/ChartsSection';
import { PythonScriptTab } from './components/PythonScriptTab';
import { CsvViewerTab } from './components/CsvViewerTab';
import { InfographicTab } from './components/InfographicTab';
import { PortfolioPackTab } from './components/PortfolioPackTab';
import { downloadTextFile } from './utils/downloadHelpers';

type TabType = 'charts' | 'python' | 'dataset' | 'infographic' | 'upwork';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('charts');

  const stats = useMemo(() => computeDatasetStats(ALL_VACANCIES), []);

  const handleDownloadPy = () => {
    downloadTextFile('analyze_jobs.py', PYTHON_ANALYZER_CODE, 'text/x-python');
  };

  const handleDownloadCsv = () => {
    downloadTextFile('vacancies.csv', toCSV(ALL_VACANCIES), 'text/csv');
  };

  const highestPaying = stats.salaryByLanguage[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 text-white font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Smart Vacancy Parser & Visualizer
                </h1>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Portfolio Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Python Senior Developer & Data Analytics Suite • Pandas + Matplotlib
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={handleDownloadCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition"
              title="Download vacancies.csv (350 rows)"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>vacancies.csv</span>
            </button>
            <button
              onClick={handleDownloadPy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition"
              title="Download analyze_jobs.py"
            >
              <Download className="w-3.5 h-3.5" />
              <span>analyze_jobs.py</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* Total Vacancies */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Dataset Sample</span>
              <Terminal className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight">
              {stats.totalVacancies}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              vacancies loaded
            </div>
          </div>

          {/* Top Volume Language */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Top Demand Lang</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight flex items-baseline gap-1.5">
              {stats.topHiringLang}
              <span className="text-xs font-mono text-amber-400 font-semibold">
                {stats.languageDistribution[0]?.percent}%
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {stats.languageDistribution[0]?.count} open listings
            </div>
          </div>

          {/* Overall Average Salary */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Average Market Salary</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-emerald-400 tracking-tight">
              ${stats.overallAvgSalary.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              USD annual benchmark
            </div>
          </div>

          {/* Highest Paying Stack */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">Top Salary Stack</span>
              <TrendingUp className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-bold text-white tracking-tight flex items-baseline gap-1.5">
              {highestPaying.language}
              <span className="text-xs font-mono text-emerald-400 font-semibold">
                ${Math.round(highestPaying.avgSalary / 1000)}k
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              highest average compensation
            </div>
          </div>

          {/* #1 Core Tech Skill */}
          <div className="col-span-2 sm:col-span-1 bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium">#1 In-Demand Skill</span>
              <Award className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold text-indigo-400 tracking-tight">
              {stats.topSkill}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {stats.top10Skills[0]?.count} vacancy mentions ({stats.top10Skills[0]?.percent}%)
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('charts')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'charts'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Visual Analytics & Charts</span>
          </button>

          <button
            onClick={() => setActiveTab('python')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'python'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>Python Script (analyze_jobs.py)</span>
          </button>

          <button
            onClick={() => setActiveTab('dataset')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'dataset'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>CSV Dataset & Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('infographic')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'infographic'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Infographic Assembly (PIL / Canva / Figma)</span>
          </button>

          <button
            onClick={() => setActiveTab('upwork')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition whitespace-nowrap ${
              activeTab === 'upwork'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Upwork Portfolio Pack</span>
          </button>
        </div>

        {/* Tab Viewport */}
        <div>
          {activeTab === 'charts' && <ChartsSection stats={stats} />}
          {activeTab === 'python' && <PythonScriptTab />}
          {activeTab === 'dataset' && <CsvViewerTab />}
          {activeTab === 'infographic' && <InfographicTab stats={stats} />}
          {activeTab === 'upwork' && <PortfolioPackTab />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>
          Smart Vacancy Parser & Infographics Portfolio Studio • Python 3 • Pandas • Matplotlib • Upwork-ready
        </p>
      </footer>
    </div>
  );
}
