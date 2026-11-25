import { z } from "zod";

export const productQuerySchema = z.object({
  q: z.string().trim().max(100).default(""),
  category: z.string().trim().max(80).default(""),
  subcategory: z.string().trim().max(80).default(""),
  sort: z.enum(["featured", "name", "price-low", "price-high"]).default("featured"),
});
