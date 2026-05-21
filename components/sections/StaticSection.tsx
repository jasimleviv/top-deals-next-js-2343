import { sectionById } from "@/data/static-sections";
import { RawHtml } from "@/components/ui/RawHtml";

type StaticSectionProps = {
  id: keyof typeof sectionById;
};

export function StaticSection({ id }: StaticSectionProps) {
  return <RawHtml html={sectionById[id].html} />;
}
