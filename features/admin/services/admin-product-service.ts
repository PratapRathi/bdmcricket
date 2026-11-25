import "server-only";

import { prisma } from "@/lib/prisma";
import { mediaUrl } from "@/lib/media-url";
import type { AdminIdentity } from "@/lib/admin-auth/session";
import type { z } from "zod";
import { productAdminSchema } from "@/features/admin/validation/schemas";

type ProductInput = z.infer<typeof productAdminSchema>;

async function validateReferences(input: ProductInput) {
  const category = await prisma.productCategory.findUnique({ where: { id: input.categoryId }, select: { id: true } });
  if (!category) return "Choose an existing category.";

  const subcategoryIds = [...new Set(input.subcategoryIds)];
  if (subcategoryIds.length !== input.subcategoryIds.length) return "A subcategory can only be selected once.";
  if (subcategoryIds.length) {
    const count = await prisma.productSubcategory.count({ where: { id: { in: subcategoryIds }, categoryId: input.categoryId } });
    if (count !== subcategoryIds.length) return "Every selected subcategory must belong to the selected category.";
  }

  const mediaKeys = [...new Set([...input.imageKeys, ...(input.mainImageKey ? [input.mainImageKey] : [])])];
  if (mediaKeys.length) {
    const count = await prisma.mediaAsset.count({ where: { key: { in: mediaKeys } } });
    if (count !== mediaKeys.length) return "Every selected image must exist in the media library.";
  }
  return null;
}

function productData(input: ProductInput) {
  const { imageKeys, subcategoryIds, specifications, ...product } = input;
  return { ...product, imageKeys, subcategoryIds, specifications };
}

export async function listAdminProducts() {
  const [products, categories, media] = await Promise.all([
    prisma.product.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      take: 500,
      include: {
        category: { select: { name: true } },
        subcategories: { orderBy: { sortOrder: "asc" }, include: { subcategory: { select: { id: true, name: true } } } },
        images: { orderBy: { sortOrder: "asc" }, select: { assetKey: true } },
        specifications: { orderBy: { sortOrder: "asc" }, select: { name: true, value: true } },
      },
    }),
    prisma.productCategory.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, slug: true, name: true, subcategories: { orderBy: { sortOrder: "asc" }, select: { id: true, name: true, isPublished: true } } } }),
    prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" }, take: 500, select: { id: true, key: true, contentType: true, byteSize: true, altText: true } }),
  ]);

  return {
    products: products.map((product) => ({
      ...product,
      subcategoryIds: product.subcategories.map(({ subcategory }) => subcategory.id),
      imageKeys: product.images.map(({ assetKey }) => assetKey),
    })),
    categories,
    media: media.map(({ byteSize, ...asset }) => ({ ...asset, byteSize: byteSize.toString(), url: mediaUrl(asset.key) })),
  };
}

export async function createAdminProduct(actor: AdminIdentity, input: ProductInput) {
  const invalidReference = await validateReferences(input);
  if (invalidReference) return { error: invalidReference } as const;
  const values = productData(input);

  const product = await prisma.$transaction(async (tx) => {
    const created = await tx.product.create({
      data: {
        slug: values.slug,
        name: values.name,
        categoryId: values.categoryId,
        price: values.price,
        productCode: values.productCode,
        sortOrder: values.sortOrder,
        isPublished: values.isPublished,
        isFeatured: values.isFeatured,
        featuredSortOrder: values.featuredSortOrder,
        stockQuantity: values.stockQuantity,
        lowStockThreshold: values.lowStockThreshold,
        mainImageKey: values.mainImageKey,
        specifications: { create: values.specifications.map((item, sortOrder) => ({ ...item, sortOrder })) },
        images: { create: values.imageKeys.map((assetKey, sortOrder) => ({ assetKey, sortOrder })) },
        subcategories: { create: values.subcategoryIds.map((subcategoryId, sortOrder) => ({ subcategoryId, sortOrder })) },
      },
      select: { id: true, name: true, slug: true },
    });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "CREATE", entityType: "Product", entityId: String(created.id), summary: `Created product ${created.name}.` } });
    return created;
  });
  return { product } as const;
}

export async function updateAdminProduct(actor: AdminIdentity, id: number, input: ProductInput) {
  const invalidReference = await validateReferences(input);
  if (invalidReference) return { error: invalidReference } as const;
  const values = productData(input);

  const product = await prisma.$transaction(async (tx) => {
    const updated = await tx.product.update({
      where: { id },
      data: {
        slug: values.slug,
        name: values.name,
        categoryId: values.categoryId,
        price: values.price,
        productCode: values.productCode,
        sortOrder: values.sortOrder,
        isPublished: values.isPublished,
        isFeatured: values.isFeatured,
        featuredSortOrder: values.featuredSortOrder,
        stockQuantity: values.stockQuantity,
        lowStockThreshold: values.lowStockThreshold,
        mainImageKey: values.mainImageKey,
        specifications: { deleteMany: {}, create: values.specifications.map((item, sortOrder) => ({ ...item, sortOrder })) },
        images: { deleteMany: {}, create: values.imageKeys.map((assetKey, sortOrder) => ({ assetKey, sortOrder })) },
        subcategories: { deleteMany: {}, create: values.subcategoryIds.map((subcategoryId, sortOrder) => ({ subcategoryId, sortOrder })) },
      },
      select: { id: true, name: true, slug: true },
    });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "UPDATE", entityType: "Product", entityId: String(id), summary: `Updated product ${updated.name}.` } });
    return updated;
  });
  return { product } as const;
}

export async function deleteAdminProduct(actor: AdminIdentity, id: number) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.delete({ where: { id }, select: { name: true } });
    await tx.adminAuditLog.create({ data: { actorId: actor.id, action: "DELETE", entityType: "Product", entityId: String(id), summary: `Deleted product ${product.name}.` } });
    return product;
  });
}
