import "server-only";

import { prisma } from "@/lib/prisma";
import type { AdminIdentity } from "@/lib/admin-auth/session";
import type { z } from "zod";
import { categoryAdminSchema, subcategoryAdminSchema } from "@/features/admin/validation/schemas";
import { categoryRouteSlugs } from "@/lib/config/site-routes";

type CategoryInput = z.infer<typeof categoryAdminSchema>;
type SubcategoryInput = z.infer<typeof subcategoryAdminSchema>;

export async function listAdminCategories() {
  return prisma.productCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { products: true } },
      subcategories: { orderBy: { sortOrder: "asc" }, include: { _count: { select: { products: true } } } },
    },
  });
}

export async function createAdminCategory(actor: AdminIdentity, input: CategoryInput) {
  if (categoryRouteSlugs.includes(input.slug as (typeof categoryRouteSlugs)[number])) {
    return { error: "That slug is reserved for an existing public category route." } as const;
  }
  return prisma.$transaction(async (tx) => {
    const category = await tx.productCategory.create({ data: input, select: { id: true, slug: true, name: true } });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "CREATE", entityType: "ProductCategory", entityId: String(category.id), summary: `Created category ${category.name}.` } });
    return { category } as const;
  });
}

export async function updateAdminCategory(actor: AdminIdentity, id: number, input: CategoryInput) {
  const current = await prisma.productCategory.findUnique({ where: { id }, select: { slug: true } });
  if (!current) return { error: "Category not found." } as const;
  const isFixedRoute = categoryRouteSlugs.includes(current.slug as (typeof categoryRouteSlugs)[number]);
  if ((isFixedRoute && input.slug !== current.slug) || (!isFixedRoute && categoryRouteSlugs.includes(input.slug as (typeof categoryRouteSlugs)[number]))) {
    return { error: "A category URL used by a fixed website route cannot be changed." } as const;
  }
  return prisma.$transaction(async (tx) => {
    const category = await tx.productCategory.update({ where: { id }, data: input, select: { id: true, slug: true, name: true } });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "ProductCategory", entityId: String(id), summary: `Updated category ${category.name}.` } });
    return { category } as const;
  });
}

export async function deleteAdminCategory(actor: AdminIdentity, id: number) {
  const count = await prisma.product.count({ where: { categoryId: id } });
  if (count) return { error: `Move or remove its ${count} products before deleting this category.` } as const;
  return prisma.$transaction(async (tx) => {
    const category = await tx.productCategory.delete({ where: { id }, select: { name: true } });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "DELETE", entityType: "ProductCategory", entityId: String(id), summary: `Deleted category ${category.name}.` } });
    return { category } as const;
  });
}

export async function createAdminSubcategory(actor: AdminIdentity, input: SubcategoryInput) {
  const category = await prisma.productCategory.findUnique({ where: { id: input.categoryId }, select: { id: true, name: true } });
  if (!category) return { error: "Choose an existing category." } as const;
  return prisma.$transaction(async (tx) => {
    const subcategory = await tx.productSubcategory.create({ data: input, select: { id: true, name: true } });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "CREATE", entityType: "ProductSubcategory", entityId: String(subcategory.id), summary: `Added ${subcategory.name} to ${category.name}.` } });
    return { subcategory } as const;
  });
}

export async function updateAdminSubcategory(actor: AdminIdentity, id: number, input: SubcategoryInput) {
  const current = await prisma.productSubcategory.findUnique({ where: { id }, select: { id: true, categoryId: true } });
  if (!current) return { error: "Subcategory not found." } as const;
  if (current.categoryId !== input.categoryId) return { error: "Move products to subcategories in the destination category before moving this subcategory." } as const;
  return prisma.$transaction(async (tx) => {
    const subcategory = await tx.productSubcategory.update({ where: { id }, data: input, select: { id: true, name: true } });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "ProductSubcategory", entityId: String(id), summary: `Updated subcategory ${subcategory.name}.` } });
    return { subcategory } as const;
  });
}

export async function deleteAdminSubcategory(actor: AdminIdentity, id: number) {
  const productCount = await prisma.productSubcategoryAssignment.count({ where: { subcategoryId: id } });
  if (productCount) return { error: `Remove this subcategory from its ${productCount} products before deleting it.` } as const;
  return prisma.$transaction(async (tx) => {
    const subcategory = await tx.productSubcategory.delete({ where: { id }, select: { name: true } });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "DELETE", entityType: "ProductSubcategory", entityId: String(id), summary: `Deleted subcategory ${subcategory.name}.` } });
    return { subcategory } as const;
  });
}
