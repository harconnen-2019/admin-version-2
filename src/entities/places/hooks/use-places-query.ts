import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { PATH } from '@/pages/path';
import { ServiceFetch } from '@/shared/api';
import { BASE_URL } from '@/shared/lib';

import { schemaGetPlace, schemaListPlace } from '../api/types';

const _api = `${BASE_URL}/places/item/`;
const placeApi = new ServiceFetch(_api, 'place');

/**
 * Хук для витрины по ID
 * Подключается схема zod витрины, и схема валидации апи
 * @param id ID витрины
 * @returns  useQuery
 */
export const useGetPlace = (id: string | number) => {
  return useQuery({
    queryKey: [placeApi.keyId, id],
    queryFn: async () => {
      const response = await placeApi.get(id);
      return schemaGetPlace.parse(response);
    },
  });
};

/**
 * Хук для выбора активной витрины по ID
 * Подключается схема zod витрины, и схема валидации апи
 * При ошибке срабатывает уведомление
 * @returns  useMutation
 */
export const useSelectPlace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => {
      const response = await placeApi.get(id, { select: '1' });
      return schemaGetPlace.parse(response);
    },
    onError: (error) => {
      notifications.show({
        title: 'Ошибка',
        message: error + ' 🤥',
        color: 'red',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
    },
  });
};

/**
 * Хук для вызова списка витрин
 * Подключается схема zod списка витрин, и схема валидации апи
 * @returns  useQuery
 */
export const usePlaceList = () => {
  return useQuery({
    queryKey: [placeApi.keyList],
    queryFn: async () => {
      const response = await placeApi.list();
      return schemaListPlace.parse(response);
    },
  });
};

/**
 * Хук создания новой витрины, обновление списка витрин
 * Подключается схема zod витрины, и схема валидации апи
 * После добавления переходит к списку
 * @returns useMutation
 */
export const useCreatePlace = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: FormData) => {
      const response = await placeApi.createFormData(values);
      return schemaGetPlace.parse(response);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [placeApi.keyList] });
      if (data.success === 1) navigate(PATH.places.root);
    },
  });
};

/**
 * Хук отправки изменения витрины, обновление списка витрин
 * Подключается схема zod витрины, и схема валидации апи
 * После добавления переходит к списку
 * @returns useMutation
 */
export const useUpdatePlace = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: FormData) => {
      const response = await placeApi.updateFormData(values);
      return schemaGetPlace.parse(response);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [placeApi.keyList] });
      if (data.success === 1) navigate(PATH.places.root);
    },
  });
};

/**
 * Хук удаление витрины, обновление списка витрин
 * Подключается схема zod витрины, и схема валидации апи
 * Вызывает модальное окно для подтверждения
 * После выполнения или при ошибке срабатывает уведомление
 * @returns Модальное окно с методом удаления витрины
 */
export const useRemovePlace = () => {
  const queryClient = useQueryClient();
  const { mutate: removePlace } = useMutation({
    mutationFn: async (id: string | number) => {
      const response = await placeApi.remove(id);
      return schemaGetPlace.parse(response);
    },
    onError: (error) => {
      notifications.show({
        title: 'Ошибка удаления',
        message: error + ' 🤥',
        color: 'red',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [placeApi.keyList] });
      notifications.show({
        title: 'Успех',
        message: 'Вы удалили витрину!',
      });
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
