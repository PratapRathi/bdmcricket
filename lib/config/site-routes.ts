/** Explicit public pages backed by App Router files. Keep this list in sync with app/. */
export const editorialRouteSlugs = [
  "about-us",
  "company-insights",
  "profile",
  "our-excellence",
  "quality",
  "awards",
  "testimonial",
  "news",
  "corporate-video",
  "photos",
  "jobs",
  "enquiry",
  "sitemap",
] as const;

export type EditorialRouteSlug = (typeof editorialRouteSlugs)[number];

export const categoryRouteSlugs = [
  "bats",
  "balls",
  "kit-bag",
  "protective-gear",
  "accessories",
  "clothing",
] as const;

export type CategoryRouteSlug = (typeof categoryRouteSlugs)[number];

/** Historical source-site paths preserved as permanent redirects. */
export const legacyRouteRedirects = {
  "cricket-bat": "/bats",
  "bdm-english-willow-cricket-bat": "/bats#english-willow-bats",
  "cricket-ball": "/balls",
  "leather-cricket-ball": "/balls#red-leather-balls",
  "cricket-batting-gloves": "/protective-gear#batting-gloves",
  "wicket-keeping-gloves": "/protective-gear#keeping-gloves",
  "cricket-wicketkeeping-gloves": "/protective-gear#keeping-gloves",
  "cricket-batting-pad": "/protective-gear#batting-pads",
  "cricket-wicketkeeping-pad": "/protective-gear#keeping-pads",
  "cricket-helmet": "/protective-gear#helmets",
  "cricket-kit-bag": "/kit-bag",
  "cricket-protective-equipment": "/protective-gear",
  "cricket-accessories": "/accessories",
  "cricket-hat": "/clothing#hats-caps",
  "white-cricket-wear": "/clothing#cricket-wear",
  "cricket-battingpad-sportsacademy": "/protective-gear#batting-pads",
  "cricket-equipments": "/accessories",
  "cricket-equipment": "/products",
} as const satisfies Record<string, `/${string}`>;

export const legacyHtmlPageSlugs = [
  ...editorialRouteSlugs,
  ...Object.keys(legacyRouteRedirects),
] as const;

export const staticPublicPaths = [
  "/",
  "/products",
  ...categoryRouteSlugs.map((slug) => `/${slug}`),
  ...editorialRouteSlugs.map((slug) => `/${slug}`),
] as const;
