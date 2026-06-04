import { getRemoteJson } from "./remote";

export type StaticSection = {
  id: string;
  label: string;
  html: string;
};

export function getStaticSections() {
  return getRemoteJson<StaticSection[]>("static-sections.json");
}

export async function getSectionById(id: string) {
  const staticSections = await getStaticSections();
  const section = staticSections.find((item) => item.id === id);

  if (!section) {
    throw new Error(`Static section "${id}" was not found in remote data.`);
  }

  return section;
}
