import axios, { type InternalAxiosRequestConfig } from "axios";

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  console.info("⬆️", config.method?.toUpperCase(), axios.getUri(config));
  return config;
};

export const http = axios.create({
  adapter: "fetch",
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Mobile Safari/537.36",
  },
});

http.interceptors.request.use(requestInterceptor);

export const weappHttp = axios.create({
  adapter: "fetch",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Referer: "https://servicewechat.com/wx2f9b06c1de1ccfca/99/page-frame.html",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Mac MacWechat/WMPF MacWechat/3.8.7(0x13080712) UnifiedPCMacWechat(0xf264101d) XWEB/16390",
  },
});

weappHttp.interceptors.request.use(requestInterceptor);

export const tmdbHttp = axios.create({
  adapter: "fetch",
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
});

tmdbHttp.interceptors.request.use(requestInterceptor);
