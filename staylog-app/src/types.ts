export type LoyaltyGroup =
  | "hilton"
  | "huazhu"
  | "marriott"
  | "hyatt"
  | "ihg"
  | "accor"
  | "shangrila"
  | "gha"
  | "other";

export interface Stay {
  id: string;
  hotelName: string;
  hotelNameEn?: string;
  brand: string;
  group: LoyaltyGroup;
  /** 自定义集团时的集团名（group === "other" 时使用） */
  customGroupName?: string;
  city: string;
  country: string;
  lat?: number;
  lng?: number;
  /** ISO 日期 YYYY-MM-DD */
  checkIn: string;
  checkOut: string;
  roomType?: string;
  rate?: number;
  currency?: string;
  pointsEarned?: number;
  pointsRedeemed?: number;
  /** 1-5 */
  rating?: number;
  notes?: string;
  tags?: string[];
  /** 云同步用：最后修改时间（ISO），做最后写入优先合并 */
  updatedAt?: string;
}

export interface Certificate {
  name: string;
  expiry: string;
}

export interface Membership {
  /** 稳定主键（云同步需要；旧数据在 store migrate 时补齐） */
  id: string;
  group: LoyaltyGroup;
  /** group === "other" 时的显示名 */
  customName?: string;
  /** 自定义集团的主题色 */
  customColor?: string;
  memberNo?: string;
  tier: string;
  pointsBalance: number;
  tierExpiry?: string;
  targetTier?: string;
  targetNights: number;
  bonusNights: number;
  certificates: Certificate[];
  /** 云同步用：最后修改时间（ISO），做最后写入优先合并 */
  updatedAt?: string;
}

export interface BackupFile {
  app: "staylog";
  version: 1;
  exportedAt: string;
  stays: Stay[];
  memberships: Membership[];
}

export const GROUP_META: Record<
  LoyaltyGroup,
  { name: string; short: string; en: string; cssVar: string; className: string }
> = {
  hilton: { name: "希尔顿荣誉客会", short: "希尔顿", en: "HILTON HONORS", cssVar: "--hilton", className: "b-hilton" },
  huazhu: { name: "华住会", short: "华住", en: "H REWARDS", cssVar: "--huazhu", className: "b-huazhu" },
  marriott: { name: "万豪旅享家", short: "万豪", en: "MARRIOTT BONVOY", cssVar: "--marriott", className: "b-marriott" },
  hyatt: { name: "凯悦天地", short: "凯悦", en: "WORLD OF HYATT", cssVar: "--hyatt", className: "b-hyatt" },
  ihg: { name: "洲际优悦会", short: "洲际", en: "IHG ONE REWARDS", cssVar: "--ihg", className: "b-ihg" },
  accor: { name: "雅高心悦界", short: "雅高", en: "ALL ACCOR", cssVar: "--accor", className: "b-accor" },
  shangrila: { name: "香格里拉会", short: "香格里拉", en: "SHANGRI-LA CIRCLE", cssVar: "--shangrila", className: "b-shangrila" },
  gha: { name: "GHA DISCOVERY", short: "GHA", en: "GHA DISCOVERY", cssVar: "--gha", className: "b-gha" },
  other: { name: "其他集团", short: "其他", en: "OTHER", cssVar: "--other", className: "b-other" },
};

/** 将旧版本“其他集团”里的常见自定义名称迁移到独立集团。 */
const LEGACY_GROUP_ALIASES: Record<string, LoyaltyGroup> = {
  "万豪旅享家": "marriott", "marriott bonvoy": "marriott", "万豪": "marriott",
  "凯悦天地": "hyatt", "world of hyatt": "hyatt", "凯悦": "hyatt",
  "洲际优悦会": "ihg", "ihg one rewards": "ihg", "洲际": "ihg",
  "雅高心悦界": "accor", "all accor": "accor", "accor": "accor", "雅高": "accor",
  "香格里拉会": "shangrila", "shangri-la circle": "shangrila", "香格里拉": "shangrila",
  "gha discovery": "gha", "gha": "gha",
};

export function normalizeLegacyGroup(group: LoyaltyGroup, customName?: string): LoyaltyGroup {
  if (group !== "other" || !customName) return group;
  return LEGACY_GROUP_ALIASES[customName.trim().toLowerCase()] || group;
}

/** 各集团常见子品牌，表单下拉用；可自由输入不受限 */
export const GROUP_BRANDS: Record<LoyaltyGroup, string[]> = {
  hilton: [
    "华尔道夫", "康莱德", "嘉悦里", "希尔顿", "希尔顿格芮精选", "希尔顿西嘉", "希尔顿逸林", "希尔顿启缤精选", "希尔顿尊盛",
    "希尔顿博莱罗", "希尔顿莫托", "希尔顿花园", "希尔顿欢朋", "希尔顿汤俪", "希尔顿斯帕克", "希尔顿欣庭", "希尔顿惠庭", "希尔顿智邑", "希尔顿毕业生", "诺迈德",
    "LXR", "Waldorf Astoria", "Conrad", "Canopy", "Signia Hilton", "Hilton", "Curio Collection", "DoubleTree",
    "Tapestry Collection", "Embassy Suites", "Tempo", "Motto", "Hilton Garden Inn", "Hampton", "Tru", "Spark",
    "Homewood Suites", "Home2 Suites", "LivSmart Studios", "Graduate", "NoMad",
  ],
  huazhu: [
    "禧玥", "花间堂", "施柏阁", "施柏阁大观", "美仑", "美仑国际", "美仑美奂", "城际", "城家", "城家精选",
    "全季", "全季大观", "桔子水晶", "桔子", "桔子精选", "漫心", "星程", "汉庭", "汉庭优佳", "汉庭快捷",
    "怡莱", "海友", "你好", "CitiGO欢阁臻选", "宋品", "堇悦", "堇山", "馨乐庭", "瑞贝庭", "青果", "华飨",
    "CitiGO", "Zleep", "VUE", "VIEHouse", "Steigenberger", "MAXX by Steigenberger", "IntercityHotel",
  ],
  marriott: [
    "宝格丽", "丽思卡尔顿隐世", "丽思卡尔顿", "瑞吉", "艾迪逊", "豪华精选", "JW万豪", "万豪", "喜来登", "德尔塔", "威斯汀", "艾美", "万丽", "傲途格精选", "臻品之选", "万怡", "福朋喜来登", "万枫", "雅乐轩", "源宿", "万豪行政公寓", "普罗提亚", "盖洛德", "城市宜选", "万豪旅享家美高梅精选", "万豪度假会",
    "W", "AC", "Design Hotels", "citizenM", "Moxy", "StudioRes", "Residence Inn", "TownePlace Suites", "Four Points Flex",
    "Series by Marriott", "Outdoor Collection",
    "Bulgari Hotels & Resorts", "The Ritz-Carlton", "Ritz-Carlton Reserve", "St. Regis", "W Hotels", "EDITION",
    "JW Marriott", "The Luxury Collection", "Marriott Hotels", "Sheraton", "Marriott Vacation Club", "Delta Hotels",
    "Westin", "Le Méridien", "Renaissance", "Gaylord", "Courtyard", "Four Points by Sheraton", "SpringHill Suites",
    "Fairfield", "AC Hotels", "Aloft", "Protea Hotels", "City Express by Marriott",
    "Element", "Homes & Villas by Marriott Bonvoy",
    "Apartments by Marriott Bonvoy", "Marriott Executive Apartments", "Autograph Collection",
    "Tribute Portfolio", "MGM Collection with Marriott Bonvoy",
  ],
  hyatt: [
    "柏悦", "阿丽拉", "安达仕", "凯悦臻选", "凯悦", "君悦", "桐森", "凯悦尚选",
    "凯悦尚萃", "凯悦嘉荟", "凯悦嘉轩", "凯悦嘉寓", "凯悦乐家", "凯悦奇乐", "凯悦悠选", "逸扉",
    "Miraval", "The Standard", "Dream Hotels", "The StandardX", "Breathless Resorts & Spas", "Bunkhouse Hotels",
    "Me and All Hotels", "Zoëtry Wellness & Spa Resorts", "Secrets Resorts & Spas", "Dreams Resorts & Spas",
    "Hyatt Vivid Hotels & Resorts", "Sunscape Resorts & Spas", "Alua Hotels & Resorts", "Hyatt Vacation Club", "Hyatt Studios",
    "Hyatt Select", "UrCove", "Park Hyatt", "Alila", "Grand Hyatt", "Hyatt Regency", "Hyatt", "Destination by Hyatt",
    "Hyatt Centric", "Hyatt Place", "Hyatt House", "Andaz", "Thompson Hotels", "JdV by Hyatt", "Caption by Hyatt", "Impression by Secrets",
  ],
  ihg: [
    "六善", "丽晶", "洲至奢选", "英迪格", "华邑", "皇冠假日", "逸衡", "洲际", "金普顿", "假日", "智选假日",
    "假日度假", "假日俱乐部", "嘉纳", "筑格",
    "Iberostar", "Ruby Hotels", "voco", "Six Senses", "Regent", "Vignette Collection", "Hotel Indigo", "HUALUXE", "Crowne Plaza",
    "EVEN Hotels", "InterContinental", "Kimpton", "Holiday Inn", "Holiday Inn Express", "Holiday Inn Resort",
    "Holiday Inn Club Vacations", "Garner", "avid hotels", "Staybridge Suites", "Candlewood Suites", "Atwell Suites",
  ],
  accor: [
    "雅高", "莱佛士", "悦榕庄", "费尔蒙", "索菲特传奇", "索菲特", "里克索斯", "美憬阁", "铂尔曼", "瑞士", "悦椿",
    "25小时", "莫凡彼", "美爵", "诗铂", "阿德吉奥特级", "诺富特", "美居", "阿德吉奥", "妈妈屋", "宜必思", "宜必思尚品",
    "宜必思经济", "阿德吉奥阿克瑟斯", "塔拉萨",
    "SO/", "Mantis", "Jo&Joe", "Handwritten Collection", "greet", "Banyan Tree", "Fairmont", "Sofitel Legend", "Sofitel", "Mövenpick", "Rixos", "MGallery", "Pullman",
    "Swissôtel", "Angsana", "25hours", "Grand Mercure", "Novotel", "Mercure", "Adagio", "Mama Shelter", "ibis",
    "ibis Styles", "ibis budget", "Adagio Access", "F1", "HotelF1", "Thalassa sea & Spa", "TRIBE",
  ],
  shangrila: [
    "香格里拉", "香格里拉·水知心居", "香格里拉心玺", "嘉里", "盛贸",
    "JEN", "Shangri-La Hotels and Resorts", "Shangri-La Signatures", "Kerry Hotels", "Traders Hotels",
  ],
  gha: [
    "安纳塔拉", "阿瓦尼", "嘉佩乐", "科林西亚", "凯宾斯基", "泛太平洋", "公园皇家", "丽晶会馆", "罗塔纳", "尼科罗",
    "诺金", "橡树", "欧特瑞格", "维克罗伊", "素凯泰", "蒂沃利", "安德罗尼斯", "阿尔玛纳克", "阿莱雅",
    "阿尔姜",
    "JA Resorts", "The Leela", "Marco Polo", "Mysk", "NH Hotels", "NH Collection", "nhow", "Nikki Beach", "NUO", "Oaks",
    "OUTRIGGER", "PARKROYAL COLLECTION", "PARKROYAL", "Patina", "PURO", "Rayhaan", "Rotana", "The Residence by Cenizaro",
    "SAii", "Shaza", "The Sukhothai", "Sun International", "Sunway", "Tivoli", "Viceroy", "Adeera", "Almanac", "Anantara",
    "Andronis", "Araiya", "Arjaan", "ASMALLWORLD", "Avani", "Bristoria", "Capella", "Centro", "Cheval", "Cinnamon",
    "Corinthia", "Divani", "Edge", "The Doyle Collection", "Elewana", "iClub", "iStay", "Lanson Place", "Lore Group",
    "Lungarno", "Maqo", "Marmara", "Niccolo", "Paramount", "Regal", "The Set", "STORY", "TemptingPlaces Collection",
    "Unike", "Ultratravel Collection", "Verdi",
  ],
  other: [],
};

/** 单个会员等级定义 */
export interface TierDef {
  /** 中文等级名（作为 Membership.tier 的规范值） */
  name: string;
  /** 英文等级名 */
  en?: string;
  /** 达到该等级所需的本年入住晚数门槛 */
  nights: number;
}

/**
 * 各集团真实定级体系（按晚数升序）。仅晚数口径——官方"晚数 OR 次数 OR 积分"三选一中的晚数门槛。
 * 门槛数据核实于各集团 2025 官方规则。修改门槛只需改这里。
 * other（自定义集团）无内置等级，走手填回退。
 */
export const GROUP_TIERS: Record<LoyaltyGroup, TierDef[]> = {
  hilton: [
    { name: "会员", en: "Member", nights: 0 },
    { name: "银卡", en: "Silver", nights: 10 },
    { name: "金卡", en: "Gold", nights: 25 },
    { name: "钻石", en: "Diamond", nights: 50 },
    { name: "曜钻", en: "Diamond+", nights: 80 },
  ],
  huazhu: [
    { name: "星会员", en: "Star", nights: 0 },
    { name: "银会员", en: "Silver", nights: 3 },
    { name: "金会员", en: "Gold", nights: 5 },
    { name: "铂金会员", en: "Platinum", nights: 30 },
  ],
  // 这些集团先使用手填等级/目标晚数，避免在未确认规则时内置错误门槛。
  marriott: [],
  hyatt: [],
  ihg: [],
  accor: [],
  shangrila: [],
  gha: [],
  other: [],
};
