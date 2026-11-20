ALTER TABLE "Product" ADD COLUMN "isImportPending" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Product" ADD COLUMN "isFeatured" BOOLEAN NOT NULL DEFAULT false;

CREATE UNIQUE INDEX "ProductSpecification_productId_sortOrder_key" ON "ProductSpecification"("productId", "sortOrder");
