import { makeAutoObservable } from 'mobx';
import { apiClient } from '@/shared/api';
import { authApi } from '../api/authApi';
import type { LoginPayload, User } from './authSchema';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export class AuthStore {
  user: User | null = null;
  isLoading = false;
  isInitialized = false;
  error: string | null = null;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const original = error.config;
        if (error.response?.status === 401 && !original._retry) {
          original._retry = true;
          await this.refresh();
          if (this.isAuthenticated) {
            return apiClient(original);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  get isAuthenticated() {
    return this.user !== null;
  }

  private setUser(user: User | null) {
    this.user = user;
  }

  private setLoading(value: boolean) {
    this.isLoading = value;
  }

  private setError(message: string | null) {
    this.error = message;
  }

  private setInitialized(value: boolean) {
    this.isInitialized = value;
  }

  private setTokens(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    delete apiClient.defaults.headers.common.Authorization;
  }

  private persistTokens(accessToken: string, refreshToken: string) {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    } catch (error) {
      console.warn('[AuthStore] Failed to persist tokens:', error);
    }
  }

  private clearPersistedTokens() {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.warn('[AuthStore] Failed to clear persisted tokens:', error);
    }
  }

  private readPersistedTokens(): { accessToken: string; refreshToken: string } | null {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (accessToken && refreshToken) return { accessToken, refreshToken };
    } catch (error) {
      console.warn('[AuthStore] Failed to read persisted tokens:', error);
    }
    return null;
  }

  init = async () => {
    try {
      const tokens = this.readPersistedTokens();
      if (tokens) {
        this.setTokens(tokens.accessToken, tokens.refreshToken);
        await this.fetchMe();
      }
    } finally {
      this.setInitialized(true);
    }
  };

  login = async (payload: LoginPayload, remember = false) => {
    this.setLoading(true);
    this.setError(null);
    try {
      const { accessToken, refreshToken, ...user } = await authApi.login(payload);
      this.setTokens(accessToken, refreshToken);
      if (remember) {
        this.persistTokens(accessToken, refreshToken);
      }
      this.setUser(user);
    } catch {
      this.setError('Неверный логин или пароль');
    } finally {
      this.setLoading(false);
    }
  };

  logout = () => {
    this.clearTokens();
    this.clearPersistedTokens();
    this.setUser(null);
    this.setError(null);
  };

  refresh = async () => {
    if (!this.refreshToken) return;
    try {
      const { accessToken, refreshToken } = await authApi.refresh(this.refreshToken);
      this.setTokens(accessToken, refreshToken);
      if (this.readPersistedTokens()) {
        this.persistTokens(accessToken, refreshToken);
      }
    } catch (error) {
      console.error('[AuthStore] Token refresh failed:', error);
      this.logout();
    }
  };

  fetchMe = async () => {
    if (!this.accessToken) return;
    this.setLoading(true);
    try {
      const user = await authApi.getMe();
      this.setUser(user);
    } catch (error) {
      console.error('[AuthStore] Failed to fetch user:', error);
      this.logout();
    } finally {
      this.setLoading(false);
    }
  };
}
