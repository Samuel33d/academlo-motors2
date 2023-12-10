import z from 'zod';
import { extractValidationData } from '../../commons/utils/extractValidationData.js';

const registerSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a valid format',
      required_error: 'name is required',
    })
    .min(3, { message: 'name is too short' })
    .max(30, { message: 'name is too long' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'password must be at least 8 characters' })
    .max(20, { message: 'password is too long' }),
  role: z.enum(['client', 'employee']),
});

const updateSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'name must be a valid format',
    })
    .min(3, { message: 'name is too short' })
    .max(30, { message: 'name is too long' }),
  email: z.string().email({ message: 'Invalid email' }).min(),
});

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'password must be at least 8 characters' })
    .max(20, { message: 'password is too long' }),
});

export const validateUser = (data) => {
  const result = registerSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};

export const validateUpdate = (data) => {
  const result = updateSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};

export const validateLogin = (data) => {
  const result = loginSchema.safeParse(data);

  const {
    hasError,
    errorMessage,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    userData,
  };
};
