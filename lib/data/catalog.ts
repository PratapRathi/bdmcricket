import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { mediaUrl } from "@/lib/media-url";
import type { Prisma } from "@/generated/prisma/client";
import type { Product, ProductCategory, ProductSubcategory } from "@/lib/catalog-types";

const productInclude = {
  category: true,
  mainImage: { select: { key: true } },
  images: { orderBy: { sortOrder: "asc" }, include: { asset: { select: { key: true } } } },
  specifications: { orderBy: { sortOrder: "asc" } },
  subcategories: { orderBy: { sortOrder: "asc" }, include: { subcategory: true } },
} satisfies Prisma.ProductInclude;

type ProductRow = Prisma.ProductGetPayload<{ include: typeof productInclude }>;

function mapProduct(product: ProductRow): Product {
  const images = product.images.map(({ asset }) => mediaUrl(asset.key));
  const image = product.mainImage?.key
    ? mediaUrl(product.mainImage.key)
    : images[0] ?? "";
  const subcategories: ProductSubcategory[] = product.subcategories
    .map(({ subcategory }) => ({
      slug: subcategory.slug,
      name: subcategory.name,
      description: subcategory.description,
      count: 0,
    }));

  return {
    slug: product.slug,
    name: product.name,
    category: product.category.name,
    categorySlug: product.category.slug,
    subcategorySlugs: subcategories.map(({ slug }) => slug),
    subcategories,
    price: product.price,
    image,
    images: images.length ? images : image ? [image] : [],
    productCode: product.productCode,
    specifications: product.specifications.map(({ name, value }) => ({ name, value })),
    isFeatured: product.isFeatured,
    featuredSortOrder: product.featuredSortOrder,
  };
}

export const getCategories = cache(async (): Promise<ProductCategory[]> => {
  const rows = await prisma.productCategory.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    include: {
      products: { where: { isPublished: true }, select: { id: true } },
      subcategories: {
        where: { isPublished: true },
        orderBy: { sortOrder: "asc" },
        include: { products: { where: { product: { isPublished: true } }, select: { productId: true } } },
      },
    },
  });

  return rows.map((category) => ({
    slug: category.slug,
    name: category.name,
    description: category.description,
    count: category.products.length,
    subcategories: category.subcategories.map((subcategory) => ({
      slug: subcategory.slug,
      name: subcategory.name,
      description: subcategory.description,
      count: subcategory.products.length,
    })).filter((subcategory) => subcategory.count > 0),
  }));
});

export const getProducts = cache(async (): Promise<Product[]> => {
  const rows = await prisma.product.findMany({
    where: { isPublished: true, category: { isPublished: true } },
    orderBy: { sortOrder: "asc" },
    include: productInclude,
  });

  return rows.map(mapProduct);
});

export const getProductsByCategorySlug = cache(async (slug: string): Promise<Product[]> => {
  const rows = await prisma.product.findMany({
    where: { isPublished: true, category: { slug, isPublished: true } },
    orderBy: { sortOrder: "asc" },
    include: productInclude,
  });
  return rows.map(mapProduct);
});

export const getProductBySlug = cache(async (slug: string) => {
  const row = await prisma.product.findUnique({ where: { slug }, include: productInclude });
  if (!row?.isPublished || !row.category.isPublished) return null;
  return mapProduct(row);
});

export const getCategoryBySlug = cache(async (slug: string) =>
  (await getCategories()).find((category) => category.slug === slug) ?? null,
);

export const getLegacyRedirect = cache(async (slug: string) => {
  const row = await prisma.legacyRedirect.findUnique({ where: { sourceSlug: slug } });
  return row?.destination ?? null;
});
