import { apiClient } from '@/shared/api';
import { productsResponseSchema, type ProductsResponse } from '../model/productSchema';

export type SortField = 'price' | 'rating';
export type SortOrder = 'asc' | 'desc';

interface FetchProductsParams {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: SortField;
  order?: SortOrder;
}

export const productApi = {
  getProducts: async ({
    page,
    pageSize,
    search,
    sortBy,
    order,
  }: FetchProductsParams): Promise<ProductsResponse> => {
    const skip = (page - 1) * pageSize;
    const url = search ? '/products/search' : '/products';
    const { data } = await apiClient.get(url, {
      params: {
        limit: pageSize,
        skip,
        ...(search ? { q: search } : {}),
        ...(sortBy ? { sortBy, order: order ?? 'asc' } : {}),
      },
    });
    return productsResponseSchema.parse(data);
  },
};
