ALTER TABLE "Product" ADD COLUMN "featuredSortOrder" INTEGER;

ALTER TABLE "CompanyProfile" ADD COLUMN "storyImageKey" TEXT NOT NULL DEFAULT 'site/assets/01-500x500-mja3oz1o.jpg';

ALTER TABLE "CompanyProfile" ALTER COLUMN "storyImageKey" DROP DEFAULT;
