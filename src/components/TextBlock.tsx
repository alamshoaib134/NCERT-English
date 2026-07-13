"use client";

import { useState, useEffect, useRef } from "react";
import { cleanWord } from "@/lib/dictionary";
import * as tts from '@mintplex-labs/piper-tts-web';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  const handlePlay = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);

    try {
      // Use a high-quality British female voice (closest to clear Indian English)
      const voiceId = "en_GB-alba-medium"; 
      
      const wav = await tts.predict({
        text: en,
        voiceId: voiceId,
      });

      const audioUrl = URL.createObjectURL(wav);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setIsPlaying(false);
        setIsLoading(false);
      };

      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("TTS Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Split English text preserving whitespace and punctuation
  const tokens = en.split(/(\s+)/);

  return (
    <div
      id={id}
      className="group rounded-2xl bg-white dark:bg-slate-800/80 shadow-sm hover:shadow-md border border-amber-100/60 dark:border-slate-700/50 transition-shadow duration-300 overflow-hidden"
    >
      {/* Paragraph number pill, Play button & Pronunciation toggle */}
      <div className="px-5 pt-4 pb-1 flex items-center gap-3">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-[10px] font-bold text-white shadow-sm flex-shrink-0">
          {paragraphNumber}
        </span>
        <button
          onClick={handlePlay}
          disabled={isLoading}
          className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors flex-shrink-0 ${
            isLoading
              ? "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-wait"
              : isPlaying
              ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
          }`}
          title={isLoading ? "Loading voice..." : isPlaying ? "Stop reading" : "🔊 Listen to pronunciation"}
        >
          {isLoading ? (
            <svg
              className="w-3.5 h-3.5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : isPlaying ? (
            <svg
              className="w-3.5 h-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg
              className="w-3.5 h-3.5 ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
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
