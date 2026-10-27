import type { LoyaltyGroup } from "../types";
import { GROUP_BRANDS } from "../types";

export interface BrandMatch {
  group: LoyaltyGroup;
  brand: string;
}

/**
 * 品牌别名表：把常见的英文名 / 简称 / 异写映射到 GROUP_BRANDS 里的规范品牌名。
 * 键会与酒店名做包含匹配（大小写不敏感）。
 */
const BRAND_ALIASES: Record<string, { group: LoyaltyGroup; brand: string }> = {
  // 希尔顿
  conrad: { group: "hilton", brand: "康莱德" },
  "waldorf astoria": { group: "hilton", brand: "华尔道夫" },
  waldorf: { group: "hilton", brand: "华尔道夫" },
  doubletree: { group: "hilton", brand: "希尔顿逸林" },
  逸林: { group: "hilton", brand: "希尔顿逸林" },
  hampton: { group: "hilton", brand: "希尔顿欢朋" },
  欢朋: { group: "hilton", brand: "希尔顿欢朋" },
  hilton: { group: "hilton", brand: "希尔顿" },
  // 华住会
  禧玥: { group: "huazhu", brand: "禧玥" },
  花间堂: { group: "huazhu", brand: "花间堂" },
  施柏阁: { group: "huazhu", brand: "施柏阁" },
  steigenberger: { group: "huazhu", brand: "施柏阁" },
  全季: { group: "huazhu", brand: "全季" },
  "ji hotel": { group: "huazhu", brand: "全季" },
  桔子水晶: { group: "huazhu", brand: "桔子水晶" },
  "crystal orange": { group: "huazhu", brand: "桔子水晶" },
  桔子: { group: "huazhu", brand: "桔子" },
  orange: { group: "huazhu", brand: "桔子" },
  漫心: { group: "huazhu", brand: "漫心" },
  星程: { group: "huazhu", brand: "星程" },
  starway: { group: "huazhu", brand: "星程" },
  汉庭: { group: "huazhu", brand: "汉庭" },
  hanting: { group: "huazhu", brand: "汉庭" },
  怡莱: { group: "huazhu", brand: "怡莱" },
  海友: { group: "huazhu", brand: "海友" },
  citigo: { group: "huazhu", brand: "CitiGO" },
  zleep: { group: "huazhu", brand: "Zleep" },
  // 万豪旅享家
  "jw万豪": { group: "marriott", brand: "JW万豪" },
  "jw marriott": { group: "marriott", brand: "JW万豪" },
  万豪: { group: "marriott", brand: "万豪" },
  marriott: { group: "marriott", brand: "万豪" },
  "w酒店": { group: "marriott", brand: "W" },
  "w hotels": { group: "marriott", brand: "W" },
  威斯汀: { group: "marriott", brand: "威斯汀" },
  westin: { group: "marriott", brand: "威斯汀" },
  喜来登: { group: "marriott", brand: "喜来登" },
  sheraton: { group: "marriott", brand: "喜来登" },
  艾美: { group: "marriott", brand: "艾美" },
  "le meridien": { group: "marriott", brand: "艾美" },
  瑞吉: { group: "marriott", brand: "瑞吉" },
  "st. regis": { group: "marriott", brand: "瑞吉" },
  艾迪逊: { group: "marriott", brand: "艾迪逊" },
  edition: { group: "marriott", brand: "艾迪逊" },
  宝格丽: { group: "marriott", brand: "宝格丽" },
  bulgari: { group: "marriott", brand: "宝格丽" },
  "丽思卡尔顿隐世": { group: "marriott", brand: "丽思卡尔顿隐世" },
  "ritz-carlton reserve": { group: "marriott", brand: "丽思卡尔顿隐世" },
  丽思卡尔顿: { group: "marriott", brand: "丽思卡尔顿" },
  "ritz-carlton": { group: "marriott", brand: "丽思卡尔顿" },
  万怡: { group: "marriott", brand: "万怡" },
  courtyard: { group: "marriott", brand: "万怡" },
  // 凯悦天地
  柏悦: { group: "hyatt", brand: "柏悦" },
  "park hyatt": { group: "hyatt", brand: "柏悦" },
  君悦: { group: "hyatt", brand: "君悦" },
  "grand hyatt": { group: "hyatt", brand: "君悦" },
  凯悦: { group: "hyatt", brand: "凯悦" },
  "hyatt regency": { group: "hyatt", brand: "凯悦" },
  安达仕: { group: "hyatt", brand: "安达仕" },
  andaz: { group: "hyatt", brand: "安达仕" },
  阿丽拉: { group: "hyatt", brand: "阿丽拉" },
  alila: { group: "hyatt", brand: "阿丽拉" },
  // 洲际优悦会
  洲际: { group: "ihg", brand: "洲际" },
  intercontinental: { group: "ihg", brand: "洲际" },
  英迪格: { group: "ihg", brand: "英迪格" },
  "hotel indigo": { group: "ihg", brand: "英迪格" },
  皇冠假日: { group: "ihg", brand: "皇冠假日" },
  "crowne plaza": { group: "ihg", brand: "皇冠假日" },
  假日智选: { group: "ihg", brand: "智选假日" },
  "holiday inn express": { group: "ihg", brand: "智选假日" },
  金普顿: { group: "ihg", brand: "金普顿" },
  kimpton: { group: "ihg", brand: "金普顿" },
  // 雅高心悦界
  雅高: { group: "accor", brand: "雅高" },
  sofitel: { group: "accor", brand: "索菲特" },
  索菲特: { group: "accor", brand: "索菲特" },
  pullman: { group: "accor", brand: "铂尔曼" },
  铂尔曼: { group: "accor", brand: "铂尔曼" },
  美爵: { group: "accor", brand: "美爵" },
  美居: { group: "accor", brand: "美居" },
  mercure: { group: "accor", brand: "美居" },
  诺富特: { group: "accor", brand: "诺富特" },
  novotel: { group: "accor", brand: "诺富特" },
  宜必思: { group: "accor", brand: "宜必思" },
  ibis: { group: "accor", brand: "宜必思" },
  费尔蒙: { group: "accor", brand: "费尔蒙" },
  fairmont: { group: "accor", brand: "费尔蒙" },
  莱佛士: { group: "accor", brand: "莱佛士" },
  raffles: { group: "accor", brand: "莱佛士" },
  // 香格里拉会
  香格里拉: { group: "shangrila", brand: "香格里拉" },
  "shangri-la": { group: "shangrila", brand: "香格里拉" },
  嘉里: { group: "shangrila", brand: "嘉里" },
  kerry: { group: "shangrila", brand: "嘉里" },
  traders: { group: "shangrila", brand: "盛贸" },
  jen: { group: "shangrila", brand: "JEN" },
  // GHA DISCOVERY 联盟
  安纳塔拉: { group: "gha", brand: "安纳塔拉" },
  anantara: { group: "gha", brand: "安纳塔拉" },
  凯宾斯基: { group: "gha", brand: "凯宾斯基" },
  kempinski: { group: "gha", brand: "凯宾斯基" },
  嘉佩乐: { group: "gha", brand: "嘉佩乐" },
  capella: { group: "gha", brand: "嘉佩乐" },
  泛太平洋: { group: "gha", brand: "泛太平洋" },
  "pan pacific": { group: "gha", brand: "泛太平洋" },
};

// 下拉表中的官方品牌名也参与识别，避免品牌清单和自动识别表长期漂移。
// 过滤过短/过于通用的英文词，避免例如酒店名中的 "all" 误识别为雅高。
const GENERATED_BRAND_ALIASES: Record<string, { group: LoyaltyGroup; brand: string }> = {};
for (const [group, brands] of Object.entries(GROUP_BRANDS) as [LoyaltyGroup, string[]][]) {
  for (const brand of brands) {
    const key = brand.trim();
    if (!key) continue;
    const ascii = /^[\x00-\x7F]+$/.test(key);
    if (ascii && key.length < 4) continue;
    if (ascii && /^[A-Z0-9 ]+$/.test(key) && key.length <= 4) continue;
    GENERATED_BRAND_ALIASES[key] = { group, brand: key };
  }
}

// 手工别名优先，保证英文名/简称映射到统一中文品牌名；更长的键优先匹配。
const ALL_BRAND_ALIASES = { ...GENERATED_BRAND_ALIASES, ...BRAND_ALIASES };
const SORTED_KEYS = Object.keys(ALL_BRAND_ALIASES).sort((a, b) => b.length - a.length);

function isShortAsciiAlias(key: string): boolean {
  return key.length <= 4 && /^[a-z0-9]+$/i.test(key);
}

function matchesAlias(hotelName: string, key: string): boolean {
  const normalizedKey = key.toLowerCase();
  if (!isShortAsciiAlias(key)) return hotelName.includes(normalizedKey);

  // 短英文缩写要求独立成词，避免 "gha" 命中 "Shanghai"、"jen" 命中普通英文单词。
  const escaped = normalizedKey.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:$|[^a-z0-9])`, "i").test(hotelName);
}

/**
 * 从酒店名推断集团与子品牌。识别不出返回 null（保存不受影响，用户可手动选）。
 */
export function matchBrand(hotelName: string): BrandMatch | null {
  if (!hotelName.trim()) return null;
  const lower = hotelName.toLowerCase();
  for (const key of SORTED_KEYS) {
    if (matchesAlias(lower, key)) {
      return ALL_BRAND_ALIASES[key];
    }
  }
  return null;
}

/** 校验某子品牌是否属于某集团（表单里辅助判断，暂留作扩展用） */
export function brandBelongsTo(group: LoyaltyGroup, brand: string): boolean {
  return GROUP_BRANDS[group]?.includes(brand) ?? false;
}
