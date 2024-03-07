import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@test-utils';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import { SelectLanguages } from '../select-languages';

const queryClient = new QueryClient();

describe('Список языков', () => {
  it('Формируется тег select', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <SelectLanguages getInputProps={{ onChange: () => {} }} />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    const overlay = screen.queryByTestId('overlay');
    await waitFor(() => expect(overlay).not.toBeInTheDocument());

    // const element: HTMLSelectElement = screen.getByRole('combobox', {
    //   name: /язык/i,
    // });

    /**
     * В "mswjs/data" формируется 4 значения
     */
    // expect(element.length).toBe(5);
    expect(screen.getAllByRole('option', { name: 'Русский' })[0]).toBeInTheDocument();
  });
});
