import "server-only";

import { prisma } from "@/lib/prisma";
import type { AdminIdentity } from "@/lib/admin-auth/session";
import type { z } from "zod";
import {
  awardAdminSchema,
  editorialAdminSchema,
  insightAdminSchema,
  milestoneAdminSchema,
  noticeAdminSchema,
  profileAdminSchema,
  ratingsAdminSchema,
} from "@/features/admin/validation/schemas";

export async function getAdminSiteContent() {
  const [profile, notice, milestones, insights, awards, editorialPages, ratingBreakdown] = await Promise.all([
    prisma.companyProfile.findUnique({ where: { id: "main" } }),
    prisma.siteNotice.findUnique({ where: { id: "main" } }),
    prisma.companyMilestone.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.companyInsight.findMany({ orderBy: [{ section: "asc" }, { sortOrder: "asc" }] }),
    prisma.award.findMany({ orderBy: { sortOrder: "asc" }, include: { image: { select: { key: true } } } }),
    prisma.editorialPage.findMany({ orderBy: { slug: "asc" } }),
    prisma.ratingBreakdown.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);
  return { profile, notice, milestones, insights, awards, editorialPages, ratingBreakdown };
}

export async function updateCompanyProfile(actor: AdminIdentity, input: z.infer<typeof profileAdminSchema>) {
  return prisma.$transaction(async (tx) => {
    const profile = await tx.companyProfile.upsert({ where: { id: "main" }, create: { id: "main", ...input }, update: input });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "CompanyProfile", entityId: "main", summary: "Updated the company profile." } });
    return profile;
  });
}

export async function updateSiteNotice(actor: AdminIdentity, input: z.infer<typeof noticeAdminSchema>) {
  return prisma.$transaction(async (tx) => {
    const notice = await tx.siteNotice.upsert({ where: { id: "main" }, create: { id: "main", ...input }, update: input });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "SiteNotice", entityId: "main", summary: "Updated the site notice." } });
    return notice;
  });
}

export async function updateRatings(actor: AdminIdentity, input: z.infer<typeof ratingsAdminSchema>) {
  await prisma.$transaction(async (tx) => {
    for (const rating of input) await tx.ratingBreakdown.upsert({ where: { stars: rating.stars }, create: rating, update: rating });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "RatingBreakdown", entityId: "all", summary: "Updated the customer rating distribution." } });
  });
  return input;
}

export async function createMilestone(actor: AdminIdentity, input: z.infer<typeof milestoneAdminSchema>) {
  return prisma.$transaction(async (tx) => {
    const milestone = await tx.companyMilestone.create({ data: input });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "CREATE", entityType: "CompanyMilestone", entityId: String(milestone.id), summary: `Added company milestone ${milestone.year}.` } });
    return milestone;
  });
}

export async function updateMilestone(actor: AdminIdentity, id: number, input: z.infer<typeof milestoneAdminSchema>) {
  return prisma.$transaction(async (tx) => {
    const milestone = await tx.companyMilestone.update({ where: { id }, data: input });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "CompanyMilestone", entityId: String(id), summary: `Updated company milestone ${milestone.year}.` } });
    return milestone;
  });
}

export async function deleteMilestone(actor: AdminIdentity, id: number) {
  return prisma.$transaction(async (tx) => {
    const milestone = await tx.companyMilestone.delete({ where: { id }, select: { year: true } });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "DELETE", entityType: "CompanyMilestone", entityId: String(id), summary: `Deleted company milestone ${milestone.year}.` } });
    return milestone;
  });
}

export async function createInsight(actor: AdminIdentity, input: z.infer<typeof insightAdminSchema>) {
  return prisma.$transaction(async (tx) => {
    const insight = await tx.companyInsight.create({ data: input });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "CREATE", entityType: "CompanyInsight", entityId: String(insight.id), summary: `Added ${insight.section} company content.` } });
    return insight;
  });
}

export async function updateInsight(actor: AdminIdentity, id: number, input: z.infer<typeof insightAdminSchema>) {
  return prisma.$transaction(async (tx) => {
    const insight = await tx.companyInsight.update({ where: { id }, data: input });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "CompanyInsight", entityId: String(id), summary: `Updated ${insight.section} company content.` } });
    return insight;
  });
}

export async function deleteInsight(actor: AdminIdentity, id: number) {
  return prisma.$transaction(async (tx) => {
    const insight = await tx.companyInsight.delete({ where: { id }, select: { key: true } });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "DELETE", entityType: "CompanyInsight", entityId: String(id), summary: `Deleted company content ${insight.key}.` } });
    return insight;
  });
}

export async function createAward(actor: AdminIdentity, input: z.infer<typeof awardAdminSchema>) {
  return prisma.$transaction(async (tx) => {
    const award = await tx.award.create({ data: input });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "CREATE", entityType: "Award", entityId: String(award.id), summary: `Added award ${award.title}.` } });
    return award;
  });
}

export async function updateAward(actor: AdminIdentity, id: number, input: z.infer<typeof awardAdminSchema>) {
  return prisma.$transaction(async (tx) => {
    const award = await tx.award.update({ where: { id }, data: input });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "Award", entityId: String(id), summary: `Updated award ${award.title}.` } });
    return award;
  });
}

export async function deleteAward(actor: AdminIdentity, id: number) {
  return prisma.$transaction(async (tx) => {
    const award = await tx.award.delete({ where: { id }, select: { title: true } });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "DELETE", entityType: "Award", entityId: String(id), summary: `Deleted award ${award.title}.` } });
    return award;
  });
}

export async function updateEditorialPage(actor: AdminIdentity, slug: string, input: z.infer<typeof editorialAdminSchema>) {
  return prisma.$transaction(async (tx) => {
    const page = await tx.editorialPage.update({ where: { slug }, data: input });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "EditorialPage", entityId: slug, summary: `Updated page copy for /${slug}.` } });
    return page;
  });
}
