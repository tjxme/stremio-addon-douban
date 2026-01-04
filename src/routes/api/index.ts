import { and, eq } from "drizzle-orm";
import { type Env, Hono } from "hono";
import { createMiddleware } from "hono/factory";
import { getDrizzle, users } from "@/db";
import { doubanIdRoute } from "./doubanId";

export const apiRoute = new Hono<Env>();

const protectedApiRoute = new Hono<Env>();
const protectedMiddleware = createMiddleware<Env>(async (c, next) => {
  const userId = c.req.param("userId");
  if (!userId) {
    return c.text("Unauthorized", 401);
  }
  const db = getDrizzle(c.env);
  const user = await db.query.users.findFirst({
    where: and(eq(users.id, userId), eq(users.hasStarred, true)),
  });
  if (!user) {
    return c.text("Unauthorized", 401);
  }
  return next();
});
protectedApiRoute.use(protectedMiddleware);
protectedApiRoute.route("/douban_id", doubanIdRoute);

apiRoute.route("/:userId", protectedApiRoute);
