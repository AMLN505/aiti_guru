export const ENV = {
  API_URL: import.meta.env.VITE_API_URL ?? 'https://dummyjson.com',
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
