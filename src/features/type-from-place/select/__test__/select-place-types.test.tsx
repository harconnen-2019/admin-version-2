import { render, screen } from '@test-utils';
import { describe, it } from 'vitest';

import { SelectTypeFromPlace } from '../select-type-from-place.ui';

describe('Список типов для витрин', () => {
  // it('Hook', async () => {
  //   const { result } = renderHook(() => usePlaceTypeList(), { wrapper });
  //   await waitFor(() => expect(result.current.status).toEqual('success'));
  // });

  it('Формируется тег select', async () => {
    render(<SelectTypeFromPlace getInputProps={{ onChange: () => {} }} />, true);

    const element: HTMLSelectElement = await screen.findByRole('combobox', {
      name: /тип витрины/i,
    });

    /**
     * В "mswjs/data" формируется 2 значения
     * Третье значение нулевое
     */
    expect(element.length).toBe(3);
    expect(screen.getAllByRole('option', { name: 'Выбрать...' })[0]).toBeDisabled();
    expect(screen.getAllByRole('option', { name: 'name-type-test' })[0]).toBeInTheDocument();
  });
});
