export const company = {
  brand: "BDM Cricket",
  legalName: "B. D. Mahajan & Sons Pvt. Ltd.",
  sellerName: "BDMR Cricket Solutions",
  founded: 1925,
  address: "A 61, Block A, Defence Colony, Meerut 250001, Uttar Pradesh, India",
  phoneDisplay: "+91 79493 66862",
  phoneLink: "+917949366862",
  gst: "09AKQPC6801R1ZI",
  coordinates: "29.021807,77.747536",
  website: "https://www.bdmcricket.net/",
  videoId: "44wLV5-NZmY",
  videoThumbnail: "/assets/hqdefault-7vlfi7lt.jpg",
};

export const history = [
  {
    year: "1925",
    title: "A cricket trade begins",
    detail:
      "Sri B. D. Mahajan began the family’s cricket bat and hockey stick trade in Sialkot, working alongside his elder brothers.",
  },
  {
    year: "1947",
    title: "A new home in Meerut",
    detail:
      "After Partition, the family moved to Meerut, Uttar Pradesh, and began rebuilding its sports equipment business.",
  },
  {
    year: "1950",
    title: "The first bats in Meerut",
    detail:
      "The company profile records a manufacturing unit starting with borrowed capital of Rs 400 and an early output of 16 bats a day. It later lists capacity of up to 600 bats a day.",
  },
  {
    year: "1967 / 1986",
    title: "The family company takes shape",
    detail:
      "B. D. Mahajan & Sons was established with Sri B. D. Mahajan’s sons in 1967 and became a private limited company in 1986.",
  },
];

export const companyStory = [
  "B. D. Mahajan & Sons Private Limited is based in Meerut and describes its work as manufacturing and exporting BDM cricket equipment. The range spans cricket bats, balls, soft leather protective equipment, and accessories.",
  "The company profile describes a production and distribution network, teams of technicians and managers, and a quality process developed around ICC/MCC specifications. The brand’s roots go back to the family cricket trade started in 1925.",
  "The original company pages also describe ongoing product development for different formats of cricket and for players from beginner through professional levels.",
];

export const qualityNotes = [
  "The company describes its quality system as a defined process aligned to international standards.",
  "Its company profile says BDM products are developed with reference to ICC/MCC specifications and changing formats of the game.",
  "The site describes teams across production, quality assurance, warehousing, sales, and marketing.",
];

export const awards = [
  {
    year: "2005",
    title: "National Award for Quality Product",
    detail:
      "The company profile says B. D. Mahajan & Sons received the MSME, Government of India, National Award for Quality Product in 2005.",
    image: "/assets/msme-award-20050004-500x500-1o1o41m1.jpg",
  },
  {
    year: "PPDC · MSME",
    title: "Cricket-ball automation recognition",
    detail:
      "The source site records recognition from PPDC Meerut and MSME for developing a machine that introduced automation to cricket-ball production.",
    image: "/assets/2007-prize-copy-1-500x500-1hj1hxcd.jpg",
  },
  {
    year: "ABP News",
    title: "Three consecutive Best Brand of U.P. awards",
    detail:
      "The company profile reports three consecutive ABP News awards for Best Brand of Uttar Pradesh.",
    image: "/assets/bdm-award-show-500x500-1c5wqbk1.jpg",
  },
  {
    year: "Nomination",
    title: "Arjuna Award nomination",
    detail:
      "BDM was nominated for the Arjuna Award by the Ministry of Sports. The original company page states that the award went to another nominee.",
    image: "/assets/rewards-500x500-3zmz091c.jpg",
  },
];

export const rating = {
  score: "4.5",
  count: 258,
  distribution: [
    { stars: 5, percent: 65 },
    { stars: 4, percent: 17 },
    { stars: 3, percent: 8 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 9 },
  ],
};

export const newsNotice = {
  title: "Payment notice",
  body:
    "The source site asks customers to make payments only to the firm’s current account. It names BDM R Cricket Solutions and Central Bank of India, and lists the following account details:",
  accountName: "BDM R Cricket Solutions",
  bank: "Central Bank of India",
  accountNumber: "3452924404",
  ifsc: "CBIN0282337",
  address: "Jail Chungi, Meerut",
  contactName: "Harsh Sharma",
  contactPhone: "9528702763",
};

export const sitePages = [
  "about-us", "awards", "bdm-english-willow-cricket-bat", "company-insights", "corporate-video",
  "cricket-accessories", "cricket-ball", "cricket-bat", "cricket-batting-gloves", "cricket-batting-pad",
  "cricket-battingpad-sportsacademy", "cricket-equipment", "cricket-equipments", "cricket-hat",
  "cricket-helmet", "cricket-kit-bag", "cricket-protective-equipment", "cricket-wicketkeeping-gloves",
  "cricket-wicketkeeping-pad", "enquiry", "jobs", "leather-cricket-ball", "news", "our-excellence",
  "photos", "profile", "quality", "sitemap", "testimonial", "white-cricket-wear", "wicket-keeping-gloves",
] as const;

export type SitePageSlug = (typeof sitePages)[number];
