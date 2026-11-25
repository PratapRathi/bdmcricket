"use client";

import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi, adminKeys } from "@/features/admin/components/admin-api";
import { ActionButton, AdminPage, ErrorMessage, Field, LoadingMessage, Panel, TextArea } from "@/features/admin/components/admin-ui";

type Profile = { brand: string; legalName: string; sellerName: string; founded: number; address: string; phoneDisplay: string; phoneLink: string; gst: string; coordinates: string; website: string; videoId: string; videoThumbnailKey: string; storyImageKey: string; logoKey: string; ratingScore: string; ratingCount: number };
type Notice = { title: string; body: string; accountName: string; bank: string; accountNumber: string; ifsc: string; address: string; contactName: string; contactPhone: string; isPublished: boolean };
type Editorial = { slug: string; eyebrow: string; title: string; intro: string; metaDescription: string; isPublished: boolean };
type ContentData = { profile: Profile | null; notice: Notice | null; milestones: Record<string, unknown>[]; insights: Record<string, unknown>[]; awards: Record<string, unknown>[]; editorialPages: Editorial[]; ratingBreakdown: { stars: number; percent: number; sortOrder: number }[] };

export function ContentManager() {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const content = useQuery({ queryKey: adminKeys.content, queryFn: () => adminApi<ContentData>("/api/admin/content") });
  const save = useMutation({ mutationFn: ({ path, method, json }: { path: string; method: "POST" | "PATCH" | "PUT"; json: unknown }) => adminApi(path, { method, json }), onSuccess: async () => { setError(""); await queryClient.invalidateQueries({ queryKey: adminKeys.content }); }, onError: (cause) => setError(cause instanceof Error ? cause.message : "Could not save site content.") });
  const remove = useMutation({ mutationFn: (path: string) => adminApi(path, { method: "DELETE" }), onSuccess: () => queryClient.invalidateQueries({ queryKey: adminKeys.content }), onError: (cause) => setError(cause instanceof Error ? cause.message : "Could not remove this content.") });
  return <AdminPage title="Site content" description="Update company information, page titles and copy, site notices, history milestones, insights, awards, and rating display.">
    {error && <div className="mb-5"><ErrorMessage>{error}</ErrorMessage></div>}
    {content.isPending ? <LoadingMessage /> : content.isError ? <ErrorMessage>{content.error.message}</ErrorMessage> : <div className="space-y-5">
      {content.data.profile && <ProfileEditor value={content.data.profile} onSave={(json) => save.mutate({ path: "/api/admin/content/profile", method: "PATCH", json })} />}
      {content.data.notice && <NoticeEditor value={content.data.notice} onSave={(json) => save.mutate({ path: "/api/admin/content/notice", method: "PATCH", json })} />}
      <PageCopyEditor pages={content.data.editorialPages} onSave={(slug, json) => save.mutate({ path: `/api/admin/content/editorial/${slug}`, method: "PATCH", json })} />
      <JsonRecordEditor title="Company timeline" description="These milestones appear on the company history page." records={content.data.milestones} createExample={{ year: "", title: "", detail: "", sortOrder: 0, isPublished: true }} onCreate={(json) => save.mutate({ path: "/api/admin/content/milestones", method: "POST", json })} onSave={(id, json) => save.mutate({ path: `/api/admin/content/milestones/${id}`, method: "PATCH", json })} onRemove={(id) => remove.mutate(`/api/admin/content/milestones/${id}`)} />
      <JsonRecordEditor title="Company insights" description="Manage the story, quality, and centenary sections used across company pages." records={content.data.insights} createExample={{ key: "", section: "story", title: "", body: "", sortOrder: 0, isPublished: true }} onCreate={(json) => save.mutate({ path: "/api/admin/content/insights", method: "POST", json })} onSave={(id, json) => save.mutate({ path: `/api/admin/content/insights/${id}`, method: "PATCH", json })} onRemove={(id) => remove.mutate(`/api/admin/content/insights/${id}`)} />
      <JsonRecordEditor title="Awards" description="Awards displayed on the company pages. Choose an existing media key for its image." records={content.data.awards} createExample={{ year: "", title: "", detail: "", imageKey: null, sortOrder: 0, isPublished: true }} onCreate={(json) => save.mutate({ path: "/api/admin/content/awards", method: "POST", json })} onSave={(id, json) => save.mutate({ path: `/api/admin/content/awards/${id}`, method: "PATCH", json })} onRemove={(id) => remove.mutate(`/api/admin/content/awards/${id}`)} />
      <RatingsEditor values={content.data.ratingBreakdown} onSave={(json) => save.mutate({ path: "/api/admin/content/ratings", method: "PUT", json })} />
    </div>}
    {(save.isPending || remove.isPending) && <p className="mt-4 text-xs text-black/50">Saving site changes…</p>}
  </AdminPage>;
}

function ProfileEditor({ value, onSave }: { value: Profile; onSave: (value: unknown) => void }) {
  const fields: { name: keyof Profile; label: string; type?: string; wide?: boolean }[] = [
    { name: "brand", label: "Brand" }, { name: "legalName", label: "Legal company name" }, { name: "sellerName", label: "Seller name" }, { name: "founded", label: "Founded year", type: "number" },
    { name: "phoneDisplay", label: "Phone display" }, { name: "phoneLink", label: "Phone link" }, { name: "gst", label: "GST number" }, { name: "coordinates", label: "Map coordinates" },
    { name: "website", label: "Website URL" }, { name: "videoId", label: "Company video ID" }, { name: "videoThumbnailKey", label: "Video thumbnail media key", wide: true }, { name: "storyImageKey", label: "Story image media key", wide: true },
    { name: "logoKey", label: "Logo media key", wide: true }, { name: "ratingScore", label: "Rating score" }, { name: "ratingCount", label: "Rating count", type: "number" }, { name: "address", label: "Company address", wide: true },
  ];
  return <Panel title="Company profile"><form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const output: Record<string, string | number> = {}; fields.forEach(({ name, type }) => { const raw = String(form.get(name) ?? ""); output[name] = type === "number" ? Number(raw) : raw; }); onSave(output); }} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{fields.map(({ name, label, type, wide }) => <Field key={name} className={wide ? "sm:col-span-2 xl:col-span-3" : ""} label={label} name={name} type={type ?? "text"} defaultValue={value[name]} required={name !== "gst" && name !== "coordinates" && name !== "website"} />)}<div className="sm:col-span-2 xl:col-span-3"><ActionButton type="submit" tone="red">Save company profile</ActionButton></div></form></Panel>;
}

function NoticeEditor({ value, onSave }: { value: Notice; onSave: (value: unknown) => void }) {
  const names: (keyof Notice)[] = ["title", "body", "accountName", "bank", "accountNumber", "ifsc", "address", "contactName", "contactPhone"];
  const labels: Record<string, string> = { title: "Notice title", body: "Notice text", accountName: "Account name", bank: "Bank", accountNumber: "Account number", ifsc: "IFSC", address: "Address in notice", contactName: "Contact person", contactPhone: "Contact phone" };
  return <Panel title="Site notice"><p className="-mt-3 mb-5 text-xs text-black/50">This information appears on the public news page. Confirm the details before publishing changes.</p><form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const output = Object.fromEntries(names.map((name) => [name, String(form.get(name) ?? "")])); onSave({ ...output, isPublished: form.get("isPublished") === "on" }); }} className="grid gap-4 sm:grid-cols-2">{names.map((name) => name === "body" || name === "address" ? <TextArea key={name} label={labels[name]} name={name} defaultValue={String(value[name])} maxLength={name === "body" ? 5000 : 500} className="sm:col-span-2" /> : <Field key={name} label={labels[name]} name={name} defaultValue={String(value[name])} maxLength={200} />)}<label className="flex items-center gap-2 text-sm"><input name="isPublished" type="checkbox" defaultChecked={value.isPublished} />Visible on site</label><div className="sm:col-span-2"><ActionButton type="submit" tone="red">Save site notice</ActionButton></div></form></Panel>;
}

function PageCopyEditor({ pages, onSave }: { pages: Editorial[]; onSave: (slug: string, value: unknown) => void }) {
  const [selected, setSelected] = useState(pages[0]?.slug ?? "");
  const page = pages.find((item) => item.slug === selected);
  if (!page) return null;
  return <Panel title="Website page headings and SEO"><div className="mb-4 flex flex-wrap gap-2">{pages.map((item) => <button key={item.slug} type="button" onClick={() => setSelected(item.slug)} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${item.slug === selected ? "bg-black text-white" : "bg-black/5 text-black/65"}`}>{item.slug}</button>)}</div><form key={page.slug} onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); onSave(page.slug, { eyebrow: form.get("eyebrow"), title: form.get("title"), intro: form.get("intro"), metaDescription: form.get("metaDescription"), isPublished: form.get("isPublished") === "on" }); }} className="space-y-4"><Field label="Eyebrow" name="eyebrow" defaultValue={page.eyebrow} required maxLength={160} /><Field label="Page title" name="title" defaultValue={page.title} required maxLength={300} /><TextArea label="Introduction" name="intro" defaultValue={page.intro} required maxLength={8000} /><TextArea label="Search description" name="metaDescription" defaultValue={page.metaDescription} required maxLength={320} className="min-h-20" /><label className="flex items-center gap-2 text-sm"><input type="checkbox" name="isPublished" defaultChecked={page.isPublished} />Published</label><ActionButton type="submit" tone="red">Save page copy</ActionButton></form></Panel>;
}

function JsonRecordEditor({ title, description, records, createExample, onCreate, onSave, onRemove }: { title: string; description: string; records: Record<string, unknown>[]; createExample: Record<string, unknown>; onCreate: (value: unknown) => void; onSave: (id: string | number, value: unknown) => void; onRemove: (id: string | number) => void }) {
  const [newValue, setNewValue] = useState(JSON.stringify(createExample, null, 2));
  const [parseError, setParseError] = useState("");
  function parse(raw: string) { try { setParseError(""); return JSON.parse(raw) as unknown; } catch { setParseError("Enter valid JSON before saving."); return null; } }
  return <Panel title={title}><p className="-mt-3 mb-5 text-xs leading-5 text-black/50">{description} Use the JSON fields below to edit the full record. Invalid or incomplete values are rejected by the server.</p><div className="space-y-3">{records.map((record) => <JsonRecord key={String(record.id)} record={record} onSave={(raw) => { const parsed = parse(raw); if (parsed) onSave(record.id as string | number, parsed); }} onRemove={() => { if (confirm(`Remove this ${title.toLowerCase()} record?`)) onRemove(record.id as string | number); }} />)}</div><div className="mt-5 border-t border-black/10 pt-5"><p className="mb-2 text-xs font-semibold">Add record</p><textarea aria-label={`New ${title} JSON`} className="min-h-32 w-full rounded-md border border-black/15 p-3 font-mono text-xs" value={newValue} onChange={(event) => setNewValue(event.target.value)} /><ActionButton className="mt-3" tone="dark" onClick={() => { const parsed = parse(newValue); if (parsed) onCreate(parsed); }}>Add record</ActionButton></div>{parseError && <div className="mt-3"><ErrorMessage>{parseError}</ErrorMessage></div>}</Panel>;
}

function JsonRecord({ record, onSave, onRemove }: { record: Record<string, unknown>; onSave: (raw: string) => void; onRemove: () => void }) {
  const [raw, setRaw] = useState(JSON.stringify(record, null, 2));
  return <div className="rounded-md border border-black/10 p-3"><div className="flex justify-between gap-2"><span className="text-xs font-semibold text-black/60">Record · {String(record.id ?? record.key ?? "new")}</span><button type="button" className="text-xs font-semibold text-red-700" onClick={onRemove}>Delete</button></div><textarea aria-label="Edit record JSON" className="mt-2 min-h-32 w-full rounded-md border border-black/15 p-3 font-mono text-xs" value={raw} onChange={(event) => setRaw(event.target.value)} /><ActionButton className="mt-2" tone="light" onClick={() => onSave(raw)}>Save record</ActionButton></div>;
}

function RatingsEditor({ values, onSave }: { values: ContentData["ratingBreakdown"]; onSave: (value: unknown) => void }) {
  const [percentages, setPercentages] = useState(() => Object.fromEntries([1, 2, 3, 4, 5].map((star) => [star, values.find((item) => item.stars === star)?.percent ?? 0])));
  return <Panel title="Customer rating display"><p className="-mt-3 mb-4 text-xs text-black/50">Update percentages shown in the rating distribution. Values are informational site content.</p><form onSubmit={(event: FormEvent<HTMLFormElement>) => { event.preventDefault(); onSave([1, 2, 3, 4, 5].map((stars) => ({ stars, percent: Number(percentages[stars as keyof typeof percentages]), sortOrder: 5 - stars }))); }} className="flex flex-wrap items-end gap-3">{[1, 2, 3, 4, 5].map((stars) => <Field key={stars} className="w-28" label={`${stars} stars %`} type="number" min={0} max={100} value={percentages[stars as keyof typeof percentages]} onChange={(event) => setPercentages((current) => ({ ...current, [stars]: Number(event.target.value) }))} />)}<ActionButton type="submit" tone="red">Save ratings</ActionButton></form></Panel>;
}
