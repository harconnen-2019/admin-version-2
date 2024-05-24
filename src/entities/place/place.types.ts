import { z } from 'zod';
import { placeContracts } from './place.contracts';

export type CreatePlace = z.infer<typeof placeContracts.PlaceRequestPostSchema>;
export type UpdatePlace = z.infer<typeof placeContracts.PlaceRequestPutSchema>;

export type PlaceResponse = z.infer<typeof placeContracts.PlaceResponseSchema>;
export type PlaceQuery = z.infer<typeof placeContracts.PlaceQueryDtoSchema>;
export type PlaceSelectQuery = z.infer<typeof placeContracts.PlaceSelectQueryDtoSchema>;
export type PlaceParameters = z.infer<typeof placeContracts.PlaceParametersDtoSchema>;
export type PlaceListResponse = z.infer<typeof placeContracts.PlaceListResponseSchema>;

export type Place = z.infer<typeof placeContracts.PlaceSchema>;
export type PlaceList = z.infer<typeof placeContracts.PlaceListSchema>;
