import { LRUCache } from "lru-cache";
import z from "zod";
import { http, tmdbHttp } from "./http";
import { doubanSubjectCollectionSchema, tmdbDetailSchema } from "./schema";

export const tmdbDetailCache = new LRUCache<`${"movie" | "tv"}:${number}`, z.output<typeof tmdbDetailSchema>>({
  max: 500,
  ttl: 1000 * 60 * 5,
  updateAgeOnGet: true,
  fetchMethod: async (key, _, { signal }) => {
    const [type, tmdbId] = key.split(":") as ["movie" | "tv", number];
    const resp = await tmdbHttp.get(`/${type}/${tmdbId}`, {
      params: { language: "zh-CN" },
      signal,
    });
    const { success, data, error } = tmdbDetailSchema.safeParse(resp.data);
    if (!success) {
      console.warn(z.prettifyError(error));
      return undefined;
    }
    return data;
  },
});

export const doubanSubjectCollectionCache = new LRUCache<string, z.output<typeof doubanSubjectCollectionSchema>>({
  max: 500,
  ttl: 1000 * 60 * 5,
  fetchMethod: async (key, _, { signal }) => {
    const [id, skip] = key.split(":");
    const resp = await http.get(`https://m.douban.com/rexxar/api/v2/subject_collection/${id}/items`, {
      params: {
        start: skip ?? 0,
        count: 10,
        for_mobile: 1,
      },
      headers: {
        Referer: `https://m.douban.com/subject_collection/${id}`,
      },
      signal,
    });
    const { success, data, error } = doubanSubjectCollectionSchema.safeParse(resp.data);
    if (!success) {
      console.warn(z.prettifyError(error));
      return undefined;
    }
    return data;
  },
});
