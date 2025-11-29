import { drizzle } from "drizzle-orm/d1";
import type { Env } from "hono";

export const getDrizzle = (env: Env["Bindings"]) => {
  return drizzle(env.stremio_addon_douban);
};

export * from "./schema";
