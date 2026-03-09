import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  category: z.string(),
  brand: z.string().optional(),
  sku: z.string(),
  rating: z.number(),
  price: z.number(),
  thumbnail: z.string(),
});

export const productsResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;
