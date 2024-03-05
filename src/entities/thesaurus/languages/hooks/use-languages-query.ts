import { modals } from '@mantine/modals';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { PATH_PAGE } from '@/pages/path';
import { ServiceFetch } from '@/shared/api';
import { BASE_URL } from '@/shared/lib';
import { notifications } from '@mantine/notifications';
import {
  IRequestPostLanguage,
  IRequestPutLanguage,
  schemaGetLanguage,
  schemaListLanguage,
} from '../api/types';

const _api = `${BASE_URL}/thesaurus/language/`;
const languageApi = new ServiceFetch(_api, 'language');

/**
 * Хук для языка по ID
 * Подключается схема zod языка, и схема валидации апи
 * @param id ID языка
 * @returns  useQuery
 */
export const useGetLanguage = (id: string | number) => {
  return useQuery({
    queryKey: [languageApi.keyId, id],
    queryFn: async () => {
      const response = await languageApi.get(id);
      return schemaGetLanguage.parse(response);
    },
  });
};

/**
 * Хук для вызова списка языков
 * Подключается схема zod списка языков, и схема валидации апи
 * @returns  useQuery
 */
export const useLanguageList = () => {
  return useQuery({
    queryKey: [languageApi.keyList],
    queryFn: async () => {
      const response = await languageApi.list();
      return schemaListLanguage.parse(response);
    },
  });
};

/**
 * Хук создания нового языка, обновление списка языков
 * Подключается схема zod языка, и схема валидации апи
 * После добавления переходит к списку
 * @returns useMutation
 */
export const useCreateLanguage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: IRequestPostLanguage) => {
      const response = await languageApi.create(values);
      return schemaGetLanguage.parse(response);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [languageApi.keyList] });
      if (data.success === 1) navigate(PATH_PAGE.thesaurus.language.root);
    },
  });
};

/**
 * Хук отправки изменения языка, обновление списка языков
 * Подключается схема zod языка, и схема валидации апи
 * После добавления переходит к списку
 * @returns useMutation
 */
export const useUpdateLanguage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: IRequestPutLanguage) => {
      const response = await languageApi.update(values);
      return schemaGetLanguage.parse(response);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [languageApi.keyList] });
      if (data.success === 1) navigate(PATH_PAGE.thesaurus.language.root);
    },
  });
};

/**
 * Хук удаление языка, обновление списка языков
 * Подключается схема zod языка, и схема валидации апи
 * Вызывает модальное окно для подтверждения
 * После выполнения или при ошибке срабатывает уведомление
 * @returns Модальное окно с методом удаления языка
 */
export const useRemoveLanguage = () => {
  const queryClient = useQueryClient();
  const { mutate: removeLanguage } = useMutation({
    mutationFn: async (id: string | number) => {
      const response = await languageApi.remove(id);
      return schemaGetLanguage.parse(response);
    },
    onError: (error) => {
      notifications.show({
        title: 'Ошибка удаления',
        message: error + ' 🤥',
        color: 'red',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [languageApi.keyList] });
      notifications.show({
        title: 'Успех',
        message: 'Вы удалили язык!',
      });
    },
  });

  return (id: number, name: string) =>
    modals.openConfirmModal({
      title: `Удалить язык: "${name}"`,
      centered: true,
      labels: { confirm: 'Удалить', cancel: 'Я еще подумаю' },
      confirmProps: { color: 'red' },
      onConfirm: () => removeLanguage(id),
    });
};
