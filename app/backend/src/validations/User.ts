import { z } from 'zod';

export const email = z.string().email();
export const password = z.string().min(6);

export const LoginSchema = z.object({
  email,
  password,
});
