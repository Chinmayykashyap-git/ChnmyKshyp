'use client';

import React, { useEffect, useState } from 'react';
import {
  Search,
  Sparkles,
  Copy,
  Check,
  ArrowUpRight,
  Compass,
  Sun,
  Moon,
  X,
  Code2,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/content/portfolio';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCaseStudy: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenCaseStudy,
  theme,
  onToggleTheme,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'case-study-sim',
      group: 'Interactive Tools',
      label: 'Launch Interactive 5-Feature Risk Simulator Modal',
      shortcut: 'SIM',
      icon: Sparkles,
      run: () => {
        onClose();
        onOpenCaseStudy();
      },
    },
    {
      id: 'copy-email',
      group: 'Quick Actions',
      label: copied ? 'Copied wrkchinmay@gmail.com' : 'Copy Email Address (wrkchinmay@gmail.com)',
      shortcut: 'EMAIL',
      icon: copied ? Check : Copy,
      run: () => {
        navigator.clipboard?.writeText(PORTFOLIO_DATA.personal.email);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          onClose();
        }, 700);
      },
    },
    {
      id: 'theme',
      group: 'Appearance',
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Theme`,
      shortcut: 'THEME',
      icon: theme === 'dark' ? Sun : Moon,
      run: () => {
        onToggleTheme();
        onClose();
      },
    },
    ...PORTFOLIO_DATA.navigation.map((sec) => ({
      id: `nav-${sec.href}`,
      group: 'Navigate Sections',
      label: `Jump to ${sec.label}`,
      shortcut: 'JUMP',
      icon: Compass,
      run: () => {
        onClose();
        document.querySelector(sec.href)?.scrollIntoView({ behavior: 'smooth' });
      },
    })),
    ...[
      {
        id: 'proj-companyq',
        label: 'Open CompanyQ Live Application (132 Employers · 65 Questions)',
        url: 'https://chinmayykashyap-git.github.io/CompanyQ/',
      },
      {
        id: 'proj-doom',
        label: 'Open D.O.O.M Repository (Manifest Forensics & ML Anomaly Engine)',
        url: 'https://github.com/Chinmayykashyap-git/D.O.O.M',
      },
      {
        id: 'proj-finsight',
        label: 'Open FinSight Risk Engine Repository (6,819 Companies · SHAP)',
        url: 'https://github.com/Chinmayykashyap-git/FinSight-Risk-Engine',
      },
      {
        id: 'proj-fris',
        label: 'Open Financial Risk Intelligence System Repository',
        url: 'https://github.com/Chinmayykashyap-git/financial-risk-intelligence-system',
      },
    ].map((proj) => ({
      id: proj.id,
      group: 'Selected Projects',
      label: proj.label,
      shortcut: 'PROJECT',
      icon: Code2,
      run: () => {
        window.open(proj.url, '_blank', 'noopener,noreferrer');
        onClose();
      },
    })),
    ...[
      {
        id: 'gh',
        label: 'Open GitHub Profile (@Chinmayykashyap-git)',
        url: PORTFOLIO_DATA.personal.links.github,
      },
      {
        id: 'li',
        label: 'Open LinkedIn Profile',
        url: PORTFOLIO_DATA.personal.links.linkedin,
      },
      {
        id: 'lc',
        label: 'Open LeetCode Profile (@chinmayykashyap)',
        url: PORTFOLIO_DATA.personal.links.leetcode,
      },
      {
        id: 'hr',
        label: 'Open HackerRank Profile (@wrkchinmay)',
        url: PORTFOLIO_DATA.personal.links.hackerrank,
      },
    ].map((ext) => ({
      id: ext.id,
      group: 'External Profiles',
      label: ext.label,
      shortcut: 'EXT',
      icon: ArrowUpRight,
      run: () => {
        window.open(ext.url, '_blank', 'noopener,noreferrer');
        onClose();
      },
    })),
  ];

  const filtered = actions.filter(
    (a) =>
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.group.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/75 p-4 pt-[12vh] backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-periwinkle-300/30 bg-[#080E24]/95 text-slate-100 shadow-[0_24px_90px_rgba(0,0,0,0.75)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
          <Search className="h-4 w-4 text-periwinkle-300" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sections, projects, profiles, or commands..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="rounded-lg border border-white/10 bg-white/5 p-1 text-slate-400 hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center font-mono text-xs text-slate-400">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={item.run}
                  className="flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-sm text-slate-200 transition hover:bg-periwinkle-400/15 hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 text-periwinkle-300" />
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                        {item.group}
                      </div>
                    </div>
                  </div>
                  <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-periwinkle-200">
                    {item.shortcut}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] px-4 py-2 font-mono text-[11px] text-slate-400">
          <span>Chinmay Kashyap · Quick Navigation</span>
          <span>ESC to close · ⌘K / Ctrl+K or /</span>
        </div>
      </div>
    </div>
  );
}
