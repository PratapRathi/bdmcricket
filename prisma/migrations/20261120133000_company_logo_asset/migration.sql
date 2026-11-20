ALTER TABLE "CompanyProfile" ADD COLUMN "logoKey" TEXT NOT NULL DEFAULT 'site/assets/img-0292-90x90-kqnss7uc.png';

ALTER TABLE "CompanyProfile" ALTER COLUMN "logoKey" DROP DEFAULT;
