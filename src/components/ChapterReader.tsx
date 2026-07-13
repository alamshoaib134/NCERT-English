"use client";

import { useState } from "react";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import DictionarySheet from "./DictionarySheet";
import QASection from "./QASection";

interface ContentItem {
  id: string;
  type: string;
  en?: string;
  hi?: string;
  pronunciation?: string;
  alt?: string;
  src?: string;
}

interface QA {
  qEn: string;
  qHi: string;
  aEn: string;
  aHi: string;
}

interface QASectionData {
  sectionTitleEn: string;
  sectionTitleHi: string;
  sectionIcon: string;
  items: QA[];
}

interface ChapterData {
  chapterId: number;
  titleEn: string;
  titleHi: string;
  author: string;
  content: ContentItem[];
  qaSections: QASectionData[];
}

interface ChapterReaderProps {
  chapter: ChapterData;
}

export default function ChapterReader({ chapter }: ChapterReaderProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  let paragraphCounter = 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Sticky chapter header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-amber-100/50 dark:border-slate-700/50 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
            >
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </a>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-slate-800 dark:text-white truncate leading-tight">
                {chapter.titleEn}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {chapter.titleHi} · {chapter.author}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Chapter hero */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-4">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
            <span>📖</span>
            <span>Chapter {chapter.chapterId}</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white leading-tight mb-1">
            {chapter.titleEn}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            {chapter.titleHi}
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2 font-medium">
            ✍️ {chapter.author}
          </p>
        </div>

        {/* Instruction pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-xs px-4 py-2 rounded-full border border-amber-200/50 dark:border-amber-700/30 animate-pulse-slow">
            <span>👆</span>
            <span>
              किसी भी अंग्रेज़ी शब्द पर टैप करें (Tap any English word for
              Hindi meaning)
            </span>
          </div>
        </div>
      </div>

      {/* Content blocks */}
      <main className="max-w-2xl mx-auto px-4 pb-6">
        <div className="space-y-4">
          {chapter.content.map((item) => {
            if (item.type === "text" && item.en && item.hi) {
              paragraphCounter++;
              return (
                <TextBlock
                  key={item.id}
                  id={item.id}
                  en={item.en}
                  hi={item.hi}
                  pronunciation={item.pronunciation}
                  paragraphNumber={paragraphCounter}
                  onWordTap={(word) => setSelectedWord(word)}
                />
              );
            }

            if (item.type === "image" && item.src && item.alt) {
              return (
                <ImageBlock
                  key={item.id}
                  id={item.id}
                  src={item.src}
                  alt={item.alt}
                />
              );
            }

            return null;
          })}
        </div>

        {/* Q&A Section */}
        {chapter.qaSections && chapter.qaSections.length > 0 && (
          <QASection sections={chapter.qaSections} />
        )}

        {/* Footer */}
        <footer className="text-center py-8 border-t border-amber-100/50 dark:border-slate-700/50 mt-8">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            पूर्वी · NCERT Class 7 · Unit 1: Learning Together
          </p>
          <p className="text-[10px] text-slate-300 dark:text-slate-600 mt-1">
            Built with ❤️ for every child who wants to learn
          </p>
        </footer>
      </main>

      {/* Dictionary bottom sheet */}
      <DictionarySheet
        word={selectedWord}
        chapterId={chapter.chapterId}
        onClose={() => setSelectedWord(null)}
      />
    </div>
  );
}
