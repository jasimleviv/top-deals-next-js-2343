import { getSectionById } from "@/data/static-sections";
import { RawHtml } from "@/components/ui/RawHtml";

type StaticSectionProps = {
  id: string;
};

export async function StaticSection({ id }: StaticSectionProps) {
  const section = await getSectionById(id);

  return <RawHtml html={section.html} />;
}
