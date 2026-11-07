'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  Cloud,
  Command,
  Cpu,
  GitBranch,
  Layers,
  MapPin,
  Menu,
  Moon,
  Shield,
  Sun,
  X,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/content/portfolio';
import { FlutedGlassCanvas } from './FlutedGlassCanvas';
import { ExperienceSection } from './ExperienceSection';
import { SelectedWorkSection } from './SelectedWorkSection';
import { SkillsConstellation } from './SkillsConstellation';
import { LiveStatsSection } from './LiveStatsSection';
import {
  AboutSection,
  CertificationsSection,
  ContactSection,
  ResearchPatentSection,
} from './PortfolioSections';
import { RiskCaseStudyModal } from './RiskCaseStudyModal';
import { CommandPalette } from './CommandPalette';
import initialStats from '../../public/data/stats.json';

export function PortfolioClient() {
  const { personal, navigation } = PORTFOLIO_DATA;
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeNav, setActiveNav] = useState<string>('#work');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [lcSolved, setLcSolved] = useState<number>(initialStats.leetcode.totalSolved);

  useEffect(() => {
    const saved = localStorage.getItem('ck_portfolio_theme');
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      document.documentElement.classList.toggle('light-mode', saved === 'light');
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isEditable =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      } else if (e.key === '/' && !isEditable && !cmdOpen) {
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [cmdOpen]);

  useEffect(() => {
    fetch('./data/stats.json', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (typeof d?.leetcode?.totalSolved === 'number') {
          setLcSolved(d.leetcode.totalSolved);
        }
      })
      .catch(() => {});
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('ck_portfolio_theme', next);
    document.documentElement.classList.toggle('light-mode', next === 'light');
  };

  const proofIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    cloud: Cloud,
    layers: Layers,
    cpu: Cpu,
    shield: Shield,
    'git-branch': GitBranch,
  };

  return (
    <div
      className={`relative min-h-screen selection:bg-periwinkle-400/30 selection:text-white ${
        theme === 'light' ? 'text-slate-900' : 'text-slate-100'
      }`}
    >
      {/* Real-time WebGL Fluted-Glass & Data Filament Shader */}
      <FlutedGlassCanvas theme={theme} />

      {/* Skip to Main Content for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-950"
      >
        Skip to content
      </a>

      {/* Floating Pill Navbar */}
      <header className="fixed inset-x-0 top-0 z-40 mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Left Brand with Monogram & Waveform */}
        <a
          href="#"
          className="group inline-flex items-center gap-2.5 rounded-full border bg-white/[0.04] px-3.5 py-2 backdrop-blur-xl transition hover:border-periwinkle-300/40"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-periwinkle-400/20 font-mono text-[11px] font-semibold text-periwinkle-200">
            {personal.shortName}
          </span>
          <svg
            className="h-4 w-5 text-periwinkle-300 transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 28 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 11C5.2 4 8.2 4 11.4 10C14.6 16 17.6 16 21 9C22.6 5.8 24.4 5.8 26 9"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-display text-sm font-medium tracking-tight">{personal.name}</span>
        </a>

        {/* Center Frosted Pill Nav */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-0.5 rounded-full border border-white/15 bg-slate-950/55 p-1.5 text-slate-200 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-2xl xl:flex"
        >
          {navigation.map((item) => {
            const isActive = activeNav === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setActiveNav(item.href)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-periwinkle-200" />}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Command Palette (`⌘K`) + Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCmdOpen(true)}
            aria-label="Open command palette (Cmd+K or Ctrl+K)"
            className="hidden items-center gap-1.5 rounded-full border bg-white/[0.06] px-3 py-2 font-mono text-xs backdrop-blur-xl transition hover:border-periwinkle-300/50 sm:inline-flex"
          >
            <Command className="h-3.5 w-3.5 text-periwinkle-300" />
            <span>⌘K</span>
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F4F8] text-slate-950 shadow-md transition hover:scale-105"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-white/[0.08] backdrop-blur-xl xl:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-4 top-20 z-40 rounded-3xl border border-periwinkle-300/30 bg-[#080E24]/95 p-5 text-slate-100 shadow-2xl backdrop-blur-2xl xl:hidden">
          <div className="grid gap-1.5">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setActiveNav(item.href);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/10"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4 text-periwinkle-300" />
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setCmdOpen(true);
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-periwinkle-300/30 bg-periwinkle-400/15 py-2.5 font-mono text-xs text-periwinkle-200"
            >
              <Command className="h-3.5 w-3.5" /> Open Command Palette (⌘K)
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main id="main-content" className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative flex min-h-screen flex-col justify-between px-4 pb-8 pt-28 sm:px-6 lg:px-8">
          <div className="mx-auto my-auto grid w-full max-w-7xl gap-10 py-8 lg:grid-cols-12 lg:items-end">
            {/* Left 7 Cols: Concept Eyebrow, Headline, Role & Single Primary CTA */}
            <div className="lg:col-span-7">
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full border bg-white/[0.06] px-3.5 py-1.5 font-mono text-xs backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="tracking-wider text-periwinkle-300">{personal.conceptTagline}</span>
                <span className="opacity-40">·</span>
                <span>{personal.availability}</span>
              </div>

              <h1 className="mt-6 font-display text-[2.75rem] font-light leading-[1.03] tracking-[-0.04em] sm:text-6xl lg:text-[4.65rem]">
                {personal.heroHeadline}
              </h1>

              <div className="mt-5 font-mono text-xs uppercase tracking-wider text-periwinkle-300 sm:text-sm">
                {personal.name} · {personal.roleTitle}
              </div>

              <p className="mt-4 max-w-xl text-base leading-relaxed opacity-85 sm:text-lg">
                {personal.heroSubheadline}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs opacity-70">
                <span>Based in {personal.location}</span>
                <span>·</span>
                <span>{personal.degree}</span>
                <span>·</span>
                <span>
                  {personal.university} ({personal.graduationWindow})
                </span>
              </div>

              {/* Single Primary CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#F3F4F8] px-6 py-3.5 text-sm font-medium text-slate-950 shadow-[0_12px_40px_rgba(0,0,0,0.28)] transition hover:scale-[1.02] hover:bg-white"
                >
                  <span>View selected work</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Right 5 Cols: Floating Frosted Glass Telemetry Stack */}
            <div className="lg:col-span-5">
              <div className="glass-card rounded-[1.85rem] p-4 sm:p-5">
                {/* Top Pill Handle + Location/Role Header */}
                <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/25" />
                <div className="flex items-center justify-between px-1 pb-3 text-xs">
                  <span className="inline-flex items-center gap-1.5 opacity-80">
                    <MapPin className="h-3.5 w-3.5 text-periwinkle-300" />
                    {personal.location} · MUJ &apos;28
                  </span>
                  <span className="font-mono text-[11px] text-periwinkle-300">VERIFIED DOSSIER</span>
                </div>

                {/* Inner Glass Card 1: Financial Risk Classifier & Patent */}
                <a
                  href="#case-study"
                  className="group block w-full rounded-2xl border bg-white/[0.05] p-4 text-left transition hover:border-periwinkle-300/45 hover:bg-white/[0.09]"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">Financial Risk Classifier</span>
                    <span className="font-mono text-[11px] text-emerald-400">
                      Patent filed / pending ↗
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline justify-between gap-2">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider opacity-60">
                        Reported Accuracy
                      </div>
                      <div className="font-display text-2xl font-normal sm:text-3xl">~94%</div>
                    </div>

                    <span className="rounded-full border bg-white/[0.06] px-2.5 py-0.5 font-mono text-[10px]">
                      SMOTE · SHAP
                    </span>

                    <div className="text-right">
                      <div className="font-mono text-[10px] uppercase tracking-wider opacity-60">
                        ROC-AUC (SMOTE)
                      </div>
                      <div className="font-display text-2xl font-normal sm:text-3xl">0.950</div>
                    </div>
                  </div>
                </a>

                {/* Inner Glass Card 2: Enterprise Internship & Live LeetCode Solved Count */}
                <div className="mt-3 rounded-2xl border bg-white/[0.05] p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">Software Engineering Intern at ServiceNow</span>
                    <span className="font-mono text-[11px] text-periwinkle-300">Apr – Aug 2026</span>
                  </div>

                  <div className="mt-3 flex items-baseline justify-between gap-2">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-wider opacity-60">
                        Experience &amp; OSS
                      </div>
                      <div className="font-display text-xl font-normal sm:text-2xl">
                        ServiceNow · Kestra
                      </div>
                    </div>

                    <span className="rounded-full border bg-white/[0.06] px-2.5 py-0.5 font-mono text-[10px]">
                      AWS · GCP · McK
                    </span>

                    <div className="text-right">
                      <div className="font-mono text-[10px] uppercase tracking-wider opacity-60">
                        LeetCode Solved
                      </div>
                      <div className="font-display text-xl font-normal sm:text-2xl">
                        {lcSolved} Solved
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Proof Strip with Animated Progress Hairline */}
          <div className="mx-auto mt-10 w-full max-w-7xl">
            <div className="relative h-px w-full overflow-hidden bg-white/15">
              <div className="h-full w-36 bg-current opacity-85" />
              <div className="absolute inset-y-0 left-0 w-44 animate-progress-sweep bg-gradient-to-r from-transparent via-periwinkle-300 to-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-6 pt-5 sm:grid-cols-3 lg:grid-cols-5">
              {PORTFOLIO_DATA.proofStrip.map((item) => {
                const Icon = proofIcons[item.icon] || Cpu;
                return (
                  <div key={item.label} className="flex flex-col gap-1.5">
                    <Icon className="h-4 w-4 text-periwinkle-300 opacity-85" />
                    <div className="text-xs font-medium leading-snug">{item.label}</div>
                    <div className="font-mono text-[11px] opacity-65">{item.sublabel}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 1: ABOUT */}
        <AboutSection />

        {/* SECTION 2: EXPERIENCE */}
        <ExperienceSection />

        {/* SECTION 3: SELECTED WORK & CASE STUDY */}
        <SelectedWorkSection onOpenCaseStudy={() => setCaseStudyOpen(true)} />

        {/* SECTION 4: RESEARCH, PATENT & PUBLICATIONS */}
        <ResearchPatentSection onOpenCaseStudy={() => setCaseStudyOpen(true)} />

        {/* SECTION 5: SKILLS CONSTELLATION */}
        <SkillsConstellation />

        {/* SECTION 6: COMPETITIVE PROGRAMMING & LIVE STATS */}
        <LiveStatsSection />

        {/* SECTION 7: CERTIFICATIONS, COURSES & VOLUNTEERING */}
        <CertificationsSection />

        {/* SECTION 8: CONTACT */}
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 font-mono text-xs opacity-70 sm:flex-row sm:px-6 lg:px-8">
          <div>
            © {new Date().getFullYear()} {personal.name} · {personal.location}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCmdOpen(true)}
              className="hover:text-periwinkle-300 hover:underline"
            >
              Press ⌘K / Ctrl+K for Command Palette
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <RiskCaseStudyModal isOpen={caseStudyOpen} onClose={() => setCaseStudyOpen(false)} />
      <CommandPalette
        isOpen={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onOpenCaseStudy={() => setCaseStudyOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  );
}
