import { render, screen } from '@test-utils';
import { BrowserRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import { TableLanguages } from '../languages-table.ui';

describe('Таблица со списком языков', () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <TableLanguages />
      </BrowserRouter>,
      true,
    );

  it('Данные появятся только если статус "success', () => {
    renderComponent();
    const result = screen.queryByText(/clothing/i);

    expect(result).not.toBeInTheDocument();
  });

  it('Дата переводится в удобный формат', async () => {
    renderComponent();
    const parseDate = await screen.findAllByText(/4 октября 46 г/i);

    expect(parseDate[0]).toBeInTheDocument();
  });

  it('Адаптивная ширина у колонки с названием', async () => {
    renderComponent();
    const cellHeadName = await screen.findByRole('columnheader', {
      name: /язык/i,
    });

    expect(cellHeadName).toHaveAttribute('style', 'width: auto;');
  });
});
