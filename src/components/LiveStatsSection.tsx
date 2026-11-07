'use client';

import React, { useEffect, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  Code2,
  GitBranch,
  RefreshCw,
  Terminal,
  Trophy,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import initialStats from '../../public/data/stats.json';

export type StatsData = typeof initialStats;

export function LiveStatsSection() {
  const [stats, setStats] = useState<StatsData>(initialStats);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadRuntimeStats = async () => {
    setIsRefreshing(true);
    try {
      const [statsRes, manualRes] = await Promise.allSettled([
        fetch('./data/stats.json', { cache: 'no-store' }),
        fetch('./data/manual-stats.json', { cache: 'no-store' }),
      ]);

      let merged = { ...initialStats };
      if (statsRes.status === 'fulfilled' && statsRes.value.ok) {
        const live = await statsRes.value.json();
        merged = { ...merged, ...live };
      }
      if (manualRes.status === 'fulfilled' && manualRes.value.ok) {
        const manual = await manualRes.value.json();
        if (manual?.leetcode?.useManualOverride) {
          merged.leetcode = { ...merged.leetcode, ...manual.leetcode };
        }
        if (manual?.hackerrank?.useManualOverride) {
          merged.hackerrank = { ...merged.hackerrank, ...manual.hackerrank };
        }
      }
      setStats(merged);
    } catch {
      // Preserve last known good snapshot
    } finally {
      setTimeout(() => setIsRefreshing(false), 350);
    }
  };

  useEffect(() => {
    loadRuntimeStats();
  }, []);

  const lc = stats.leetcode;
  const hr = stats.hackerrank;
  const gh = stats.github;

  const formattedDate = (() => {
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(stats.lastUpdated));
    } catch {
      return 'Synced via GitHub Actions';
    }
  })();

  const easyPct = lc.totalSolved > 0 ? Math.round((lc.easySolved / lc.totalSolved) * 100) : 76;
  const medPct = lc.totalSolved > 0 ? Math.round((lc.mediumSolved / lc.totalSolved) * 100) : 24;
  const hardPct = lc.totalSolved > 0 ? Math.round((lc.hardSolved / lc.totalSolved) * 100) : 0;

  const calendarEntries = Object.entries(lc.submissionCalendar || {}).map(([ts, count]) => ({
    date: new Date(Number(ts) * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    count: Number(count),
  }));

  return (
    <section id="telemetry" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b pb-8 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-periwinkle-300">
            <Activity className="h-3.5 w-3.5" />
            06 / COMPETITIVE PROGRAMMING &amp; LIVE STATS
          </div>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight sm:text-5xl">
            Live problem-solving and repository telemetry.
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs opacity-85">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Last updated: {formattedDate}</span>
          </div>
          <button
            type="button"
            onClick={loadRuntimeStats}
            aria-label="Refresh live coding statistics"
            className="inline-flex items-center gap-1.5 rounded-full border bg-white/[0.04] px-3.5 py-1.5 font-mono text-xs transition hover:border-periwinkle-300/50 hover:bg-white/[0.08]"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* 3-Column Live Telemetry Grid */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* Card 1: LeetCode Live GraphQL Telemetry */}
        <div className="glass-card flex flex-col justify-between rounded-3xl p-6 sm:p-7">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-300">
                  <Code2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider opacity-65">
                    LEETCODE GRAPHQL
                  </div>
                  <div className="font-display text-lg font-medium">@{lc.username}</div>
                </div>
              </div>

              <a
                href={lc.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-xs opacity-80 transition hover:opacity-100"
              >
                Profile <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Radial + Summary Row */}
            <div className="mt-6 flex items-center gap-6 rounded-2xl border bg-white/[0.025] p-4">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.12"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#7D9DFF"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.min(251, Math.max(45, lc.acceptanceRate * 2.51))} 251`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="font-display text-2xl font-semibold">{lc.totalSolved}</span>
                  <span className="font-mono text-[9px] uppercase tracking-wider opacity-65">
                    Solved
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="opacity-70">Acceptance Rate</span>
                  <span className="font-mono font-semibold text-emerald-400">
                    {lc.acceptanceRate}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="opacity-70">Total Submissions</span>
                  <span className="font-mono font-semibold">{lc.totalSubmissions} AC</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="opacity-70">Active Days Recorded</span>
                  <span className="font-mono text-[11px] text-periwinkle-300">
                    {calendarEntries.length} days
                  </span>
                </div>
              </div>
            </div>

            {/* Difficulty Breakdown Bars */}
            <div className="mt-6 space-y-3.5">
              <div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-emerald-400">Easy</span>
                  <span>
                    {lc.easySolved} solved ({easyPct}%)
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-400"
                    style={{ width: `${Math.max(8, easyPct)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-amber-400">Medium</span>
                  <span>
                    {lc.mediumSolved} solved ({medPct}%)
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${Math.max(6, medPct)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-rose-400">Hard</span>
                  <span>
                    {lc.hardSolved} solved ({hardPct}%)
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-rose-400"
                    style={{ width: `${Math.max(2, hardPct)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Recent Submission Activity Strip */}
            {calendarEntries.length > 0 && (
              <div className="mt-5 rounded-xl border bg-white/[0.02] p-3">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider opacity-65">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-periwinkle-300" />
                    Submission Activity Log
                  </span>
                  <span>{lc.totalSubmissions} total AC</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {calendarEntries.slice(-8).map((entry) => (
                    <span
                      key={entry.date}
                      className="rounded border border-periwinkle-300/25 bg-periwinkle-400/10 px-2 py-0.5 font-mono text-[10px] text-periwinkle-200"
                    >
                      {entry.date}: {entry.count}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 border-t pt-4 font-mono text-[11px] opacity-65">
            Synced automatically via scheduled GitHub Action from LeetCode GraphQL.
          </div>
        </div>

        {/* Card 2: HackerRank Badges & Tracks */}
        <div className="glass-card flex flex-col justify-between rounded-3xl p-6 sm:p-7">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider opacity-65">
                    HACKERRANK PROFILE
                  </div>
                  <div className="font-display text-lg font-medium">@{hr.username}</div>
                </div>
              </div>

              <a
                href={hr.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-xs opacity-80 transition hover:opacity-100"
              >
                Profile <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Domain Badges */}
            <div className="mt-6 space-y-3.5">
              {hr.badges.map((badge) => (
                <div
                  key={badge.name}
                  className="rounded-2xl border bg-white/[0.025] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                        {badge.category}
                      </span>
                      <h3 className="font-display text-base font-medium">{badge.name} Domain</h3>
                    </div>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-xs text-emerald-300">
                      {badge.points} pts
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between font-mono text-[11px] opacity-75">
                    <span>{badge.solved} Challenges Solved</span>
                    <span>{badge.progressToNextStar}% to Next Star</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300"
                      style={{ width: `${Math.max(12, badge.progressToNextStar)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Active Practice Tracks */}
            <div className="mt-5">
              <div className="font-mono text-[11px] uppercase tracking-wider opacity-65">
                Registered Practice Tracks
              </div>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {hr.activeTracks.map((track) => (
                  <span
                    key={track}
                    className="inline-flex items-center gap-1 rounded-lg border bg-white/[0.03] px-2.5 py-1 font-mono text-[11px]"
                  >
                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    {track}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t pt-4 font-mono text-[11px] opacity-65">
            Fetched from HackerRank REST endpoints with manual override support in{' '}
            <code>data/manual-stats.json</code>.
          </div>
        </div>

        {/* Card 3: GitHub Engineering Activity */}
        <div className="glass-card flex flex-col justify-between rounded-3xl p-6 sm:p-7">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-periwinkle-300/30 bg-periwinkle-400/10 text-periwinkle-200">
                  <GitBranch className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-wider opacity-65">
                    GITHUB REPOSITORIES
                  </div>
                  <div className="font-display text-lg font-medium">@{gh.username}</div>
                </div>
              </div>

              <a
                href={gh.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border px-3 py-1 font-mono text-xs opacity-80 transition hover:opacity-100"
              >
                GitHub <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* KPI Strip */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border bg-white/[0.025] p-3.5">
                <div className="font-display text-2xl font-semibold">{gh.publicRepos}</div>
                <div className="font-mono text-[11px] opacity-65">Public Repositories</div>
              </div>
              <div className="rounded-2xl border bg-white/[0.025] p-3.5">
                <div className="font-display text-2xl font-semibold text-periwinkle-300">
                  GSSoC &apos;26
                </div>
                <div className="font-mono text-[11px] opacity-65">Open-Source Contributor</div>
              </div>
            </div>

            {/* Language Distribution */}
            <div className="mt-6">
              <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider opacity-65">
                <span>Repository Stack Distribution</span>
                <Terminal className="h-3.5 w-3.5" />
              </div>

              <div className="mt-3 space-y-2.5">
                {gh.topLanguages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex justify-between font-mono text-xs">
                      <span>{lang.name}</span>
                      <span className="opacity-75">{lang.percentage}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-periwinkle-500 to-periwinkle-200"
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 border-t pt-4 font-mono text-[11px] opacity-65">
            Includes FinSight Risk Engine, D.O.O.M, CompanyQ, and Financial Risk Intelligence
            System.
          </div>
        </div>
      </div>
    </section>
  );
}
