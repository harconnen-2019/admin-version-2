import { render, screen } from '@test-utils';
import { describe, it } from 'vitest';

import { SelectLanguages } from '../select-language.ui';

describe('Список языков', () => {
  it('Формируется тег select', async () => {
    render(<SelectLanguages getInputProps={{ onChange: () => {} }} />, true);

    const element: HTMLSelectElement = await screen.findByRole('combobox', {
      name: /язык/i,
    });

    /**
     * В "mswjs/data" формируется 2 значения
     * Третье значение нулевое
     */
    expect(element.length).toBe(3);
    expect(screen.getAllByRole('option', { name: 'Выбрать...' })[0]).toBeDisabled();
    expect(screen.getAllByRole('option', { name: 'Русский' })[0]).toBeInTheDocument();
  });
});
