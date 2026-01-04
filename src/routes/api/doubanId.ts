import { zValidator } from "@hono/zod-validator";
import { eq, or } from "drizzle-orm";
import { type Env, Hono } from "hono";
import { z } from "zod/v4";
import { doubanMapping, getDrizzle } from "@/db";

export const doubanIdRoute = new Hono<Env>();

const doubanIdSchema = z.object({
  tmdb_id: z.coerce.number().optional(),
  imdb_id: z.string().optional(),
});

doubanIdRoute.get("/", zValidator("query", doubanIdSchema), async (c) => {
  const { tmdb_id: tmdbId, imdb_id: imdbId } = c.req.valid("query");
  if (!tmdbId && !imdbId) {
    return c.json({ error: "tmdb_id or imdb_id is required" }, 400);
  }
  const db = getDrizzle(c.env);

  const conditions = [];
  if (tmdbId) conditions.push(eq(doubanMapping.tmdbId, tmdbId));
  if (imdbId) conditions.push(eq(doubanMapping.imdbId, imdbId));

  const results = await db.query.doubanMapping.findMany({
    where: or(...conditions),
  });

  return c.json(results.map((item) => item.doubanId));
});
