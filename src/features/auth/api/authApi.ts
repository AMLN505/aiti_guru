import { apiClient } from '@/shared/api';
import {
  authUserSchema,
  authTokensSchema,
  userSchema,
  loginPayloadSchema,
  type LoginPayload,
} from '../model/authSchema';

const TOKEN_EXPIRES_IN_MINS = 1;

export const authApi = {
  login: async (payload: LoginPayload) => {
    const { data } = await apiClient.post('/auth/login', loginPayloadSchema.parse(payload));
    return authUserSchema.parse(data);
  },

  getMe: async () => {
    const { data } = await apiClient.get('/auth/me');
    return userSchema.parse(data);
  },

  refresh: async (refreshToken: string) => {
    const { data } = await apiClient.post('/auth/refresh', {
      refreshToken,
      expiresInMins: TOKEN_EXPIRES_IN_MINS,
    });
    return authTokensSchema.parse(data);
  },
};
