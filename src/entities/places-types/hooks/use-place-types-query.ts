import { useQuery } from '@tanstack/react-query';

import { placeTypeApi } from '..';

/**
 * Хук для вызова списка типов витрин
 * @returns  listPlaceTypes, status, error
 */
export const usePlaceTypeList = () => {
  const { status, data, error } = useQuery({
    queryKey: [placeTypeApi.keyList],
    queryFn: () => placeTypeApi.list(),
  });
  const listPlaceTypes = data?.places_type_list ?? [];

  return { listPlaceTypes, status, error };
};
