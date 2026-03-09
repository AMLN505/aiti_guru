import { z } from 'zod';

export const authSchema = z.object({
  username: z.string().min(1, 'Введите логин'),
  password: z.string().min(1, 'Введите пароль'),
  remember: z.boolean().optional().default(false),
});

export const loginPayloadSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  expiresInMins: z.number().optional(),
});

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  gender: z.string(),
  image: z.url(),
});

export const authTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const authUserSchema = userSchema.extend(authTokensSchema.shape);

export type AuthFormValues = z.infer<typeof authSchema>;
export type LoginPayload = z.infer<typeof loginPayloadSchema>;
export type User = z.infer<typeof userSchema>;
