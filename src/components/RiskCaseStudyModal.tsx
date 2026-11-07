'use client';

import React, { useEffect, useState } from 'react';
import {
  X,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  Activity,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/content/portfolio';

interface RiskCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SimulatorInputs {
  revenue: number;
  profitMargin: number;
  debtRatio: number;
  currentRatio: number;
  cashFlow: number;
}

const PRESETS: { label: string; values: SimulatorInputs }[] = [
  {
    label: 'Low Leverage Profile',
    values: { revenue: 7.4, profitMargin: 24.5, debtRatio: 0.45, currentRatio: 3.1, cashFlow: 2.8 },
  },
  {
    label: 'Moderate Leverage Profile',
    values: { revenue: 5.0, profitMargin: 12.0, debtRatio: 1.45, currentRatio: 1.25, cashFlow: 0.4 },
  },
  {
    label: 'Distressed Profile',
    values: { revenue: 2.1, profitMargin: -3.8, debtRatio: 1.72, currentRatio: 0.65, cashFlow: -0.35 },
  },
];

export function RiskCaseStudyModal({ isOpen, onClose }: RiskCaseStudyModalProps) {
  const cs = PORTFOLIO_DATA.caseStudy;
  const [inputs, setInputs] = useState<SimulatorInputs>(PRESETS[1].values);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Exact rule from financial_risk_intelligence_system.ipynb cell 16:
  // if DebtRatio > 1.3 and ProfitMargin < 5 -> High; elif DebtRatio > 0.8 -> Medium; else -> Low
  const isHighRisk = inputs.debtRatio > 1.3 && inputs.profitMargin < 5;
  const isMediumRisk = !isHighRisk && inputs.debtRatio > 0.8;
  const riskTier: 'Low' | 'Medium' | 'High' = isHighRisk ? 'High' : isMediumRisk ? 'Medium' : 'Low';

  const rawScore =
    Math.min(1, inputs.debtRatio / 1.8) * 55 +
    Math.max(0, (15 - inputs.profitMargin) / 25) * 30 +
    Math.max(0, (2.2 - inputs.currentRatio) / 2.2) * 10 +
    Math.max(0, (1.0 - inputs.cashFlow) / 1.5) * 5;
  const riskProbability = Math.max(4, Math.min(97, Math.round(rawScore)));

  const tierColors = {
    Low: {
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
      bar: 'from-emerald-400 to-teal-300',
      text: 'text-emerald-300',
    },
    Medium: {
      badge: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
      bar: 'from-amber-400 to-orange-400',
      text: 'text-amber-300',
    },
    High: {
      badge: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
      bar: 'from-rose-500 to-orange-500',
      text: 'text-rose-300',
    },
  }[riskTier];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 backdrop-blur-xl sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-modal-title"
    >
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-periwinkle-300/25 bg-[#070C1E]/95 text-slate-100 shadow-[0_32px_120px_rgba(0,0,0,0.75)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/[0.02] px-6 py-4">
          <div className="font-mono text-xs uppercase tracking-wider text-periwinkle-200">
            INTERACTIVE RISK SIMULATOR · FINANCIAL RISK INTELLIGENCE SYSTEM
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/Chinmayykashyap-git/financial-risk-intelligence-system"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-xs text-slate-200 transition hover:border-periwinkle-300/40 hover:bg-white/10"
            >
              Notebook Repository
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={onClose}
              aria-label="Close simulator modal"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8">
          <h2
            id="case-study-modal-title"
            className="font-display text-2xl font-light tracking-tight text-white sm:text-4xl"
          >
            5-Indicator Rule &amp; Tree Attribution Sandbox
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Adjust the five financial ratios below to inspect how `explain_company()` classifies corporate risk in `financial_risk_intelligence_system.ipynb`.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 lg:col-span-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-widest text-periwinkle-300">
                  ILLUSTRATIVE GINI SPLIT ATTRIBUTION
                </span>
                <Activity className="h-4 w-4 text-periwinkle-300" />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Mean decrease in Gini impurity (`model.feature_importances_`) across 200 trees is concentrated in Debt Ratio and Profit Margin because they define the decision boundaries:
              </p>

              <div className="mt-4 space-y-3.5">
                {cs.illustrativeGiniFeatures.map((feat) => (
                  <div key={feat.key}>
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-200">{feat.name}</span>
                      <span className="text-periwinkle-200">~{feat.share.toFixed(1)}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-periwinkle-500 to-periwinkle-200"
                        style={{ width: `${Math.max(8, feat.share * 1.6)}%` }}
                      />
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400">{feat.thresholdNote}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-5 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-periwinkle-300">
                  COUNTERPARTY INPUTS
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setInputs(preset.values)}
                      className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-slate-300 transition hover:border-periwinkle-300/40 hover:bg-white/10 hover:text-white"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
                <label className="block rounded-xl border border-white/10 bg-slate-950/50 p-3.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Debt Ratio (0.0 – 2.0)</span>
                    <span className="font-mono font-semibold text-white">{inputs.debtRatio.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={2.0}
                    step={0.05}
                    value={inputs.debtRatio}
                    onChange={(e) => setInputs({ ...inputs, debtRatio: parseFloat(e.target.value) })}
                    className="mt-2 w-full accent-periwinkle-300"
                  />
                </label>

                <label className="block rounded-xl border border-white/10 bg-slate-950/50 p-3.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Profit Margin (-10% to 40%)</span>
                    <span className="font-mono font-semibold text-white">{inputs.profitMargin.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min={-10}
                    max={40}
                    step={0.5}
                    value={inputs.profitMargin}
                    onChange={(e) => setInputs({ ...inputs, profitMargin: parseFloat(e.target.value) })}
                    className="mt-2 w-full accent-periwinkle-300"
                  />
                </label>

                <label className="block rounded-xl border border-white/10 bg-slate-950/50 p-3.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Current Ratio (0.2 – 5.0)</span>
                    <span className="font-mono font-semibold text-white">{inputs.currentRatio.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={0.2}
                    max={5.0}
                    step={0.1}
                    value={inputs.currentRatio}
                    onChange={(e) => setInputs({ ...inputs, currentRatio: parseFloat(e.target.value) })}
                    className="mt-2 w-full accent-periwinkle-300"
                  />
                </label>

                <label className="block rounded-xl border border-white/10 bg-slate-950/50 p-3.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Cash Flow (-$0.5M to $5.0M)</span>
                    <span className="font-mono font-semibold text-white">${inputs.cashFlow.toFixed(2)}M</span>
                  </div>
                  <input
                    type="range"
                    min={-0.5}
                    max={5.0}
                    step={0.1}
                    value={inputs.cashFlow}
                    onChange={(e) => setInputs({ ...inputs, cashFlow: parseFloat(e.target.value) })}
                    className="mt-2 w-full accent-periwinkle-300"
                  />
                </label>
              </div>

              <div className="mt-4 rounded-2xl border border-white/15 bg-slate-950/80 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {riskTier === 'Low' ? (
                      <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <AlertTriangle className={`h-5 w-5 ${tierColors.text}`} />
                    )}
                    <span className="font-display text-base font-medium text-white">
                      Risk Category: <span className={tierColors.text}>{riskTier}</span>
                    </span>
                  </div>
                  <span className={`rounded-full border px-3 py-0.5 font-mono text-xs ${tierColors.badge}`}>
                    Illustrative Score: {riskProbability}/100
                  </span>
                </div>

                <p className="mt-3 font-mono text-xs leading-relaxed text-slate-300">
                  {riskTier === 'High'
                    ? `High Risk triggered because DebtRatio (${inputs.debtRatio.toFixed(2)}) > 1.30 and ProfitMargin (${inputs.profitMargin.toFixed(1)}%) < 5.0%.`
                    : riskTier === 'Medium'
                    ? `Medium Risk triggered because DebtRatio (${inputs.debtRatio.toFixed(2)}) > 0.80 while ProfitMargin (${inputs.profitMargin.toFixed(1)}%) remains >= 5.0% (or DebtRatio <= 1.30).`
                    : `Low Risk triggered because DebtRatio (${inputs.debtRatio.toFixed(2)}) <= 0.80.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
