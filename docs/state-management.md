# State management

## Ownership

- **TanStack Query:** server-state requested by interactive client features. Used by the product browser and protected admin screens. Product query keys live beside the products hook; admin keys and API envelope handling are in `features/admin/components/admin-api.ts`.
- **React state:** transient local UI state such as search text, selected filters, menu visibility, and load-more count.
- **Server Components:** initial page content and database reads that do not need client interaction.
- **Zustand:** not currently used. Add a feature store only when state must be shared across distant client components and is not server-state.

Do not mirror API results into a Zustand store. Do not add a global store for state that belongs to one component. Future cart state may justify a focused cart store once cart behavior exists.

## Query behavior

The root `QueryProvider` creates one browser QueryClient per provider instance. Query defaults: one-minute `staleTime`, five-minute `gcTime`, one retry, no refetch on window focus, and reconnect refetch. Mutations default to no retries. Devtools load only in development.

The product key shape is `['products', 'list', filters]`; admin keys are grouped under `['admin', resource]`. Product detail keys are reserved for a future interactive detail query. Admin mutations invalidate only the relevant resource and dashboard counts. Product details currently render directly on the server and do not need a client query.
