"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi, adminKeys, downloadAdminFile } from "@/features/admin/components/admin-api";
import { ActionButton, AdminPage, ErrorMessage, Field, LoadingMessage, Panel, SelectField, TextArea } from "@/features/admin/components/admin-ui";

type Submission = { id: string; name: string; email: string; phone: string; subject: string; message: string; status: "NEW" | "IN_PROGRESS" | "RESOLVED"; adminNotes: string | null; createdAt: string };
type EnquiryPage = { submissions: Submission[]; total: number; page: number; pageSize: number };

export function EnquiriesManager() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [exportError, setExportError] = useState("");
  const [exporting, setExporting] = useState(false);
  const query = useQuery({ queryKey: [...adminKeys.enquiries, search, status, page], queryFn: () => adminApi<EnquiryPage>(`/api/admin/enquiries?q=${encodeURIComponent(search)}${status ? `&status=${status}` : ""}&page=${page}`) });
  const refresh = async () => { await queryClient.invalidateQueries({ queryKey: adminKeys.enquiries }); await queryClient.invalidateQueries({ queryKey: adminKeys.overview }); };
  const update = useMutation({ mutationFn: ({ id, status: nextStatus, adminNotes }: { id: string; status: Submission["status"]; adminNotes: string }) => adminApi(`/api/admin/enquiries/${id}`, { method: "PATCH", json: { status: nextStatus, adminNotes } }), onSuccess: refresh });
  const remove = useMutation({ mutationFn: (id: string) => adminApi(`/api/admin/enquiries/${id}`, { method: "DELETE" }), onSuccess: refresh });
  return <AdminPage title="Contact enquiries" description="Review submissions from the public contact form, track follow-up, add private notes, or export the inbox." actions={<ActionButton disabled={exporting} onClick={() => { setExportError(""); setExporting(true); void downloadAdminFile("/api/admin/enquiries/export", "bdm-enquiries.csv").catch((cause: unknown) => setExportError(cause instanceof Error ? cause.message : "Could not export enquiries.")).finally(() => setExporting(false)); }}>{exporting ? "Preparing CSV…" : "Export CSV"}</ActionButton>}>
    {exportError && <div className="mb-4"><ErrorMessage>{exportError}</ErrorMessage></div>}
    <Panel><div className="grid gap-3 md:grid-cols-[1fr_220px]"><Field label="Search name, email, subject, or message" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search enquiries" /><SelectField label="Status" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }}><option value="">All statuses</option><option value="NEW">New</option><option value="IN_PROGRESS">In progress</option><option value="RESOLVED">Resolved</option></SelectField></div><p className="mt-4 text-xs text-black/50">{query.data?.total ?? 0} matching submissions · page {query.data?.page ?? page} of {Math.max(1, Math.ceil((query.data?.total ?? 0) / (query.data?.pageSize ?? 30)))}</p></Panel>
    <div className="mt-5 space-y-4">{query.isPending ? <LoadingMessage /> : query.isError ? <ErrorMessage>{query.error.message}</ErrorMessage> : query.data.submissions.map((item) => <EnquiryCard key={item.id} item={item} busy={update.isPending || remove.isPending} onSave={(payload) => update.mutate({ id: item.id, ...payload })} onRemove={() => { if (confirm("Permanently remove this enquiry?")) remove.mutate(item.id); }} />)}{query.data?.submissions.length === 0 && <Panel><p className="text-sm text-black/55">No enquiries match these filters.</p></Panel>}</div>
    {query.data && query.data.total > query.data.pageSize && <div className="mt-5 flex items-center justify-between"><ActionButton tone="light" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>Previous</ActionButton><span className="text-xs text-black/50">Page {query.data.page} of {Math.ceil(query.data.total / query.data.pageSize)}</span><ActionButton tone="light" disabled={query.data.page * query.data.pageSize >= query.data.total} onClick={() => setPage((current) => current + 1)}>Next</ActionButton></div>}
    {(update.isError || remove.isError) && <div className="mt-4"><ErrorMessage>{update.error?.message ?? remove.error?.message}</ErrorMessage></div>}
  </AdminPage>;
}

function EnquiryCard({ item, busy, onSave, onRemove }: { item: Submission; busy: boolean; onSave: (payload: { status: Submission["status"]; adminNotes: string }) => void; onRemove: () => void }) {
  const [status, setStatus] = useState(item.status);
  const [notes, setNotes] = useState(item.adminNotes ?? "");
  return <Panel><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><p className="text-xs text-black/45">{new Date(item.createdAt).toLocaleString()}</p><h2 className="mt-1 text-lg font-semibold">{item.subject}</h2><p className="mt-1 text-sm text-black/60">{item.name} · <a className="underline" href={`mailto:${item.email}`}>{item.email}</a>{item.phone ? ` · ${item.phone}` : ""}</p></div><span className="h-fit rounded-full bg-black/5 px-3 py-1 text-xs font-semibold">{item.status.replace("_", " ")}</span></div><p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-black/75">{item.message}</p><div className="mt-5 grid gap-3 md:grid-cols-[200px_1fr]"><SelectField label="Status" value={status} onChange={(event) => setStatus(event.target.value as Submission["status"])}><option value="NEW">New</option><option value="IN_PROGRESS">In progress</option><option value="RESOLVED">Resolved</option></SelectField><TextArea label="Private admin notes" value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={5000} className="min-h-20" /></div><div className="mt-3 flex gap-2"><ActionButton tone="red" disabled={busy} onClick={() => onSave({ status, adminNotes: notes })}>Save follow-up</ActionButton><ActionButton tone="danger" disabled={busy} onClick={onRemove}>Delete enquiry</ActionButton></div></Panel>;
}
