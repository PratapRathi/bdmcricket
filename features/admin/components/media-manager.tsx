"use client";

import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { adminApi, adminKeys } from "@/features/admin/components/admin-api";
import { ActionButton, AdminPage, ErrorMessage, Field, LoadingMessage, Panel } from "@/features/admin/components/admin-ui";
import { apiRequest } from "@/lib/api/client";
import type { ApiSuccess } from "@/lib/api/responses";

type Asset = { id: string; key: string; contentType: string; byteSize: string; altText: string; uploadedAt: string | null; url: string; profileReferences: number; _count: { mainForProducts: number; productImages: number; awards: number } };

export function MediaManager() {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const media = useQuery({ queryKey: adminKeys.media, queryFn: () => adminApi<Asset[]>("/api/admin/media") });
  const refresh = () => queryClient.invalidateQueries({ queryKey: adminKeys.media });
  const upload = useMutation({ mutationFn: async (form: FormData) => { const response = await apiRequest<ApiSuccess<Asset>>("/api/admin/media", { method: "POST", body: form }); return response.data; }, onSuccess: refresh, onError: (cause) => setError(cause instanceof Error ? cause.message : "Could not upload this image.") });
  const update = useMutation({ mutationFn: ({ id, altText }: { id: string; altText: string }) => adminApi(`/api/admin/media/${id}`, { method: "PATCH", json: { altText } }), onSuccess: refresh, onError: (cause) => setError(cause instanceof Error ? cause.message : "Could not update alt text.") });
  const remove = useMutation({ mutationFn: (id: string) => adminApi(`/api/admin/media/${id}`, { method: "DELETE" }), onSuccess: refresh, onError: (cause) => setError(cause instanceof Error ? cause.message : "Could not delete this image.") });

  function submitUpload(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setError(""); upload.mutate(new FormData(event.currentTarget)); event.currentTarget.reset(); }
  return <AdminPage title="Media library" description="Upload and manage images stored in object storage. Images referenced by a product or award are protected from deletion.">
    <Panel title="Upload an image"><form onSubmit={submitUpload} className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end"><label className="block text-xs font-semibold text-black/70">Image file<input className="mt-2 block min-h-10 w-full text-sm" name="file" type="file" accept="image/jpeg,image/png,image/webp,image/gif" required /></label><Field label="Alternative text" name="altText" maxLength={500} /><ActionButton type="submit" tone="red" disabled={upload.isPending}>{upload.isPending ? "Uploading…" : "Upload"}</ActionButton></form><p className="mt-3 text-xs text-black/45">JPEG, PNG, WebP, or GIF · maximum 8 MB.</p></Panel>
    {(error || media.isError) && <div className="mt-4"><ErrorMessage>{error || media.error?.message || "Could not load media."}</ErrorMessage></div>}
    <div className="mt-5">{media.isPending ? <LoadingMessage /> : media.isError ? null : media.data.length ? <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{media.data.map((asset) => <MediaCard key={asset.id} asset={asset} onSave={(altText) => update.mutate({ id: asset.id, altText })} onRemove={() => { if (confirm(`Delete ${asset.key} from object storage?`)) remove.mutate(asset.id); }} busy={update.isPending || remove.isPending} />)}</div> : <Panel><p className="text-sm text-black/55">No uploaded media yet.</p></Panel>}</div>
  </AdminPage>;
}

function MediaCard({ asset, onSave, onRemove, busy }: { asset: Asset; onSave: (altText: string) => void; onRemove: () => void; busy: boolean }) {
  const [altText, setAltText] = useState(asset.altText);
  const references = asset._count.mainForProducts + asset._count.productImages + asset._count.awards + asset.profileReferences;
  return <Panel className="overflow-hidden !p-0"><div className="relative aspect-[4/3] bg-[#f2f0ec]"><Image src={asset.url} alt={asset.altText} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-contain" unoptimized /></div><div className="p-4"><p className="break-all text-xs font-medium">{asset.key}</p><p className="mt-1 text-[11px] text-black/45">{(Number(asset.byteSize) / 1024).toFixed(0)} KB · {asset.contentType} · {references} site references</p><label className="mt-3 block text-xs font-semibold text-black/70">Alt text<input value={altText} maxLength={500} onChange={(event) => setAltText(event.target.value)} className="mt-1 min-h-9 w-full rounded border border-black/15 px-2 text-sm" /></label><div className="mt-3 flex gap-2"><ActionButton tone="light" disabled={busy || altText === asset.altText} onClick={() => onSave(altText)}>Save alt text</ActionButton><ActionButton tone="danger" disabled={busy || references > 0} title={references ? "Remove site references before deleting" : "Delete from object storage"} onClick={onRemove}>Delete</ActionButton></div></div></Panel>;
}
