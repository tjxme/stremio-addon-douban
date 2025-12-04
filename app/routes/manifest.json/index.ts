import type { Manifest } from "@stremio-addon/sdk";
import { createRoute } from "honox/factory";
import pkg from "@/../package.json" with { type: "json" };
import { getCatalogs } from "../catalog";
// import { idPrefixes } from "../meta";

export default createRoute(async (c) => {
  const catalogs = await getCatalogs(c);

  return c.json({
    id: pkg.name,
    version: pkg.version,
    name: pkg.displayName,
    description: pkg.description,
    logo: "https://img1.doubanio.com/f/frodo/144e6fb7d96701944e7dbb1a9bad51bdb1debe29/pics/app/logo.png",
    types: ["movie", "series"],
    resources: [
      "catalog",
      // "meta"
    ],
    catalogs,
    // idPrefixes,
    stremioAddonsConfig: {
      issuer: "https://stremio-addons.net",
      signature:
        "eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..Tx-U1fvAKi92Yl883DyjUw.jMq-g6l86Pf4zRl6Nuj5wg-WbQGfHnK1jCt6g_IxJnwkZdnS00iVUEP4g4ORUgNZgo_DjWGHpL2yz36UMn1ZHqSDtKpC0mh2Gm1nM3LHAUkEB3yFag5qPPLx6FufymYM.iQggztH740IgCNgzqktlyw",
    },
  } satisfies Manifest);
});
