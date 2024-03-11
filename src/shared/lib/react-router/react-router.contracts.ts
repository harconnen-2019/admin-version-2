import { z } from 'zod';

/**
 * Схемы переменных, которые применяются в путях роутера
 */
export const IdPageParametersSchema = z.object({ id: z.string() });
export const UidPageParametersSchema = z.object({ uid: z.string() });
// export const UsernamePageParametersSchema = z.object({ username: z.string() });
