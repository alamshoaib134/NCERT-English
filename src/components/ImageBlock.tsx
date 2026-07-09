import Image from "next/image";

interface ImageBlockProps {
  id: string;
  src: string;
  alt: string;
}

export default function ImageBlock({ id, src, alt }: ImageBlockProps) {
  return (
    <div
      id={id}
      className="rounded-2xl overflow-hidden shadow-md border border-amber-100/60 dark:border-slate-700/50 bg-white dark:bg-slate-800/80"
    >
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 640px"
          loading="lazy"
        />
      </div>
      {/* Caption */}
      <div className="px-4 py-3 bg-amber-50/50 dark:bg-slate-700/30 border-t border-amber-100/50 dark:border-slate-700/30">
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-5 italic">
          {alt}
        </p>
      </div>
    </div>
  );
}
