import type { Env } from "hono";
import { cors } from "hono/cors";
import { createMiddleware } from "hono/factory";
import { logger } from "hono/logger";
import { createRoute } from "honox/factory";

const rateLimitMiddleware = createMiddleware<Env>(async (c, next) => {
  const key = c.req.header("cf-connecting-ip") ?? "unknown";
  const userAgent = c.req.header("User-Agent");
  if (!userAgent) {
    const { success } = await c.env.USER_AGENT_MISSING_RATE_LIMIT.limit({ key });
    if (!success) {
      return c.text("Rate limit exceeded", 429);
    }
  }
  const { success } = await c.env.PUBLIC_RATE_LIMIT.limit({ key });
  if (!success) {
    return c.text("Rate limit exceeded", 429);
  }
  await next();
});

export default createRoute(logger(), cors(), rateLimitMiddleware);
