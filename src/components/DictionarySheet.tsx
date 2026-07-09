"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  cleanWord,
  lookupLocal,
  lookupWord,
  type DictionaryResult,
} from "@/lib/dictionary";

interface DictionarySheetProps {
  word: string | null;
  chapterId: number;
  onClose: () => void;
}

export default function DictionarySheet({
  word,
  chapterId,
  onClose,
}: DictionarySheetProps) {
  const [result, setResult] = useState<DictionaryResult | null>(null);
  const [loading, setLoading] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!word) {
      setResult(null);
      return;
    }

    const cleaned = cleanWord(word);
    if (!cleaned) {
      setResult(null);
      return;
    }

    // Try local first (instant)
    const local = lookupLocal(cleaned, chapterId);
    if (local) {
      setResult(local);
      setLoading(false);
      return;
    }

    // Fallback to API
    setLoading(true);
    setResult(null);
    lookupWord(cleaned, chapterId).then((res) => {
      setResult(res);
      setLoading(false);
    });
  }, [word, chapterId]);

  // Close on tap outside
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (word) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [word, onClose]);

  if (!word) return null;

  const cleaned = cleanWord(word);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in" />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="relative z-10 w-full max-w-lg animate-slide-up"
      >
        <div className="bg-white dark:bg-slate-800 rounded-t-3xl shadow-2xl px-6 pt-4 pb-8 border-t border-amber-200/50 dark:border-amber-700/30">
          {/* Drag handle */}
          <div className="flex justify-center mb-4">
            <div className="w-10 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
          </div>

          {/* Word */}
          <div className="mb-4">
            <p className="text-xs font-medium uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
              English Word
            </p>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white capitalize">
              {cleaned}
            </h2>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent mb-4" />

          {/* Hindi Meaning */}
          <div className="mb-4">
            <p className="text-xs font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              हिंदी अर्थ (Hindi Meaning)
            </p>

            {loading && (
              <div className="flex items-center gap-3 py-3">
                <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  अर्थ खोज रहे हैं... (Looking up meaning...)
                </p>
              </div>
            )}

            {!loading && result && (
              <div className="bg-violet-50 dark:bg-violet-900/20 rounded-2xl px-4 py-3 border border-violet-100 dark:border-violet-800/30">
                <p className="text-lg font-medium text-slate-700 dark:text-slate-200 leading-relaxed">
                  {result.meaning}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                  {result.source === "local"
                    ? "📚 पाठ्यपुस्तक शब्दकोश (Textbook Dictionary)"
                    : result.source === "cache"
                      ? "💾 सहेजा हुआ अर्थ (Saved)"
                      : "🌐 ऑनलाइन अनुवाद (Online Translation)"}
                </p>
              </div>
            )}

            {!loading && !result && (
              <div className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl px-4 py-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  😔 अर्थ नहीं मिला (Meaning not found)
                </p>
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm active:scale-[0.98] transition-transform shadow-lg shadow-blue-500/20"
          >
            बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
}
