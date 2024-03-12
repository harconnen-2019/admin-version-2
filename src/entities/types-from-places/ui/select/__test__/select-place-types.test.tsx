import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@test-utils';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import { SelectTypeFromPlaces } from '../select-types-from-places';

const queryClient = new QueryClient();

describe('Список типов для витрин', () => {
  // const wrapper = ({ children }: { children: ReactNode }) => (
  //   <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  // );

  // it('Hook', async () => {
  //   const { result } = renderHook(() => usePlaceTypeList(), { wrapper });
  //   await waitFor(() => expect(result.current.status).toEqual('success'));
  // });

  it('Формируется тег select', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SelectTypeFromPlaces getInputProps={{ onChange: () => {} }} />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    const overlay = screen.queryByTestId('overlay');
    await waitFor(() => expect(overlay).not.toBeInTheDocument());

    const element: HTMLSelectElement = screen.getByRole('combobox', {
      name: /тип витрины/i,
    });

    /**
     * В "mswjs/data" формируется 2 значения
     */
    expect(element.length).toBe(3);
    expect(screen.getAllByRole('option', { name: 'name-type-test' })[0]).toBeInTheDocument();
  });
});
