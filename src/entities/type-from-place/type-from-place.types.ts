import { z } from 'zod';
import { typeFromPlaceContracts } from './type-from-place.contracts';

export type TypeFromPlaceResponse = z.infer<
  typeof typeFromPlaceContracts.TypeFromPlaceResponseSchema
>;
export type TypeFromPlaceListResponse = z.infer<
  typeof typeFromPlaceContracts.TypeFromPlaceListResponseSchema
>;

export type TypeFromPlace = z.infer<typeof typeFromPlaceContracts.TypeFromPlaceSchema>;
export type TypeFromPlaceList = z.infer<typeof typeFromPlaceContracts.TypeFromPlaceListSchema>;
