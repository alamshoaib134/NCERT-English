import { notFound } from "next/navigation";
import ChapterReader from "@/components/ChapterReader";
import unitData from "@/data/unit1.json";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return unitData.chapters.map((ch) => ({
    id: String(ch.chapterId),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const chapter = unitData.chapters.find(
    (c) => c.chapterId === parseInt(id, 10)
  );

  if (!chapter) {
    return { title: "Chapter Not Found | Poorvi Reader" };
  }

  return {
    title: `${chapter.titleEn} — ${chapter.titleHi} | Poorvi Reader`,
    description: `Read "${chapter.titleEn}" by ${chapter.author} from NCERT Class 7 Poorvi textbook. Bilingual English-Hindi reader with interactive dictionary.`,
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { id } = await params;
  const chapter = unitData.chapters.find(
    (c) => c.chapterId === parseInt(id, 10)
  );

  if (!chapter) {
    notFound();
  }

  return <ChapterReader chapter={chapter} />;
}
