import type { ManifestCatalog } from "@stremio-addon/sdk";

export const SECONDS_PER_HOUR = 60 * 60;
export const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;
export const SECONDS_PER_WEEK = SECONDS_PER_DAY * 7;

export const TV_RANK_ID_MAP = {
  近期热门大陆剧: "EC74443FY",
  高分经典大陆剧: "ECT45KVZI",
  近期热门美剧: "ECFA5DI7Q",
  高分经典美剧: "ECVACWVGI",
  高分经典英剧: "ECVACXBWI",
  近期热门日剧: "ECNA46YBA",
  高分经典日剧: "ECBQCUATA",
  近期热门韩剧: "ECBE5CBEI",
  高分经典韩剧: "EC6EC5GBQ",
  高分经典港剧: "ECVM47WUA",
  高分经典台剧: "ECBI5EL6A",
  高分经典泰剧: "ECRM5BIFQ",
  近期热门欧洲剧: "EC6I5FYHA",
  高分经典欧洲剧: "ECZY5KBOQ",
  高分动画剧集: "ECR4CRXHA",
};

export const COLLECTION_CONFIGS: ManifestCatalog[] = [
  { id: "movie_hot_gaia", name: "豆瓣热门电影", type: "movie" },
  { id: "movie_weekly_best", name: "一周口碑电影榜", type: "movie" },
  { id: "movie_real_time_hotest", name: "实时热门电影", type: "movie" },
  { id: "movie_top250", name: "豆瓣电影 Top250", type: "movie" },
  { id: "movie_showing", name: "影院热映", type: "movie" },
  { id: "film_genre_27", name: "剧情片榜", type: "movie" },
  { id: "movie_comedy", name: "喜剧片榜", type: "movie" },
  { id: "movie_love", name: "爱情片榜", type: "movie" },
  { id: "movie_action", name: "动作片榜", type: "movie" },
  { id: "movie_scifi", name: "科幻片榜", type: "movie" },
  { id: "film_genre_31", name: "动画片榜", type: "movie" },
  { id: "film_genre_32", name: "悬疑片榜", type: "movie" },
  { id: "film_genre_46", name: "犯罪片榜", type: "movie" },
  { id: "film_genre_33", name: "惊悚片榜", type: "movie" },
  { id: "film_genre_49", name: "冒险片榜", type: "movie" },
  { id: "film_genre_41", name: "家庭片榜", type: "movie" },
  { id: "film_genre_42", name: "儿童片榜", type: "movie" },
  { id: "film_genre_44", name: "历史片榜", type: "movie" },
  { id: "film_genre_39", name: "音乐片榜", type: "movie" },
  { id: "film_genre_48", name: "奇幻片榜", type: "movie" },
  { id: "film_genre_34", name: "恐怖片榜", type: "movie" },
  { id: "film_genre_45", name: "战争片榜", type: "movie" },
  { id: "film_genre_43", name: "传记片榜", type: "movie" },
  { id: "film_genre_40", name: "歌舞片榜", type: "movie" },
  { id: "film_genre_50", name: "武侠片榜", type: "movie" },
  { id: "film_genre_37", name: "情色片榜", type: "movie" },
  { id: "natural_disasters", name: "灾难片榜", type: "movie" },
  { id: "film_genre_47", name: "西部片榜", type: "movie" },
  { id: "film_genre_51", name: "古装片榜", type: "movie" },
  { id: "ECCEPGM4Y", name: "运动片榜", type: "movie" },
  { id: "film_genre_36", name: "短片榜", type: "movie" },

  // --
  { id: "tv_hot", name: "近期热门剧集", type: "series" },
  { id: "show_hot", name: "近期热门综艺节目", type: "series" },
  { id: "tv_animation", name: "近期热门动画", type: "series" },
  { id: "tv_real_time_hotest", name: "实时热门电视", type: "series" },
  { id: "tv_chinese_best_weekly", name: "华语口碑剧集榜", type: "series" },
  { id: "tv_global_best_weekly", name: "全球口碑剧集榜", type: "series" },
  { id: "show_chinese_best_weekly", name: "国内口碑综艺榜", type: "series" },
  { id: "show_global_best_weekly", name: "国外口碑综艺榜", type: "series" },
  { id: "EC74443FY", name: "大陆剧榜", type: "series" },
  { id: "ECFA5DI7Q", name: "美剧榜", type: "series" },
  { id: "ECVACXBWI", name: "英剧榜", type: "series" },
  { id: "ECNA46YBA", name: "日剧榜", type: "series" },
  { id: "ECBE5CBEI", name: "韩剧榜", type: "series" },
  { id: "ECVM47WUA", name: "港剧榜", type: "series" },
  { id: "ECBI5EL6A", name: "台剧榜", type: "series" },
  { id: "ECRM5BIFQ", name: "泰剧榜", type: "series" },
  { id: "EC6I5FYHA", name: "欧洲剧榜", type: "series" },
];

export const collectionConfigMap = new Map(COLLECTION_CONFIGS.map((item) => [item.id, item]));

export const DEFAULT_COLLECTION_IDS = [
  "movie_hot_gaia",
  "movie_weekly_best",
  "movie_real_time_hotest",
  "movie_top250",
  "movie_showing",
  "tv_hot",
  "show_hot",
  "tv_animation",
  "tv_real_time_hotest",
  "tv_chinese_best_weekly",
  "tv_global_best_weekly",
  "show_chinese_best_weekly",
  "show_global_best_weekly",
];
