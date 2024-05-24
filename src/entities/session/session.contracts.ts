import { z } from 'zod';

import { ValidateSchema } from '@/shared/api';
import { placeContracts } from '../place';

// Схема пользователя в ответе
const UserDtoSchema = z.object({ id: z.number().positive(), username: z.string() });

// Схема запроса для авторизации
const LoginUserRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
  saveSession: z.optional(z.boolean()),
});

// Схема ответа сессии, merge дополнительная валидация
const SessionResponseSchema = z
  .object({
    session: z.optional(
      z.object({
        user: UserDtoSchema,
        place: placeContracts.PlaceDtoSchema,
      }),
    ),
  })
  .merge(ValidateSchema);

// Схема данных после преобразования
const SessionSchema = z.object({
  //TODO: пока передаем success чтобы отслеживать авторизацию в Layout (переход на /login)
  success: z.number().min(0).max(1),
  user: z.optional(UserDtoSchema),
  place: z.optional(placeContracts.PlaceDtoSchema),
});

export const sessionContracts = { LoginUserRequestSchema, SessionResponseSchema, SessionSchema };
