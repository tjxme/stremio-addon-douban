import { reactRenderer } from "@hono/react-renderer";
import { type Env, Hono } from "hono";
import { Link, Script, ViteClient } from "vite-ssr-components/react";
import pkg from "@/../package.json" with { type: "json" };
import { Configure, type ConfigureProps } from "@/components/configure";
import { decodeConfig, encodeConfig } from "@/libs/config";
import { DEFAULT_COLLECTION_IDS } from "@/libs/constants";

export const configureRoute = new Hono<Env>();

configureRoute.get(
  "*",
  reactRenderer(({ children }) => {
    return (
      <html lang="zh">
        <head>
          <ViteClient />
          <Link rel="stylesheet" href="/src/style.css" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
          />
        </head>
        <body>{children}</body>
      </html>
    );
  }),
);

configureRoute.post("/", async (c) => {
  const formData = await c.req.formData();
  const catalogIds = formData.get("catalogIds")?.toString().split(",").filter(Boolean) ?? [];
  const config = encodeConfig({ catalogIds });
  return c.redirect(`/${config}/configure`);
});

configureRoute.get("/", (c) => {
  const configId = c.req.param("config");
  const config = decodeConfig(configId ?? "");

  const initialSelectedIds = config.catalogIds || DEFAULT_COLLECTION_IDS;

  const manifestUrl = new URL(c.req.url);
  manifestUrl.search = "";
  manifestUrl.hash = "";
  manifestUrl.pathname = `/${encodeConfig({ catalogIds: initialSelectedIds })}/manifest.json`;

  const configureProps: ConfigureProps = {
    initialSelectedIds,
    manifestUrl: manifestUrl.toString(),
  };

  return c.render(
    <>
      <Script src="/src/client/configure.tsx" />
      <div className="container mx-auto flex h-dvh max-w-lg flex-col">
        <header className="shrink-0 space-y-1 px-4 py-6 text-center">
          <h1 className="text-balance font-bold text-xl tracking-tight">{pkg.description}</h1>
          <p className="text-muted-foreground text-sm">选择要显示的目录，生成你的专属配置</p>
        </header>

        <script
          id="__INITIAL_DATA__"
          type="application/json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: SSR initial data injection
          dangerouslySetInnerHTML={{ __html: JSON.stringify(configureProps) }}
        />
        <div id="configure" className="flex min-h-0 flex-1 flex-col">
          <Configure {...configureProps} />
        </div>
      </div>
    </>,
  );
});
