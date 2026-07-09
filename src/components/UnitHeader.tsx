import Link from "next/link";
import Image from "next/image";

interface Chapter {
  chapterId: number;
  titleEn: string;
  titleHi: string;
  author: string;
  content: { type: string }[];
}

interface UnitHeaderProps {
  unitTitleEn: string;
  unitTitleHi: string;
  unitId: number;
  chapters: Chapter[];
}

export default function UnitHeader({
  unitTitleEn,
  unitTitleHi,
  unitId,
  chapters,
}: UnitHeaderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />
        {/* River flow line */}
        <svg
          className="absolute bottom-0 left-0 w-full h-32 opacity-10"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 C100,20 200,80 300,30 C350,10 380,40 400,30 L400,100 L0,100 Z"
            fill="url(#river)"
          />
          <defs>
            <linearGradient id="river" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg mx-auto px-5">
        {/* Top bar */}
        <div className="pt-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-sm">📖</span>
            </div>
            <span className="text-sm font-bold tracking-wide text-white/90">
              पूर्वी Reader
            </span>
          </div>
          <span className="text-xs text-white/40 font-medium">Class 7</span>
        </div>

        {/* Hero section */}
        <div className="pt-10 pb-8 text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4 backdrop-blur-sm border border-white/10">
            <span>🎓</span>
            <span>Unit {unitId}</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight mb-2 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300 bg-clip-text text-transparent">
            {unitTitleEn}
          </h1>
          <p className="text-xl text-blue-200/80 font-medium">
            {unitTitleHi}
          </p>

          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

          <p className="mt-4 text-sm text-blue-200/60 leading-relaxed max-w-sm mx-auto">
            किसी भी अध्याय को पढ़ने के लिए नीचे टैप करें
            <br />
            <span className="text-white/40">
              Tap a chapter below to start reading
            </span>
          </p>
        </div>

        {/* Chapter cards */}
        <div className="space-y-4 pb-12">
          {chapters.map((ch) => {
            const paragraphCount = ch.content.filter(
              (c) => c.type === "text"
            ).length;

            return (
              <Link
                key={ch.chapterId}
                href={`/chapter/${ch.chapterId}`}
                className="block group"
              >
                <div className="relative rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-md border border-white/10 hover:border-amber-400/30 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl hover:shadow-amber-500/5">
                  {/* Card top image preview */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src="/images/ch1_jahnavi_river.png"
                      alt={ch.titleEn}
                      fill
                      sizes="(max-width: 768px) 100vw, 512px"
                      loading="eager"
                      className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="inline-flex items-center gap-1 bg-amber-500/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                        Ch {ch.chapterId}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="px-5 py-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors leading-tight">
                      {ch.titleEn}
                    </h3>
                    <p className="text-sm text-blue-200/60 mt-0.5">
                      {ch.titleHi}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-3 text-xs text-white/40">
                        <span>✍️ {ch.author}</span>
                        <span>·</span>
                        <span>{paragraphCount} paragraphs</span>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-amber-500/20 group-hover:bg-amber-500 flex items-center justify-center transition-all duration-300">
                        <svg
                          className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center pb-8 border-t border-white/5 pt-6">
          <p className="text-[10px] text-white/30">
            NCERT Class 7 · पूर्वी (Poorvi) Textbook Reader
          </p>
          <p className="text-[10px] text-white/20 mt-1">
            Built with ❤️ for every child who wants to learn
          </p>
        </div>
      </div>
    </div>
  );
}
