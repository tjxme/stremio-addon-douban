import type { MetaDetail } from "@stremio-addon/sdk";
import { type Env, Hono } from "hono";
import { doubanSubjectDetailCache } from "./libs/caches";

import { matchResourceRoute } from "./libs/router";

export const metaRouter = new Hono<Env>();

metaRouter.get("*", async (c) => {
  const [matched, params] = matchResourceRoute(c.req.path);
  if (!matched) {
    return c.json({ error: "Not found" }, 404);
  }
  if (!params.id.startsWith("douban:")) {
    return c.json({ error: "Not found" }, 404);
  }
  const [, doubanId] = params.id.split(":");
  const detail = await doubanSubjectDetailCache.fetch(doubanId);
  if (!detail) {
    return c.json({ error: "Not found" }, 404);
  }
  const meta: MetaDetail = {
    id: params.id,
    name: detail.title,
    type: detail.type === "tv" ? "series" : "movie",
    poster: detail.cover_url ?? detail.pic?.large ?? detail.pic?.normal ?? "",
    description: detail.intro ?? "",
    genres: detail.genres ?? [],
    links: [
      ...(detail.directors?.map((director) => ({
        name: director.name,
        category: "director",
        url: `https://search.douban.com/movie/subject_search?search_text=${director.name}`,
      })) ?? []),
      ...(detail.actors?.map((actor) => ({
        name: actor.name,
        category: "actor",
        url: `https://search.douban.com/movie/subject_search?search_text=${actor.name}`,
      })) ?? []),
    ],
    country: detail.countries?.join(" / "),
    awards: detail.honor_infos?.map((award) => award.title).join(" / "),
    language: detail.languages?.join(" / "),
    releaseInfo: detail.pubdate?.join(" / "),
  };
  return c.json({ meta });
});
