"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { adminApi } from "@/features/admin/components/admin-api";
import { ActionButton, ErrorMessage } from "@/features/admin/components/admin-ui";
import { mediaUrl } from "@/lib/media-url";

export type AdminMediaAsset = {
  id: number;
  key: string;
  url: string;
  altText: string;
  contentType: string;
  byteSize: string | number;
};

type PendingUpload = { file: File; previewUrl: string };

type ProductImagePickerProps = {
  assets: AdminMediaAsset[];
  mainImageKey: string | null;
  imageKeys: string[];
  onChange: (value: { mainImageKey: string | null; imageKeys: string[] }) => void;
  onMediaUploaded: (assets: AdminMediaAsset[]) => void;
};

function withoutDuplicateKeys(keys: string[]) {
  return [...new Set(keys.filter(Boolean))];
}

export function ProductImagePicker({ assets, mainImageKey, imageKeys, onChange, onMediaUploaded }: ProductImagePickerProps) {
  const [pending, setPending] = useState<PendingUpload[]>([]);
  const [altText, setAltText] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const pendingRef = useRef<PendingUpload[]>([]);

  useEffect(() => {
    pendingRef.current = pending;
  }, [pending]);
  useEffect(() => () => pendingRef.current.forEach(({ previewUrl }) => URL.revokeObjectURL(previewUrl)), []);

  const assetByKey = useMemo(() => new Map(assets.map((asset) => [asset.key, asset])), [assets]);
  const selectedKeys = withoutDuplicateKeys(imageKeys);

  function updateSelection(nextKeys: string[], nextMain = mainImageKey) {
    const uniqueKeys = withoutDuplicateKeys(nextKeys);
    onChange({
      imageKeys: uniqueKeys,
      mainImageKey: nextMain && uniqueKeys.includes(nextMain) ? nextMain : uniqueKeys[0] ?? null,
    });
  }

  function addImages(keys: string[]) {
    const nextKeys = withoutDuplicateKeys([...selectedKeys, ...keys]);
    updateSelection(nextKeys, mainImageKey ?? nextKeys[0] ?? null);
  }

  function removeImage(key: string) {
    updateSelection(selectedKeys.filter((imageKey) => imageKey !== key), mainImageKey === key ? null : mainImageKey);
  }

  function addPendingFiles(files: FileList | null) {
    if (!files?.length) return;
    setUploadError("");
    const accepted = Array.from(files).filter((file) => ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type));
    if (accepted.length !== files.length) setUploadError("Only JPEG, PNG, WebP, and GIF images can be uploaded.");
    setPending((current) => [...current, ...accepted.map((file) => ({ file, previewUrl: URL.createObjectURL(file) }))]);
  }

  function removePending(previewUrl: string) {
    setPending((current) => {
      const item = current.find((candidate) => candidate.previewUrl === previewUrl);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return current.filter((candidate) => candidate.previewUrl !== previewUrl);
    });
  }

  async function uploadImages() {
    if (!pending.length) return;
    setIsUploading(true);
    setUploadError("");
    const uploaded: AdminMediaAsset[] = [];
    const remaining = [...pending];

    try {
      for (const item of pending) {
        const form = new FormData();
        form.set("file", item.file);
        form.set("altText", altText);
        const asset = await adminApi<AdminMediaAsset>("/api/admin/media", { method: "POST", body: form });
        uploaded.push(asset);
        const index = remaining.findIndex((candidate) => candidate.previewUrl === item.previewUrl);
        if (index >= 0) remaining.splice(index, 1);
        URL.revokeObjectURL(item.previewUrl);
      }
    } catch (cause) {
      setUploadError(cause instanceof Error ? cause.message : "The image upload could not be completed.");
    } finally {
      if (uploaded.length) {
        onMediaUploaded(uploaded);
        addImages(uploaded.map((asset) => asset.key));
      }
      setPending(remaining);
      if (!remaining.length) setAltText("");
      setIsUploading(false);
    }
  }

  return (
    <fieldset className="space-y-4 rounded-md border border-black/10 p-3">
      <legend className="px-1 text-xs font-semibold">Product images</legend>
      <p className="text-xs leading-5 text-black/55">Upload images directly to the cloud media library, then choose the main image and gallery order for this product.</p>

      <div className="rounded-md border border-dashed border-black/20 bg-black/[0.02] p-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="block flex-1 text-xs font-semibold text-black/70">Upload product images
            <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple onChange={(event) => { addPendingFiles(event.target.files); event.currentTarget.value = ""; }} className="mt-2 block w-full text-xs file:mr-3 file:rounded-md file:border-0 file:bg-black file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white hover:file:bg-black/80" />
          </label>
          <label className="block flex-1 text-xs font-semibold text-black/70">Image alternative text <span className="font-normal text-black/45">(optional)</span>
            <input value={altText} onChange={(event) => setAltText(event.target.value)} maxLength={500} className="mt-2 min-h-10 w-full rounded-md border border-black/15 bg-white px-3 py-2 text-sm text-black outline-none focus:border-red-700 focus:ring-2 focus:ring-red-700/10" />
          </label>
          <ActionButton type="button" tone="red" onClick={() => void uploadImages()} disabled={!pending.length || isUploading}>{isUploading ? "Uploading…" : `Upload${pending.length ? ` ${pending.length}` : ""}`}</ActionButton>
        </div>
        {uploadError && <div className="mt-3"><ErrorMessage>{uploadError}</ErrorMessage></div>}
        {pending.length > 0 && <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {pending.map((item) => <div key={item.previewUrl} className="group relative aspect-square overflow-hidden rounded-md border border-black/10 bg-white"><Image src={item.previewUrl} alt={`Preview of ${item.file.name}`} fill unoptimized sizes="120px" className="object-contain p-1" /><button type="button" onClick={() => removePending(item.previewUrl)} className="absolute right-1 top-1 rounded bg-black/75 px-1.5 py-0.5 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100" aria-label={`Remove ${item.file.name} from upload`}>×</button><span className="absolute inset-x-1 bottom-1 truncate rounded bg-white/90 px-1 py-0.5 text-[10px] text-black">{item.file.name}</span></div>)}
        </div>}
      </div>

      {selectedKeys.length > 0 && <div>
        <div className="mb-2 flex items-center justify-between gap-3"><p className="text-xs font-semibold text-black/70">Selected gallery</p><p className="text-xs text-black/45">Click “Make main” to set the card image.</p></div>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {selectedKeys.map((key) => {
            const asset = assetByKey.get(key);
            return <div key={key} className={`relative aspect-square overflow-hidden rounded-md border bg-white ${mainImageKey === key ? "border-red-700 ring-2 ring-red-700/15" : "border-black/10"}`}>
              <Image src={asset?.url ?? mediaUrl(key)} alt={asset?.altText || "Selected product image"} fill sizes="120px" className="object-contain p-1" />
              {mainImageKey === key && <span className="absolute left-1 top-1 rounded bg-red-700 px-1.5 py-0.5 text-[10px] font-semibold text-white">Main</span>}
              <div className="absolute inset-x-1 bottom-1 flex gap-1"><button type="button" onClick={() => updateSelection(selectedKeys, key)} className="rounded bg-white/95 px-1.5 py-1 text-[10px] font-semibold text-black shadow">Make main</button><button type="button" onClick={() => removeImage(key)} className="rounded bg-white/95 px-1.5 py-1 text-[10px] font-semibold text-red-800 shadow">Remove</button></div>
            </div>;
          })}
        </div>
      </div>}

      <details>
        <summary className="cursor-pointer text-xs font-semibold text-red-700">Choose existing cloud media</summary>
        <div className="mt-3 grid max-h-80 grid-cols-3 gap-3 overflow-y-auto pr-1 sm:grid-cols-5">
          {assets.map((asset) => {
            const selected = selectedKeys.includes(asset.key);
            return <button key={asset.key} type="button" onClick={() => selected ? removeImage(asset.key) : addImages([asset.key])} className={`group relative aspect-square overflow-hidden rounded-md border bg-white text-left ${selected ? "border-red-700 ring-2 ring-red-700/15" : "border-black/10 hover:border-black/30"}`} aria-pressed={selected}>
              <Image src={asset.url} alt={asset.altText || "Cloud media asset"} fill sizes="120px" className="object-contain p-1" />
              <span className="absolute inset-x-1 bottom-1 truncate rounded bg-white/90 px-1 py-0.5 text-[10px] text-black">{selected ? "Selected" : asset.key.split("/").at(-1)}</span>
            </button>;
          })}
        </div>
      </details>
    </fieldset>
  );
}
