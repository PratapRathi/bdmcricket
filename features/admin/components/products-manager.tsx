"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi, adminKeys } from "@/features/admin/components/admin-api";
import { ActionButton, AdminPage, ErrorMessage, Field, LoadingMessage, Panel, SelectField } from "@/features/admin/components/admin-ui";

type Category = { id: number; name: string; subcategories: { id: number; name: string; isPublished: boolean }[] };
type Product = { id: number; slug: string; name: string; categoryId: number; price: string; productCode: string; sortOrder: number; isPublished: boolean; isFeatured: boolean; featuredSortOrder: number | null; stockQuantity: number; lowStockThreshold: number; mainImageKey: string | null; imageKeys: string[]; subcategoryIds: number[]; specifications: { name: string; value: string }[] };
type ProductData = { products: Product[]; categories: Category[]; media: { key: string }[] };
type Draft = Omit<Product, "id">;
const blank: Draft = { slug: "", name: "", categoryId: 0, price: "", productCode: "", sortOrder: 0, isPublished: true, isFeatured: false, featuredSortOrder: null, stockQuantity: 0, lowStockThreshold: 5, mainImageKey: null, imageKeys: [], subcategoryIds: [], specifications: [] };

export function ProductsManager() {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Product | null>(null);
  const [draft, setDraft] = useState<Draft>(blank);
  const [error, setError] = useState("");
  const data = useQuery({ queryKey: adminKeys.products, queryFn: () => adminApi<ProductData>("/api/admin/products") });
  const save = useMutation({ mutationFn: (value: Draft) => adminApi<Product>(editing ? `/api/admin/products/${editing.id}` : "/api/admin/products", { method: editing ? "PATCH" : "POST", json: value }), onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: adminKeys.products }); await queryClient.invalidateQueries({ queryKey: adminKeys.overview }); setEditing(null); setDraft(blank); setError(""); }, onError: (cause) => setError(cause instanceof Error ? cause.message : "Could not save product.") });
  const remove = useMutation({ mutationFn: (id: number) => adminApi(`/api/admin/products/${id}`, { method: "DELETE" }), onSuccess: async () => { await queryClient.invalidateQueries({ queryKey: adminKeys.products }); await queryClient.invalidateQueries({ queryKey: adminKeys.overview }); } });
  const categories = data.data?.categories ?? [];
  const activeCategory = categories.find((category) => category.id === Number(draft.categoryId));
  const mediaKeys = useMemo(() => data.data?.media.map((asset) => asset.key) ?? [], [data.data?.media]);

  function startEdit(product?: Product) {
    setEditing(product ?? null);
    setDraft(product ? { ...product, subcategoryIds: [...product.subcategoryIds], imageKeys: [...product.imageKeys], specifications: [...product.specifications] } : { ...blank, categoryId: categories[0]?.id ?? 0 });
    setError("");
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const images = String(form.get("imageKeys") ?? "").split(/\n|,/).map((key) => key.trim()).filter(Boolean);
    const specifications = String(form.get("specifications") ?? "").split("\n").map((line) => line.split("=", 2).map((part) => part.trim())).filter((parts) => parts.length === 2 && parts[0] && parts[1]).map(([name, value]) => ({ name, value }));
    const value: Draft = { ...draft, slug: String(form.get("slug") ?? "").trim(), name: String(form.get("name") ?? "").trim(), price: String(form.get("price") ?? ""), productCode: String(form.get("productCode") ?? ""), categoryId: Number(form.get("categoryId")), sortOrder: Number(form.get("sortOrder") ?? 0), stockQuantity: Number(form.get("stockQuantity") ?? 0), lowStockThreshold: Number(form.get("lowStockThreshold") ?? 5), mainImageKey: String(form.get("mainImageKey") ?? "") || null, imageKeys: images, specifications };
    save.mutate(value);
  }

  return <AdminPage title="Products & stock" description="Create and maintain products, product images, specifications, publication status, and stock thresholds." actions={<ActionButton tone="red" onClick={() => startEdit()}>Add product</ActionButton>}>
    {data.isPending ? <LoadingMessage /> : data.isError ? <ErrorMessage>{data.error.message}</ErrorMessage> : <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)]">
      <Panel title={`Catalog · ${data.data.products.length} products`}><div className="overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead><tr className="border-b border-black/10 text-xs text-black/50"><th className="pb-3 pr-3">Product</th><th className="pb-3 pr-3">Category</th><th className="pb-3 pr-3">Stock</th><th className="pb-3 pr-3">Visibility</th><th className="pb-3">Actions</th></tr></thead><tbody>{data.data.products.map((product) => <tr key={product.id} className="border-b border-black/5 align-top"><td className="py-3 pr-3"><strong className="block">{product.name}</strong><span className="text-xs text-black/45">/{product.slug}</span></td><td className="py-3 pr-3">{categories.find((category) => category.id === product.categoryId)?.name ?? "—"}</td><td className="py-3 pr-3"><span className={product.stockQuantity <= product.lowStockThreshold ? "font-semibold text-red-700" : ""}>{product.stockQuantity}</span><span className="text-xs text-black/45"> / alert {product.lowStockThreshold}</span></td><td className="py-3 pr-3">{product.isPublished ? "Published" : "Draft"}{product.isFeatured && <span className="block text-xs text-red-700">Featured</span>}</td><td className="py-3"><div className="flex gap-2"><ActionButton tone="light" onClick={() => startEdit(product)}>Edit</ActionButton><ActionButton tone="danger" onClick={() => { if (confirm(`Remove “${product.name}”?`)) remove.mutate(product.id); }}>Remove</ActionButton></div></td></tr>)}</tbody></table></div>{remove.isError && <div className="mt-4"><ErrorMessage>{remove.error.message}</ErrorMessage></div>}</Panel>
      <Panel title={editing ? `Edit · ${editing.name}` : "Add a product"}>{error && <div className="mb-4"><ErrorMessage>{error}</ErrorMessage></div>}<form key={editing?.id ?? "new"} onSubmit={submit} className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2"><Field label="Product name" name="name" defaultValue={draft.name} required maxLength={180} /><Field label="URL slug" name="slug" defaultValue={draft.slug} required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" maxLength={120} /></div>
        <div className="grid gap-3 sm:grid-cols-2"><SelectField label="Category" name="categoryId" value={draft.categoryId || ""} required onChange={(event) => setDraft((current) => ({ ...current, categoryId: Number(event.target.value), subcategoryIds: [] }))}><option value="" disabled>Select category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</SelectField><Field label="Price shown on site" name="price" defaultValue={draft.price} maxLength={120} /></div>
        <div className="grid gap-3 sm:grid-cols-2"><Field label="Product code" name="productCode" defaultValue={draft.productCode} maxLength={80} /><Field label="Sort order" name="sortOrder" type="number" min="0" defaultValue={draft.sortOrder} /></div>
        <div className="grid gap-3 sm:grid-cols-2"><Field label="Quantity in stock" name="stockQuantity" type="number" min="0" defaultValue={draft.stockQuantity} /><Field label="Low stock alert at" name="lowStockThreshold" type="number" min="0" defaultValue={draft.lowStockThreshold} /></div>
        <div><label className="block text-xs font-semibold text-black/70">Main product image<select name="mainImageKey" defaultValue={draft.mainImageKey ?? ""} className="mt-2 min-h-10 w-full rounded-md border border-black/15 bg-white px-3 text-sm"><option value="">No image</option>{mediaKeys.map((key) => <option key={key} value={key}>{key}</option>)}</select></label><Field label="Gallery image keys (comma or line separated)" name="imageKeys" defaultValue={draft.imageKeys.join("\n")} list="admin-media-keys" /><datalist id="admin-media-keys">{mediaKeys.map((key) => <option key={key} value={key} />)}</datalist></div>
        <Field label="Specifications (one Name = Value per line)" name="specifications" defaultValue={draft.specifications.map(({ name, value }) => `${name} = ${value}`).join("\n")} />
        {activeCategory && activeCategory.subcategories.length > 0 && <fieldset className="rounded-md border border-black/10 p-3"><legend className="px-1 text-xs font-semibold">Subcategories</legend><div className="grid gap-2 sm:grid-cols-2">{activeCategory.subcategories.filter((sub) => sub.isPublished).map((sub) => <label key={sub.id} className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.subcategoryIds.includes(sub.id)} onChange={(event) => setDraft((current) => ({ ...current, subcategoryIds: event.target.checked ? [...current.subcategoryIds, sub.id] : current.subcategoryIds.filter((id) => id !== sub.id) }))} />{sub.name}</label>)}</div></fieldset>}
        <div className="flex flex-wrap gap-4 text-sm"><label className="flex items-center gap-2"><input type="checkbox" checked={draft.isPublished} onChange={(event) => setDraft((current) => ({ ...current, isPublished: event.target.checked }))} />Published</label><label className="flex items-center gap-2"><input type="checkbox" checked={draft.isFeatured} onChange={(event) => setDraft((current) => ({ ...current, isFeatured: event.target.checked }))} />Featured</label></div>
        <div className="flex gap-2"><ActionButton type="submit" tone="red" disabled={save.isPending}>{save.isPending ? "Saving…" : editing ? "Save changes" : "Create product"}</ActionButton><ActionButton type="button" tone="light" onClick={() => startEdit()}>Clear form</ActionButton></div>
      </form></Panel>
    </div>}
  </AdminPage>;
}
