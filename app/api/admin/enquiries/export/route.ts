import { withAdmin } from "@/lib/admin-auth/guard";
import { prisma } from "@/lib/prisma";

function csvCell(value: string | Date) {
  let text = value instanceof Date ? value.toISOString() : value;
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export async function GET(request: Request) {
  return withAdmin(request, async () => {
    const submissions = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" }, take: 10_000 });
    const headings = ["Submitted", "Name", "Email", "Phone", "Subject", "Message", "Status", "Admin notes"];
    const rows = submissions.map((item) => [item.createdAt, item.name, item.email, item.phone, item.subject, item.message, item.status, item.adminNotes].map(csvCell).join(","));
    const csv = [headings.map(csvCell).join(","), ...rows].join("\r\n");
    return new Response(csv, { headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="bdm-enquiries.csv"',
      "Cache-Control": "no-store, private",
      "X-Content-Type-Options": "nosniff",
    } });
  });
}
