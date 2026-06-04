const DATA_CDN_BASE_URL =
  process.env.DATA_CDN_BASE_URL ??
  "https://cdn.jsdelivr.net/gh/jasimleviv/get-data-json-public-2343@main/data";

const cache = new Map<string, Promise<unknown>>();

export function getRemoteJson<T>(fileName: string): Promise<T> {
  const url = `${DATA_CDN_BASE_URL}/${fileName}`;

  if (!cache.has(url)) {
    cache.set(
      url,
      fetch(url, { next: { revalidate: 300 } }).then(async (response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
        }

        return response.json();
      }),
    );
  }

  return cache.get(url) as Promise<T>;
}
