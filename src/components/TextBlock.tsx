"use client";

import { useState } from "react";
import { cleanWord } from "@/lib/dictionary";

interface TextBlockProps {
  id: string;
  en: string;
  hi: string;
  pronunciation?: string;
  paragraphNumber: number;
  onWordTap: (word: string) => void;
}

export default function TextBlock({
  id,
  en,
  hi,
  pronunciation,
  paragraphNumber,
  onWordTap,
}: TextBlockProps) {
  const [showPronunciation, setShowPronunciation] = useState(false);

  // Split English text preserving whitespace and punctuation
  const tokens = en.split(/(\s+)/);

  return (
    <div
      id={id}
      className="group rounded-2xl bg-white dark:bg-slate-800/80 shadow-sm hover:shadow-md border border-amber-100/60 dark:border-slate-700/50 transition-shadow duration-300 overflow-hidden"
    >
      {/* Paragraph number pill & Pronunciation toggle */}
      <div className="px-5 pt-4 pb-1 flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-[10px] font-bold text-white shadow-sm flex-shrink-0">
          {paragraphNumber}
        </span>
        {pronunciation && (
          <button
            onClick={() => setShowPronunciation(!showPronunciation)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all flex-shrink-0 ${
              showPronunciation
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 ring-1 ring-emerald-300 dark:ring-emerald-700"
                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400"
            }`}
            title="Show pronunciation in Hindi script (उच्चारण देखें)"
          >
            <span>🗣️</span>
            <span>उच्चारण</span>
          </button>
        )}
        <div className="h-px flex-1 bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-800" />
      </div>

      {/* English text — tappable words */}
      <div className="px-5 py-3">
        <p className="text-[15px] leading-7 text-slate-800 dark:text-slate-200 font-[450]">
          {tokens.map((token, i) => {
            const cleaned = cleanWord(token);
            if (!cleaned) {
              return <span key={`${id}-ws-${i}`}>{token}</span>;
            }
            return (
              <span
                key={`${id}-w-${i}`}
                onClick={() => onWordTap(token)}
                className="cursor-pointer rounded-md px-[2px] -mx-[2px] transition-all duration-150 hover:bg-amber-100 hover:text-amber-800 active:bg-amber-200 active:scale-95 dark:hover:bg-amber-900/30 dark:hover:text-amber-300 select-none"
              >
                {token}
              </span>
            );
          })}
        </p>
      </div>

      {/* Pronunciation guide (Devanagari transliteration) — toggled */}
      {pronunciation && showPronunciation && (
        <div className="mx-4 mb-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-900/15 border border-emerald-200/60 dark:border-emerald-800/20 px-4 py-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              🔤 How to read (कैसे पढ़ें)
            </span>
          </div>
          <p className="text-[14px] leading-8 text-emerald-800 dark:text-emerald-300 font-medium whitespace-pre-line">
            {pronunciation}
          </p>
        </div>
      )}

      {/* Hindi translation */}
      <div className="mx-4 mb-4 rounded-xl bg-violet-50/80 dark:bg-violet-900/15 border border-violet-100/80 dark:border-violet-800/20 px-4 py-3">
        <p className="text-[14px] leading-7 text-slate-600 dark:text-slate-300 font-normal">
          {hi}
        </p>
      </div>
    </div>
  );
}
