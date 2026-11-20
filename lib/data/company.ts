import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { mediaUrl } from "@/lib/media-url";

export const getCompanyContent = cache(async () => {
  const [profile, milestones, storyEntries, qualityEntries, centenaryEntry, awards, notice, ratingBreakdown] = await Promise.all([
    prisma.companyProfile.findUnique({ where: { id: "main" } }),
    prisma.companyMilestone.findMany({ where: { isPublished: true }, orderBy: { sortOrder: "asc" } }),
    prisma.companyInsight.findMany({ where: { section: "story", isPublished: true }, orderBy: { sortOrder: "asc" } }),
    prisma.companyInsight.findMany({ where: { section: "quality", isPublished: true }, orderBy: { sortOrder: "asc" } }),
    prisma.companyInsight.findFirst({ where: { section: "centenary", isPublished: true }, orderBy: { sortOrder: "asc" } }),
    prisma.award.findMany({ where: { isPublished: true }, orderBy: { sortOrder: "asc" }, include: { image: { select: { key: true } } } }),
    prisma.siteNotice.findUnique({ where: { id: "main" } }),
    prisma.ratingBreakdown.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!profile || !notice) throw new Error("Company content has not been imported. Run `npm run data:migrate` after configuring S3_BUCKET_NAME.");

  return {
    company: {
      brand: profile.brand,
      legalName: profile.legalName,
      sellerName: profile.sellerName,
      founded: profile.founded,
      address: profile.address,
      phoneDisplay: profile.phoneDisplay,
      phoneLink: profile.phoneLink,
      gst: profile.gst,
      coordinates: profile.coordinates,
      website: profile.website,
      videoId: profile.videoId,
      videoThumbnail: mediaUrl(profile.videoThumbnailKey),
      storyImage: mediaUrl(profile.storyImageKey),
      logo: mediaUrl(profile.logoKey),
    },
    history: milestones.map(({ year, title, detail }) => ({ year, title, detail })),
    companyStory: storyEntries.map(({ body }) => body),
    qualityNotes: qualityEntries.map(({ body }) => body),
    centenary: {
      title: centenaryEntry?.title ?? "One hundred years, carried forward.",
      body: centenaryEntry?.body ?? "",
      year: milestones.find(({ title, detail }) => /100 years|century/i.test(`${title} ${detail}`))?.year ?? String(profile.founded + 100),
    },
    awards: awards.map(({ year, title, detail, image }) => ({
      year,
      title,
      detail,
      image: image?.key ? mediaUrl(image.key) : "",
    })),
    rating: {
      score: profile.ratingScore,
      count: profile.ratingCount,
      distribution: ratingBreakdown.map(({ stars, percent }) => ({ stars, percent })),
    },
    newsNotice: {
      title: notice.title,
      body: notice.body,
      accountName: notice.accountName,
      bank: notice.bank,
      accountNumber: notice.accountNumber,
      ifsc: notice.ifsc,
      address: notice.address,
      contactName: notice.contactName,
      contactPhone: notice.contactPhone,
    },
  };
});

export const getEditorialConfig = cache(async (slug: string) =>
  prisma.editorialPage.findFirst({ where: { slug, isPublished: true } }),
);
