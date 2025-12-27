import { type ClassValue, clsx } from "clsx";
import type { Context } from "hono";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isForwardUserAgent = (c: Context) => {
  const userAgent = c.req.header("User-Agent");
  return userAgent?.split(" ").some((item) => item.startsWith("forward/"));
};

export const isNumeric = (str: string) => typeof str === "string" && str.trim() !== "" && Number.isFinite(+str);
