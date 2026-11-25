import { z } from "zod";

export const adminLoginSchema = z.object({
  username: z.string().trim().min(3).max(64).transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(128),
});

export const adminCredentialsSchema = z.object({
  currentPassword: z.string().min(1).max(128),
  newUsername: z.string().trim().min(3).max(64).transform((value) => value.toLowerCase()).optional(),
  newPassword: z.string().min(14).max(128).optional(),
}).refine((input) => input.newUsername !== undefined || input.newPassword !== undefined, { message: "Enter a new admin ID or password." });

export const productAdminSchema = z.object({
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120),
  name: z.string().trim().min(1).max(180),
  categoryId: z.number().int().positive(),
  price: z.string().trim().max(120).default(""),
  productCode: z.string().trim().max(80).default(""),
  sortOrder: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  featuredSortOrder: z.number().int().min(0).nullable().default(null),
  stockQuantity: z.number().int().min(0).default(0),
  lowStockThreshold: z.number().int().min(0).default(5),
  mainImageKey: z.string().min(1).max(500).nullable().default(null),
  imageKeys: z.array(z.string().min(1).max(500)).max(30).default([]),
  subcategoryIds: z.array(z.number().int().positive()).max(50).default([]),
  specifications: z.array(z.object({ name: z.string().trim().min(1).max(120), value: z.string().trim().min(1).max(500) })).max(40).default([]),
});

export const categoryAdminSchema = z.object({
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(80),
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().max(2000).default(""),
  sortOrder: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

export const subcategoryAdminSchema = z.object({
  categoryId: z.number().int().positive(),
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100),
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().max(2000).default(""),
  sortOrder: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

export const profileAdminSchema = z.object({
  brand: z.string().trim().min(1).max(120),
  legalName: z.string().trim().min(1).max(200),
  sellerName: z.string().trim().min(1).max(200),
  founded: z.number().int().min(1800).max(2200),
  address: z.string().trim().min(1).max(2000),
  phoneDisplay: z.string().trim().min(1).max(80),
  phoneLink: z.string().trim().min(1).max(80),
  gst: z.string().trim().max(80),
  coordinates: z.string().trim().max(120),
  website: z.string().trim().max(300),
  videoId: z.string().trim().max(120),
  videoThumbnailKey: z.string().trim().min(1).max(500),
  storyImageKey: z.string().trim().min(1).max(500),
  logoKey: z.string().trim().min(1).max(500),
  ratingScore: z.string().trim().max(20),
  ratingCount: z.number().int().min(0),
});

export const noticeAdminSchema = z.object({
  title: z.string().trim().min(1).max(200),
  body: z.string().trim().min(1).max(5000),
  accountName: z.string().trim().max(200),
  bank: z.string().trim().max(200),
  accountNumber: z.string().trim().max(100),
  ifsc: z.string().trim().max(100),
  address: z.string().trim().max(500),
  contactName: z.string().trim().max(120),
  contactPhone: z.string().trim().max(80),
  isPublished: z.boolean().default(true),
});

export const milestoneAdminSchema = z.object({
  year: z.string().trim().min(1).max(30),
  title: z.string().trim().min(1).max(200),
  detail: z.string().trim().min(1).max(5000),
  sortOrder: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

export const insightAdminSchema = z.object({
  key: z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120),
  section: z.enum(["story", "quality", "centenary"]),
  title: z.string().trim().max(200).nullable().default(null),
  body: z.string().trim().min(1).max(8000),
  sortOrder: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

export const awardAdminSchema = z.object({
  year: z.string().trim().min(1).max(30),
  title: z.string().trim().min(1).max(200),
  detail: z.string().trim().min(1).max(5000),
  imageKey: z.string().min(1).max(500).nullable().default(null),
  sortOrder: z.number().int().min(0).default(0),
  isPublished: z.boolean().default(true),
});

export const editorialAdminSchema = z.object({
  eyebrow: z.string().trim().min(1).max(160),
  title: z.string().trim().min(1).max(300),
  intro: z.string().trim().min(1).max(8000),
  metaDescription: z.string().trim().min(1).max(320),
  isPublished: z.boolean(),
});

export const ratingsAdminSchema = z.array(z.object({
  stars: z.number().int().min(1).max(5),
  percent: z.number().int().min(0).max(100),
  sortOrder: z.number().int().min(0),
})).length(5).refine((items) => new Set(items.map((item) => item.stars)).size === 5, { message: "Ratings must include one entry for each star value." });

export const contactSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(80).default(""),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(200).default(""),
});

export const enquiryUpdateSchema = z.object({
  status: z.enum(["NEW", "IN_PROGRESS", "RESOLVED"]).optional(),
  adminNotes: z.string().trim().max(5000).optional(),
}).refine((input) => input.status !== undefined || input.adminNotes !== undefined);

export const mediaAltTextSchema = z.object({ altText: z.string().trim().max(500) });
