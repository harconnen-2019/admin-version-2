import { modals } from '@mantine/modals';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { placeApi } from '@/entities/places';
import { PATH_PAGE } from '@/pages/path';

const queryClient = new QueryClient();

/**
 * Хук для витрины по ID
 * @param id ID витрины
 * @returns  place, status, error
 */
export const useGetPlace = (id: string | undefined) => {
  const { data, error, isPending } = useQuery({
    queryKey: [placeApi.keyId, id],
    queryFn: () => placeApi.get(id!),
  });
  const place = data?.places_item ?? undefined;

  return { place, error, isPending };
};

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

/**
 * Хук создания новой витрины, обновление списка витрин
 * После добавления переходит к списку
 * @returns Метод мутации
 */
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
 * Хук отправки изменения витрины, обновление списка витрин
 * После добавления переходит к списку
 * @returns Метод мутации
 */
export const useUpdatePlace = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (values: FormData) => placeApi.update(values),
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
