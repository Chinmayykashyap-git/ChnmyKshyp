'use client';

import React, { useState } from 'react';
import { Briefcase, ChevronDown, Sparkles, CheckCircle2, GitBranch, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/content/portfolio';

export function ExperienceSection() {
  const experiences = PORTFOLIO_DATA.experience;
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    servicenow: true,
    kestra: true,
    aws: true,
    gcp: false,
    'gdg-muj': false,
    mckinsey: false,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allOpen = experiences.every((e) => expandedIds[e.id]);
    const next: Record<string, boolean> = {};
    experiences.forEach((e) => {
      next[e.id] = !allOpen;
    });
    setExpandedIds(next);
  };

  const getEntryTypeStyle = (entryType: string) => {
    if (entryType === 'Open Source Contribution') {
      return 'border-purple-400/45 bg-purple-500/15 text-purple-200';
    }
    if (entryType === 'Internship') {
      return 'border-emerald-400/45 bg-emerald-500/15 text-emerald-200';
    }
    return 'border-periwinkle-300/35 bg-periwinkle-400/10 text-periwinkle-200';
  };

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-6 border-b pb-8 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-periwinkle-300">
            <Briefcase className="h-3.5 w-3.5" />
            02 / EXPERIENCE &amp; OPEN SOURCE
          </div>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight sm:text-5xl">
            Enterprise internships, open-source contributions, and cloud engineering.
          </h2>
        </div>

        <button
          type="button"
          onClick={expandAll}
          className="self-start rounded-full border bg-white/[0.04] px-4 py-2 font-mono text-xs transition hover:border-periwinkle-300/40 hover:bg-white/[0.08] lg:self-auto"
        >
          {experiences.every((e) => expandedIds[e.id]) ? 'Collapse Details' : 'Expand All Roles'}
        </button>
      </div>

      {/* Vertical Timeline */}
      <div className="relative mt-12 space-y-6 before:absolute before:bottom-4 before:left-6 before:top-4 before:w-px before:bg-gradient-to-b before:from-periwinkle-300/60 before:via-periwinkle-400/25 before:to-transparent sm:before:left-8">
        {experiences.map((exp) => {
          const isExpanded = !!expandedIds[exp.id];
          const isOpenSource = exp.entryType === 'Open Source Contribution';

          return (
            <div key={exp.id} className="relative pl-16 sm:pl-24">
              {/* Monogram Node on Timeline */}
              <div
                className="absolute left-0 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border bg-[#0A1229] font-mono text-xs font-bold tracking-wider text-white shadow-[0_0_25px_rgba(125,157,255,0.22)] sm:left-2 sm:h-12 sm:w-12"
                style={{ borderColor: `${exp.accentColor}66` }}
              >
                <span>{exp.monogram}</span>
                {exp.current && (
                  <span className="absolute -right-1 -top-1 flex h-3 w-3">
                    <span
                      className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                        isOpenSource ? 'bg-purple-400' : 'bg-emerald-400'
                      }`}
                    />
                    <span
                      className={`relative inline-flex h-3 w-3 rounded-full ${
                        isOpenSource ? 'bg-purple-400' : 'bg-emerald-400'
                      }`}
                    />
                  </span>
                )}
              </div>

              {/* Frosted Glass Experience Card */}
              <div
                className={`glass-card overflow-hidden rounded-3xl transition duration-300 ${
                  isOpenSource
                    ? 'border-purple-400/35 hover:border-purple-400/55'
                    : 'hover:border-periwinkle-300/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(exp.id)}
                  aria-expanded={isExpanded}
                  className="flex w-full flex-col justify-between gap-4 p-6 text-left sm:flex-row sm:items-center sm:p-7"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${getEntryTypeStyle(
                          exp.entryType
                        )}`}
                      >
                        {isOpenSource && <GitBranch className="h-3 w-3" />}
                        {exp.entryType}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-wider opacity-70">
                        {exp.period}
                      </span>
                      <span className="opacity-35">·</span>
                      <span className="font-mono text-xs text-periwinkle-300">{exp.location}</span>
                      {exp.badgeText && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-periwinkle-300/30 bg-periwinkle-400/10 px-2.5 py-0.5 font-mono text-[11px] text-periwinkle-200">
                          <Sparkles className="h-3 w-3" />
                          {exp.badgeText}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2.5 font-display text-xl font-normal sm:text-2xl">
                      {exp.role}{' '}
                      <span className="opacity-65">
                        {isOpenSource ? `— ${exp.organization}` : `@ ${exp.organization}`}
                      </span>
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed opacity-80">
                      {exp.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="font-mono text-xs opacity-65">
                      {isExpanded ? 'Hide' : 'Details'}
                    </span>
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full border bg-white/[0.04] transition-transform duration-300 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t bg-white/[0.015] px-6 pb-6 pt-5 sm:px-7">
                    {/* Optional Technical Repository / PR Metadata Grid */}
                    {exp.metadata && exp.metadata.length > 0 && (
                      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {exp.metadata.map((meta) => (
                          <div
                            key={meta.label}
                            className="rounded-2xl border bg-white/[0.03] px-3.5 py-2.5"
                          >
                            <div className="font-mono text-[10px] uppercase tracking-wider text-periwinkle-300">
                              {meta.label}
                            </div>
                            <div className="mt-1 font-mono text-xs font-medium">{meta.value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <ul className="space-y-2.5">
                      {exp.highlights.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm leading-relaxed opacity-90"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-periwinkle-300" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg border bg-white/[0.04] px-2.5 py-1 font-mono text-xs opacity-85"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {exp.links && exp.links.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2.5 border-t pt-4">
                        {exp.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-periwinkle-300/35 bg-periwinkle-400/10 px-3.5 py-1.5 font-mono text-xs text-periwinkle-200 transition hover:border-periwinkle-300 hover:bg-periwinkle-400/20"
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
