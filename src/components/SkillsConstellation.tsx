'use client';

import React, { useState } from 'react';
import { Network, Sparkles, Filter } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/content/portfolio';

export function SkillsConstellation() {
  const groups = PORTFOLIO_DATA.skills;
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [highlightOnly, setHighlightOnly] = useState(false);
  const [activeSkill, setActiveSkill] = useState<{
    name: string;
    context: string;
    category: string;
    code: string;
  }>({
    name: 'Random Forest',
    context: '200–300 tree ensembles for corporate risk classification',
    category: 'ML & AI',
    code: '01',
  });

  const visibleGroups =
    selectedDomain === 'all' ? groups : groups.filter((g) => g.id === selectedDomain);

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-6 border-b pb-8 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-periwinkle-300">
            <Network className="h-3.5 w-3.5" />
            05 / TECHNICAL SKILLS &amp; TOOLING
          </div>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight sm:text-5xl">
            Capabilities across machine learning, cloud infrastructure, and software systems.
          </h2>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setHighlightOnly(!highlightOnly)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-mono text-xs transition ${
              highlightOnly
                ? 'border-periwinkle-300 bg-periwinkle-300 font-semibold text-slate-950'
                : 'bg-white/[0.04] opacity-85 hover:opacity-100'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Core Stack Only
          </button>
        </div>
      </div>

      {/* Domain Filter Pills + Active Node Inspector Bar */}
      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="flex flex-wrap items-center gap-2 lg:col-span-7">
          <button
            type="button"
            onClick={() => setSelectedDomain('all')}
            className={`rounded-full px-4 py-2 font-mono text-xs transition ${
              selectedDomain === 'all'
                ? 'bg-periwinkle-200 font-semibold text-slate-950 shadow-sm'
                : 'border bg-white/[0.03] opacity-80 hover:opacity-100'
            }`}
          >
            All Domains ({groups.reduce((acc, g) => acc + g.items.length, 0)})
          </button>
          {groups.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setSelectedDomain(g.id)}
              className={`rounded-full px-3.5 py-2 font-mono text-xs transition ${
                selectedDomain === g.id
                  ? 'bg-periwinkle-200 font-semibold text-slate-950 shadow-sm'
                  : 'border bg-white/[0.03] opacity-80 hover:opacity-100'
              }`}
            >
              {g.category} ({g.items.length})
            </button>
          ))}
        </div>

        {/* Live Node Inspector */}
        <div className="glass-card flex items-center justify-between gap-4 rounded-2xl px-5 py-3.5 lg:col-span-5">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-periwinkle-300">
              <span>DOMAIN {activeSkill.code}</span>
              <span>·</span>
              <span>{activeSkill.category}</span>
            </div>
            <div className="mt-0.5 font-display text-base font-medium">
              {activeSkill.name}:{' '}
              <span className="font-sans text-sm font-normal opacity-80">
                {activeSkill.context}
              </span>
            </div>
          </div>
          <Filter className="h-4 w-4 shrink-0 text-periwinkle-300 opacity-70" />
        </div>
      </div>

      {/* Interactive Matrix Grid */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleGroups.map((group) => {
          const items = highlightOnly ? group.items.filter((i) => i.highlight) : group.items;
          return (
            <div
              key={group.id}
              className="glass-card group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-periwinkle-300">
                      DOMAIN {group.code}
                    </span>
                    <h3 className="mt-0.5 font-display text-xl font-normal">{group.category}</h3>
                  </div>
                  <span className="rounded-full border bg-white/[0.04] px-2.5 py-1 font-mono text-xs">
                    {items.length} skills
                  </span>
                </div>

                <p className="mt-3 text-xs leading-relaxed opacity-75">{group.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((skill) => {
                    const isSelected = activeSkill.name === skill.name;
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onMouseEnter={() =>
                          setActiveSkill({
                            name: skill.name,
                            context: skill.context,
                            category: group.category,
                            code: group.code,
                          })
                        }
                        onClick={() =>
                          setActiveSkill({
                            name: skill.name,
                            context: skill.context,
                            category: group.category,
                            code: group.code,
                          })
                        }
                        className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs transition ${
                          isSelected
                            ? 'border-periwinkle-300 bg-periwinkle-400/25 font-medium shadow-[0_0_20px_rgba(125,157,255,0.28)]'
                            : skill.highlight
                            ? 'border-periwinkle-300/35 bg-periwinkle-400/10 hover:border-periwinkle-300/60'
                            : 'bg-white/[0.03] opacity-85 hover:opacity-100'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            skill.highlight ? 'bg-periwinkle-300' : 'bg-current opacity-40'
                          }`}
                        />
                        <span>{skill.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 border-t pt-3 font-mono text-[10px] uppercase tracking-wider opacity-55">
                Select any skill to view project context
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
