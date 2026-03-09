import { createContext } from 'react';
import { rootStore, type RootStore } from './RootStore';

export const StoreContext = createContext<RootStore>(rootStore);
