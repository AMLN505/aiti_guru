import { type ReactNode } from 'react';
import { rootStore } from './RootStore';
import { StoreContext } from './StoreContext';

export const StoreProvider = ({ children }: { children: ReactNode }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);
