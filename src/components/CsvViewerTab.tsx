import React, { useState } from 'react';
import { Download, Copy, Check, Search, FileSpreadsheet, Code2, Database } from 'lucide-react';
import { ALL_VACANCIES, Vacancy, toCSV, PYTHON_GENERATOR_CODE } from '../data/vacanciesData';
import { downloadTextFile } from '../utils/downloadHelpers';

export const CsvViewerTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'preview' | 'generator'>('preview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [copiedCsv, setCopiedCsv] = useState(false);
  const [copiedGen, setCopiedGen] = useState(false);

  const languages = ['All', 'Python', 'JavaScript', 'TypeScript', 'Go', 'Java', 'C++', 'Rust', 'Kotlin'];

  const filteredVacancies = ALL_VACANCIES.filter((v) => {
    const matchesLang = selectedLanguage === 'All' || v.language === selectedLanguage;
    const matchesSearch =
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.skills.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLang && matchesSearch;
  });

  const handleDownloadCsv = () => {
    const csvContent = toCSV(ALL_VACANCIES);
    downloadTextFile('vacancies.csv', csvContent, 'text/csv');
  };

  const handleCopyCsvFirst10 = () => {
    const csv10 = toCSV(ALL_VACANCIES.slice(0, 10));
    navigator.clipboard.writeText(csv10);
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2000);
  };

  const handleCopyGenerator = () => {
    navigator.clipboard.writeText(PYTHON_GENERATOR_CODE);
    setCopiedGen(true);
    setTimeout(() => setCopiedGen(false), 2000);
  };

  const handleDownloadGenerator = () => {
    downloadTextFile('generate_data.py', PYTHON_GENERATOR_CODE, 'text/x-python');
  };

  return (
    <div className="space-y-6">
      {/* Sub tabs & Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('preview')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeSubTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Dataset Preview (vacancies.csv)</span>
          </button>
          <button
            onClick={() => setActiveSubTab('generator')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
              activeSubTab === 'generator'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Python Generator (generate_data.py)</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {activeSubTab === 'preview' ? (
            <>
              <button
                onClick={handleCopyCsvFirst10}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                {copiedCsv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
                <span>Copy 10 Rows</span>
              </button>
              <button
                onClick={handleDownloadCsv}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Full CSV (350 rows)</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCopyGenerator}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                {copiedGen ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
                <span>Copy Generator Code</span>
              </button>
              <button
                onClick={handleDownloadGenerator}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download generate_data.py</span>
              </button>
            </>
          )}
        </div>
      </div>

      {activeSubTab === 'preview' ? (
        <div className="space-y-4">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search titles or skills (e.g. Docker, FastAPI)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                    selectedLanguage === lang
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800/60'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto max-h-[520px]">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-900/90 text-slate-400 font-mono text-xs uppercase tracking-wider border-b border-slate-800 sticky top-0 z-10">
                    <th className="py-3 px-4 w-14">#</th>
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Language</th>
                    <th className="py-3 px-4">Salary Min</th>
                    <th className="py-3 px-4">Salary Max</th>
                    <th className="py-3 px-4">Avg Salary</th>
                    <th className="py-3 px-4">Skills</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredVacancies.slice(0, 100).map((row, idx) => {
                    const avg = Math.round((row.salary_min + row.salary_max) / 2);
                    const isFirstTen = row.id <= 10;
                    return (
                      <tr
                        key={row.id}
                        className={`hover:bg-slate-900/50 transition-colors ${
                          isFirstTen ? 'bg-indigo-950/20' : ''
                        }`}
                      >
                        <td className="py-2.5 px-4 font-mono text-xs text-slate-500">
                          {row.id}
                        </td>
                        <td className="py-2.5 px-4 font-medium text-white">
                          {row.title}
                        </td>
                        <td className="py-2.5 px-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700/60">
                            {row.language}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 font-mono text-xs text-emerald-400">
                          ${row.salary_min.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-xs text-emerald-400">
                          ${row.salary_max.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-xs font-semibold text-emerald-300">
                          ${avg.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-4 text-xs text-slate-400">
                          <div className="flex flex-wrap gap-1">
                            {row.skills.split(',').map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[11px]"
                              >
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>
                Showing {Math.min(100, filteredVacancies.length)} of {filteredVacancies.length} vacancies
                (Total dataset: 350 rows)
              </span>
              <span className="text-slate-500 font-mono">
                vacancies.csv • UTF-8 Encoded
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Generator Tab */
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-mono text-xs text-slate-400 font-medium">generate_data.py</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Generates 350 realistic records</span>
          </div>

          <div className="p-4 sm:p-6 overflow-x-auto text-sm font-mono leading-relaxed max-h-[600px] overflow-y-auto">
            <pre className="text-slate-300">
              {PYTHON_GENERATOR_CODE.split('\n').map((line, idx) => (
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
      )}
    </div>
  );
};
