export type LoyaltyGroup =
  | "marriott"
  | "hilton"
  | "ihg"
  | "hyatt"
  | "accor"
  | "shangrila"
  | "gha"
  | "huazhu"
  | "jinjiang"
  | "atour"
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
  /** 是否计入集团有效房晚；旧数据缺省按 true 处理 */
  eligibleNights?: boolean;
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
  marriott: { name: "万豪旅享家", short: "万豪", en: "MARRIOTT BONVOY", cssVar: "--marriott", className: "b-marriott" },
  hilton: { name: "希尔顿荣誉客会", short: "希尔顿", en: "HILTON HONORS", cssVar: "--hilton", className: "b-hilton" },
  ihg: { name: "洲际优悦会", short: "洲际", en: "IHG ONE REWARDS", cssVar: "--ihg", className: "b-ihg" },
  hyatt: { name: "凯悦天地", short: "凯悦", en: "WORLD OF HYATT", cssVar: "--hyatt", className: "b-hyatt" },
  accor: { name: "雅高心悦界", short: "雅高", en: "ALL ACCOR", cssVar: "--accor", className: "b-accor" },
  shangrila: { name: "香格里拉会", short: "香格里拉", en: "SHANGRI-LA CIRCLE", cssVar: "--shangrila", className: "b-shangrila" },
  gha: { name: "GHA DISCOVERY", short: "GHA", en: "GHA DISCOVERY", cssVar: "--gha", className: "b-gha" },
  huazhu: { name: "华住会", short: "华住", en: "H REWARDS", cssVar: "--huazhu", className: "b-huazhu" },
  jinjiang: { name: "锦江荟", short: "锦江", en: "JINJIANG", cssVar: "--jinjiang", className: "b-jinjiang" },
  atour: { name: "亚朵", short: "亚朵", en: "ATOUR", cssVar: "--atour", className: "b-atour" },
  other: { name: "其他集团", short: "其他", en: "OTHER", cssVar: "--other", className: "b-other" },
};

/** 将旧版本“其他集团”里的常见自定义名称迁移到独立集团。 */
const LEGACY_GROUP_ALIASES: Record<string, LoyaltyGroup> = {
  "万豪旅享家": "marriott", "marriott bonvoy": "marriott", "万豪": "marriott",
  "凯悦天地": "hyatt", "world of hyatt": "hyatt", "凯悦": "hyatt",
  "洲际优悦会": "ihg", "ihg one rewards": "ihg", "洲际": "ihg",
  "雅高心悦界": "accor", "all accor": "accor", "accor": "accor", "雅高": "accor",
  "锦江荟": "jinjiang", "jinjiang": "jinjiang", "锦江": "jinjiang",
  "亚朵": "atour", "atour": "atour",
  "香格里拉会": "shangrila", "shangri-la circle": "shangrila", "香格里拉": "shangrila",
  "gha discovery": "gha", "gha": "gha",
};

export function normalizeLegacyGroup(group: LoyaltyGroup, customName?: string): LoyaltyGroup {
  if (group !== "other" || !customName) return group;
  return LEGACY_GROUP_ALIASES[customName.trim().toLowerCase()] || group;
}

/** 各集团常见子品牌，表单下拉用；可自由输入不受限 */
export const GROUP_BRANDS: Record<LoyaltyGroup, string[]> = {
  marriott: [
    "宝格丽", "丽思卡尔顿隐世", "丽思卡尔顿", "瑞吉", "艾迪逊", "豪华精选", "W", "JW万豪",
    "万豪", "喜来登", "德尔塔", "威斯汀", "艾美", "万丽", "盖洛德", "万豪度假会",
    "万怡", "福朋喜来登", "万枫", "普罗提亚", "城市宜选", "雅乐轩", "AC", "Moxy", "SpringHill Suites", "Four Points Flex", "Series by Marriott",
    "Residence Inn", "源宿", "TownePlace Suites", "StudioRes", "万豪行政公寓", "Homes & Villas by Marriott Bonvoy",
    "Apartments by Marriott Bonvoy", "傲途格精选", "臻品之选", "Design Hotels", "citizenM", "万豪旅享家美高梅精选", "Outdoor Collection",
  ],
  hilton: [
    "华尔道夫", "康莱德", "LXR", "希尔顿嘉悦里", "希尔顿格芮精选", "希尔顿西嘉", "希尔顿博莱罗", "诺迈德",
    "希尔顿", "希尔顿逸林", "希尔顿花园", "Signia Hilton", "Tempo", "Motto",
    "希尔顿尊盛", "希尔顿欣庭", "希尔顿惠庭", "Homewood Suites", "Home2 Suites", "LivSmart Studios",
    "希尔顿欢朋", "希尔顿汤俪", "希尔顿斯帕克", "希尔顿智邑", "Tru", "Spark", "希尔顿毕业生",
  ],
  ihg: [
    "六善", "丽晶", "洲际", "金普顿", "英迪格", "洲至奢选",
    "华邑", "皇冠假日", "逸衡", "voco", "Ruby Hotels",
    "假日", "智选假日", "嘉纳", "avid hotels", "Iberostar",
    "筑格", "Staybridge Suites", "Candlewood Suites", "假日度假", "假日俱乐部",
  ],
  hyatt: [
    "柏悦", "阿丽拉", "Miraval", "Impression by Secrets",
    "安达仕", "桐森", "The Standard", "The StandardX", "Dream Hotels", "Thompson Hotels", "Breathless Resorts & Spas", "Bunkhouse Hotels", "Me and All Hotels",
    "Zoëtry Wellness & Spa Resorts", "Secrets Resorts & Spas", "Dreams Resorts & Spas", "Hyatt Vivid Hotels & Resorts", "Sunscape Resorts & Spas", "Alua Hotels & Resorts",
    "君悦", "凯悦", "凯悦臻选", "凯悦尚萃", "凯悦悠选", "Hyatt Vacation Club",
    "凯悦尚选", "凯悦嘉荟", "凯悦嘉轩", "凯悦嘉寓", "凯悦乐家", "凯悦奇乐", "逸扉", "Hyatt Studios", "Hyatt Select", "UrCove",
  ],
  accor: [
    "雅高", "莱佛士", "悦榕庄", "费尔蒙", "索菲特传奇", "美憬阁", "里克索斯", "25小时", "妈妈屋", "SO/", "Mantis", "Jo&Joe",
    "索菲特", "铂尔曼", "瑞士", "悦椿", "美爵", "诗铂", "Handwritten Collection",
    "诺富特", "美居", "阿德吉奥", "阿德吉奥特级", "TRIBE", "塔拉萨",
    "宜必思", "宜必思尚品", "宜必思经济", "阿德吉奥阿克瑟斯", "greet", "F1", "HotelF1",
  ],
  huazhu: [
    "美爵", "你好", "禧玥", "花间堂", "诺富特", "美居", "漫心", "全季", "CitiGO欢阁臻选", "桔子水晶", "桔子精选", "星程", "汉庭优佳", "宜必思尚品", "汉庭", "宜必思", "怡莱", "海友",
    "施柏阁", "施柏阁大观", "美仑", "美仑国际", "美仑美奂", "城际", "城家", "城家精选", "全季大观", "桔子", "汉庭快捷", "宋品", "堇悦", "堇山", "馨乐庭", "瑞贝庭", "青果", "华飨",
    "Zleep", "VUE", "VIEHouse", "MAXX by Steigenberger", "IntercityHotel",
  ],
  jinjiang: [
    "锦江酒店", "锦江都城", "锦江之星", "维也纳", "维也纳国际", "维也纳酒店", "维也纳智好", "维也纳3好", "丽枫", "喆啡", "希岸",
    "白玉兰", "7天", "7天优品", "派酒店", "潮漫", "凯里亚德", "康铂", "郁锦香", "柏曼", "丽亭",
  ],
  atour: [
    "亚朵", "亚朵S", "亚朵X", "轻居", "轻居2.0", "Z HOTEL", "A.T. HOUSE", "A.T. LIVING",
  ],
  shangrila: [
    "香格里拉", "香格里拉心玺", "香格里拉·水知心居", "嘉里", "盛贸", "JEN",
  ],
  gha: [
    "安纳塔拉", "阿瓦尼", "嘉佩乐", "科林西亚", "凯宾斯基", "泛太平洋", "公园皇家", "丽晶会馆", "罗塔纳", "尼科罗",
    "诺金", "橡树", "欧特瑞格", "维克罗伊", "素凯泰", "蒂沃利", "安德罗尼斯", "阿尔玛纳克", "阿莱雅",
    "阿尔姜",
    "JA Resorts", "The Leela", "Marco Polo", "Mysk", "NH Hotels", "NH Collection", "nhow", "Nikki Beach", "NUO",
    "Patina", "PURO", "Rayhaan", "The Residence by Cenizaro", "SAii", "Shaza", "Sun International", "Sunway", "Adeera",
    "ASMALLWORLD", "Bristoria", "Centro", "Cheval", "Cinnamon", "Divani", "Edge", "The Doyle Collection", "Elewana",
    "iClub", "iStay", "Lanson Place", "Lore Group", "Lungarno", "Maqo", "Marmara", "Paramount", "Regal", "The Set",
    "STORY", "TemptingPlaces Collection",
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
  /** 该计划不能仅凭房晚自动推导，需要手动填写目标 */
  manualOnly?: boolean;
}

/**
 * 各集团真实定级体系（按官方等级顺序）。可按房晚计算的等级使用 nights；
 * 同时依赖次数、消费或品牌数量的计划用 manualOnly 列出等级，但进度仍走手填。
 * 门槛数据核实于各集团 2025 官方规则。修改门槛只需改这里。
 * other（自定义集团）无内置等级，走手填回退。
 */
export const GROUP_TIERS: Record<LoyaltyGroup, TierDef[]> = {
  marriott: [
    { name: "会员", en: "Member", nights: 0 },
    { name: "银卡", en: "Silver", nights: 10 },
    { name: "金卡", en: "Gold", nights: 25 },
    { name: "白金", en: "Platinum", nights: 50 },
    { name: "钛金", en: "Titanium", nights: 75 },
    { name: "大使", en: "Ambassador", nights: 100, manualOnly: true},
  ],
  hilton: [
    { name: "会员", en: "Member", nights: 0, manualOnly: true},
    { name: "银卡", en: "Silver", nights: 10, manualOnly: true},
    { name: "金卡", en: "Gold", nights: 25, manualOnly: true},
    { name: "钻石", en: "Diamond", nights: 50, manualOnly: true},
    { name: "曜钻", en: "Diamond Reserve", nights: 80, manualOnly: true},
  ],
  ihg: [
    { name: "会员", en: "Club Member", nights: 0 },
    { name: "银卡", en: "Silver", nights: 10 },
    { name: "金卡", en: "Gold", nights: 20 },
    { name: "白金", en: "Platinum", nights: 40 },
    { name: "钻石", en: "Diamond", nights: 70 },
  ],
  hyatt: [
    { name: "会员", en: "Member", nights: 0 },
    { name: "探索者", en: "Discoverist", nights: 10 },
    { name: "冒险家", en: "Explorist", nights: 30 },
    { name: "环球客", en: "Globalist", nights: 60 },
  ],
  accor: [
    { name: "会员", en: "Member", nights: 0 },
    { name: "银卡", en: "Silver", nights: 10 },
    { name: "金卡", en: "Gold", nights: 30 },
    { name: "白金", en: "Platinum", nights: 60 },
  ],
  huazhu: [
    { name: "星会员", en: "Star", nights: 0 },
    { name: "银会员", en: "Silver", nights: 3 },
    { name: "金会员", en: "Gold", nights: 5 },
    { name: "铂金会员", en: "Platinum", nights: 30 },
  ],
  jinjiang: [
    { name: "普卡", en: "Member", nights: 0 },
    { name: "银卡", en: "Silver", nights: 5 },
    { name: "金卡", en: "Gold", nights: 15 },
    { name: "白金", en: "Platinum", nights: 30 },
    { name: "黑卡", en: "Black Card", nights: 0, manualOnly: true },
  ],
  atour: [
    { name: "会员", en: "Member", nights: 0 },
    { name: "银卡", en: "Silver", nights: 1 },
    { name: "金卡", en: "Gold", nights: 6 },
    { name: "铂金", en: "Platinum", nights: 36 },
    { name: "黑金", en: "Black Gold", nights: 0, manualOnly: true },
  ],
  shangrila: [
    { name: "黄金", en: "Gold", nights: 0 },
    { name: "翡翠", en: "Jade", nights: 20 },
    { name: "钻石", en: "Diamond", nights: 50 },
    { name: "帝星", en: "Polaris", nights: 0, manualOnly: true },
  ],
  gha: [
    { name: "银卡", en: "Silver", nights: 0, manualOnly: true },
    { name: "金卡", en: "Gold", nights: 0, manualOnly: true },
    { name: "铂金", en: "Platinum", nights: 10, manualOnly: true},
    { name: "钛金", en: "Titanium", nights: 30, manualOnly: true},
  ],
  other: [],
};
