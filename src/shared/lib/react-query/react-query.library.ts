import { NotificationProps } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';

// /**
//  * Бесконечные запросы для постраничной навигации
//  * @param config объект конфига
//  * @param config.id ID ключ
//  * @param config.data data
//  * @returns постраничные параметры
//  */
// function infinityQueryDataUpdater<D, K extends keyof D>(config: {
//   id: K;
//   data?: D;
// }): (infinityData?: InfiniteData<D[]>) => InfiniteData<D[], unknown> | undefined {
//   const { id, data } = config;

//   return (infinityData?: InfiniteData<D[]>): InfiniteData<D[], unknown> | undefined => {
//     if (!infinityData || !data) return;

//     const dataOrderIndex = infinityData.pages.flat().findIndex((item) => item[id] === data[id]);

//     if (dataOrderIndex === -1) {
//       return infinityData;
//     }

//     const pageLength = infinityData.pages[0].length;
//     const [pageIndex, dataIndex] = [
//       Math.floor(dataOrderIndex / pageLength),
//       dataOrderIndex % pageLength,
//     ];

//     const updatedInfinityData: InfiniteData<D[]> = {
//       pages: [
//         ...infinityData.pages.slice(0, pageIndex),
//         [
//           ...infinityData.pages[pageIndex].slice(0, dataIndex),
//           data,
//           ...infinityData.pages[pageIndex].slice(dataIndex + 1),
//         ],
//         ...infinityData.pages.slice(pageIndex + 1),
//       ],

//       pageParams: [...infinityData.pageParams],
//     };

//     return updatedInfinityData;
//   };
// }

/**
 * Модальное окно выбора, для удаления
 * @param id элемент
 * @param name название элемента
 * @param callback callback
 * @returns callback(id)
 */
const removeConfirmModal = (id: number, name: string, callback: (id: number) => void) =>
  modals.openConfirmModal({
    title: `Будем удалять : "${name}" ?`,
    padding: 'lg',
    centered: true,
    labels: { confirm: 'Удалить', cancel: 'Я еще подумаю' },
    confirmProps: { color: 'red' },
    onConfirm: () => callback(id),
  });

/**
 * Выплывающие уведомления
 */
const toast = {
  error: (message: string, options?: NotificationProps) => {
    notifications.show({
      ...options,
      color: 'red',
      message,
      title: 'Ошибка',
    });
  },
  success: (message: string, options?: NotificationProps) => {
    notifications.show({
      ...options,
      color: 'green',
      message,
      title: 'Успешно',
    });
  },
  info: (message: string, options?: NotificationProps) => {
    notifications.show({
      ...options,
      color: 'cyan',
      message,
      title: 'Информация',
    });
  },
};

export const reactQueryLibrary = { removeConfirmModal, toast };
