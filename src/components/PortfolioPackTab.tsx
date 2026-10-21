import React, { useState } from 'react';
import { Copy, Check, Briefcase, FileText, Send, Star, Tag, CheckCircle2 } from 'lucide-react';
import { downloadTextFile } from '../utils/downloadHelpers';

export const PortfolioPackTab: React.FC = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const upworkShortDescription = `Automated end-to-end tech job market analytics pipeline developed in Python to extract compensation trends and in-demand skills from software engineering listings. Leveraged Pandas for vectorized data cleaning, salary normalization, and skill tag extraction across 350+ records. Designed high-resolution, publication-ready visual infographics using Matplotlib to benchmark salaries by language and identify critical technology requirements. Delivered clean, modular code ready for automated cron scraping and executive market reporting.`;

  const clientPitchProposal = `Hi! I saw your project regarding Python data collection and market analytics. 

I recently developed an automated vacancy analysis pipeline that extracts compensation distributions and in-demand tech skills from 350+ job listings using Python and Pandas. The system calculates vectorized salary benchmarks, explodes multi-value skill tags, and generates clean, publication-ready infographics using Matplotlib and Pillow.

I can deliver:
1. Robust Python scraping/parsing scripts with clean error handling and proxy support.
2. Structured datasets exported to CSV, JSON, or PostgreSQL.
3. Executive summary dashboards and infographic charts tailored for client presentations.

I can start right away and share sample outputs within 24 hours. Looking forward to discussing your exact data requirements!`;

  const githubReadme = `# 📊 Smart Tech Vacancy Analytics & Visualizer

A modular Python data pipeline for analyzing software engineering job openings, calculating compensation benchmarks, and generating publication-ready infographics.

![Python](https://img.shields.io/badge/Python-3.9%2B-blue?logo=python)
![Pandas](https://img.shields.io/badge/Pandas-2.0%2B-150458?logo=pandas)
![Matplotlib](https://img.shields.io/badge/Matplotlib-Visualization-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🎯 Key Capabilities
- **Fast Ingestion:** Vectorized loading and preprocessing of 350+ vacancy records.
- **Salary Benchmarking:** Computes mean compensation by language using vectorized midpoints.
- **Skill Extraction:** Explodes and frequency-ranks multi-value tech tags (Docker, SQL, AWS, FastAPI).
- **Publication Charts:** Generates 300 DPI figures with automatic value labels.
- **Automated Infographic Stitcher:** Stitches multiple plots into a client-ready poster with Pillow.

---

## 🚀 Quick Start

\`\`\`bash
# 1. Clone repository
git clone https://github.com/yourusername/job-market-analytics.git
cd job-market-analytics

# 2. Install dependencies
pip install pandas matplotlib pillow

# 3. Generate sample dataset (optional)
python generate_data.py

# 4. Run analytics and generate charts
python analyze_jobs.py

# 5. (Optional) Combine charts into a single infographic
python combine_infographic.py
\`\`\`

---

## 📁 Generated Outputs
- \`01_vacancies_by_language.png\` — Volume breakdown across tech stacks.
- \`02_salary_by_language.png\` — Mean salary comparison in USD.
- \`03_top_skills.png\` — Top 10 in-demand technologies.
- \`job_market_infographic.png\` — Full combined portfolio poster.

---

## 💼 Upwork & Freelance Inquiries
Looking for custom web scrapers, data processing pipelines, or executive data visualization? Feel free to reach out via Upwork!
`;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-900/40 rounded-2xl p-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          Upwork & Freelance Client Kit
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          Ready-to-Use Portfolio Assets for Upwork & GitHub
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Everything you need to publish this project on Upwork, LinkedIn, and GitHub in under 10 minutes.
        </p>
      </div>

      {/* Upwork Portfolio Description Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Star className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">
              Upwork Portfolio Item Description (3–4 Sentences)
            </h3>
          </div>
          <button
            onClick={() => copyToClipboard(upworkShortDescription, 'upwork-desc')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            {copiedSection === 'upwork-desc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
            <span>Copy Text</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-300 leading-relaxed font-sans">
          {upworkShortDescription}
        </div>

        {/* Upwork Tags */}
        <div className="pt-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-400" />
            Recommended Upwork Skills & Tags:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              'Python',
              'Pandas',
              'Data Visualization',
              'Matplotlib',
              'Data Extraction',
              'Web Scraping',
              'Exploratory Data Analysis',
              'ETL Pipeline',
              'Infographics',
              'Data Analysis',
            ].map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Upwork Cover Letter Proposal Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Send className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              High-Converting Freelance Cover Letter / Proposal
            </h3>
          </div>
          <button
            onClick={() => copyToClipboard(clientPitchProposal, 'proposal')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            {copiedSection === 'proposal' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
            <span>Copy Proposal</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
          {clientPitchProposal}
        </div>
      </div>

      {/* GitHub README.md */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              Full GitHub README.md
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(githubReadme, 'readme')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              {copiedSection === 'readme' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
              <span>Copy Markdown</span>
            </button>
            <button
              onClick={() => downloadTextFile('README.md', githubReadme, 'text/markdown')}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
            >
              Download README.md
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 max-h-72 overflow-y-auto whitespace-pre-wrap">
          {githubReadme}
        </div>
      </div>
    </div>
  );
};
