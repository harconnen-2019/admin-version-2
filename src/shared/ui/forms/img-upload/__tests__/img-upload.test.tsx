import { render, screen } from '@test-utils';
import { describe, it } from 'vitest';
import { ImageUpload } from '../img-upload';

describe('Загрузка картинок в форме', () => {
  const imgPatch = '/path/to/image';

  it('Картинка подгружена с сервера, формы нет', () => {
    render(
      <ImageUpload
        click={() => {}}
        formValue={imgPatch}
        label="Image"
        getInputProps={{ onChange: () => {} }}
      />,
    );

    const input = screen.queryByRole('button');
    const result = screen.getByRole('img');

    expect(result).toHaveAttribute('src', imgPatch);
    expect(input).not.toBeInTheDocument();
  });

  it('Нет картинки, есть форма', () => {
    render(
      <ImageUpload
        click={() => {}}
        formValue={''}
        label="Image"
        getInputProps={{ onChange: () => {} }}
      />,
    );

    const input = screen.getByRole('button');
    const result = screen.queryByRole('img');

    expect(result).not.toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });
});
