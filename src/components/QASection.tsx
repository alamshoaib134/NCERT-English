"use client";

import { useState } from "react";

interface QA {
  qEn: string;
  qHi: string;
  aEn: string;
  aHi: string;
}

interface QASection {
  sectionTitleEn: string;
  sectionTitleHi: string;
  sectionIcon: string;
  items: QA[];
}

interface QASectionProps {
  sections: QASection[];
}

function QACard({ item, index }: { item: QA; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-amber-100/60 dark:border-slate-700/50 bg-white dark:bg-slate-800/80 overflow-hidden shadow-sm transition-shadow hover:shadow-md">
      {/* Question — tap to expand */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-5 py-4 flex items-start gap-3 active:bg-amber-50/50 dark:active:bg-slate-700/30 transition-colors"
      >
        <span className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-bold text-white shadow-sm mt-0.5">
          Q{index + 1}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-semibold text-slate-800 dark:text-slate-200 leading-6">
            {item.qEn}
          </p>
          <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-1 leading-5">
            {item.qHi}
          </p>
        </div>
        <span
          className={`flex-shrink-0 text-lg text-amber-500 transition-transform duration-300 mt-1 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {/* Answer — expandable */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-5 pb-5">
          <div className="h-px bg-gradient-to-r from-transparent via-amber-200 to-transparent mb-4 dark:via-amber-800" />

          {/* English answer */}
          <div className="mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 mb-1">
              Answer
            </p>
            <p className="text-[14px] leading-6 text-slate-700 dark:text-slate-300">
              {item.aEn}
            </p>
          </div>

          {/* Hindi answer */}
          <div className="rounded-xl bg-violet-50/80 dark:bg-violet-900/15 border border-violet-100/80 dark:border-violet-800/20 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-500 dark:text-violet-400 mb-1">
              उत्तर (Answer)
            </p>
            <p className="text-[13px] leading-6 text-slate-600 dark:text-slate-300">
              {item.aHi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionBlock({ section, globalOffset }: { section: QASection; globalOffset: number }) {
  return (
    <div className="mb-8">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4 px-1">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
          <span className="text-white text-base">{section.sectionIcon}</span>
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-white leading-tight">
            {section.sectionTitleEn}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {section.sectionTitleHi}
          </p>
        </div>
      </div>

      {/* Q&A cards */}
      <div className="space-y-3">
        {section.items.map((item, i) => (
          <QACard key={i} item={item} index={globalOffset + i} />
        ))}
      </div>
    </div>
  );
}

export default function QASectionComponent({ sections }: QASectionProps) {
  let questionCounter = 0;

  return (
    <section className="mt-8 mb-6">
      {/* Main header */}
      <div className="flex items-center gap-3 mb-6 px-1">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
          <span className="text-white text-lg">❓</span>
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">
            Questions & Answers
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            प्रश्न और उत्तर — Tap any question to reveal the answer
          </p>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, sIdx) => {
        const offset = questionCounter;
        questionCounter += section.items.length;
        return (
          <SectionBlock
            key={sIdx}
            section={section}
            globalOffset={offset}
          />
        );
      })}
    </section>
  );
}
