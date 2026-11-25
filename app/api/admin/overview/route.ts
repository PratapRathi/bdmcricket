import { withAdmin } from "@/lib/admin-auth/guard";
import { jsonSuccess } from "@/lib/api/responses";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  return withAdmin(request, async () => {
    const [products, publishedProducts, categories, newEnquiries, totalEnquiries, stockRows, recentEnquiries, recentActivity] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isPublished: true } }),
      prisma.productCategory.count(),
      prisma.contactSubmission.count({ where: { status: "NEW" } }),
      prisma.contactSubmission.count(),
      prisma.product.findMany({ where: { isPublished: true }, select: { stockQuantity: true, lowStockThreshold: true } }),
      prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 6, select: { id: true, name: true, subject: true, status: true, createdAt: true } }),
      prisma.adminAuditLog.findMany({ orderBy: { createdAt: "desc" }, take: 8, include: { actor: { select: { username: true } } } }),
    ]);
    const lowStock = stockRows.filter((product) => product.stockQuantity <= product.lowStockThreshold).length;
    return jsonSuccess({ products, publishedProducts, categories, newEnquiries, totalEnquiries, lowStock, recentEnquiries, recentActivity });
  });
}
