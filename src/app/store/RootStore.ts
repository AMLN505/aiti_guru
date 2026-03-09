import { AuthStore } from '@/features/auth/model/authStore';
import { ProductStore } from '@/entities/product';

export class RootStore {
  authStore: AuthStore;
  productStore: ProductStore;

  constructor() {
    this.authStore = new AuthStore();
    this.productStore = new ProductStore();
  }
}

export const rootStore = new RootStore();
