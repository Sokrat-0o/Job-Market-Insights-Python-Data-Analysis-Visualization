export interface Vacancy {
  id: number;
  title: string;
  language: string;
  salary_min: number;
  salary_max: number;
  skills: string;
}

export const SAMPLE_VACANCIES: Vacancy[] = [
  { id: 1, title: "Senior Python Backend Developer", language: "Python", salary_min: 120000, salary_max: 160000, skills: "Docker, PostgreSQL, FastAPI, Git, Redis, AWS" },
  { id: 2, title: "Data Analyst (Python/SQL)", language: "Python", salary_min: 75000, salary_max: 105000, skills: "Python, SQL, Pandas, Tableau, Git, PostgreSQL" },
  { id: 3, title: "Machine Learning Engineer", language: "Python", salary_min: 130000, salary_max: 185000, skills: "Python, PyTorch, Docker, Linux, SQL, AWS, MLOps" },
  { id: 4, title: "FastAPI / Django Specialist", language: "Python", salary_min: 95000, salary_max: 135000, skills: "Django, FastAPI, PostgreSQL, Redis, Docker, Celery" },
  { id: 5, title: "Data Scientist (NLP & LLMs)", language: "Python", salary_min: 140000, salary_max: 190000, skills: "Python, Transformers, PyTorch, Docker, Git, REST API" },
  { id: 6, title: "Fullstack JavaScript Engineer", language: "JavaScript", salary_min: 90000, salary_max: 130000, skills: "React, Node.js, Express, MongoDB, Git, Docker" },
  { id: 7, title: "Senior React Developer", language: "JavaScript", salary_min: 105000, salary_max: 145000, skills: "React, Redux, REST API, Git, Jest, Tailwind" },
  { id: 8, title: "Node.js Backend Developer", language: "JavaScript", salary_min: 95000, salary_max: 140000, skills: "Node.js, PostgreSQL, Redis, Docker, Microservices, Git" },
  { id: 9, title: "Lead TypeScript Developer", language: "TypeScript", salary_min: 130000, salary_max: 175000, skills: "TypeScript, React, Next.js, Node.js, GraphQL, AWS" },
  { id: 10, title: "Next.js Fullstack Engineer", language: "TypeScript", salary_min: 110000, salary_max: 150000, skills: "TypeScript, Next.js, PostgreSQL, Prisma, Docker, Git" },
  { id: 11, title: "Frontend Platform Engineer", language: "TypeScript", salary_min: 125000, salary_max: 165000, skills: "TypeScript, React, CI/CD, Jest, Git, Webpack" },
  { id: 12, title: "Golang Microservices Developer", language: "Go", salary_min: 135000, salary_max: 180000, skills: "Go, Kubernetes, Docker, gRPC, PostgreSQL, Kafka" },
  { id: 13, title: "Cloud Systems Engineer (Go)", language: "Go", salary_min: 140000, salary_max: 195000, skills: "Go, AWS, Docker, Kubernetes, Terraform, Linux" },
  { id: 14, title: "High-Load Backend Engineer (Go)", language: "Go", salary_min: 130000, salary_max: 175000, skills: "Go, Redis, PostgreSQL, Kafka, Linux, Microservices" },
  { id: 15, title: "Enterprise Java Engineer", language: "Java", salary_min: 110000, salary_max: 155000, skills: "Java, Spring Boot, PostgreSQL, Docker, Kafka, Git" },
  { id: 16, title: "Senior Java / Spring Developer", language: "Java", salary_min: 120000, salary_max: 165000, skills: "Java, Spring Boot, Microservices, Kubernetes, SQL, CI/CD" },
  { id: 17, title: "Fintech Backend Java Architect", language: "Java", salary_min: 145000, salary_max: 200000, skills: "Java, Spring Boot, Kafka, Oracle, Docker, Linux" },
  { id: 18, title: "C++ High Performance Engineer", language: "C++", salary_min: 135000, salary_max: 190000, skills: "C++, Linux, Multithreading, Git, CMake, Low-Latency" },
  { id: 19, title: "Embedded C++ Developer", language: "C++", salary_min: 100000, salary_max: 145000, skills: "C++, Linux, RTOS, Git, Microcontrollers, CMake" },
  { id: 20, title: "Game Engine Programmer (C++)", language: "C++", salary_min: 115000, salary_max: 160000, skills: "C++, OpenGL, DirectX, Math, Git, Shaders" },
  { id: 21, title: "Rust Core Protocol Engineer", language: "Rust", salary_min: 150000, salary_max: 210000, skills: "Rust, Linux, Cryptography, Git, Docker, Distributed Systems" },
  { id: 22, title: "Systems Developer (Rust)", language: "Rust", salary_min: 140000, salary_max: 195000, skills: "Rust, Linux, WebAssembly, Docker, Multithreading" },
  { id: 23, title: "Android Kotlin Engineer", language: "Kotlin", salary_min: 105000, salary_max: 150000, skills: "Kotlin, Android SDK, Jetpack Compose, Coroutines, Git, REST API" },
  { id: 24, title: "Modern Backend Engineer (Kotlin)", language: "Kotlin", salary_min: 115000, salary_max: 160000, skills: "Kotlin, Spring Boot, PostgreSQL, Docker, Microservices" },
];

// Helper to expand dataset deterministically to 350 realistic records
export function generateFullDataset(count = 350): Vacancy[] {
  const languagesConfig = [
    { name: "Python", weight: 0.28, baseMin: 90000, baseMax: 155000, titles: ["Senior Python Developer", "Python Backend Engineer", "Data Analyst", "Data Engineer", "Machine Learning Specialist", "AI Python Developer", "ETL Developer (Python)"], skills: ["Docker", "PostgreSQL", "FastAPI", "Pandas", "SQL", "Git", "Redis", "AWS", "Linux", "PyTorch"] },
    { name: "JavaScript", weight: 0.20, baseMin: 85000, baseMax: 140000, titles: ["Fullstack JS Developer", "Frontend React Engineer", "Node.js Backend Developer", "Web Application Engineer"], skills: ["React", "Node.js", "Express", "Git", "MongoDB", "REST API", "Docker", "Tailwind", "PostgreSQL"] },
    { name: "TypeScript", weight: 0.18, baseMin: 105000, baseMax: 165000, titles: ["Senior TypeScript Engineer", "Next.js Fullstack Developer", "Lead Frontend Architect", "TypeScript Platform Engineer"], skills: ["TypeScript", "React", "Next.js", "PostgreSQL", "Docker", "Git", "GraphQL", "CI/CD", "AWS"] },
    { name: "Go", weight: 0.12, baseMin: 125000, baseMax: 185000, titles: ["Golang Cloud Engineer", "Go Microservices Architect", "High-Load Backend Engineer (Go)", "Distributed Systems Go Developer"], skills: ["Go", "Kubernetes", "Docker", "gRPC", "PostgreSQL", "Kafka", "Linux", "Redis", "AWS"] },
    { name: "Java", weight: 0.10, baseMin: 100000, baseMax: 160000, titles: ["Java Spring Boot Developer", "Senior Enterprise Java Engineer", "Fintech Java Developer", "Backend Java Engineer"], skills: ["Java", "Spring Boot", "PostgreSQL", "Docker", "Kafka", "Microservices", "Git", "Kubernetes", "CI/CD"] },
    { name: "C++", weight: 0.05, baseMin: 110000, baseMax: 175000, titles: ["C++ Systems Programmer", "Game Developer (C++)", "Low-Latency C++ Engineer", "Robotics C++ Specialist"], skills: ["C++", "Linux", "Git", "Multithreading", "CMake", "Docker", "Algorithms"] },
    { name: "Rust", weight: 0.04, baseMin: 135000, baseMax: 205000, titles: ["Rust Systems Engineer", "Core Blockchain Developer (Rust)", "Rust Infrastructure Specialist"], skills: ["Rust", "Linux", "Docker", "Git", "Multithreading", "WebAssembly", "PostgreSQL"] },
    { name: "Kotlin", weight: 0.03, baseMin: 95000, baseMax: 150000, titles: ["Android Developer (Kotlin)", "Kotlin Backend Specialist", "Mobile App Engineer"], skills: ["Kotlin", "Android SDK", "Jetpack Compose", "Git", "REST API", "Docker", "PostgreSQL"] },
  ];

  const results: Vacancy[] = [];
  let id = 1;

  for (let i = 0; i < count; i++) {
    // Pick language by weighted probability
    const rand = (Math.sin(i * 9973 + 123) + 1) / 2; // deterministic pseudo-random
    let accumulated = 0;
    let chosenLang = languagesConfig[0];
    for (const conf of languagesConfig) {
      accumulated += conf.weight;
      if (rand <= accumulated) {
        chosenLang = conf;
        break;
      }
    }

    const titleIdx = Math.floor(Math.abs(Math.sin(i * 3571) * chosenLang.titles.length));
    const title = chosenLang.titles[titleIdx];

    const salaryVariance = Math.sin(i * 1237) * 22000;
    const salaryMin = Math.round((chosenLang.baseMin + salaryVariance) / 1000) * 1000;
    const spread = 25000 + Math.round(Math.abs(Math.cos(i * 411)) * 30000 / 1000) * 1000;
    const salaryMax = salaryMin + spread;

    // Pick 4 to 6 skills deterministically
    const skillCount = 4 + Math.floor(Math.abs(Math.sin(i * 811)) * 3);
    const shuffledSkills = [...chosenLang.skills];
    // Simple deterministic shuffle
    for (let j = shuffledSkills.length - 1; j > 0; j--) {
      const k = Math.floor(Math.abs(Math.sin(i * 577 + j * 13)) * (j + 1));
      [shuffledSkills[j], shuffledSkills[k]] = [shuffledSkills[k], shuffledSkills[j]];
    }
    const selectedSkills = Array.from(new Set(shuffledSkills.slice(0, skillCount))).join(", ");

    results.push({
      id: id++,
      title,
      language: chosenLang.name,
      salary_min: Math.max(50000, salaryMin),
      salary_max: Math.max(salaryMin + 15000, salaryMax),
      skills: selectedSkills,
    });
  }

  return results;
}

export const ALL_VACANCIES: Vacancy[] = generateFullDataset(350);

export function computeDatasetStats(vacancies: Vacancy[]) {
  const languageCounts: Record<string, number> = {};
  const languageSalarySums: Record<string, { sum: number; count: number }> = {};
  const skillCounts: Record<string, number> = {};

  let totalSalarySum = 0;

  vacancies.forEach((v) => {
    // 1. Language count
    languageCounts[v.language] = (languageCounts[v.language] || 0) + 1;

    // 2. Average salary
    const avgSalary = (v.salary_min + v.salary_max) / 2;
    totalSalarySum += avgSalary;

    if (!languageSalarySums[v.language]) {
      languageSalarySums[v.language] = { sum: 0, count: 0 };
    }
    languageSalarySums[v.language].sum += avgSalary;
    languageSalarySums[v.language].count += 1;

    // 3. Skills
    if (v.skills) {
      v.skills.split(",").forEach((s) => {
        const cleanSkill = s.trim();
        if (cleanSkill) {
          skillCounts[cleanSkill] = (skillCounts[cleanSkill] || 0) + 1;
        }
      });
    }
  });

  // Sort language counts descending
  const languageDistribution = Object.entries(languageCounts)
    .map(([lang, count]) => ({
      language: lang,
      count,
      percent: Number(((count / vacancies.length) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.count - a.count);

  // Sort average salary descending
  const salaryByLanguage = Object.entries(languageSalarySums)
    .map(([lang, data]) => ({
      language: lang,
      avgSalary: Math.round(data.sum / data.count),
      vacancyCount: data.count,
    }))
    .sort((a, b) => b.avgSalary - a.avgSalary);

  // Top 10 skills
  const top10Skills = Object.entries(skillCounts)
    .map(([skill, count]) => ({
      skill,
      count,
      percent: Number(((count / vacancies.length) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const overallAvgSalary = Math.round(totalSalarySum / (vacancies.length || 1));
  const topHiringLang = languageDistribution[0]?.language || "Python";
  const topSkill = top10Skills[0]?.skill || "Docker";

  return {
    totalVacancies: vacancies.length,
    overallAvgSalary,
    topHiringLang,
    topSkill,
    languageDistribution,
    salaryByLanguage,
    top10Skills,
  };
}

export function toCSV(vacancies: Vacancy[]): string {
  const header = "title,language,salary_min,salary_max,skills\n";
  const rows = vacancies.map((v) => {
    const escapedTitle = v.title.includes(",") ? `"${v.title}"` : v.title;
    const escapedSkills = v.skills.includes(",") ? `"${v.skills}"` : v.skills;
    return `${escapedTitle},${v.language},${v.salary_min},${v.salary_max},${escapedSkills}`;
  });
  return header + rows.join("\n");
}

export const PYTHON_ANALYZER_CODE = `"""
Smart Vacancy Parser & Market Analytics
Analyzes tech job market vacancies from CSV, calculates statistics, and builds 3 clean charts.
Usage: python analyze_jobs.py
Requirements: pip install pandas matplotlib
"""

import pandas as pd
import matplotlib.pyplot as plt

# 1. Load job vacancies data
df = pd.read_csv('vacancies.csv')

# 2. Metric 1: Count of vacancies by programming language
lang_counts = df['language'].value_counts()

# 3. Metric 2: Average salary by programming language
df['salary_avg'] = (df['salary_min'] + df['salary_max']) / 2
salary_by_lang = df.groupby('language')['salary_avg'].mean().sort_values(ascending=False)

# 4. Metric 3: Top-10 most in-demand skills
# Split comma-separated skills, flatten the list, and count frequencies
all_skills = df['skills'].dropna().str.split(',').explode().str.strip()
top_skills = all_skills.value_counts().head(10)

# Configure clean visual styling
plt.style.use('seaborn-v0_8-whitegrid' if 'seaborn-v0_8-whitegrid' in plt.style.available else 'default')
fig_width, fig_height = 9, 5

# --- Chart A: Vacancies by Language ---
plt.figure(figsize=(fig_width, fig_height))
bars_a = plt.bar(lang_counts.index, lang_counts.values, color='#4F46E5', edgecolor='#3730A3', width=0.6)
plt.title('Job Openings by Programming Language', fontsize=14, fontweight='bold', pad=15)
plt.xlabel('Programming Language', fontsize=11, labelpad=8)
plt.ylabel('Number of Vacancies', fontsize=11, labelpad=8)
plt.xticks(rotation=20, ha='right')
plt.bar_label(bars_a, padding=3, fontweight='semibold')
plt.tight_layout()
plt.savefig('01_vacancies_by_language.png', dpi=300)
plt.close()

# --- Chart B: Average Salary by Language ---
plt.figure(figsize=(fig_width, fig_height))
bars_b = plt.bar(salary_by_lang.index, salary_by_lang.values, color='#059669', edgecolor='#047857', width=0.6)
plt.title('Average Tech Salary by Language (USD)', fontsize=14, fontweight='bold', pad=15)
plt.xlabel('Programming Language', fontsize=11, labelpad=8)
plt.ylabel('Average Salary ($)', fontsize=11, labelpad=8)
plt.xticks(rotation=20, ha='right')
plt.bar_label(bars_b, fmt=lambda x: f'\${int(x):,}', padding=3, fontweight='semibold')
plt.tight_layout()
plt.savefig('02_salary_by_language.png', dpi=300)
plt.close()

# --- Chart C: Top 10 In-Demand Skills ---
plt.figure(figsize=(fig_width, fig_height))
bars_c = plt.barh(top_skills.index[::-1], top_skills.values[::-1], color='#D97706', edgecolor='#B45309', height=0.65)
plt.title('Top 10 Most In-Demand Tech Skills', fontsize=14, fontweight='bold', pad=15)
plt.xlabel('Frequency Across Vacancies', fontsize=11, labelpad=8)
plt.ylabel('Skill', fontsize=11, labelpad=8)
plt.bar_label(bars_c, padding=3, fontweight='semibold')
plt.tight_layout()
plt.savefig('03_top_skills.png', dpi=300)
plt.close()

print('Done! Generated 3 charts:')
print(' - 01_vacancies_by_language.png')
print(' - 02_salary_by_language.png')
print(' - 03_top_skills.png')
`;

export const PYTHON_GENERATOR_CODE = `"""
Synthetic Vacancy CSV Generator
Creates a realistic 350-row tech vacancy dataset for portfolio analytics.
Usage: python generate_data.py
Output: vacancies.csv
"""

import csv
import random

languages_config = [
    {
        "name": "Python",
        "weight": 28,
        "base_min": 90000,
        "titles": ["Senior Python Developer", "Python Backend Engineer", "Data Analyst", "Data Engineer", "Machine Learning Specialist", "AI Python Developer", "ETL Developer (Python)"],
        "skills": ["Docker", "PostgreSQL", "FastAPI", "Pandas", "SQL", "Git", "Redis", "AWS", "Linux", "PyTorch"]
    },
    {
        "name": "JavaScript",
        "weight": 20,
        "base_min": 85000,
        "titles": ["Fullstack JS Developer", "Frontend React Engineer", "Node.js Backend Developer", "Web Application Engineer"],
        "skills": ["React", "Node.js", "Express", "Git", "MongoDB", "REST API", "Docker", "Tailwind", "PostgreSQL"]
    },
    {
        "name": "TypeScript",
        "weight": 18,
        "base_min": 105000,
        "titles": ["Senior TypeScript Engineer", "Next.js Fullstack Developer", "Lead Frontend Architect", "TypeScript Platform Engineer"],
        "skills": ["TypeScript", "React", "Next.js", "PostgreSQL", "Docker", "Git", "GraphQL", "CI/CD", "AWS"]
    },
    {
        "name": "Go",
        "weight": 12,
        "base_min": 125000,
        "titles": ["Golang Cloud Engineer", "Go Microservices Architect", "High-Load Backend Engineer (Go)", "Distributed Systems Go Developer"],
        "skills": ["Go", "Kubernetes", "Docker", "gRPC", "PostgreSQL", "Kafka", "Linux", "Redis", "AWS"]
    },
    {
        "name": "Java",
        "weight": 10,
        "base_min": 100000,
        "titles": ["Java Spring Boot Developer", "Senior Enterprise Java Engineer", "Fintech Java Developer", "Backend Java Engineer"],
        "skills": ["Java", "Spring Boot", "PostgreSQL", "Docker", "Kafka", "Microservices", "Git", "Kubernetes", "CI/CD"]
    },
    {
        "name": "C++",
        "weight": 5,
        "base_min": 110000,
        "titles": ["C++ Systems Programmer", "Game Developer (C++)", "Low-Latency C++ Engineer", "Robotics C++ Specialist"],
        "skills": ["C++", "Linux", "Git", "Multithreading", "CMake", "Docker", "Algorithms"]
    },
    {
        "name": "Rust",
        "weight": 4,
        "base_min": 135000,
        "titles": ["Rust Systems Engineer", "Core Blockchain Developer (Rust)", "Rust Infrastructure Specialist"],
        "skills": ["Rust", "Linux", "Docker", "Git", "Multithreading", "WebAssembly", "PostgreSQL"]
    },
    {
        "name": "Kotlin",
        "weight": 3,
        "base_min": 95000,
        "titles": ["Android Developer (Kotlin)", "Kotlin Backend Specialist", "Mobile App Engineer"],
        "skills": ["Kotlin", "Android SDK", "Jetpack Compose", "Git", "REST API", "Docker", "PostgreSQL"]
    }
]

population = []
weights = []
for item in languages_config:
    population.append(item)
    weights.append(item["weight"])

TOTAL_ROWS = 350
rows = []

for _ in range(TOTAL_ROWS):
    cfg = random.choices(population, weights=weights, k=1)[0]
    title = random.choice(cfg["titles"])
    
    # Salary calculation with realistic bounds
    variance = random.randint(-20000, 30000)
    salary_min = max(55000, round((cfg["base_min"] + variance) / 1000) * 1000)
    spread = random.randint(25000, 55000)
    salary_max = salary_min + round(spread / 1000) * 1000
    
    # Pick 4-6 random skills from pool
    num_skills = random.randint(4, 6)
    skills = ", ".join(random.sample(cfg["skills"], min(num_skills, len(cfg["skills"]))))
    
    rows.append({
        "title": title,
        "language": cfg["name"],
        "salary_min": salary_min,
        "salary_max": salary_max,
        "skills": skills
    })

# Write to vacancies.csv
with open('vacancies.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=["title", "language", "salary_min", "salary_max", "skills"])
    writer.writeheader()
    writer.writerows(rows)

print(f"Generated vacancies.csv with {len(rows)} realistic records!")
`;

export const PYTHON_PIL_STITCHER_CODE = `"""
Infographic Stitcher with Python Pillow (PIL)
Combines the 3 generated charts into a unified, high-res portfolio infographic poster.
Usage: python combine_infographic.py
Requirements: pip install pillow
Output: job_market_infographic.png
"""

from PIL import Image, ImageDraw, ImageFont
import os

# 1. Load generated charts
img1 = Image.open('01_vacancies_by_language.png')
img2 = Image.open('02_salary_by_language.png')
img3 = Image.open('03_top_skills.png')

# 2. Resize to a uniform width while maintaining aspect ratio
target_w = 1200
def resize_w(im, width):
    w, h = im.size
    new_h = int(h * (width / w))
    return im.resize((width, new_h), Image.Resampling.LANCZOS)

im1 = resize_w(img1, target_w)
im2 = resize_w(img2, target_w)
im3 = resize_w(img3, target_w)

# 3. Canvas dimensions
header_h = 160
padding = 30
footer_h = 60
total_h = header_h + im1.height + im2.height + im3.height + (padding * 4) + footer_h
total_w = target_w + (padding * 2)

# 4. Create background canvas (dark sleek palette)
canvas = Image.new('RGB', (total_w, total_h), color='#0F172A')
draw = ImageDraw.Draw(canvas)

# 5. Draw Header
draw.rectangle([(0, 0), (total_w, header_h)], fill='#1E293B')
draw.text((padding, 40), "TECH VACANCY MARKET REPORT", fill='#FFFFFF')
draw.text((padding, 85), "Analysis of 350+ software engineering listings: languages, salaries, and key skills", fill='#94A3B8')

# 6. Paste charts
curr_y = header_h + padding
for img in [im1, im2, im3]:
    canvas.paste(img, (padding, curr_y))
    curr_y += img.height + padding

# 7. Draw Footer watermark
draw.text((padding, curr_y), "Data Analytics Portfolio Project • Python + Pandas + Matplotlib", fill='#64748B')

# 8. Save output
canvas.save('job_market_infographic.png', quality=95)
print("Infographic created successfully: job_market_infographic.png")
`;
