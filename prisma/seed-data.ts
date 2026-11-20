import { products, legacyCategoryRedirects } from "./import-source/products";
import { awards, company, companyStory, history, newsNotice, qualityNotes, rating } from "./import-source/company";
import productTaxonomy from "./import-source/product-taxonomy.json";
import { editorialPages } from "./import-source/editorial-pages";
import { featuredProductNames } from "./import-source/featured-products";
import { storageKeyForLocalPath } from "../lib/media-url";
import type { PrismaClient } from "../generated/prisma/client";

async function createInBatches<T>(rows: T[], create: (batch: T[]) => Promise<unknown>, batchSize = 500) {
  for (let offset = 0; offset < rows.length; offset += batchSize) {
    await create(rows.slice(offset, offset + batchSize));
  }
}

export async function seedSiteData(db: PrismaClient) {
  const { categories: categoryDefinitions } = productTaxonomy;
  const featuredOrderByName = new Map(featuredProductNames.map((name, index) => [name, index]));

  await db.$transaction(async (tx) => {
    await tx.productCategory.createMany({
      data: categoryDefinitions.map((category, sortOrder) => ({
        slug: category.slug,
        name: category.name,
        description: category.description,
        sortOrder,
      })),
      skipDuplicates: true,
    });
    const categoryRows = await tx.productCategory.findMany({ select: { id: true, slug: true } });
    const categoryIds = new Map(categoryRows.map(({ id, slug }) => [slug, id]));

    const subcategoryRows = categoryDefinitions.flatMap((category) =>
      category.subcategories.map((subcategory, sortOrder) => ({
        categoryId: categoryIds.get(category.slug)!,
        slug: subcategory.slug,
        name: subcategory.name,
        description: subcategory.description,
        sortOrder,
      })),
    );
    await tx.productSubcategory.createMany({ data: subcategoryRows, skipDuplicates: true });
    const subcategoryRecords = await tx.productSubcategory.findMany({ select: { id: true, categoryId: true, slug: true } });
    const subcategoryIds = new Map(subcategoryRecords.map(({ id, categoryId, slug }) => [`${categoryId}:${slug}`, id]));

    const productSlugs = products.map(({ slug }) => slug);
    const existingProducts = await tx.product.findMany({ where: { slug: { in: productSlugs } }, select: { slug: true } });
    const existingSlugs = new Set(existingProducts.map(({ slug }) => slug));
    const missingProducts = products.filter(({ slug }) => !existingSlugs.has(slug));
    await createInBatches(missingProducts, (batch) => tx.product.createMany({
      data: batch.map((product) => ({
        slug: product.slug,
        name: product.name,
        categoryId: categoryIds.get(product.categorySlug)!,
        price: product.price,
        mainImageKey: storageKeyForLocalPath(product.image),
        productCode: product.productCode,
        sortOrder: products.findIndex(({ slug }) => slug === product.slug),
        isFeatured: featuredOrderByName.has(product.name),
        featuredSortOrder: featuredOrderByName.get(product.name) ?? null,
        isImportPending: true,
      })),
      skipDuplicates: true,
    }));

    const pendingProducts = await tx.product.findMany({
      where: { slug: { in: productSlugs }, isImportPending: true },
      select: { id: true, slug: true, categoryId: true },
    });
    const sourceBySlug = new Map(products.map((product) => [product.slug, product]));
    const specifications = pendingProducts.flatMap(({ id, slug }) =>
      sourceBySlug.get(slug)!.specifications.map((specification, sortOrder) => ({ ...specification, productId: id, sortOrder })),
    );
    const productImages = pendingProducts.flatMap(({ id, slug }) =>
      [...new Set(sourceBySlug.get(slug)!.images)].map((image, sortOrder) => ({
        productId: id,
        assetKey: storageKeyForLocalPath(image),
        sortOrder,
      })),
    );
    const assignments = pendingProducts.flatMap(({ id, slug, categoryId }) =>
      sourceBySlug.get(slug)!.subcategorySlugs.map((subcategorySlug, sortOrder) => ({
        productId: id,
        subcategoryId: subcategoryIds.get(`${categoryId}:${subcategorySlug}`)!,
        sortOrder,
      })),
    );

    await createInBatches(specifications, (batch) => tx.productSpecification.createMany({ data: batch, skipDuplicates: true }));
    await createInBatches(productImages, (batch) => tx.productImage.createMany({ data: batch, skipDuplicates: true }));
    await createInBatches(assignments, (batch) => tx.productSubcategoryAssignment.createMany({ data: batch, skipDuplicates: true }));
    if (pendingProducts.length) {
      await tx.product.updateMany({
        where: { id: { in: pendingProducts.map(({ id }) => id) } },
        data: { isImportPending: false },
      });
    }

    await tx.legacyRedirect.createMany({
      data: Object.entries(legacyCategoryRedirects).map(([sourceSlug, destination]) => ({ sourceSlug, destination })),
      skipDuplicates: true,
    });

    const { videoThumbnail, storyImage, logo, ...profileData } = company;
    await tx.companyProfile.upsert({
      where: { id: "main" },
      update: {},
      create: {
        id: "main",
        ...profileData,
        videoThumbnailKey: storageKeyForLocalPath(videoThumbnail),
        storyImageKey: storageKeyForLocalPath(storyImage),
        logoKey: storageKeyForLocalPath(logo),
        ratingScore: rating.score,
        ratingCount: rating.count,
      },
    });

    await tx.companyMilestone.createMany({
      data: history.map((milestone, sortOrder) => ({ ...milestone, sortOrder })),
      skipDuplicates: true,
    });
    const insights = [
      ...companyStory.map((body, sortOrder) => ({ key: `story-${sortOrder + 1}`, section: "story", body, sortOrder })),
      ...qualityNotes.map((body, sortOrder) => ({ key: `quality-${sortOrder + 1}`, section: "quality", body, sortOrder })),
      { key: "centenary-feature", section: "centenary", title: "One hundred years, carried forward.", body: "In 2025, the Mahajan family’s cricket trade, begun in Sialkot in 1925, completed 100 years.", sortOrder: 0 },
    ];
    await tx.companyInsight.createMany({ data: insights, skipDuplicates: true });
    await tx.award.createMany({
      data: awards.map(({ image, ...award }, sortOrder) => ({ ...award, imageKey: storageKeyForLocalPath(image), sortOrder })),
      skipDuplicates: true,
    });
    await tx.siteNotice.upsert({ where: { id: "main" }, update: {}, create: { id: "main", ...newsNotice } });
    await tx.ratingBreakdown.createMany({
      data: rating.distribution.map(({ stars, percent }, sortOrder) => ({ stars, percent, sortOrder })),
      skipDuplicates: true,
    });
    await tx.editorialPage.createMany({ data: editorialPages, skipDuplicates: true });
  }, { maxWait: 10_000, timeout: 120_000 });
}
