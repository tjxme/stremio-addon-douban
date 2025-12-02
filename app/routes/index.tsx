import { createRoute } from "honox/factory";
import pkg from "@/../package.json";
import { ManifestUrlRender } from "@/islands/manifest-url-render";

const importUrls = [
  {
    name: "Stremio",
    icon: "https://www.stremio.com/website/ms/large.png",
    url: (manifestUrl: string) => manifestUrl.replace(/^https?:\/\//, "stremio://"),
  },
  {
    name: "Forward",
    icon: "https://forward.inch.red/_astro/icon.DSrm6bPi_1hgmkn.png",
    url: (manifestUrl: string) => {
      const url = new URL("forward://import");
      url.searchParams.set("type", "stremio");
      url.searchParams.set("url", manifestUrl);
      return url.toString();
    },
  },
];

export default createRoute((c) => {
  const url = new URL(c.req.url);
  url.pathname = "/manifest.json";
  url.search = "";
  url.hash = "";
  const manifestUrl = url.toString();
  return c.render(
    <div className="flex min-h-screen items-center justify-center bg-radial from-teal-900 to-slate-950 p-8">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="mb-8 text-center font-bold text-2xl text-white">
          {pkg.description}
          <span className="mt-1 block font-normal text-sm text-teal-300/80">v{pkg.version}</span>
        </h1>

        <section className="mb-8">
          <h2 className="mb-4 text-sm text-white/60 uppercase tracking-wider">Import to</h2>
          <div className="flex flex-col gap-3">
            {importUrls.map((item) => (
              <a
                key={item.name}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-all duration-200 hover:bg-white/15"
                href={item.url(manifestUrl)}
              >
                <img className="size-8 rounded-lg" src={item.icon} alt={item.name} />
                <span className="font-medium text-white transition-colors group-hover:text-teal-200">{item.name}</span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-sm text-white/60 uppercase tracking-wider">Manifest URL</h2>
          <ManifestUrlRender url={manifestUrl} />
        </section>
      </div>
    </div>,
  );
});
