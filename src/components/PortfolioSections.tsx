'use client';

import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Check,
  Copy,
  FileCheck2,
  Mail,
  Send,
  Shield,
  Sparkles,
  UserCheck,
  ArrowUpRight,
} from 'lucide-react';
import { PORTFOLIO_DATA } from '@/content/portfolio';

export function AboutSection() {
  const { about } = PORTFOLIO_DATA;

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        {/* Left 7 Cols: Editorial Narrative */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-periwinkle-300">
            <UserCheck className="h-3.5 w-3.5" />
            {about.eyebrow}
          </div>
          <h2 className="mt-4 font-display text-3xl font-light leading-[1.15] tracking-tight sm:text-5xl">
            {about.headline}
          </h2>

          <div className="mt-6 space-y-4 text-base leading-relaxed opacity-85 sm:text-lg">
            {about.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: 30-Second Recruiter & Admissions Dossier Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 lg:col-span-5">
          <div className="flex items-center justify-between border-b pb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-periwinkle-300">
                RECRUITER &amp; ADMISSIONS BRIEF
              </span>
              <h3 className="mt-0.5 font-display text-xl font-medium">30-Second Snapshot</h3>
            </div>
            <span className="rounded-full border border-emerald-400/35 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] text-emerald-300">
              Verified Facts
            </span>
          </div>

          <dl className="mt-5 space-y-3.5">
            {about.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col justify-between gap-1 border-b pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-baseline"
              >
                <dt className="font-mono text-xs uppercase tracking-wider opacity-60">
                  {fact.label}
                </dt>
                <dd className="text-sm font-medium sm:text-right">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function ResearchPatentSection({ onOpenCaseStudy }: { onOpenCaseStudy: () => void }) {
  const { researchAndIp } = PORTFOLIO_DATA;

  return (
    <section id="research" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-periwinkle-300/35 bg-gradient-to-b from-periwinkle-500/15 via-slate-950/65 to-slate-950/85 p-6 text-slate-100 shadow-[0_30px_100px_rgba(4,7,17,0.65)] sm:p-10 lg:p-12">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-periwinkle-300">
              <Shield className="h-3.5 w-3.5" />
              {researchAndIp.eyebrow}
            </div>
            <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-white sm:text-5xl">
              {researchAndIp.headline}
            </h2>
            <p className="mt-3 text-base text-slate-300">{researchAndIp.lead}</p>
          </div>

          <button
            type="button"
            onClick={onOpenCaseStudy}
            className="self-start rounded-full border border-periwinkle-300/40 bg-periwinkle-400/15 px-4 py-2 font-mono text-xs text-periwinkle-200 transition hover:bg-periwinkle-400/25 lg:self-auto"
          >
            Inspect Underlying ML Pipeline →
          </button>
        </div>

        {/* Two Primary Research & IP Cards: Patent Application + Research Paper */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {researchAndIp.items.map((item) => {
            const isPatent = item.id === 'patent';
            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-3xl border border-white/15 bg-white/[0.035] p-6 backdrop-blur-md sm:p-8"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-periwinkle-300">
                      {isPatent ? (
                        <FileCheck2 className="h-4 w-4" />
                      ) : (
                        <BookOpen className="h-4 w-4" />
                      )}
                      {item.type}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 font-mono text-[11px] font-medium ${
                        isPatent
                          ? 'border-amber-400/40 bg-amber-400/15 text-amber-200'
                          : 'border-periwinkle-300/40 bg-periwinkle-400/15 text-periwinkle-200'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isPatent ? 'bg-amber-300' : 'bg-periwinkle-300'
                        }`}
                      />
                      {item.status}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-xl font-normal leading-snug text-white sm:text-2xl">
                    “{item.title}”
                  </h3>

                  <div className="mt-2 font-mono text-xs text-slate-400">
                    {item.inventors} · {item.domain}
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-300">{item.summary}</p>

                  <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-periwinkle-300">
                      Technical Scope
                    </div>
                    {item.pillars.map((pillar, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <span className="font-mono text-periwinkle-300">0{i + 1}</span>
                        <span>{pillar}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Technical Publication Strip: AWS Builder Center */}
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.03] p-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-emerald-300">
              <span>{researchAndIp.publication.type}</span>
              <span>·</span>
              <span>{researchAndIp.publication.status}</span>
            </div>
            <h3 className="mt-1 font-display text-lg font-medium text-white">
              {researchAndIp.publication.title}
            </h3>
            <p className="mt-1 max-w-3xl text-xs leading-relaxed text-slate-300">
              {researchAndIp.publication.summary}
            </p>
          </div>
          <a
            href={researchAndIp.publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-emerald-400/40 bg-emerald-400/15 px-4 py-2 font-mono text-xs font-medium text-emerald-200 transition hover:bg-emerald-400/25 sm:self-center"
          >
            Read on AWS Builder Center
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function CertificationsSection() {
  const certs = PORTFOLIO_DATA.certifications;

  return (
    <section id="credentials" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="border-b pb-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-periwinkle-300">
          <Award className="h-3.5 w-3.5" />
          07 / CERTIFICATIONS, WORKSHOPS &amp; OPEN-SOURCE CREDENTIALS
        </div>
        <h2 className="mt-3 font-display text-3xl font-light tracking-tight sm:text-5xl">
          Verified cloud badges, programming credentials, and technical workshops.
        </h2>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {certs.map((c) => {
          const credUrl = 'credentialUrl' in c ? c.credentialUrl : undefined;
          const credId = 'credentialId' in c ? c.credentialId : undefined;
          return (
            <div
              key={c.id}
              className="glass-card flex flex-col justify-between rounded-3xl p-6 transition hover:border-periwinkle-300/40"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="rounded-full border border-periwinkle-300/30 bg-periwinkle-400/10 px-2.5 py-0.5 text-[11px] text-periwinkle-300">
                    {c.category}
                  </span>
                  <span className="opacity-60">{c.year}</span>
                </div>

                <h3 className="mt-4 font-display text-lg font-medium leading-snug">{c.title}</h3>
                <div className="mt-1 font-mono text-xs opacity-65">
                  {c.issuer} {credId ? `· ID: ${credId}` : ''}
                </div>
                <p className="mt-3 text-xs leading-relaxed opacity-80">{c.detail}</p>
              </div>

              {credUrl && (
                <div className="mt-4 border-t pt-3">
                  <a
                    href={credUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-periwinkle-300 hover:underline"
                  >
                    Verify Credential
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ContactSection() {
  const { personal } = PORTFOLIO_DATA;
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    navigator.clipboard?.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${senderName || 'Recruiter / Collaborator'}`
    );
    const body = encodeURIComponent(
      `Hi Chinmay,\n\n${message}\n\nBest regards,\n${senderName}\n${senderEmail}`
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="glass-card overflow-hidden rounded-[2.25rem] p-6 sm:p-10 lg:p-14">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left 7 Cols: Email CTA & Direct Links */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-400/10 px-3.5 py-1 font-mono text-xs text-emerald-300">
                <Sparkles className="h-3.5 w-3.5" />
                {personal.availability}
              </div>

              <h2 className="mt-5 font-display text-3xl font-light tracking-tight sm:text-5xl lg:text-6xl">
                Get in touch for ML, cloud, or software roles.
              </h2>

              <p className="mt-4 max-w-xl text-base leading-relaxed opacity-80">
                Available for Machine Learning, Software Engineering, and Cloud Engineering
                internships. Reach out directly by email or connect on GitHub and LinkedIn.
              </p>

              {/* Copy-to-Clipboard Email Bar */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="group inline-flex items-center gap-3 rounded-2xl border border-periwinkle-300/40 bg-periwinkle-400/15 px-5 py-4 font-mono text-base font-medium transition hover:border-periwinkle-300 hover:bg-periwinkle-400/25 sm:text-lg"
                >
                  <Mail className="h-5 w-5 text-periwinkle-300" />
                  <span>{personal.email}</span>
                  <span className="ml-2 inline-flex items-center gap-1 rounded-lg bg-slate-950/60 px-2.5 py-1 text-xs text-periwinkle-200">
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* External Profile Pills */}
            <div className="mt-10 flex flex-wrap gap-3 border-t pt-6">
              {[
                { label: 'GitHub (@Chinmayykashyap-git)', href: personal.links.github },
                { label: 'LinkedIn', href: personal.links.linkedin },
                { label: 'LeetCode (@chinmayykashyap)', href: personal.links.leetcode },
                { label: 'HackerRank (@wrkchinmay)', href: personal.links.hackerrank },
                { label: 'AWS Builder Center Article', href: personal.links.awsArticle },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border bg-white/[0.03] px-4 py-2 font-mono text-xs transition hover:border-periwinkle-300/50 hover:bg-white/[0.08]"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Direct Message Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border bg-white/[0.025] p-6 sm:p-8 lg:col-span-5"
          >
            <div className="font-mono text-xs uppercase tracking-widest text-periwinkle-300">
              DIRECT MESSAGE
            </div>
            <h3 className="mt-1 font-display text-xl font-normal">Send an email</h3>

            <div className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-mono text-xs uppercase tracking-wider opacity-75"
                >
                  Your Name &amp; Organization
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Alex Rivera · Recruiting"
                  className="mt-1.5 w-full rounded-xl border bg-white/[0.04] px-3.5 py-2.5 text-sm placeholder:opacity-45 focus:border-periwinkle-300 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-mono text-xs uppercase tracking-wider opacity-75"
                >
                  Reply-To Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="mt-1.5 w-full rounded-xl border bg-white/[0.04] px-3.5 py-2.5 text-sm placeholder:opacity-45 focus:border-periwinkle-300 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs uppercase tracking-wider opacity-75"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Hi Chinmay, reaching out regarding an ML or Cloud Software Engineering internship..."
                  className="mt-1.5 w-full rounded-xl border bg-white/[0.04] px-3.5 py-2.5 text-sm placeholder:opacity-45 focus:border-periwinkle-300 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F3F4F8] px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-white"
              >
                <Send className="h-4 w-4" />
                {submitted ? 'Opened in Email Client' : 'Compose Direct Email'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
