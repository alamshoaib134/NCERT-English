"use client";

import { cleanWord } from "@/lib/dictionary";

interface TextBlockProps {
  id: string;
  en: string;
  hi: string;
  paragraphNumber: number;
  onWordTap: (word: string) => void;
}

export default function TextBlock({
  id,
  en,
  hi,
  paragraphNumber,
  onWordTap,
}: TextBlockProps) {
  // Split English text preserving whitespace and punctuation
  const tokens = en.split(/(\s+)/);

  return (
    <div
      id={id}
      className="group rounded-2xl bg-white dark:bg-slate-800/80 shadow-sm hover:shadow-md border border-amber-100/60 dark:border-slate-700/50 transition-shadow duration-300 overflow-hidden"
    >
      {/* Paragraph number pill */}
      <div className="px-5 pt-4 pb-1 flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-[10px] font-bold text-white shadow-sm">
          {paragraphNumber}
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-blue-200 to-transparent dark:from-blue-800" />
      </div>

      {/* English text — tappable words */}
      <div className="px-5 py-3">
        <p className="text-[15px] leading-7 text-slate-800 dark:text-slate-200 font-[450]">
          {tokens.map((token, i) => {
            const cleaned = cleanWord(token);
            if (!cleaned) {
              // It's whitespace or punctuation — render as-is
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

      {/* Hindi translation */}
      <div className="mx-4 mb-4 rounded-xl bg-violet-50/80 dark:bg-violet-900/15 border border-violet-100/80 dark:border-violet-800/20 px-4 py-3">
        <p className="text-[14px] leading-7 text-slate-600 dark:text-slate-300 font-normal">
          {hi}
        </p>
      </div>
    </div>
  );
}
