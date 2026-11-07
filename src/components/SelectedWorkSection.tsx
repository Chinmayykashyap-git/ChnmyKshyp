'use client';

import React, { useState } from 'react';
import {
  ArrowUpRight,
  GitBranch,
  Globe,
  Sliders,
  BarChart3,
  AlertCircle,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/content/portfolio';

interface SelectedWorkSectionProps {
  onOpenCaseStudy: () => void;
}

export function SelectedWorkSection({ onOpenCaseStudy }: SelectedWorkSectionProps) {
  const primaryProjects = PORTFOLIO_DATA.projects.filter((p) => p.tier === 'primary');
  const secondaryProjects = PORTFOLIO_DATA.projects.filter((p) => p.tier === 'secondary');
  const cs = PORTFOLIO_DATA.caseStudy;
  const [importanceView, setImportanceView] = useState<'empirical' | 'synthetic'>('empirical');

  return (
    <>
      {/* SECTION 03: SELECTED WORK */}
      <section id="work" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 border-b pb-8 lg:flex-row lg:items-end">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-periwinkle-300">
              03 / SELECTED WORK
            </div>
            <h2 className="mt-3 font-display text-3xl font-light tracking-tight sm:text-5xl">
              Curated systems, products, and applied machine learning.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs opacity-70">
            Ordered by primary engineering depth: CompanyQ, D.O.O.M, and FinSight Risk Engine, followed by research and cloud infrastructure deliverables.
          </p>
        </div>

        {/* TOP 3 FLAGSHIP PROJECTS (CompanyQ -> D.O.O.M -> FinSight Risk Engine) */}
        <div className="mt-12 space-y-10">
          {primaryProjects.map((project, idx) => (
            <article
              key={project.id}
              className="glass-card overflow-hidden rounded-2xl p-6 transition duration-300 hover:border-periwinkle-300/45 sm:p-8 lg:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                {/* Left 7 Cols: Problem, Description, Impact & Links */}
                <div className={`lg:col-span-7 ${idx === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-periwinkle-300">
                        {project.number}
                      </span>
                      <span className="h-3.5 w-px bg-current opacity-25" />
                      <span className="rounded-md border bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider">
                        {project.projectType}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F4F8] px-4 py-1.5 font-mono text-xs font-medium text-slate-950 transition hover:bg-white"
                        >
                          <Globe className="h-3.5 w-3.5" />
                          <span>{project.liveLabel || 'Live Site'}</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs transition hover:border-periwinkle-300/50 hover:bg-white/[0.1]"
                        >
                          <GitBranch className="h-3.5 w-3.5" />
                          <span>Repository</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-normal tracking-tight sm:text-4xl">
                    {project.title}
                  </h3>

                  {/* Problem Statement */}
                  <div className="mt-5 border-l-2 border-periwinkle-300/45 pl-4">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-periwinkle-300">
                      Problem Statement
                    </div>
                    <p className="mt-1 text-sm leading-relaxed opacity-85">
                      {project.problemStatement}
                    </p>
                  </div>

                  {/* Implementation Description */}
                  <p className="mt-4 text-sm leading-relaxed opacity-85 sm:text-base">
                    {project.description}
                  </p>

                  {/* Measurable Outcome */}
                  <div className="mt-5 rounded-xl border border-periwinkle-300/20 bg-periwinkle-400/[0.06] px-4 py-3 text-xs leading-relaxed sm:text-sm">
                    <span className="font-mono text-xs uppercase tracking-wider text-periwinkle-300">
                      Outcome:{' '}
                    </span>
                    <span className="font-medium">{project.impactStatement}</span>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] opacity-85"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right 5 Cols: Verified Metrics & System Architecture Dossier */}
                <div
                  className={`rounded-xl border bg-slate-950/50 p-5 text-slate-100 sm:p-6 lg:col-span-5 ${
                    idx === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="font-mono text-[11px] uppercase tracking-widest text-periwinkle-300">
                    VERIFIED BENCHMARKS &amp; ARCHITECTURE
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2.5"
                      >
                        <div className="font-mono text-base font-semibold text-white">
                          {m.value}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] text-slate-400">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {project.architectureSteps && (
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                        System Design
                      </div>
                      <ol className="mt-2.5 space-y-2 font-mono text-xs text-slate-300">
                        {project.architectureSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                            <span className="text-periwinkle-300">0{i + 1}</span>
                            <span className="font-sans text-xs text-slate-200">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* SECONDARY TIER: 3 DISTINCT RESEARCH & CLOUD INFRASTRUCTURE DELIVERABLES */}
        <div className="mt-16">
          <div className="flex flex-col justify-between gap-2 border-b pb-4 sm:flex-row sm:items-end">
            <h3 className="font-display text-xl font-normal tracking-tight sm:text-2xl">
              Additional Engineering &amp; Research Deliverables
            </h3>
            <span className="font-mono text-xs opacity-65">
              Independent repositories &amp; cloud pipelines (04 – 06)
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {secondaryProjects.map((project) => (
              <article
                key={project.id}
                className="glass-card flex flex-col justify-between rounded-2xl p-6 transition hover:border-periwinkle-300/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-periwinkle-300">
                        {project.number}
                      </span>
                      <span className="rounded border bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider">
                        {project.projectType}
                      </span>
                    </div>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-mono text-xs text-periwinkle-300 hover:underline"
                      >
                        Repo <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>

                  <h4 className="mt-3 font-display text-xl font-normal">{project.title}</h4>

                  <p className="mt-2 text-xs leading-relaxed opacity-75">
                    <strong className="font-mono uppercase text-periwinkle-300">Problem: </strong>
                    {project.problemStatement}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed opacity-85">{project.description}</p>

                  <div className="mt-4 rounded-lg border bg-white/[0.025] p-3 text-xs">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-periwinkle-300">
                      Impact:{' '}
                    </span>
                    {project.impactStatement}
                  </div>
                </div>

                <div className="mt-5 border-t pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] opacity-80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.hasCaseStudy && (
                    <button
                      type="button"
                      onClick={onOpenCaseStudy}
                      className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-medium text-periwinkle-300 hover:underline"
                    >
                      <Sliders className="h-3.5 w-3.5" />
                      Open Interactive Simulator →
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* IMMERSIVE FLAGSHIP CASE STUDY: PROBLEM -> DATA -> FEATURE ENGINEERING -> MODEL -> EXPLAINABILITY -> EVALUATION -> RESULT */}
      <section id="case-study" className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="glass-card overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col justify-between gap-6 border-b pb-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-periwinkle-300">
                {cs.eyebrow}
              </div>
              <h2 className="mt-3 font-display text-3xl font-light tracking-tight sm:text-5xl">
                {cs.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed opacity-85 sm:text-base">{cs.subtitle}</p>
            </div>

            <button
              type="button"
              onClick={onOpenCaseStudy}
              className="inline-flex items-center gap-2 self-start rounded-full bg-[#F3F4F8] px-5 py-2.5 font-mono text-xs font-medium text-slate-950 transition hover:bg-white lg:self-auto"
            >
              <Sliders className="h-4 w-4 text-periwinkle-700" />
              Open Interactive Risk Simulator
            </button>
          </div>

          {/* 7-Stage Pipeline Walkthrough (Problem -> Data -> Feature Engineering -> Model -> Explainability -> Evaluation -> Result) */}
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cs.stages.map((stage) => (
              <div
                key={stage.step}
                className={`rounded-2xl border bg-white/[0.025] p-5 ${
                  stage.step === '06' ? 'md:col-span-2 lg:col-span-2 border-periwinkle-300/35' : ''
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-periwinkle-300">
                  <span>{stage.step}</span>
                  <span>/</span>
                  <span className="uppercase tracking-wider">{stage.name}</span>
                </div>
                <h3 className="mt-2 font-display text-lg font-medium">{stage.title}</h3>
                <p className="mt-2 text-xs leading-relaxed opacity-85 sm:text-sm">
                  {stage.summary}
                </p>
              </div>
            ))}
          </div>

          {/* Evaluation Table & Feature Importance Visualization */}
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            {/* Left 7 Cols: Verified Model Evaluation Table (Precision, Recall, F1, ROC-AUC) */}
            <div className="rounded-2xl border bg-slate-950/55 p-5 text-slate-100 sm:p-6 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-periwinkle-300">
                    VERIFIED TEST-SET EVALUATION (n = 1,364 · 44 BANKRUPTCIES)
                  </span>
                  <h3 className="mt-1 font-display text-xl font-normal text-white">
                    Why Accuracy Alone Is Misleading Under 3.23% Class Imbalance
                  </h3>
                </div>
                <AlertCircle className="h-5 w-5 text-amber-300" />
              </div>

              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                In the 6,819-company dataset, 6,599 firms are solvent (96.77%). A classifier that predicts &ldquo;solvent&rdquo; for every company gets 96.77% accuracy with 0% recall. Evaluation must track minority-class recall, precision, F1, and ROC-AUC:
              </p>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-white/15 text-[10px] uppercase tracking-wider text-slate-400">
                      <th className="pb-2.5 pr-3">Model</th>
                      <th className="pb-2.5 px-2">Acc</th>
                      <th className="pb-2.5 px-2">ROC-AUC</th>
                      <th className="pb-2.5 px-2">Recall (Class 1)</th>
                      <th className="pb-2.5 px-2">Prec</th>
                      <th className="pb-2.5 pl-2">F1</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {cs.evaluationTable.map((row) => {
                      const isSelected = row.model.includes('Selected');
                      return (
                        <tr
                          key={row.model}
                          className={isSelected ? 'bg-periwinkle-400/15 text-white font-semibold' : 'text-slate-300'}
                        >
                          <td className="py-3 pr-3 font-sans text-xs">{row.model}</td>
                          <td className="py-3 px-2">{row.accuracy}</td>
                          <td className="py-3 px-2 text-periwinkle-200">{row.rocAuc}</td>
                          <td className="py-3 px-2 text-emerald-300">{row.bankruptcyRecall}</td>
                          <td className="py-3 px-2">{row.bankruptcyPrecision}</td>
                          <td className="py-3 pl-2">{row.bankruptcyF1}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3 font-mono text-[11px] text-slate-300">
                Synthetic 5-Feature Holdout (`n = 2,000` test records: `798` Low, `991` Medium, `211` High): Random Forest (`200` trees) recovers the deterministic threshold rule at `1.0000` precision, recall, and F1.
              </div>
            </div>

            {/* Right 5 Cols: Interactive Feature Attribution Switcher */}
            <div className="rounded-2xl border bg-slate-950/55 p-5 text-slate-100 sm:p-6 lg:col-span-5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-periwinkle-300">
                    FEATURE ATTRIBUTION ANALYSIS
                  </span>
                  <h3 className="mt-1 font-display text-lg font-normal text-white">
                    {importanceView === 'empirical'
                      ? 'Verified Top Bankruptcy Correlations (n = 6,819)'
                      : '5-Feature Gini Split Attribution (Illustrative)'}
                  </h3>
                </div>
                <BarChart3 className="h-5 w-5 text-periwinkle-300" />
              </div>

              {/* Toggle between Verified Empirical Correlations & 5-Feature Synthetic Gini */}
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setImportanceView('empirical')}
                  className={`rounded-lg px-3 py-1.5 font-mono text-[11px] transition ${
                    importanceView === 'empirical'
                      ? 'bg-periwinkle-200 text-slate-950 font-semibold'
                      : 'border border-white/15 bg-white/5 text-slate-300'
                  }`}
                >
                  Verified Correlations (95 Ratios)
                </button>
                <button
                  type="button"
                  onClick={() => setImportanceView('synthetic')}
                  className={`rounded-lg px-3 py-1.5 font-mono text-[11px] transition ${
                    importanceView === 'synthetic'
                      ? 'bg-periwinkle-200 text-slate-950 font-semibold'
                      : 'border border-white/15 bg-white/5 text-slate-300'
                  }`}
                >
                  5-Feature RF Split Share
                </button>
              </div>

              {importanceView === 'empirical' ? (
                <div className="mt-5 space-y-3">
                  {cs.empiricalCorrelations.map((item) => (
                    <div key={item.feature}>
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-slate-200">{item.feature}</span>
                        <span className="text-periwinkle-200">r = +{item.correlation.toFixed(4)}</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-periwinkle-500 to-periwinkle-200"
                          style={{ width: `${Math.round((item.correlation / 0.26) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <p className="pt-2 font-mono text-[11px] leading-relaxed text-slate-400">
                    Exact Pearson correlations (`df.corr()[&quot;Bankrupt?&quot;]`) extracted from `FinSight_Risk_Engine.ipynb`.
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-3">
                  {cs.illustrativeGiniFeatures.map((item) => (
                    <div key={item.key}>
                      <div className="flex justify-between font-mono text-xs">
                        <span className="text-slate-200">{item.name}</span>
                        <span className="text-periwinkle-200">~{item.share.toFixed(1)}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-periwinkle-500 to-periwinkle-200"
                          style={{ width: `${Math.max(10, item.share * 1.6)}%` }}
                        />
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-400">{item.thresholdNote}</div>
                    </div>
                  ))}
                  <p className="pt-1 font-mono text-[10px] leading-relaxed text-slate-400">
                    {cs.featureVisualizationNote}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
