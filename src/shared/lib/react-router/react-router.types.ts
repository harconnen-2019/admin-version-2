import { z } from 'zod';
import { IdPageParametersSchema } from './react-router.contracts';

// для типизации ID (placeId)
export type SlugPageParameters = z.infer<typeof IdPageParametersSchema>;
// export type UsernamePageParameters = z.infer<typeof UsernamePageParametersSchema>;
