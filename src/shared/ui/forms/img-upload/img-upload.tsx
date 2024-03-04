import { Fieldset, FileInput, Group, Image, rem } from '@mantine/core';
import { IconPhotoCircle, IconSquareRoundedMinus } from '@tabler/icons-react';
import { GetInputPropsReturnType } from 'node_modules/@mantine/form/lib/types';
import { useEffect, useState } from 'react';

interface IProperties {
  formValue: string | File | undefined | null;
  label: string;
  note?: string;
  accept?: string;
  getInputProps: GetInputPropsReturnType;
  click: () => void;
}

/**
 * Компонент загрузки картинки с просмотром
 * //TODO При многоразовом использовании вынести в shared
 * @param root0 пропсы
 * @param root0.formValue значение поля
 * @param root0.label название поля
 * @param root0.note описание поля
 * @param root0.accept формат загружаемых данных
 * @param root0.getInputProps связь с состоянием формы
 * @param root0.click callback для обнуления картинки (обнуляет состояние поля)
 * @returns JSX Element
 */
export function ImageUpload({
  formValue,
  label,
  note = 'Разрешено загружать: jpeg, png, webp',
  accept = 'image/png,image/jpeg,image/webp',
  getInputProps,
  click,
}: Readonly<IProperties>) {
  const [image, setImage] = useState<string | undefined>();
  const typeImageString = typeof formValue === 'string' && formValue !== '';

  /**
   * Если выбрана новая картинка в поле формы
   * конвертируем для просмотра превью и добавляем в State
   */
  useEffect(() => {
    if (formValue && typeof formValue !== 'string') {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (reader.result) {
          setImage(String(reader.result));
        }
      };
      reader.readAsDataURL(formValue);
    }
  }, [formValue]);

  return (
    <Fieldset mih={192} legend={label} variant="filled">
      {typeImageString ? (
        <IconSquareRoundedMinus onClick={() => click()} style={{ cursor: 'pointer' }} />
      ) : (
        <FileInput
          size="sm"
          variant="default"
          description={note}
          accept={accept}
          leftSection={<IconPhotoCircle style={{ width: rem(18), height: rem(18) }} />}
          {...getInputProps}
        />
      )}
      <Group
        justify="center"
        align="center"
        bg={formValue && label === 'Лого для темной темы' ? 'dark' : ''}
        h={80}
        mt={10}
      >
        {(typeImageString || image) && (
          <Image src={typeImageString ? formValue : image} style={{ objectFit: 'fill' }} h={50} />
        )}
      </Group>
    </Fieldset>
  );
}
