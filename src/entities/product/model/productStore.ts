import { makeAutoObservable } from 'mobx';
import { productApi, type SortField, type SortOrder } from '../api/productApi';
import type { Product } from './productSchema';

export class ProductStore {
  products: Product[] = [];
  total = 0;
  page = 1;
  pageSize = 10;
  search = '';
  sortBy: SortField | undefined = undefined;
  sortOrder: SortOrder | undefined = undefined;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  private setProducts(products: Product[]) {
    this.products = products;
  }

  private setTotal(total: number) {
    this.total = total;
  }

  private setLoading(value: boolean) {
    this.isLoading = value;
  }

  private setError(message: string | null) {
    this.error = message;
  }

  setPage(page: number) {
    this.page = page;
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
  }

  setSearch(query: string) {
    this.search = query;
    this.page = 1;
  }

  setSort(field: SortField | undefined, order: SortOrder | undefined) {
    this.sortBy = field;
    this.sortOrder = order;
    this.page = 1;
  }

  fetchProducts = async () => {
    this.setLoading(true);
    this.setError(null);
    try {
      const { products, total } = await productApi.getProducts({
        page: this.page,
        pageSize: this.pageSize,
        search: this.search || undefined,
        sortBy: this.sortBy,
        order: this.sortOrder,
      });
      this.setProducts(products);
      this.setTotal(total);
    } catch (error) {
      console.error('[ProductStore] Failed to fetch products:', error);
      this.setError('Не удалось загрузить данные');
    } finally {
      this.setLoading(false);
    }
  };
}
