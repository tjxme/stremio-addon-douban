import type { ManifestCatalog } from "@stremio-addon/sdk";
import pLimit from "p-limit";
import type { DoubanIdMapping } from "@/db";
import { api } from "./api";
import { collectionConfigMap, DEFAULT_COLLECTION_IDS } from "./constants";

export const generateId = (doubanId: number, params?: Partial<Omit<DoubanIdMapping, "doubanId">>) => {
  if (params?.tmdbId) {
    return `tmdb:${params.tmdbId}`;
  }
  if (params?.imdbId) {
    return params.imdbId;
  }
  return `douban:${doubanId}`;
};

const limit = pLimit(5);

export const getCatalogs = (catalogIds = DEFAULT_COLLECTION_IDS) => {
  const catalogsPromises: Promise<ManifestCatalog>[] = [];

  for (const catalogId of catalogIds) {
    const item = collectionConfigMap.get(catalogId);
    if (!item) {
      continue;
    }
    catalogsPromises.push(
      limit(async () => {
        const result: ManifestCatalog = {
          ...item,
        };
        result.extra ||= [];
        result.extra.push({ name: "skip" });
        const info = await api.doubanAPI.getSubjectCollectionCategory(catalogId).catch(() => null);
        const categoryItems = info?.items ?? [];
        if (categoryItems.length > 1) {
          result.extra.push({ name: "genre", options: categoryItems.map((item) => item.name), optionsLimit: 1 });
        }
        return result;
      }),
    );
  }
  return Promise.all(catalogsPromises);
};
