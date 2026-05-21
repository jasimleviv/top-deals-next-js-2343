import staticSectionsData from "./static-sections.json";

export type StaticSection = {
  id: string;
  label: string;
  html: string;
};

export const staticSections = staticSectionsData satisfies StaticSection[];

export const sectionById = Object.fromEntries(
  staticSections.map((section) => [section.id, section]),
) as Record<string, StaticSection>;
