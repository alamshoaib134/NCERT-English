"use client";

interface BeforeYouReadProps {
  id: string;
  titleEn: string;
  titleHi: string;
  items: { en: string; hi: string }[];
}

export default function BeforeYouRead({
  id,
  titleEn,
  titleHi,
  items,
}: BeforeYouReadProps) {
  return (
    <div
      id={id}
      className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20 border border-amber-200/60 dark:border-amber-800/30 overflow-hidden"
    >
      {/* Header */}
      <div className="px-5 py-3 bg-amber-100/60 dark:bg-amber-900/20 border-b border-amber-200/40 dark:border-amber-800/20">
        <div className="flex items-center gap-2">
          <span className="text-lg">📖</span>
          <div>
            <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300">
              {titleEn}
            </h3>
            <p className="text-xs text-amber-600 dark:text-amber-400">
              {titleHi}
            </p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="px-5 py-4 space-y-4">
        {items.map((item, i) => (
          <div key={`${id}-item-${i}`} className="flex gap-3">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-200/80 dark:bg-amber-800/40 text-[10px] font-bold text-amber-700 dark:text-amber-300 flex-shrink-0 mt-0.5">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="text-[14px] leading-6 text-slate-700 dark:text-slate-200 font-medium">
                {item.en}
              </p>
              <p className="text-[13px] leading-6 text-amber-700/80 dark:text-amber-400/80 mt-1">
                {item.hi}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
