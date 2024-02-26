import { modals } from '@mantine/modals';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { placeApi } from '@/entities/place';
import { PATH_PAGE } from '@/pages/path';

const queryClient = new QueryClient();

/**
 * Хук для вызова списка витрин
 * @returns  listPlaces, status, error
 */
export const usePlaceList = () => {
  const { status, data, error } = useQuery({
    queryKey: [placeApi.keyList],
    queryFn: () => placeApi.list(),
  });
  const listPlaces = data?.places_item_list ?? [];

  return { listPlaces, status, error };
};

export const useCreatePlace = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (values: FormData) => placeApi.create(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [placeApi.keyList] });
      if (data.success === 1) navigate(PATH_PAGE.place.root);
    },
  });
};

/**
 * Хук удаление витрины, обновление списка витрин
 * Вызывает модальное окно для подтверждения
 * @returns Модальное окно с методом удаления витрины
 */
export const useRemovePlace = () => {
  const { mutate: removePlace } = useMutation({
    mutationFn: (id: string | number) => placeApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [placeApi.keyList] });
    },
  });

  return (id: number, name: string) =>
    modals.openConfirmModal({
      title: `Удалить витрину: "${name}"`,
      centered: true,
      labels: { confirm: 'Удалить', cancel: 'Я еще подумаю' },
      confirmProps: { color: 'red' },
      onConfirm: () => removePlace(id),
    });
};
