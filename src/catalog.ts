import type { ManifestCatalog, MetaPreview, WithCache } from "@stremio-addon/sdk";
import { type Env, Hono } from "hono";
import { doubanSubjectCollectionCache } from "./libs/caches";
import { matchResourceRoute } from "./libs/router";

export const catalogRouter = new Hono<Env>();

catalogRouter.get("*", async (c) => {
  const [matched, params] = matchResourceRoute(c.req.path);
  if (!matched) {
    return c.json({ error: "Not found" }, 404);
  }

  // 1. 获取豆瓣集合数据
  const data = await doubanSubjectCollectionCache.fetch(`${params.id}:${params.extra?.skip ?? 0}`);
  if (!data) {
    return c.json({ error: "Not found" }, 404);
  }
  const items = data.subject_collection_items;
  if (items.length === 0) {
    return c.json({ metas: [] } satisfies WithCache<{ metas: MetaPreview[] }>);
  }

  const metas = items.map<MetaPreview>((item) => ({
    id: `douban:${item.id}`,
    name: item.title,
    type: item.type === "tv" ? "series" : "movie",
    poster: item.cover ?? "",
    description: item.description ?? undefined,
    background: item.photos?.[0] ?? undefined,
  }));

  return c.json({ metas } satisfies WithCache<{ metas: MetaPreview[] }>);
});

export const getCatalogs = async () => {
  const collectionIds: Array<ManifestCatalog & { total: number | "fetch" }> = [
    { id: "movie_hot_gaia", name: "豆瓣热门电影", type: "movie", total: "fetch" },
    { id: "tv_hot", name: "豆瓣热播剧集", type: "series", total: "fetch" },
    { id: "show_hot", name: "豆瓣热播综艺", type: "series", total: "fetch" },
    { id: "tv_animation", name: "豆瓣热门动画", type: "series", total: "fetch" },
    { id: "movie_showing", name: "豆瓣影院热映", type: "movie", total: "fetch" },
    { id: "movie_real_time_hotest", name: "豆瓣实时热门电影", type: "movie", total: 10 },
    { id: "tv_real_time_hotest", name: "豆瓣实时热门电视", type: "series", total: 10 },
    { id: "movie_top250", name: "豆瓣电影 Top250", type: "movie", total: 250 },
    { id: "movie_weekly_best", name: "豆瓣一周口碑电影榜", type: "movie", total: 10 },
    { id: "tv_chinese_best_weekly", name: "豆瓣华语口碑剧集榜", type: "series", total: 10 },
    { id: "tv_global_best_weekly", name: "豆瓣全球口碑剧集榜", type: "series", total: 10 },
    { id: "show_chinese_best_weekly", name: "豆瓣华语口碑综艺榜", type: "series", total: 10 },
    { id: "show_global_best_weekly", name: "豆瓣全球口碑综艺榜", type: "series", total: 10 },
  ];
  const catalogs = await Promise.allSettled(
    collectionIds.map(async (catalog) => {
      const result: ManifestCatalog & { total: number } = {
        ...catalog,
        total: catalog.total === "fetch" ? 0 : catalog.total,
      };
      if (catalog.total === "fetch") {
        const data = await doubanSubjectCollectionCache.fetch(`${catalog.id}:0`);
        result.total = data?.total ?? 0;
      }
      if (result.total > 10) {
        result.extra ??= [];
        result.extra.push({
          name: "skip",
          options: Array.from({ length: Math.ceil(result.total / 10) }, (_, i) => (i * 10).toString()),
        });
      }
      return result;
    }),
  );
  return catalogs.filter((v) => v.status === "fulfilled").map((v) => v.value);
};
