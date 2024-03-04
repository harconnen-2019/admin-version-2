import { z } from 'zod';

import { placeType } from '@/entities/places';
import { schemaValidate } from '@/shared/api';

export const schemaSession = z
  .object({
    session: z
      .object({
        user: z.object({ id: z.number(), username: z.string() }),
        place: placeType.schemaPlace,
      })
      .optional(),
  })
  .merge(schemaValidate);

export interface IRequestLogin {
  username: string;
  password: string;
  saveSession?: boolean;
}
