import { notFound } from "next/navigation";
import ChapterReader from "@/components/ChapterReader";
import unit1Data from "@/data/unit1.json";
import unit2Data from "@/data/unit2.json";
import unit3Data from "@/data/unit3.json";
import unit4Data from "@/data/unit4.json";
import unit5Data from "@/data/unit5.json";

const allUnits = [unit1Data, unit2Data, unit3Data, unit4Data, unit5Data];

function findChapter(chapterId: number) {
  for (const unit of allUnits) {
    const chapter = unit.chapters.find((c) => c.chapterId === chapterId);
    if (chapter) return chapter;
  }
  return null;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allUnits.flatMap((unit) =>
    unit.chapters.map((ch) => ({
      id: String(ch.chapterId),
    }))
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const chapter = findChapter(parseInt(id, 10));

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
  const chapter = findChapter(parseInt(id, 10));

  if (!chapter) {
    notFound();
  }

  return <ChapterReader chapter={chapter} />;
}
